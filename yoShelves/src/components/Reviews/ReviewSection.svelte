<script>
  import { Row, Column } from 'carbon-components-svelte';
  import { Star, StarFilled, StarHalf } from 'carbon-icons-svelte';
  import ReviewText from './ReviewText.svelte';
  import ReviewTitle from './ReviewTitle.svelte';

  export let review;
  // export let isAdmin;
</script>

<!-- {#if !review} -->
<Column class="title-column" sm={8} md={8} lg={8} xlg={8} max={10}>
  {#if review?.review_title}
    <div class="title-container">
      <Row class="title-row-1">
        <Column
          class="title-row-column-1"
          sm={16}
          md={16}
          lg={16}
          xlg={16}
          max={16}
        >
          <ReviewTitle reviewTitle={review.review_title} />
        </Column>
      </Row>
    </div>
  {/if}
  {#if review?.rating}
    <div class="title-container">
      <Row class="title-row">
        <Column
          class="title-row-column"
          sm={16}
          md={16}
          lg={16}
          xlg={16}
          max={16}
        >
          <div class="aligner">
            {#each Array(Math.floor(review.rating)).fill() as _}
              <h5><StarFilled size={16} /></h5>
            {/each}
            {#if review.rating % 1 >= 0.5}
              <h5><StarHalf size={16} /></h5>
            {/if}
            {#each Array(5 - Math.ceil(review.rating)).fill() as _}
              <h5><Star size={16} /></h5>
            {/each}
          </div>
        </Column>
      </Row>
    </div>
  {/if}
  {#if review?.review_text}
    <div class="title-container">
      <Row class="title-row-1">
        <Column
          class="title-row-column-1"
          sm={16}
          md={16}
          lg={16}
          xlg={16}
          max={16}
        >
          <ReviewText reviewText={review.review_text} />
        </Column>
      </Row>
    </div>
  {/if}
</Column>

<!-- {/if} -->

<style>
  :global(.title-column) {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  :global(
      .title-column.bx--col-sm-8.bx--col-md-8.bx--col-lg-8.bx--col-xlg-8.bx--col-max-10
    ) {
    padding: 20px;
    border-right: 1px solid #523a28;
  }

  :global(
      .buffer-column.bx--col-sm-4.bx--col-md-4.bx--col-lg-4.bx--col-xlg-4.bx--col-max-3
    ) {
    padding: 20px 0 20px 20px;
  }

  .aligner {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 4px;
  }

  h3 {
    padding-right: 23px;
  }

  h2 {
    padding-right: 18px;
  }
</style>
