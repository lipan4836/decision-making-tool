export default function drawCenter(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
): void {
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.closePath();

  ctx.fillStyle = '#242424';
  ctx.fill();

  ctx.strokeStyle = '#E3E3E3';
  ctx.lineWidth = 2;
  ctx.shadowBlur = 5;
  ctx.shadowColor = 'black';
  ctx.stroke();
}
