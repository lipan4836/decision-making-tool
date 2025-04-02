import type { ListItem } from '../../types/types';
import drawCenter from './centerComponent';

export default function drawWheel(
  ctx: CanvasRenderingContext2D,
  options: ListItem[],
  colors: string[],
  rotationAngle: number = 0,
): void {
  const centerX = ctx.canvas.width / 2;
  const centerY = ctx.canvas.height / 2;
  const radius = Math.min(centerX, centerY) - 20;

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const rotationRad = (rotationAngle * Math.PI) / 180;
  const totalWeight = options.reduce((sum, item) => sum + (item.weight || 1), 0);

  let currentAngle = rotationRad;

  const fontSize = window.innerWidth < 550 ? 10 : 14;
  ctx.font = `${fontSize}px Helvetica`;

  options.forEach((option, index) => {
    const weight = option.weight || 1;
    const sliceAngle = (weight / totalWeight) * 2 * Math.PI;

    // Отрисовка доли
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
    ctx.closePath();

    // Цвет доли
    ctx.fillStyle = colors[index];
    ctx.fill();

    ctx.strokeStyle = '#E3E3E3';
    ctx.lineWidth = 2;
    ctx.shadowBlur = 3;
    ctx.shadowColor = 'black';
    ctx.stroke();

    // Отрисовка текста
    ctx.save();
    const middleAngle = currentAngle + sliceAngle / 2;
    const textRadius = radius * 0.6;

    // Вычисляем позицию текста
    const textX = centerX + Math.cos(middleAngle) * textRadius;
    const textY = centerY + Math.sin(middleAngle) * textRadius;

    // настройка текста
    ctx.translate(textX, textY);
    ctx.rotate(middleAngle);
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'black';
    ctx.fillStyle = '#E3E3E3';
    ctx.font = `${fontSize} Helvetica`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    let text = option.title;
    if (text.length > 20) {
      text = text.slice(0, 17) + '...';
    }
    ctx.fillText(text, 0, 0);
    ctx.restore();

    currentAngle += sliceAngle;
  });

  drawCenter(ctx, centerX, centerY, radius * 0.15);
}
