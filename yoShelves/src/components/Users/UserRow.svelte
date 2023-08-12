<script>
  import { Column } from 'carbon-components-svelte';
  export let id;
  export let username;
  export let email;
</script>

{#if id}
  <Column class="title-row-column-1" sm={4} md={4} lg={4} xlg={4} max={3}>
    <div class="aligner-start">
      <h5>{id}</h5>
    </div>
  </Column>
  <Column class="title-row-column-1" sm={4} md={4} lg={4} xlg={4} max={3}>
    <div class="aligner-start">
      <h5>{username}</h5>
    </div>
  </Column>
  <Column class="title-row-column-1" sm={4} md={4} lg={4} xlg={4} max={3}>
    <div class="aligner-start">
      <h5>{email}</h5>
    </div>
  </Column>
{/if}

<style>
  .aligner-start {
    display: flex;
    justify-content: start;
    padding-left: 10%;
    /* align-items: center; */
    /* gap: 10px; */
  }

  .aligner {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  h2 {
    padding-right: 13px;
  }
</style>
