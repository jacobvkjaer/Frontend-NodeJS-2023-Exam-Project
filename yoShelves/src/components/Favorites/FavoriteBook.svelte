<script>
  import { onMount } from 'svelte';
  import { apiRequest } from '../../utils/fetching/fetching.js';
  import { user } from '../../stores/user.js';
  import { Favorite, FavoriteFilled } from 'carbon-icons-svelte';
  import { HeaderGlobalAction } from 'carbon-components-svelte';

  export let book;

  let userId = $user?.user.id;
  let isFavorite = true;
  let numberOfFavorites;

  // // Subscribe to user store and update userId
  // const unsubscribe = user.subscribe(async $user => {
  //   userId = $user?.user?.id;
  //   console.log(userId);
  // });

  onMount(async () => {
    await fetchFavoriteCount();
  });

  async function fetchFavoriteCount() {
    const endpoint = `/books/${book.id}/favorites`;

    try {
      const data = await apiRequest({
        endpoint,
      });
      numberOfFavorites = data.count;
      console.log(numberOfFavorites);
      console.log(data.message);
    } catch (e) {
      console.log(e);
    }
  }

  let hasFetched = false;
  $: if (userId && !hasFetched) {
    console.log('Got to fetch');
    hasFetched = true;
    fetchFavorite();
  }

  async function fetchFavorite() {
    console.log('Entered fetch function');
    const endpoint = `/users/${userId}/favorites/${book.id}`;

    try {
      const response = await apiRequest({
        endpoint,
      });
      console.log(`logging: fetchFavorite`);
      if (response.status === 404) {
        console.log('got to 404');
        isFavorite = false;
      }
      console.log(response);
      console.log(response.message);
      isFavorite = true;
    } catch (e) {
      isFavorite = false;
      console.log(e);
    }
  }

  async function toggleFavorite() {
    if (!isFavorite) {
      console.log('Entered the toggleFavorite - if');
      const endpoint = `/users/${userId}/favorites`;

      // Add to favorites
      try {
        console.log('Beginning of try in toggle - if');
        const response = await apiRequest({
          method: 'POST',
          endpoint,
          body: book,
          useToastr: true,
        });

        console.log('This is the message of toggleFavorite');
        console.log(response.message);
        isFavorite = true;
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log('Entered the toggleFavorite - else');
      // Delete from favorites
      const endpoint = `/users/${userId}/favorites/${book.id}`;

      try {
        const response = await apiRequest({
          method: 'DELETE',
          endpoint,
          useToastr: true,
        });

        console.log(response.message);
        isFavorite = false;
      } catch (e) {
        console.log(e);
      }
    }
    await fetchFavoriteCount();
  }
</script>

<div class="wrapper">
  {#if numberOfFavorites > 1}
    <div class="aligner">
      <p>{numberOfFavorites} users have favorited this title</p>
    </div>
  {:else if numberOfFavorites > 0}
    <div class="aligner">
      <p>1 user has favorited this title</p>
    </div>
  {:else}
    <div class="aligner">
      <p>Be the first to favorite this title!</p>
    </div>
  {/if}

  {#if isFavorite}
    <div class="aligner">
      <HeaderGlobalAction
        class="icon"
        on:click={toggleFavorite}
        icon={FavoriteFilled}
      />
      <p class="p-1">&nbsp;:&ensp;Remove from favorites</p>
    </div>
  {:else}
    <div class="aligner">
      <HeaderGlobalAction
        class="icon"
        on:click={toggleFavorite}
        icon={Favorite}
      />
      <p class="p-2">&nbsp;:&ensp;Add to favorites</p>
    </div>
  {/if}
</div>

<style>
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

  .p-1,
  .p-2 {
    font-size: 18px;
  }
</style>
