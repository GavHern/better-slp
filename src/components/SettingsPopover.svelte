<script lang="ts">
  import { scale } from "svelte/transition";

  import Settings from "./settings/Settings.svelte";
  import MyNotes from "./settings/MyNotes.svelte";
  import About from "./settings/About.svelte";

  export let settingsPopoverOpen;

  const nav = [
    { name: "Settings", component: Settings },
    { name: "My Notes", component: MyNotes },
    { name: "About", component: About },
  ];

  let activeTab = 0;

  const keydown = (e) => e.key === "Escape" && settingsPopoverOpen.set(false);
</script>

<svelte:window on:keydown={keydown} />

{#if $settingsPopoverOpen}
  <div class="bslp-tailwind bslp-settings">
    <div
      aria-hidden="true"
      class="fixed inset-0 w-full h-full z-[9998]"
      on:click={() => settingsPopoverOpen.set(false)}
    />

    <div
      class="fixed !top-8 left-[13.5rem] z-[9999] drop-shadow-lg flex origin-[0_2rem]"
      transition:scale|local={{ start: 0.5, duration: 300 }}
    >
      <div class="border-[1rem] z-50 border-transparent border-r-white dark:border-r-dark-700 h-8 translate-y-4 translate-x-[1px]" />
      <div class="rounded-xl overflow-clip bg-white dark:bg-dark-700 !w-[48rem] h-96 border dark:border-dark-500">
        <div class="w-full h-full flex divide-x divide-gray-200 dark:divide-dark-500">
          <ul class="w-1/3 h-full py-2 relative">
            {#each nav as navItem, idx}
              {@const active = idx === activeTab}
              <li>
                <button
                  class="flex w-full px-6 py-3 uppercase font-bold text-lg text-grape-600 transition-colors {active ? 'bg-grape-100 dark:bg-dark-500' : ''}"
                  on:click={() => (activeTab = idx)}
                >
                  {navItem.name}
                </button>
              </li>
            {/each}

            <div
              class="absolute top-2 -left-1 w-2 h-[52px] rounded-full bg-grape-600 transition-transform duration-300"
              style="transform: translateY(calc(52px * {activeTab}))"
            />
          </ul>
          <div class="w-2/3 mx-auto flex justify-center overflow-y-auto">
            <svelte:component this={nav[activeTab].component} />
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  .bslp-settings {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }
</style>
