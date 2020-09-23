export function drawGame(canvas: HTMLCanvasElement, generation: number[][]) {
  clearCanvas(canvas);
  drawGeneration(canvas, generation);
  drawGrid(canvas, generation);
}

export function drawGrid(
  canvas: HTMLCanvasElement,
  generation: number[][],
  color: string = '#ff3e00',
) {
  const ctx = canvas.getContext('2d');
  ctx.strokeStyle = color;
  const [cellWidth, cellHeight] = getCellDimensions(canvas, generation);
  let xPos = cellWidth + 0.5;
  while (xPos < canvas.width) {
    const path = new Path2D();
    path.moveTo(xPos, 0);
    path.lineTo(xPos, canvas.height);
    ctx.stroke(path);
    xPos += cellWidth;
  }
  let yPos = cellHeight + 0.5;
  while (yPos < canvas.height) {
    const path = new Path2D();
    path.moveTo(0, yPos);
    path.lineTo(canvas.width, yPos);
    ctx.stroke(path);
    yPos += cellHeight;
  }
}

export function drawGeneration(
  canvas: HTMLCanvasElement,
  generation: number[][],
) {
  const ctx = canvas.getContext('2d');
  const [cellWidth, cellHeight] = getCellDimensions(canvas, generation);
  let xPos = 0;
  let yPos = 0;
  generation.forEach(row => {
    row.forEach(cell => {
      if (cell === 1) {
        const rectangle = new Path2D();
        rectangle.rect(xPos, yPos, cellWidth, cellHeight);
        ctx.fill(rectangle);
      }
      xPos += cellWidth;
    });
    xPos = 0;
    yPos += cellHeight;
  });
}

export function getCellDimensions(
  canvas: HTMLCanvasElement,
  generation: number[][],
): [number, number] {
  const cellWidth = canvas.width / generation[0].length;
  const cellHeight = canvas.height / generation.length;
  return [cellWidth, cellHeight];
}

export function clearCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
