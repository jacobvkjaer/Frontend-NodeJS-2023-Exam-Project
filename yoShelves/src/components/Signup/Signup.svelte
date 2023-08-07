<script>
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
  import { User, Email, Password, CheckmarkOutline } from 'carbon-icons-svelte';

  import toastr, { toastrSetup } from '../../utils/toaster/toastr.js';
  toastrSetup();

  let email = '';
  let username = '';
  let password = '';
  let isModalOpen = false;

  $: if (isModalOpen) {
    setTimeout(() => {
      const inputWrapper = document.getElementById('email-input-wrapper');
      if (inputWrapper) {
        const inputElement = inputWrapper.querySelector('input');
        if (inputElement) inputElement.focus();
      }
    }, 0);
  }

  const openModal = () => {
    isModalOpen = true;
  };

  const closeModal = () => {
    isModalOpen = false;
  };

  async function handleSignup(e) {
    e.preventDefault();

    const userCredential = JSON.stringify({ username, email, password });
    const signupURL = $BASE_URL + '/auth/signup';

    try {
      const response = await fetch(signupURL, {
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
        // Check for the message property being returned
        if (data.message) {
          toastr.success(`${data.message}`);
          closeModal();
          setTimeout(() => {
            navigate('/', { replace: true });
          }, 2000);
        }
        closeModal();
        username = '';
        email = '';
        password = '';
      } else {
        // Handle the error response
        let errorMsg = data.message || `HTTP error! status: ${response.status}`;
        throw new Error(errorMsg);
      }
    } catch (error) {
      toastr.error(error.message);
      username = '';
      email = '';
      password = '';
    }
  }
</script>

<Button kind="ghost" on:click={openModal} class="signup-button">Signup?</Button>

{#if isModalOpen}
  <div class="composed-modal">
    <ComposedModal bind:open={isModalOpen} size="sm">
      <ModalHeader iconDescription="Close">
        <h1>Signup</h1>
      </ModalHeader>
      <ModalBody>
        <form on:submit|preventDefault={handleSignup} class="modal-inner">
          <div class="modal-line">
            <div class="icon">
              <User size={20} />
            </div>
            <div class="input-wrapper">
              <TextInput
                bind:value={username}
                type="text"
                placeholder="Username"
                name="username"
                labelText="Username"
                required={true}
                autofocus
              />
            </div>
          </div>
          <div class="modal-line">
            <div class="icon">
              <Email size={20} />
            </div>
            <div class="input-wrapper">
              <TextInput
                bind:value={email}
                type="email"
                placeholder="Email"
                name="email"
                labelText="Email address"
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
                bind:value={password}
                type="password"
                placeholder="Password"
                name="password"
                labelText="Password"
                required={true}
                autofocus
              />
            </div>
          </div>
          <div class="modal-line">
            <div class="new2">
              <CheckmarkOutline size={20} />
            </div>
            <Button
              size="field"
              kind="primary"
              type="submit"
              class="reset-button"
            >
              Reset
            </Button>
          </div>
        </form>
      </ModalBody>
      <ModalFooter class="modal-footer">
        <Button
          size="small"
          kind="secondary"
          on:click={closeModal}
          class="cancel-button"
        >
          Cancel
        </Button>
      </ModalFooter>
    </ComposedModal>
  </div>
{/if}

<style>
  .input-wrapper {
    width: 100%;
  }

  .signup-button {
    padding-right: 200px !important;
  }

  h1 {
    font-size: 2.2em;
    padding-left: 136px;
    margin: 20px 0 12px 0;
  }

  :global(.bx--modal-container.bx--modal-container--sm) {
    max-width: 400px;
    min-width: 150px;
    max-height: 600px !important;
    min-height: 300px !important;
  }

  /* :global(.modal-inner.s-PYO7Oea7XOhk) {
    max-height: 600px;
    min-height: 200px;
  } */

  :global(.bx--modal-content) {
    max-height: 600px;
    min-height: 100px;
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

  :global(.modal-line.s-PYO7Oea7XOhk, .modal-line.s-Fpjlg_y_G6MH) {
    padding-bottom: 1rem;
  }

  .modal-header {
    margin: 1.2em auto 1em auto;
  }

  .modal-inner {
    margin-bottom: 1.2em;
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
