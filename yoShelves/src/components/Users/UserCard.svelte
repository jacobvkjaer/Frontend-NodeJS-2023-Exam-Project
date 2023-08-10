<script>
  import { Link } from 'svelte-navigator';
  import { ImageLoader } from 'carbon-components-svelte';
  import userIcon from '../../assets/icons/user.svg';

  export let user;
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
  /* Global styles */
  :global(a:-webkit-any-link.link-id) {
    width: 100%;
    height: 100%;
  }

  /* Rest of styles */
  .card-container {
    margin: auto;
    padding-bottom: 40px;
  }

  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    width: 220px;
    height: 320px;
    background: rgba(82, 58, 40, 0.6);
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }

  .card:hover {
    transform: translateY(-5px); /* Hover effect - card slightly moves up */
    background: rgba(196, 98, 0, 0.4);
  }

  .image-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    gap: 15px;
    padding-top: 25px;
  }

  .image {
    width: 120px;
  }

  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    width: 95%;
  }

  .title {
    text-align: center;
    overflow: hidden;
  }
</style>
