import type { ReactElement } from 'react';
import { useCallback, useEffect, useRef } from 'react';
import styles from './Wheel.module.scss';
import { useOptionsStore } from '../../store/useOptionsStore';
import { generateColorsForWheel } from '../../utils/colors';
import drawWheel from '../../utils/drawCanvas/drawWheel';
import drawPicker from '../../utils/drawCanvas/drawPicker';
import { useWheelStore } from '../../store/useWheelStore';
import type { Option } from '../../types/types';

function Wheel(): ReactElement {
  const { list: options } = useOptionsStore();
  const {
    isSpinning,
    duration,
    selectedOption,
    selectedBgColor,
    selectedTextColor,
    stopSpin,
    setWinner,
  } = useWheelStore();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const colors = useRef<string[]>([]);
  const currentAngle = useRef(0);
  const winnerDetected = useRef(false);
  const colorsGenerated = useRef(false);

  const getCurrentSegment = useCallback(
    (angle: number): Option | null => {
      const normalizedAngle = (360 - (angle % 360)) % 360;
      const totalWeight = options.reduce((sum, item) => sum + (item.weight || 1), 0);
      let accumulatedWeight = 0;

      for (let i = 0; i < options.length; i++) {
        const weight = options[i].weight || 1;
        const sliceAngle = (weight / totalWeight) * 360;
        accumulatedWeight += sliceAngle;

        if (normalizedAngle <= accumulatedWeight) {
          return options[i];
        }
      }

      return null;
    },
    [options],
  );

  const updateCanvas = useCallback((angle = 0): void => {
    currentAngle.current = angle;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const maxWidth = Math.min(window.innerWidth - 16, 550);
    canvas.width = maxWidth;
    canvas.height = maxWidth;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawWheel(ctx, options, colors.current, angle);
    drawPicker(ctx);

    if (isSpinning && !winnerDetected.current) {
      const currentSegment = getCurrentSegment(angle);
      if (currentSegment) {
        const segmentIndex = options.findIndex((opt) => opt.title === currentSegment.title);
        setWinner(currentSegment, colors.current[segmentIndex]);
      }
    }
  }, [isSpinning, options, getCurrentSegment, setWinner]);

  const easeOut = useCallback((t: number): number => 1 - Math.pow(1 - t, 4), []);

  const finishSpin = useCallback((finalAngle: number): void => {
    const currentSegment = getCurrentSegment(finalAngle);

    if (currentSegment) {
      const segmentIndex = options.findIndex((opt) => opt.title === currentSegment.title);
      setWinner(currentSegment, colors.current[segmentIndex]);
    }

    currentAngle.current = finalAngle;
    winnerDetected.current = true;
    stopSpin();
    updateCanvas(finalAngle);
  }, [getCurrentSegment, options, setWinner, stopSpin, updateCanvas]);

  useEffect(() => {
    if (!colorsGenerated.current && options.length > 0) {
      colors.current = generateColorsForWheel(options.length);
      colorsGenerated.current = true;
      updateCanvas(0);
    }
  }, [options.length, updateCanvas]);

  useEffect(() => {
    if (!isSpinning) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      winnerDetected.current = false;
      return;
    }

    const startTime = performance.now();
    const minRotation = 5;
    const maxRotation = 20;
    const randomRotations = minRotation + Math.random() * (maxRotation - minRotation);
    const totalRotation = 360 * randomRotations + Math.random() * 360;
    const spinDuration = duration * 1000;

    const animate = (currentTime: number): void => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / spinDuration, 1);
      const easedProgress = easeOut(progress);
      const rotationAngle = easedProgress * totalRotation;

      updateCanvas(rotationAngle);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        finishSpin(rotationAngle);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return (): void => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isSpinning, duration, easeOut, finishSpin, updateCanvas]);

  useEffect(() => {
    const handleResize = (): void => updateCanvas(currentAngle.current);
    window.addEventListener('resize', handleResize);
    return (): void => window.removeEventListener('resize', handleResize);
  }, [updateCanvas]);

  return (
    <div className={styles['wheel-container']}>
      <p
        className={styles['picked-elem']}
        style={{
          color: selectedTextColor,
          backgroundColor: selectedBgColor,
          fontWeight: isSpinning ? '400' : '600',
        }}
      >
        {!isSpinning
          ? selectedOption?.title || 'Spin the wheel!!'
          : selectedOption?.title || 'Spinning...'}
      </p>
      <canvas className={styles['wheel-canvas']} ref={canvasRef} aria-label="Decision wheel" />
    </div>
  );
}

export default Wheel;