<script>
  import { onMount, tick, createEventDispatcher } from 'svelte';
  import { user } from '../../stores/user.js';
  import { navigate } from 'svelte-navigator';
  import { BASE_URL } from '../../stores/urls.js';
  import {
    Button,
    TextInput,
    ComposedModal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    HeaderPanelLink,
  } from 'carbon-components-svelte';
  import { Password, Renew, Logout, Repeat } from 'carbon-icons-svelte';
  import Signup from '../Signup/Signup.svelte';

  import toastr, { toastrSetup } from '../../utils/toaster/toastr.js';
  toastrSetup();

  let password = '';
  let sentence = '';
  let sentenceToMatch = '';
  let sentenceMatch = false;
  $: sentenceMatch = sentence === sentenceToMatch && sentence.trim() !== '';

  //   let deleteUser = false;
  let isModalOpen = false;

  const dispatch = createEventDispatcher();

  const setAutocompleteOff = async () => {
    await tick(); // Wait for the DOM update
    const sentenceInput = document.querySelector('input[name="sentence"]');
    const passwordInput = document.querySelector('input[name="password"]');
    if (sentenceInput && passwordInput) {
      sentenceInput.setAttribute('autocomplete', 'new-sentence');
      passwordInput.setAttribute('autocomplete', 'new-password');
    }
  };

  $: if (isModalOpen) {
    setAutocompleteOff();
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
  onMount(async () => {
    sentenceToMatch = `Delete ${$user.user.username}'s account`;
    console.log(sentenceToMatch);
  });

  async function verifyPassword() {
    const userCredential = JSON.stringify({ password: password });
    console.log('Sending reset request with data:', userCredential);
    console.log($BASE_URL);
    const verifyPasswordURL = `${$BASE_URL}/users/${$user.user.id}/verify-password`;
    console.log(verifyPasswordURL);

    try {
      const response = await fetch(verifyPasswordURL, {
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
        return true;
      } else {
        let errorMsg = data.message || `HTTP error! status: ${response.status}`;
        throw new Error(errorMsg);
      }
    } catch (error) {
      toastr.error(error.message);
      return false;
    }
  }

  async function handleDeletion(e) {
    e.preventDefault();
    const deleteUserURL = `${$BASE_URL}/users/${$user.user.id}`;
    console.log(deleteUserURL);

    const verified = await verifyPassword();
    console.log(verified);

    if (verified) {
      try {
        const response = await fetch(deleteUserURL, {
          method: 'DELETE',
          credentials: 'include',
        });

        const data = await response.json();
        console.log('data: ' + data.message);

        if (response.ok) {
          if (data.message) {
            user.clearUser();
            dispatch('userDeleted');
            toastr.success(`${data.message}`);
            setTimeout(() => {
              navigate('/', { replace: true });
            }, 2000);
          }
          sentence = '';
          sentenceToMatch = '';
          password = '';
        } else {
          let errorMsg =
            data.message || `HTTP error! status: ${response.status}`;
          throw new Error(errorMsg);
        }
      } catch (error) {
        toastr.error(error.message);
        sentence = '';
        sentenceToMatch = '';
        password = '';
      }
    }
  }
</script>

<HeaderPanelLink>
  <div class="inline" on:click={openModal} aria-label="Signout">
    <div id="deleteUser">Delete account</div>
    <div class="icon">
      <Logout size={16} />
    </div>
  </div>
</HeaderPanelLink>

{#if isModalOpen}
  <div class="composed-modal">
    <ComposedModal bind:open={isModalOpen} size="sm">
      <ModalHeader iconDescription="Close">
        <h1>Delete account</h1>
        <div>
          <h5>{sentenceToMatch}</h5>
        </div>
      </ModalHeader>
      <ModalBody>
        <form
          on:submit|preventDefault={handleDeletion}
          class="modal-inner form"
        >
          <div class="modal-line">
            <div class="modal-icon">
              <Repeat size={20} />
            </div>
            <div class="input-wrapper">
              <TextInput
                bind:value={sentence}
                type="text"
                placeholder="Repeated sentence"
                name="sentence"
                labelText="Write out the above sentence"
                required={true}
                autofocus
              />
            </div>
          </div>
          <div class="modal-line">
            <div class="modal-icon">
              <Password size={20} />
            </div>
            <div class="input-wrapper">
              <TextInput
                bind:value={password}
                type="password"
                placeholder="Password"
                name="password"
                labelText="Verify with password"
                required={true}
                autofocus
                autocomplete="off"
              />
            </div>
          </div>
          <div>
            <h6>Cannot be undone</h6>
          </div>
          <div class="modal-line">
            <div class="new2">
              <Renew size={20} />
            </div>
            <Button
              size="field"
              kind="danger"
              type="submit"
              class="delete-button"
              disabled={!sentenceMatch}
            >
              Permanently delete account
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
  /* Nav element */
  .inline {
    display: flex;
    flex-direction: row;
    align-items: left;
    justify-content: space-between;
  }

  .icon {
    margin-right: 0.5rem;
  }

  #deleteUser,
  h6 {
    color: rgba(191, 19, 19, 0.933);
  }

  h5 {
    color: #c46200;
    padding-left: 99px;
  }

  h1,
  h5,
  h6,
  :global(.bx--label) {
    user-select: none;
    pointer-events: none;
  }

  /* Delete user modal */
  .input-wrapper {
    width: 100%;
  }

  .signup-button {
    padding-right: 200px !important;
  }

  h1 {
    font-size: 2.2em;
    padding-left: 85px;
    margin: 20px 0 12px 0;
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
    margin-top: 30px;
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

  /* :global(.bx--btn.bx--btn--field.bx--btn--danger.delete-button) {
    width: 90%;
    max-width: none;
    margin-left: 3%;
    padding-left: 5%;
  } */

  :global(.bx--btn.true.bx--btn--field.bx--btn--danger.delete-button) {
    width: 90%;
    max-width: none;
    margin-left: 3%;
    padding-left: 15%;
    text-align: center;
  }

  /* :global(.bx--text-input) {
    
  } */

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

  .modal-footer {
    display: flex;
    justify-content: flex-end;
  }

  .modal-icon {
    margin-right: 10px;
    margin-top: 20px;
  }
</style>
