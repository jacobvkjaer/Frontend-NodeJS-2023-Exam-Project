<script>
  import "carbon-components-svelte/css/all.css";
  import { Theme } from "carbon-components-svelte";
  import "carbon-icons-svelte";
  import "carbon-pictograms-svelte";

  import { onMount, onDestroy } from 'svelte';
  import { user } from './stores/user.js';
  import { BASE_URL } from './stores/urls.js';
  import { Router } from "svelte-navigator";
  import AppRouter from "./components/AppRouter/AppRouter.svelte";
  import Navbar from "./components/Navbar/Navbar.svelte";
  

  onMount(async () => {
    const authCheckURL = `${$BASE_URL}/auth/status`;
    const response = await fetch(authCheckURL, { 
      credentials: "include"  // This is necessary to include the session cookie in the request
    });

    if (response.ok) {
      const data = await response.json();
      user.set(data.user);  // If the user is logged in, this will update the user store with their information
    } else {
      user.set(null);  // If the user is not logged in, this will clear the user store
    }

    // Subscribe to the user state and log it whenever it changes
    user.subscribe(state => {
      console.log(state);
    });
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
