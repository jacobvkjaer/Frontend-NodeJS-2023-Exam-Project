<script>
  import { onMount } from 'svelte';
  import { navigate } from 'svelte-navigator';
  import { BASE_URL } from '../../stores/urls.js';
  import {
    Button,
    TextInput,
    ComposedModal,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from 'carbon-components-svelte';
  import { Password, Renew } from 'carbon-icons-svelte';
  import Signup from '../Signup/Signup.svelte';

  import toastr, { toastrSetup } from '../../utils/toaster/toastr.js';
  toastrSetup();

  export let token;
  export let email;
  let tokenValid = false;
  let password1 = '';
  let password2 = '';
  let passwordsMatch = false;

  $: passwordsMatch = password1 === password2 && password1.trim() !== '';

  // let isModalOpen = false;

  onMount(async () => {
    const resetURL = `${$BASE_URL}/auth/reset/${token}?email=${encodeURIComponent(
      email
    )}`;
    console.log(resetURL);
    try {
      console.log('In the onMount of ResetPassword.svelte');
      const response = await fetch(resetURL, {
        method: 'POST',
        credentials: 'include',
      });
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        if (data.message) {
          tokenValid = true;
          toastr.info(`${data.message}`);
        }
      } else {
        let errorMsg = data.message || `HTTP error! status: ${response.status}`;
        throw new Error(errorMsg);
      }
    } catch (error) {
      toastr.error(error.message);
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 2000);
    }
  });

  async function handleReset(e) {
    e.preventDefault();

    const userCredential = JSON.stringify({ password: password1 });
    console.log('Sending reset request with data:', userCredential);
    console.log($BASE_URL);
    const resetURL = `${$BASE_URL}/auth/reset/${token}/confirm?email=${encodeURIComponent(
      email
    )}`;
    console.log(resetURL);
    console.log(encodeURIComponent(email));

    try {
      const response = await fetch(resetURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: userCredential,
        credentials: 'include',
      });

      const data = await response.json();
      console.log('data: ' + data.message);

      if (response.ok) {
        if (data.message) {
          toastr.success(`${data.message}`);
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 2000);
        }
        password1 = '';
        password2 = '';
      } else {
        // Handle the error response
        let errorMsg = data.message || `HTTP error! status: ${response.status}`;
        throw new Error(errorMsg);
      }
    } catch (error) {
      toastr.error(error.message);
      password1 = '';
      password2 = '';
    }
  }
</script>

{#if tokenValid}
  <div class="composed-modal">
    <ComposedModal size="sm" open>
      <ModalHeader iconDescription="Close">
        <h1>Reset Password</h1>
      </ModalHeader>
      <ModalBody>
        <form on:submit|preventDefault={handleReset} class="modal-inner">
          <div class="modal-line">
            <div class="icon">
              <Password size={20} />
            </div>
            <div class="input-wrapper">
              <TextInput
                bind:value={password1}
                type="password"
                placeholder="Password"
                name="password"
                labelText="New password"
                required={true}
                autofocus
              />
            </div>
          </div>
          <div class="modal-line">
            <div class="icon">
              <Password size={20} />
            </div>
            <div class="input-wrapper">
              <TextInput
                bind:value={password2}
                type="password"
                placeholder="Password"
                name="password"
                labelText="New password"
                required={true}
                autofocus
              />
            </div>
          </div>
          <div class="modal-line">
            <div class="new2">
              <Renew size={20} />
            </div>
            <Button
              size="field"
              kind="primary"
              type="submit"
              class="reset-button"
              disabled={!passwordsMatch}
            >
              Reset
            </Button>
          </div>
        </form>
      </ModalBody>
    </ComposedModal>
  </div>
{:else}
  <div>Loading...</div>
{/if}

<style>
  .input-wrapper {
    width: 100%;
  }

  .forgot-password-button {
    /* color: blue;
      text-decoration: none;
      background-color: transparent;
      border: none; */
    /* padding: 0; */
  }

  .signup-button {
    padding-right: 200px !important;
  }

  h1 {
    font-size: 2.2em;
    padding-left: 75px;
    margin: 10px 0 12px 0;
  }

  :global(.bx--modal-container.bx--modal-container--sm) {
    max-width: 400px;
    min-width: 150px;
    max-height: 400px;
    min-height: 200px;
  }

  .composed-modal {
    position: fixed;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .composed-modal:first-child {
    border-radius: 12px;
  }

  form > div:last-child {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .button-wrapper {
    display: flex;
    justify-content: space-evenly;
  }

  .modal-inner,
  .modal-line,
  .modal-under {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .modal-under {
    width: 80%;
  }

  .modal-line {
    justify-content: flex-start;
    flex-direction: row;
    width: 80%;
  }

  :global(.bx--btn.bx--btn--field.bx--btn--primary.reset-button) {
    width: 90%;
    max-width: none;
    margin-left: 3%;
    padding-left: 38%;
  }

  .modal-header {
    margin: 1.2em auto 1em auto;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
  }

  :global(.bx--btn.bx--btn--sm.bx--btn--secondary.cancel-button) {
    height: 30px;
    padding: 0 5px;
    margin: 0 52px 0 280px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon {
    margin-right: 10px;
    margin-top: 20px;
  }
</style>
