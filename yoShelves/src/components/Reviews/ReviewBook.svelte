<script>
    import {
      HeaderGlobalAction
    } from "carbon-components-svelte";
    import {
      StarReview,
      FavoriteFilled
    } from "carbon-icons-svelte";
    import { Delete } from "carbon-pictograms-svelte";
    import { onMount } from "svelte";
    import { user } from "../../stores/user.js";
    import { BASE_URL } from "../../stores/urls.js";
    import { onDestroy } from "svelte";
    
    
    let userId;
    export let book;
    let isFavorite = true;
    let numberOfReviews;

    // Subscribe to user store and update userId
    const unsubscribe = user.subscribe(async $user => {
      userId = $user?.user?.id;
      console.log(userId);
    });

    onDestroy(() => {
      unsubscribe();
    });

    onMount(async () => {
      await fetchFavoriteCount();
    });

    async function fetchFavoriteCount() {
      try {
        const response = await fetch(`${$BASE_URL}/books/${book.id}/favorites`, {
          method: 'GET',
          credentials: "include"
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        numberOfReviews = data.count;
        console.log(numberOfReviews);
      } catch (error) {
        console.error('Failed to fetch favorite count:', error);
      }
    }

    let hasFetched = false;
    $: if (userId && !hasFetched) {
      hasFetched = true;
      fetchFavorite();
    }

    async function fetchFavorite() {
      try {
        const response = await fetch(`${$BASE_URL}/users/${userId}/favorites/${book.id}`, {
          method: 'GET',
          credentials: "include"
        });

        console.log(response);

        if (response.ok) {
          isFavorite = true;
        } else if (response.status === 404) {
          isFavorite = false;
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error('Failed to check if the book is favorited:', error);
      }
    }

    async function toggleFavorite() {
      if (!isFavorite) {
        console.log("book11:" + JSON.stringify(book, null, 3));
        // Add to favorites
        try {
          const response = await fetch(`${$BASE_URL}/users/${userId}/favorites`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(book),
            credentials: "include"
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const message = await response.json();
          console.log(message);

          // If the request was successful, update the UI
          isFavorite = true;
        } catch (error) {
          console.error('Failed to favorite the book:', error);
        }
      } else {
        // Unfavorite a book
        try {
          const response = await fetch(`${$BASE_URL}/users/${userId}/favorites/${book.id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: "include"
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const message = await response.json();
          console.log(message);

          // If the request was successful, update the UI
          isFavorite = false;
        } catch (error) {
          console.error('Failed to unfavorite the book:', error);
        }
      }
      await fetchFavoriteCount();
    }
</script>



<div class=wrapper>
  {#if numberOfReviews > 1}
    <div class=aligner>
      <p>{numberOfReviews} users have reviewed this title</p>
    </div>
  {:else if numberOfReviews > 0}
    <div class=aligner>
      <p>1 user has reviewed this title</p>
    </div>
  {:else}
    <div class=aligner>
      <p>Be the first to review this title!</p>
    </div>
  {/if}

  {#if isFavorite}
    <div class=aligner>
      <p class="p-1">Delete your review:</p>
      <HeaderGlobalAction class="icon" on:click={toggleFavorite} icon={Delete} />
    </div>
    {:else}
    <div class=aligner>
      <p class="p-2">Add a review:</p>
      <HeaderGlobalAction class="icon" on:click={toggleFavorite} icon={StarReview} />
    </div>
  {/if}
</div>



<style>
    :global(.icon.bx--header__action) {
      margin-top: 20px;
    }

    :global(.icon.bx--header__action svg) {
      height: 32px;
      width: 32px;
    }
    
    .wrapper {
        margin: 0 5px;
    }

   .aligner {
        display: flex;
        justify-content: start;
        align-items: center;
        margin-top: 5px;
    }

    h6 {
        padding-right: 5px;
    }

    p {
        font-size: 25px;
        margin-top: 20px;
    }

    .p-1, .p-2 {
        font-size: 18px;
        padding-right: 10px;
    }

</style>
