<script lang="ts">
  import { onMount } from 'svelte';
  import {
    createGeneration,
    nextGeneration,
    reverseCellState,
  } from './gameOfLife';
  import {
    drawGeneration,
    drawGrid,
    drawGame,
    getCellDimensions,
  } from './draw';

  let canvas: HTMLCanvasElement;
  let button: string = 'PLAY';

  const rows = 30;
  const columns = rows;
  let generation = createGeneration(columns, rows);

  let interval: number;

  let speed: number = 500;

  function reverseCell(e: MouseEvent) {
    const [cellWidth, cellHeight] = getCellDimensions(canvas, generation);
    const row = Math.floor(e.offsetY / cellHeight);
    const column = Math.floor(e.offsetX / cellWidth);
    reverseCellState(generation, row, column);
    drawGame(canvas, generation);
  }

  function changeSpeed() {
    toggleGame();
    toggleGame();
  }

  function toggleGame() {
    button === 'PLAY' ? (button = 'PAUSE') : (button = 'PLAY');
    if (interval) {
      clearInterval(interval);
      interval = null;
    } else {
      interval = setInterval(() => {
        generation = nextGeneration(generation);
        drawGame(canvas, generation);
      }, 1001 - speed);
    }
  }

  function resetBoard() {
    generation = createGeneration(columns, rows);
    drawGame(canvas, generation);
  }

  onMount(() => {
    drawGeneration(canvas, generation);
    drawGrid(canvas, generation);
  });
</script>

<style>
  canvas {
    display: block;
    margin: auto;
    border: 1px solid black;
  }

  button {
    display: inline;
    padding: 12px;
    margin: 24px;
    background: #ff3e00;
    color: black;
    border: none;
  }

  input {
    appearance: none;
    cursor: pointer;
    height: 10px;
    padding: 0;
    margin: 0 15px;
    background: #ffc8b5;
    border: none;
  }

  input:focus {
    outline: none;
  }

  input:focus::-webkit-slider-thumb {
    background: #990000;
  }

  input::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    background: #ff3e00;
    border-radius: 10px;
  }
</style>

<canvas width={300} height={300} bind:this={canvas} on:click={reverseCell} />
<button on:click={toggleGame}>{button}</button>
<button on:click={resetBoard}>CLEAR</button>
<label>
  Speed <input type="range" min={1} max={1000} on:change={changeSpeed} bind:value={speed} />
</label>
