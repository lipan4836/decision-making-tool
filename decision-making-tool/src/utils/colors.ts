export function getRandomColor(): string {
  const str = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i += 1) {
    color += str[Math.floor(Math.random() * 16)];
  }

  return color;
}

export function generateColorsForWheel(count: number): string[] {
  const colors: string[] = [];

  for (let i = 0; i < count; i += 1) {
    colors.push(getRandomColor());
  }

  return colors;
}
