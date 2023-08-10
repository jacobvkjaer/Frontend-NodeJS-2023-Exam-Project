<script>
  import { Link } from 'svelte-navigator';
  import { ImageLoader } from 'carbon-components-svelte';

  export let user;
  import userIcon from '../../assets/icons/user.svg';
</script>

<div class="card-container">
  <div class="card">
    <Link to={`${user.id}`} class="link-id">
      <div class="image-container">
        <div class="image">
          <ImageLoader src={userIcon} alt="image" />
        </div>

        <div class="info">
          <h3 class="title">{user.username}</h3>
          <h4 class="title">({user.role})</h4>
          <h6 class="title">{user.email}</h6>
        </div>
      </div>
    </Link>
  </div>
</div>

<style>
  @import '../../assets/css/cards.css';
</style>
