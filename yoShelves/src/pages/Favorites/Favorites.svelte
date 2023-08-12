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

    // const bookURL = `${$BASE_URL}/users/1/favorites`;

    // try {
    //   const response = await fetch(bookURL, {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     credentials: 'include',
    //   });

    //   if (!response.ok) {
    //     const errorText = await response.text();
    //     throw new Error(
    //       `HTTP error! status: ${response.status}, message: ${errorText}`
    //     );
    //   }

    //   const responseData = await response.json();
    //   console.log('Received data: ', responseData);
    //   favorites = responseData;
    //   isLoading = false;
    // } catch (e) {
    //   console.log(e);
    // }
  }

  onMount(() => {
    if (userId) fetchFavorites();
  });
</script>

<!-- Newly added -->
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

<!-- <div>
  <p bind:this={target}>Right click this element</p>
</div> -->

<!-- Recently out-commented -->
<!-- <div class="container">
  <Grid fullWidth>
    <Row noGutter>
      <Column class="header-column" sm={4} md={4} lg={16} xlg={16} max={16}>
        <h1>Favorites</h1>
      </Column>
    </Row>
    {#if isLoading}
      <Row noGutter>
        <Column sm={4} md={4} lg={16} xlg={16} max={16}>
          <div class="p-text">
            <p>Loading...</p>
          </div>
        </Column>
      </Row>
    {:else if favorites && favorites.length > 0}
      <Row noGutter>
        {#each favorites as favorite (favorite.favorited_book.id)}
          <Column sm={4} md={4} lg={4} xlg={4} max={4}>
            <div class="book-card">
              <ImageLoader
                class="book-image"
                src={favorite.favorited_book.image}
              />
              <div class="book-info">
                <h2 class="book-title">{favorite.favorited_book.title}</h2>
                <div class="book-rating">
                  <h2 class="book-title">{favorite.favorited_book.title}</h2>
                </div>
              </div>
            </div>
          </Column>
        {/each}
      </Row>
    {:else}
      <Row noGutter>
        <Column sm={4} md={4} lg={16} xlg={16} max={16}>
          <div class="p-text">
            <p>No favorites yet.</p>
          </div>
        </Column>
      </Row>
    {/if}
  </Grid>
</div> -->

<!-- Formerly out-commented -->
<!-- <style>
  
.container {
  align-items: center;
  margin: 0 auto;
  width: 100%;
  padding: 2em 1em;
  color: #f4f4f4;
}

h1 {
  text-align: center;
  margin: 0 0 0.7em 0; 
  color: #cdd1d4;
  font-size: 4em;
}

:global(
  .header-column.bx--col-sm-1.bx--col-md-4.bx--col-lg-8.bx--col-xlg-14.bx--col-max-16
  ) {
  border-bottom: 1px solid #523A28;
  
}

:global(
  .image-column.bx--col-sm-1.bx--col-md-1.bx--col-lg-2.bx--col-xlg-2.bx--col-max-2,
  .title-column.bx--col-sm-4.bx--col-md-4.bx--col-lg-10.bx--col-xlg-10.bx--col-max-10
  ) {
  padding-bottom: 20px;
  padding-top: 20px;
  align-items: start;
  border-bottom: 1px solid #523A28;
}

:global(
  .image-column.bx--col-sm-1.bx--col-md-1.bx--col-lg-2.bx--col-xlg-2.bx--col-max-2
  ) {
  padding-right: 20px;
  border-right: 1px solid #523A28;
}

:global(
  .title-column.bx--col-sm-4.bx--col-md-4.bx--col-lg-10.bx--col-xlg-10.bx--col-max-10
  ) {
  padding-left: 20px;
  padding-right: 20px;
  border-right: 1px solid #523A28;
}

:global(
  .buffer-column.bx--col-sm-2.bx--col-md-2.bx--col-lg-4.bx--col-xlg-4.bx--col-max-4
  ) {
  padding-left: 20px;
  padding-right: 20px;
  border-bottom: 1px solid #523A28;
}

.book-title, .book-description {
  overflow-wrap: break-word;
  word-wrap: break-word;
}

.image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: auto;
}

.book-title {
  margin: 0 0 1em 0;
  padding: 0 0 20px 20px;
  font-size: 2em;
}

.p-text {
  text-align: center;
  margin: 1em 0 1.2em 0; 
  color: #cdd1d4;
}
</style> -->

<!-- <div class="container">
  <Grid fullWidth>
    <Row noGutter>
      <Column class="header-column" sm={1} md={4} lg={8} xlg={14} max={16}>
        <h1>Favorites</h1>
      </Column>
    </Row>
  {#if isLoading}
      <Row noGutter>
        <Column sm={1} md={1} lg={1} xlg={16} max={16}>
          <div class="p-text">
            <p>Loading...</p>
          </div>
        </Column>
      </Row>
  {:else if favorites && favorites.length > 0}
    {#each favorites as favorite (favorite.favorited_book.id)}
        <Row noGutter>
              <Column class="image-column" sm={1} md={1} lg={2} xlg={2} max={2}>
                <div class="image-container">
                  <ImageLoader src={favorite.favorited_book.image}/>
                </div>
              </Column>
              <Column class="title-column" sm={4} md={4} lg={10} xlg={10} max={10}>
                <div class="book-title">
                  <Row class="title-row">
                    <Column class="title-row-column-1" sm={1} md={4} lg={4} xlg={4} max={7}><h2>{favorite.favorited_book.title}</h2></Column>
                    <Column class="title-row-column-2" sm={1} md={2} lg={2} xlg={2}  max={4}><h2>||</h2></Column>
                    <Column class="title-row-column-3" sm={1} md={4} lg={4} xlg={4} max={5}><h2>{favorite.favorited_book.author}</h2></Column>
                  </Row>
                </div>
                <div class="book-description">
                  <p class="book-content">{favorite.favorited_book.description}</p>
                </div>
              </Column>
              <Column class="buffer-column" sm={2} md={2} lg={4} xlg={4} max={4}></Column>
        </Row>
    {/each}
  {:else}
      <Row noGutter>
        <Column sm={1} md={1} lg={1} xlg={16} max={16}>
          <div class="p-text">
            <p>No favorites yet.</p>
          </div>
        </Column>
      </Row>
  {/if}
    </Grid>
</div> -->

<!-- Recently out-commented -->
<!-- <style>
  .book-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    margin: auto;
    max-width: 200px;
  }

  .book-image {
    width: 100%;
    height: auto;
  }

  .book-info {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .book-title {
    text-align: center;
    margin-top: 10px;
  }

  .book-rating {
    /* style the rating */
  }
</style> -->
