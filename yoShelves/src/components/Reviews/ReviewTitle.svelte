<script>
  export let reviewTitle;
</script>

{#if reviewTitle}
  <div class="aligner">
    <h2>{reviewTitle}</h2>
  </div>
{/if}

<style>
  .aligner {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 10px;
    padding-right: 20px;
  }
</style>
