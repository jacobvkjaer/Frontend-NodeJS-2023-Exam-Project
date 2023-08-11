<script>
  export let user;

  function truncate(str, length) {
    if (str.length <= length) {
      return str;
    }
    return str.substring(0, length);
  }
</script>

<div class="wrapper">
  {#if user.id}
    <div class="aligner">
      <h6>Id:</h6>
      <p title={user.id}>{user.id}</p>
    </div>
  {/if}
  {#if user.role}
    <div class="aligner">
      <h6>Role:</h6>
      <p title={user.role}>{user.role}</p>
    </div>
  {/if}
  {#if user.username}
    <div class="aligner">
      <h6>Username:</h6>
      <p title={user.username}>{truncate(user.username, 30)}</p>
    </div>
  {/if}
  {#if user.email}
    <div class="aligner">
      <h6>Email:</h6>
      <p title={user.email}>{truncate(user.email, 30)}</p>
    </div>
  {/if}
  {#if user.created_at}
    <div class="aligner">
      <h6>Created at:</h6>
      <p>{truncate(user.created_at, 19)}</p>
    </div>
  {/if}
  <!-- {user.created_at} -->
  {#if user.updated_at}
    <div class="aligner">
      <h6>Updated at:</h6>
      <p>{truncate(user.updated_at, 19)}</p>
    </div>
  {/if}
</div>

<style>
  .aligner {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
  }

  h6 {
    padding-right: 5px;
  }

  p {
    font-size: 14px;
  }
</style>
