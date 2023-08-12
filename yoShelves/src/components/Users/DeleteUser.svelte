<script>
  import { onMount } from 'svelte';
  import { apiRequest } from '../../utils/fetching/fetching.js';
  import { TrashCan, UserFavorite } from 'carbon-icons-svelte';
  import { HeaderGlobalAction } from 'carbon-components-svelte';

  export let user;

  let userId = user?.id;
  let isDeleted;

  onMount(async () => {
    await fetchUser();
  });

  async function fetchUser() {
    const endpoint = `/admin/users/${userId}`;

    try {
      console.log('Beginning of try in fetchUser');
      const response = await apiRequest({
        endpoint,
        useToastr: true,
      });

      console.log('This is the message of fetchUser');
      console.log(response.message);
      isDeleted = false;
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteUser() {
    if (!isDeleted) {
      console.log('Entered the deleteUser - if');
      const endpoint = `/admin/users/${userId}`;

      try {
        console.log('Beginning of try in deleteUser');
        const response = await apiRequest({
          method: 'DELETE',
          endpoint,
          useToastr: true,
        });

        console.log('This is the message of deleteUser');
        console.log(response.message);
        console.log(response.user);
        isDeleted = true;
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log('Entered the deleteUser - else');
      await fetchUser();
      return;
    }
    fetchUser();
  }
</script>

<div class="wrapper">
  {#if !isDeleted}
    <div class="aligner">
      <p>Irreversible action</p>
    </div>
    <div class="aligner">
      <HeaderGlobalAction class="icon" on:click={deleteUser} icon={TrashCan} />
      <p class="p-1">&nbsp;:&ensp;Delete user</p>
    </div>
  {:else}
    <div class="aligner">
      <p>User has been permanently deleted</p>
    </div>
    <div class="aligner">
      <HeaderGlobalAction class="icon" icon={UserFavorite} />
      <p class="p-2">&nbsp;:&ensp;User deleted</p>
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
