export function createGeneration(width: number, height: number) {
  let row = Array.from(Array(width), () => 0);
  return Array.from(Array(height), () => [...row]);
}

export function nextGeneration(currentGeneration: number[][]): number[][] {
  const newGeneration = currentGeneration.map(row => [...row]);
  currentGeneration.forEach((row, rowIndex) =>
    row.forEach((state, columnIndex) => {
      const liveneighbors = liveNeighbors(
        rowIndex,
        columnIndex,
        currentGeneration,
      );
      const newState = determineNextState(liveneighbors, state);
      newGeneration[rowIndex][columnIndex] = newState;
    }),
  );
  return newGeneration;
}

function liveNeighbors(
  row: number,
  column: number,
  currentGeneration: number[][],
): number {
  const squareMatrixLength = currentGeneration.length;
  let liveNeighbors = 0;
  const neighbors = [
    [row - 1, column - 1],
    [row - 1, column],
    [row - 1, column + 1],
    [row, column - 1],
    [row, column + 1],
    [row + 1, column - 1],
    [row + 1, column],
    [row + 1, column + 1],
  ];
  neighbors.forEach(neighbor => {
    const row = neighbor[0];
    const column = neighbor[1];
    if (
      row >= 0 &&
      row < squareMatrixLength &&
      column >= 0 &&
      column < squareMatrixLength
    ) {
      liveNeighbors += currentGeneration[row][column];
    }
  });
  return liveNeighbors;
}

function determineNextState(
  liveneighbors: number,
  currentState: number,
): number {
  if (currentState === 1) {
    if (liveneighbors === 2 || liveneighbors === 3) {
      return 1;
    } else {
      return 0;
    }
  } else {
    if (liveneighbors === 3) {
      return 1;
    } else {
      return 0;
    }
  }
}

export function reverseCellState(
  generation: number[][],
  row: number,
  column: number,
) {
  const state = generation[row][column];
  if (state === 0) {
    generation[row][column] = 1;
  } else {
    generation[row][column] = 0;
  }
}
