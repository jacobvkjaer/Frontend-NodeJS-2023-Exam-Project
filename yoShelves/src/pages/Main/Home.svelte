<script>
  import Main from '../../components/General/Main.svelte';
  import { user } from '../../stores/user';

  const username = $user.user.username;

  import { onMount } from 'svelte';
  import io from 'socket.io-client';

  let socket;
  let bgColor = 'white';

  onMount(() => {
    socket = io('http://localhost:8080');

    socket.on('newColor', color => {
      bgColor = color;
    });
  });

  function changeColor() {
    const newColor = randomColor();
    socket.emit('changeColor', newColor);
  }

  function randomColor() {
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
</script>

<Main>
  <h1>Welcome {username}</h1>
  <h3>To your community</h3>

  <div id="colorBox" class="color-box {bgColor}" />
  <button on:click={changeColor}>Change Color</button>
</Main>

<style>
  .color-box {
    height: 200px;
    width: 200px;
    transition: background-color 0.3s ease;
  }

  .red {
    background-color: red;
  }
  .blue {
    background-color: blue;
  }
  .green {
    background-color: green;
  }
  .yellow {
    background-color: yellow;
  }
  .purple {
    background-color: purple;
  }
  .orange {
    background-color: orange;
  }

  button {
    margin-top: 20px;
    padding: 10px 20px;
    border: none;
    background-color: #333;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    font-size: 1rem;
  }

  button:hover {
    background-color: #555;
  }
</style>
