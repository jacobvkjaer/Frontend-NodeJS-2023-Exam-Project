<script>
  import { onMount } from 'svelte';
  import { apiRequest } from '../../utils/fetching/fetching.js';
  import { user } from '../../stores/user.js';
  import { Grid, Row, Column } from 'carbon-components-svelte';

  import BufferColumn from '../../components/Grid/BufferColumn.svelte';
  import Loading from '../../components/Loading/Loading.svelte';

  import Container from '../../components/General/Container.svelte';
  import Header from '../../components/General/Header.svelte';
  import RowCol from '../../components/General/RowAndColumnContainer.svelte';
  import FavoriteCard from '../../components/Favorites/FavoriteCard.svelte';

  let userId = $user?.user.id;
  let isAdmin = $user?.user.role === 'admin';
  let favorites = null;
  let isLoading = true;

  async function fetchFavorites() {
    console.log(`entered fetchBook`);
    const endpoint = isAdmin
      ? `/admin/books/favorites`
      : `/users/${userId}/favorites`;
    try {
      console.log(`entered fetchBook - try`);
      console.log(endpoint);
      const data = await apiRequest({
        endpoint,
        useToastr: true,
      });

      favorites = data.favorites;
      console.log(favorites);
      isLoading = false;
    } catch (e) {
      console.log(e);
    }
  }

  onMount(() => {
    if (userId) fetchFavorites();
  });
</script>

<Container>
  <Grid fullWidth>
    <Row>
      <BufferColumn />
      <Column class="content-column" sm={16} md={16} lg={16} xlg={14} max={12}>
        <Header classColumn={'header-column'} header={'Favorites'} />
        {#if isLoading}
          <RowCol classColumn={'header-column'}>
            <Loading />
          </RowCol>
        {:else if favorites && favorites.length > 0}
          <Row>
            {#each favorites as favorite (favorite.favorited_book.id)}
              <Column sm={6} md={4} lg={5} xlg={4} max={3}>
                <FavoriteCard {favorite} />
              </Column>
            {/each}
          </Row>
        {:else}
          <Header
            classColumn={'header-column'}
            header={'No favorites yet? Go and read some books!'}
          />
        {/if}
      </Column>
      <BufferColumn />
    </Row>
  </Grid>
</Container>
