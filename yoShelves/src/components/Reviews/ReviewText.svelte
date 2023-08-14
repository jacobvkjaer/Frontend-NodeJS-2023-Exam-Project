<script>
  export let reviewText;
</script>

{#if reviewText}
  <div class="aligner">
    <p>{reviewText}</p>
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
