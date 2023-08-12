<script>
  import Main from '../../components/General/Main.svelte';
  import { user } from '../../stores/user';

  const username = $user.user.username;
  console.log('got to home!');
</script>

<Main>
  <h1>Welcome {username}</h1>
  <h3>To your community</h3>
</Main>
