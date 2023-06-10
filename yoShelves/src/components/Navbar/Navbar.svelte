<script>
  import { get } from "svelte/store";
  import { BASE_URL } from "../../stores/urls.js";
  import { user } from "../../stores/user.js";
  import { Link, useLocation, navigate } from "svelte-navigator";
  import Signout from "../Signout/Signout.svelte";
  import { onMount, onDestroy } from 'svelte';
  import {
    Header,
    HeaderUtilities,
    HeaderAction,
    HeaderGlobalAction,
    HeaderPanelLinks,
    HeaderPanelDivider,
    HeaderPanelLink,
    HeaderSearch
  } from "carbon-components-svelte";
  import {
    Login,
    Undo,
    Review,
    Favorite,
    UserAvatarFilledAlt,
    Home,
    CharacterSentenceCase
  } from "carbon-icons-svelte";

  let isSideNavOpen = true;
  let isOpen = false;
  let expanded = false;
  
  let location = useLocation();
  let targetRoute;
  let icon;

  let email;
  let unsubscribe;

  let isAuthenticated;

  onMount(() => {
    unsubscribe = user.subscribe(value => {
      isAuthenticated = value.isAuthenticated;
    });
  });


  onDestroy(() => {
    unsubscribe();
  });

  async function handleInput(event) {
    const query = event.target.value;
    if (query.length < 3) {
      results = [];
      return;
    }

    console.log(query);
    const baseUrl = get(BASE_URL);
    const bookURL = `${baseUrl}/books/search/title-or-author/${encodeURIComponent(query)}`;
    console.log(bookURL);

    try {
      const response = await fetch(bookURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const books = await response.json();
      results = books.map(book => ({
        href: `/books/title/${encodeURIComponent(book.title)}`,
        text: book.title,
        description: book.author
      }));

      console.log(results);
      console.log(results.href);
    }
    catch (e) {
      console.log(e);
    }
  }

  

  $: {
    if ($location.pathname === '/signin') {
      targetRoute = '/';
      icon = Undo;
    } else {
      targetRoute = '/signin';
      icon = Login;
    }
  }

  const data = [
    // Insert your data here...
  ];

  let ref = null;
  let active = false;
  let value = "";
  let selectedResultIndex = 0;
  let events = [];

  $: lowerCaseValue = value.toLowerCase();
  $: results =
    value.length > 0
      ? data.filter((item) => {
          return (
            item.text.toLowerCase().includes(lowerCaseValue) ||
            item.description.includes(lowerCaseValue)
          );
        })
      : [];
</script>


<header class="navbar">
  <Header company="Exam" platformName="YoShelves" bind:isSideNavOpen>

    {#if isAuthenticated}

    <HeaderUtilities>
      <HeaderSearch
        bind:ref
        bind:active
        bind:value
        bind:selectedResultIndex
        placeholder="Search by title or author"
        {results}
        on:input={handleInput}
        on:active={() => {
          events = [...events, { type: "active" }];
        }}
        on:inactive={() => {
          events = [...events, { type: "inactive" }];
        }}
        on:clear={() => {
          events = [...events, { type: "clear" }];
        }}
        on:select={(e) => {
          events = [...events, { type: "select", ...e.detail }];
          console.log(e.detail.selectedResult);
          if (e.detail.selectedResult) {
            console.log("base: " + e.detail.selectedResult);
            console.log("base + href: " + e.detail.selectedResult.href);
            navigate(e.detail.selectedResult.href);
          }
        }}
      />
      <Link to="/books1/title1/dragon">
        <div class:selected={$location.pathname === '/books1/title1/dragon' && !isOpen}>
          <HeaderGlobalAction aria-label="books1/title1/dragon" icon={CharacterSentenceCase} />
        </div>
      </Link>
      <Link to="/favorites">
        <div class:selected={$location.pathname === '/favorites' && !isOpen}>
          <HeaderGlobalAction aria-label="Favorites" icon={Favorite} />
        </div>
      </Link>
      <Link to="/reviews">
        <div class:selected={$location.pathname === '/reviews' && !isOpen}>
          <HeaderGlobalAction aria-label="Reviews" icon={Review} />
        </div>
      </Link>
      <Link to="/home">
        <div class:selected={$location.pathname === '/home' && !isOpen}>
          <HeaderGlobalAction aria-label="Home" icon={Home} />
        </div>
      </Link>
      <div class:selected={isOpen}>
        <HeaderAction
          bind:isOpen={isOpen}
          icon={UserAvatarFilledAlt}
          closeIcon={UserAvatarFilledAlt}>
          <HeaderPanelLinks>
            <HeaderPanelDivider>Switcher subject 1</HeaderPanelDivider>
            <HeaderPanelLink>Switcher item 1</HeaderPanelLink>
            <HeaderPanelDivider>Account</HeaderPanelDivider>
            <Signout/>
          </HeaderPanelLinks>
        </HeaderAction>
      </div>
    </HeaderUtilities>

    {:else}

    <HeaderUtilities>
      <Link to={targetRoute}>
        <HeaderGlobalAction icon={icon} />
      </Link>
    </HeaderUtilities>

    {/if}

  </Header>
</header>


<style>

  /* Navbar */
 :global(.s-hvm9nvLZEY8k .bx--header, .svelte-13u0dam .bx--header__action) {
    background-color: #523A28;
  }

  :global(.s-hvm9nvLZEY8k .bx--header__action:hover, .svelte-13u0dam .bx--header__action.disabled) {
    background-color: #C46200;
  }
  
  :global(.s-hvm9nvLZEY8k .bx--header__action:active) {
    background-color: #964B00;
  }

  :global(.bx--header__action:focus) {
    border: none; /* Removes border */
  }

  :global([role="search"].active.svelte-13u0dam.svelte-13u0dam) {
    outline: none !important;
  }

  :global(input.svelte-13u0dam.svelte-13u0dam) {
    padding-left: 10px !important;
  }

  :global(.selected.svelte-13u0dam.svelte-13u0dam, [role="menuitem"].svelte-13u0dam.svelte-13u0dam:hover) {
    background-color: #C46200 !important;
  }


  .navbar {
    height: 47px;
  }


  /* Aside */
  :global(.bx--header-panel, ul.svelte-13u0dam.svelte-13u0dam) {
    background-color: #614530 !important;
  }

  :global(.bx--header-panel .bx--switcher__item-link:hover) {
    background-color: #C46200;
  }

  :global(.bx--header-panel .bx--switcher__item-link:active) {
    background-color: #964B00;
  }
  





  .selected {
    background-color: #C46200; /* color for selected item */
  }
</style>