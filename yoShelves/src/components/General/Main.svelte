<div class="flex-center">
  <div class="container">
    <slot />
  </div>
</div>

<style>
  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 48px);
    width: 100%;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .container > * {
    margin-bottom: 1em;
    text-decoration: none;
  }
</style>
