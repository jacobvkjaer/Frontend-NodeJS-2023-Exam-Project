<script>
  import { onMount } from 'svelte';
  import { apiRequest } from '../../utils/fetching/fetching';
  import { Row, Column } from 'carbon-components-svelte';
  import UserRow from '../Users/UserRow.svelte';
  import RowCol from '../General/RowAndColumnContainer.svelte';
  import Header from '../General/Header.svelte';

  export let book;
  export let isAdmin;
  let users = [];

  console.log('Got to BookFansSection.svelte!');

  // // GET /users/:id/favorites/:bookId
  async function fetchFans() {
    console.log('Got to BookFansSection.svelte!');
    const endpoint = `/admin/books/${book.id}/fans`;

    try {
      const data = await apiRequest({
        endpoint,
      });

      users = data;
      console.log(users);
      console.log(users[0].id);
    } catch (e) {
      console.log(e);
    }
  }
  onMount(fetchFans);
</script>

<Column class="title-column" sm={8} md={8} lg={8} xlg={8} max={10}>
  <RowCol>
    <h2>Favorited users</h2>
  </RowCol>
  {#if users}
    <div class="title-container">
      <Row class="title-row-1">
        <Column sm={4} md={4} lg={4} xlg={4} max={3}>
          <div class="aligner">
            <h4>Id</h4>
          </div>
        </Column>
        <Column sm={4} md={4} lg={4} xlg={4} max={3}>
          <div class="aligner">
            <h4>Username</h4>
          </div>
        </Column>
        <Column sm={4} md={4} lg={4} xlg={4} max={3}>
          <div class="aligner">
            <h4>Email</h4>
          </div>
        </Column>
      </Row>
    </div>
    {#each users as user (user.id)}
      <div class="title-container">
        <Row class="title-row-1">
          <UserRow id={user.id} username={user.username} email={user.email} />
        </Row>
      </div>
    {/each}
  {/if}
</Column>

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
    padding-left: 10%;
  }

  h2 {
    display: flex;
    justify-content: center;
    padding: 15px;
  }
</style>
