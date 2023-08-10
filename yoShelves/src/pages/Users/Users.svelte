<script>
  import { onMount } from 'svelte';
  import { apiRequest } from '../../utils/fetching/fetching.js';
  import { Row, Column } from 'carbon-components-svelte';

  import Grid from '../../components/Grid/GridContainer.svelte';
  import Header from '../../components/Users/Header.svelte';
  import RowAndColumn from '../../components/Grid/RowAndColumnContainer.svelte';
  import Loading from '../../components/Loading/Loading.svelte';
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

<div class="container">
  <Grid>
    <RowAndColumn classColumn={'header-column'}>
      <Header header={'Users'} />
    </RowAndColumn>
    {#if isLoading}
      <RowAndColumn classColumn={'header-column'} classDiv={'p-text'}>
        <Loading />
      </RowAndColumn>
    {:else if users && users.length > 0}
      <Row noGutter>
        {#each users as user (user.id)}
          <Column sm={6} md={4} lg={5} xlg={4} max={3}>
            <UserCard {user} />
          </Column>
        {/each}
      </Row>
    {:else}
      <RowAndColumn classColumn={'header-column'} classDiv={'p-text'}>
        <p>No users yet? That can't be right.</p>
      </RowAndColumn>
    {/if}
  </Grid>
</div>
