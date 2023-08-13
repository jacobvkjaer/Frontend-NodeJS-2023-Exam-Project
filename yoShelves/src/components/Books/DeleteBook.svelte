<script>
  import { user } from './../../stores/user.js';
  import { apiRequest } from '../../utils/fetching/fetching.js';
  import { TrashCan, Checkmark } from 'carbon-icons-svelte';
  import { HeaderGlobalAction } from 'carbon-components-svelte';

  export let book;

  let userId = $user?.user.id;
  let isAdmin = $user?.user.role === 'admin';
  let isDeleted = true;

  $: if (book && book.id) {
    fetchBook();
  }

  async function fetchBook() {
    console.log('Entered the fetchBook');
    const endpoint = `/admin/books/${book.id}`;

    try {
      console.log('Beginning of try in fetchBook');
      const response = await apiRequest({
        endpoint,
      });

      console.log('This is the message of fetchBook');
      console.log(response.message);
      console.log(response.user);
      isDeleted = false;
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteUser() {
    console.log('Entered the deleteBook');
    const endpoint = `/admin/books/${book.id}`;

    try {
      console.log('Beginning of try in deleteBook');
      const response = await apiRequest({
        method: 'DELETE',
        endpoint,
        useToastr: true,
      });

      console.log('This is the message of deleteBook');
      console.log(response.message);
      console.log(response.user);
      isDeleted = true;
    } catch (e) {
      console.log(e);
    }
  }
</script>

<div class="wrapper">
  {#if !isDeleted}
    <div class="aligner">
      <p>Irreversible action</p>
    </div>
    <div class="aligner">
      <HeaderGlobalAction class="icon" on:click={deleteUser} icon={TrashCan} />
      <p class="p-1">&nbsp;:&ensp;Delete book</p>
    </div>
  {:else}
    <div class="aligner">
      <p>Book has been permanently deleted</p>
    </div>
    <div class="aligner">
      <HeaderGlobalAction class="icon" icon={Checkmark} />
      <p class="p-2">&nbsp;:&ensp;Book deleted</p>
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
    color: rgb(179, 10, 10);
  }

  .p-1,
  .p-2 {
    font-size: 18px;
    color: white;
  }
</style>
