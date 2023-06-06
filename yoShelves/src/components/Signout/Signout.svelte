<script>
  import { BASE_URL } from "../../stores/urls.js";
  import { user } from "../../stores/user.js";
  import toastr, { toastrSetup } from "../../utils/toaster/toastr.js";

  import { HeaderGlobalAction, HeaderActionLink, HeaderPanelLink } from "carbon-components-svelte";
  import { Logout } from "carbon-icons-svelte";

  toastrSetup();



   async function handleSignout() {
    const signoutURL = $BASE_URL + "/auth/signout";
    console.log(signoutURL);

    try {
      const response = await fetch(signoutURL, {
        credentials: "include"
      });

      const data = await response.json();

      if (data.message) {
        user.clearUser(); // Clear the user data
        toastr.info("You've signed out successfully.");
      } else {
        toastr.error("Failed to log out. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      toastr.error("An error occurred during sign out.");
    }
  }


</script>
<HeaderPanelLink>
  <div class="inline" on:click={handleSignout} aria-label="Signout">
    <div>
      Signout
    </div>
    <div class="icon">
      <Logout size={16}/>
    </div>
  </div>
</HeaderPanelLink>

<style>
  .inline {
    display: flex;
    flex-direction: row;
    align-items: left;
    justify-content: space-between;
  }

  .icon {
    margin-right: 0.5rem;
  }
</style>