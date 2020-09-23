<script lang="ts">
  import Canvas from './Canvas.svelte';
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    font-size: 4em;
    font-weight: 100;
  }
</style>

<main>
  <h1>Conway's Game of Life</h1>
  <h2>Click on the canvas to edit the cells!</h2>
  <Canvas />
</main>
