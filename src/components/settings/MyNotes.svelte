<script lang="ts">
  import { v4 as uuid } from "uuid";

  import { openNotes } from "../../routes/focusArea/handler";

  import { slide, scale } from "svelte/transition";
  import { flip } from "svelte/animate";

  let dropdownOpen = false;

  const downloadNote = (id) => {
    chrome.storage.local.get(`note:${id}`, (notes) => {
      // Returned as an object, so get the only value in the object and parse it
      const note = JSON.parse(Object.values(notes)[0]);

      const filename = `${note.title.toLowerCase().replace(" ", "-")}.bslp`;

      // https://stackoverflow.com/a/33542499/10602379
      const blob = new Blob([JSON.stringify(note.delta)], { type: "application/json" });

      const elem = window.document.createElement("a");
      elem.href = window.URL.createObjectURL(blob);
      elem.download = filename;
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
    });
  };

  const deleteNote = (id) => {
    chrome.storage.local.remove(`note:${id}`, () => {
      notesList = notesList.filter((n) => n.id !== id);
    });
  };

  const openBslpFile = ({ target }) => {
    dropdownOpen = false;

    const reader = new FileReader();
    reader.addEventListener("load", ({ target }) => {
      const delta = JSON.parse(target.result);
      const name = window.prompt("Enter a name for your note");
      if (name != null && name.length > 0) {
        const id = uuid();
        const content = {
          id,
          title: name,
          lastSaved: Date.now(),
          source: "upload",
          delta,
        };

        chrome.storage.local.set({ [`note:${id}`]: JSON.stringify(content) }, () => {
          notesList = [content, ...notesList];
        });
      }
    });
    const file = target.files[0];
    if (file == null) return;
    reader.readAsText(file);
  };

  let notesList = [];

  const refreshNotesList = () => {
    chrome.storage.local.get(null, (items) => {
      notesList = Object.keys(items)
        .filter((item) => item.includes("note:"))
        .map((key) => JSON.parse(items[key]))
        // @ts-ignore
        .sort((a, b) => new Date(b.lastSaved) - new Date(a.lastSaved));
    });
  };

  refreshNotesList();
</script>

<div class="w-3/4 py-6">
  <div class="flex justify-between">
    <h2 class="font-bold text-2xl mb-2">My Notes</h2>

    <div>
      <button
        class=" hover:bg-opacity-90 w-8 h-8 grid place-items-center rounded-full shadow-md hover:shadow-lg transition-all"
        class:bg-grape-600={!dropdownOpen}
        class:bg-gray-200={dropdownOpen}
        class:rotate-45={dropdownOpen}
        on:click={() => {
          dropdownOpen = !dropdownOpen;
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="3"
          stroke="currentColor"
          class="w-5 h-5"
          class:text-white={!dropdownOpen}
          class:fill-gray-700={dropdownOpen}
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        <span class="sr-only">Open new note menu</span>
      </button>

      {#if dropdownOpen}
        <div
          class="absolute right-16 top-14 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          transition:scale|local={{ duration: 200 }}
        >
          <button
            class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
            on:click={() => {
              dropdownOpen = false;
              const name = window.prompt("Enter a name for your note");

              if (name != null) {
                const id = uuid();
                openNotes(id, name);

                // Delta never read so it's left blank
                notesList = [{ id, lastSaved: Date.now(), title: name, delta: {} }, ...notesList];
              }
            }}
          >
            New note
          </button>
          <label
            aria-hidden="true"
            for="bslp-fileUpload"
            role="menuitem"
            class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 mb-0 cursor-pointer"
          >
            Open .bslp file
          </label>
          <input type="file" class="sr-only" id="bslp-fileUpload" accept=".bslp" on:change={openBslpFile} />
        </div>
      {/if}
    </div>
  </div>
  <ul class="divide-y divide-gray-100 -mx-4">
    {#each notesList as note (note.id)}
      <li
        class="flex items-center px-4 py-2 bg-white hover:bg-grape-100 first:rounded-t-lg last:rounded-b-lg"
        animate:flip
        out:slide|local
      >
        <div class="w-full overflow-hidden">
          <p class="mb-0 font-semibold text-gray-800 text-lg truncate">{note.title}</p>
          <p class="mb-0 text-sm text-gray-500 truncate">
            Last edited: {new Date(note.lastSaved).toLocaleString()}
          </p>
        </div>
        <div class="flex space-x-4">
          <button
            on:click={() => {
              downloadNote(note.id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-gray-700 hover:text-gray-900 cursor-pointer"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
          </button>
          <button
            on:click={() => {
              if (window.confirm("Are you sure you want to delete this note?")) {
                deleteNote(note.id);
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-gray-700 hover:text-gray-900 cursor-pointer"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
          <button
            on:click={() => {
              openNotes(note.id, note.title);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 text-gray-700 hover:text-gray-900 cursor-pointer"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </button>
        </div>
      </li>
    {:else}
      <li class="px-4">You haven't taken any notes yet!</li>
    {/each}
  </ul>
</div>
