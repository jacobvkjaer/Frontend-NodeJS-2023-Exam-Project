<script>
  import { apiRequest } from '../../utils/fetching/fetching.js';
  import { user } from '../../stores/user.js';
  import { Favorite, FavoriteFilled } from 'carbon-icons-svelte';
  import { HeaderGlobalAction } from 'carbon-components-svelte';

  export let book;

  let userId = $user?.user.id;
  let isAdmin = $user?.user.role === 'admin';
  let isFavorite = true;
  let numberOfFavorites;

  $: if (book && book.id) {
    fetchFavoriteCount();
    if (userId && !isAdmin) {
      fetchFavorite();
    }
  }

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

  async function fetchFavorite() {
    console.log('Entered fetch function');
    const endpoint = `/users/${userId}/favorites/${book.id}`;

    try {
      const data = await apiRequest({
        endpoint,
      });
      console.log(`logging: fetchFavorite`);
      if (data.status === 404) {
        console.log('got to 404');
        isFavorite = false;
      }
      console.log(data);
      console.log(data.message);
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
  {#if numberOfFavorites > 1 || (isAdmin && numberOfFavorites === 0)}
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

  {#if !isAdmin}
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
        <p class="p-1">&nbsp;:&ensp;Add to favorites</p>
      </div>
    {/if}
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

  .p-1 {
    font-size: 17px;
  }
</style>
