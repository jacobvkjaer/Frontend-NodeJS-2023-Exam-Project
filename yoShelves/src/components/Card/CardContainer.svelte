<div class="card-container">
  <div class="card">
    <slot />
  </div>
</div>

<style>
  /* Global styles */
  :global(a:-webkit-any-link.link-id) {
    width: 100%;
    height: 100%;
  }

  /* Rest of styles */
  .card-container {
    margin: auto;
    padding: 40px 0;
  }

  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    width: 220px;
    height: 320px;
    background: rgba(82, 58, 40, 0.6);
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }

  .card:hover {
    transform: translateY(-5px);
    background: rgba(196, 98, 0, 0.4);
  }
</style>
