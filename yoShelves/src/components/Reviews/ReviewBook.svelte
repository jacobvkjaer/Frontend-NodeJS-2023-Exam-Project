<script>
  import { apiRequest } from '../../utils/fetching/fetching.js';
  import { user } from '../../stores/user.js';
  import { HeaderGlobalAction } from 'carbon-components-svelte';
  import { Star, StarFilled, ProgressBar } from 'carbon-icons-svelte';
  // import { Delete } from 'carbon-pictograms-svelte';
  // import { onMount } from 'svelte';
  // import { BASE_URL } from '../../stores/urls.js';
  // import { onDestroy } from 'svelte';

  export let review = null;
  export let book;

  let isReviewed = false;
  export let isEditingReview = false;
  $: isEditingReview = isReviewed ? false : isEditingReview;
  let readyToAddReview = false;

  $: userId = $user?.user.id;
  $: isAdmin = $user?.user.role === 'admin';
  let numberOfReviews;

  $: if (book && book.id) {
    console.log(`reached reactive statement of ReviewBook.svelte`);
    fetchReviewCount();
    if (userId && !isAdmin && review) {
      console.log(`Got to fetchReview`);
      fetchReview();
    }
  }

  async function fetchReviewCount() {
    const endpoint = `/books/${book.id}/reviews`;
    console.debug('fetchReviewCount - endpoint: ', endpoint);

    try {
      const data = await apiRequest({
        endpoint,
      });
      numberOfReviews = data.count;
      console.debug('numberOfReviews: ', numberOfReviews);
      console.debug('data.message: ', data.message);
    } catch (e) {
      console.log(e);
    }
  }

  async function fetchReview() {
    const endpoint = `/users/${userId}/reviews/${review.id}`;

    console.debug('got to fetchReview: ', endpoint);
    try {
      const data = await apiRequest({
        endpoint,
      });
      if (data.status === 404) {
        isReviewed = false;
      }
      isReviewed = true;
    } catch (e) {
      isReviewed = false;
      console.log(e);
    }
  }

  async function toggleReview() {
    if (!isReviewed) {
      isEditingReview = true;
      if (readyToAddReview) {
        addReview();
        isEditingReview = false;
      }
    } else {
      console.log('Entered the toggleReview - else');
      // Delete from Reviews
      const endpoint = `/users/${userId}/reviews/${review.id}`;

      try {
        const data = await apiRequest({
          method: 'DELETE',
          endpoint,
          useToastr: true,
        });
        isReviewed = false;
      } catch (e) {
        console.log(e);
      }
    }
  }
</script>

<div class="wrapper">
  {#if numberOfReviews > 1 || (isAdmin && numberOfReviews === 0)}
    <div class="aligner">
      <p>{numberOfReviews} users have reviewed this title</p>
    </div>
  {:else if numberOfReviews > 0}
    <div class="aligner">
      <p>1 user has reviewed this title</p>
    </div>
  {:else}
    <div class="aligner">
      <p>Be the first to review this title!</p>
    </div>
  {/if}

  {#if !isAdmin}
    {#if isReviewed && !isEditingReview}
      <div class="aligner">
        <HeaderGlobalAction
          class="icon"
          on:click={toggleReview}
          icon={StarFilled}
        />
        <p class="p-1">&nbsp;:&ensp;Delete your review</p>
      </div>
    {:else if !isEditingReview}
      <div class="aligner">
        <HeaderGlobalAction class="icon" on:click={toggleReview} icon={Star} />
        <p class="p-1">&nbsp;:&ensp;Add a review</p>
      </div>
    {:else}
      <div class="aligner">
        <HeaderGlobalAction
          class="icon"
          on:click={toggleReview}
          icon={ProgressBar}
        />
        <p class="p-1">&nbsp;:&ensp;Editing...</p>
      </div>
    {/if}
  {/if}
</div>

<style>
  :global(.icon.bx--header__action) {
    /* margin-top: 20px; */
  }

  :global(.icon.bx--header__action svg) {
    height: 32px;
    width: 32px;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 7px;
    padding-bottom: 30px;
  }

  .aligner {
    display: flex;
    justify-content: start;
    align-items: center;
  }

  p {
    font-size: 22px;
  }

  .p-1 {
    font-size: 17px;
  }
</style>
