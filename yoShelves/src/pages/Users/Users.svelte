<script>
  import { onMount } from 'svelte';
  import { apiRequest } from '../../utils/fetching/fetching.js';
  import { Grid, Row, Column } from 'carbon-components-svelte';

  import BufferColumn from '../../components/Grid/BufferColumn.svelte';
  import Loading from '../../components/Loading/Loading.svelte';

  import Container from '../../components/General/Container.svelte';
  import Header from '../../components/General/Header.svelte';
  import RowAndColumn from '../../components/Grid/RowAndColumnContainer.svelte';
  import RowCol from '../../components/General/RowAndColumnContainer.svelte';
  import BookCard from '../../components/Books/BookCard.svelte';

  import UserCard from '../../components/Users/UserCard.svelte';

  let users = null;
  let isLoading = true;

  async function fetchUsers() {
    try {
      const data = await apiRequest({
        endpoint: '/admin/users',
      });
      users = data.users;
      isLoading = false;
    } catch (e) {
      console.log(e);
    }
  }

  onMount(fetchUsers);
</script>

<Container>
  <Grid fullWidth>
    <Row>
      <BufferColumn />
      <Column class="content-column" sm={16} md={16} lg={16} xlg={14} max={12}>
        <Header classColumn={'header-column'} header={'Users'} />
        {#if isLoading}
          <RowCol classColumn={'header-column'}>
            <Loading />
          </RowCol>
        {:else if users && users.length > 0}
          <Row>
            {#each users as user (user.id)}
              <Column sm={6} md={4} lg={5} xlg={4} max={3}>
                <UserCard {user} />
              </Column>
            {/each}
          </Row>
        {:else}
          <RowCol classColumn={'header-column'}>
            <p>No users yet? That can't be right.</p>
          </RowCol>
        {/if}
      </Column>
      <BufferColumn />
    </Row>
  </Grid>
</Container>
