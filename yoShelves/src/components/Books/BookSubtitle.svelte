<script>
  export let subtitle;
</script>

{#if subtitle}
  <div class="aligner">
    <h3>Subtitle</h3>
    <h2>-</h2>
    <h4>{subtitle}</h4>
  </div>
{/if}

<style>
  .aligner {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 10px;
  }

  h2 {
    padding-right: 13px;
  }
</style>
