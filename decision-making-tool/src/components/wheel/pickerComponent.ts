export default function drawPicker(ctx: CanvasRenderingContext2D): void {
  const centerX = ctx.canvas.width / 2;
  const pointerLength = 20;
  const offsetY = 10;

  ctx.beginPath();
  ctx.moveTo(centerX - 10, offsetY);
  ctx.lineTo(centerX + 10, offsetY);
  ctx.lineTo(centerX, pointerLength + offsetY);
  ctx.closePath();
  ctx.fillStyle = '#383838';
  ctx.fill();

  ctx.strokeStyle = '#E3E3E3';
  ctx.lineWidth = 2;
  ctx.shadowBlur = 3;
  ctx.shadowColor = 'black';
  ctx.stroke();
}
