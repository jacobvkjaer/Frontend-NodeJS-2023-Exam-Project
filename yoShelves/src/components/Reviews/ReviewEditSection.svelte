<script>
  import {
    Row,
    Column,
    Button,
    TextInput,
    TextArea,
  } from 'carbon-components-svelte';
  import { Star, StarFilled, StarHalf } from 'carbon-icons-svelte';
  import ReviewText from './ReviewText.svelte';
  import ReviewTitle from './ReviewTitle.svelte';
  import { user } from '../../stores/user.js';
  import { apiRequest } from '../../utils/fetching/fetching.js';

  export let review;
  export let book; // if you need it
  export let isEditingReview; // if you need it

  let userId = $user?.user.id;
  let rating = review?.rating || 0;
  let reviewTitleInput = review?.reviewTitle || '';
  let reviewTextInput = review?.reviewText || '';

  function setRating(starNumber) {
    rating = starNumber;
  }

  function submitReview() {
    addReview();
    isEditingReview = false;
  }

  function cancelEdit() {
    isEditingReview = false;
  }

  async function addReview() {
    console.log('Entered the addReview');
    const endpoint = `/users/${userId}/reviews`;

    console.debug('body: ', review);

    // Add to Reviews
    try {
      console.log('Beginning of try in toggle - if');
      const data = await apiRequest({
        method: 'POST',
        endpoint,
        body: review,
        useToastr: true,
      });

      console.log('This is the message of toggleReview');
      console.log(data.message);
      isReviewed = true;
    } catch (e) {
      console.log(e);
    }
  }
</script>

<Column class="title-column" sm={8} md={8} lg={8} xlg={8} max={10}>
  <!-- Title input field -->
  <TextInput bind:value={reviewTitleInput} placeholder="Enter review title" />

  <!-- Star rating -->
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
          {#each Array(5) as _, i (i)}
            <h5 on:click={() => setRating(i + 1)}>
              {#if i + 1 <= rating}
                <StarFilled size={16} />
              {:else}
                <Star size={16} />
              {/if}
            </h5>
          {/each}
        </div>
      </Column>
    </Row>
  </div>

  <TextArea bind:value={reviewTextInput} placeholder="Enter review text" />
  <div class="aligner1">
    <Button on:click={submitReview}>Submit</Button>
    <Button kind="secondary" :click={cancelEdit}>Cancel</Button>
  </div>
</Column>

<style>
  :global(.title-column) {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  :global(.aligner1.s-68bV6bXIvpnK .bx--btn.bx--btn--primary) {
    background-color: #523a28;
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

  .aligner1 {
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 50px;
  }

  h3 {
    padding-right: 23px;
  }

  h2 {
    padding-right: 18px;
  }
</style>
