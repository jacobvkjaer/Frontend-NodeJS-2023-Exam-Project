<div class="image-container">
  <div class="image">
    <slot name="image" />
  </div>

  <div class="info">
    <slot name="info" />
  </div>
</div>

<style>
  .image-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    gap: 15px;
    padding-top: 25px;
  }

  .image {
    width: 120px;
  }

  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    width: 95%;
  }
</style>
