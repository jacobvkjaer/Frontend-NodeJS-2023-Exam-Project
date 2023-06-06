<script>
  import "carbon-components-svelte/css/all.css";
  import {Theme, Grid, Row, Column} from "carbon-components-svelte";
  import "carbon-icons-svelte";
  import "carbon-pictograms-svelte";

  import { onMount } from 'svelte';
  import { user } from './stores/user.js';
  import { Router } from "svelte-navigator";
  import AppRouter from "./components/AppRouter/AppRouter.svelte";
  import Navbar from "./components/Navbar/Navbar.svelte";
  
  let userInfo;

  onMount(() => {
  // Retrieve the logged-in user from localStorage
  const loggedInUser = localStorage.getItem('user');
  
  if (loggedInUser) {
    user.set(JSON.parse(loggedInUser));
  }
});

</script>

<Theme
  theme="g90"
  tokens={{
    "interactive-01": "#004363",
    "hover-primary": "#006ea2",
    "active-primary": "#004e73"
  }}
>

  <Router>
    <Navbar />
    <AppRouter />
  </Router>

</Theme>
