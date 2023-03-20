<script lang="ts">
  let dark = window.localStorage.getItem("bslp-dark") == "true";

  const toggleDark = () => {
    document.documentElement.classList.add("bslp-dark-mode-transitioning");

    if (dark) {
      document.documentElement.removeAttribute("bslp-dark");
    } else {
      document.documentElement.setAttribute("bslp-dark", "");
    }

    dark = !dark;

    window.localStorage.setItem("bslp-dark", JSON.stringify(dark));

    setTimeout(() => {
      document.documentElement.classList.remove("bslp-dark-mode-transitioning");
    }, 300);
  };
</script>

<div class="w-3/4 py-6">
  <div>
    <h2 class="font-bold text-3xl mb-2">Settings</h2>
  </div>
  <div class="pb-12">
    <div class="mb-4 relative">
      <h3
        class="font-semibold text-sm text-black/50 dark:text-white/50 uppercase mb-1 sticky pt-2 pb-1 top-0 bg-white/60 dark:bg-dark-700/60 backdrop-blur-md -mx-8 px-8 z-50"
      >
        Appearance
      </h3>
      <div class="flex border border-grape-600 rounded-lg overflow-hidden">
        <button
          on:click={toggleDark}
          disabled={!dark}
          class="w-full py-3 text-grape-600 uppercase font-bold tracking-wide disabled:bg-grape-600 disabled:text-white"
        >
          Light
        </button>
        <button
          on:click={toggleDark}
          disabled={dark}
          class="w-full py-3 text-grape-600 uppercase font-bold tracking-wide  disabled:bg-grape-600 disabled:text-white"
        >
          Dark
        </button>
      </div>
      <div class="mt-6 border border-grape-600 p-3 pt-1 rounded-lg">
        <p class="uppercase text-sm text-grape-600 font-bold tracking-wide">Color scheme</p>
        <div class="flex justify-between pt-2">
          <button disabled class="w-6 h-6 rounded-full bg-red-500 !ring-2 ring-white disabled:opacity-50" />
          <button disabled class="w-6 h-6 rounded-full bg-orange-500 !ring-2 ring-white disabled:opacity-50" />
          <button disabled class="w-6 h-6 rounded-full bg-yellow-300 !ring-2 ring-white disabled:opacity-50" />
          <button disabled class="w-6 h-6 rounded-full bg-green-500 !ring-2 ring-white disabled:opacity-50" />
          <button disabled class="w-6 h-6 rounded-full bg-cyan-500 !ring-2 ring-white disabled:opacity-50" />
          <button class="w-6 h-6 rounded-full bg-grape-600 !ring-1 ring-grape-600 ring-offset-2 offset-black-700 disabled:opacity-50" />
          <button disabled class="w-6 h-6 rounded-full bg-fuchsia-500 !ring-2 ring-white disabled:opacity-50" />
          <button disabled class="w-6 h-6 rounded-full bg-pink-500 !ring-2 ring-white disabled:opacity-50" />
        </div>
      </div>
    </div>
    <div class="mb-4 relative">
      <h3
        class="font-semibold text-sm text-black/50 dark:text-white/50 uppercase mb-1 sticky pt-2 pb-1 top-0 bg-white/60 dark:bg-dark-700/60 backdrop-blur-md -mx-8 px-8 z-50"
      >
        Toggle Features
      </h3>
      <input checked type="checkbox" id="bslp-settings-announcements" />
      <label for="bslp-settings-announcements">Enable announcements notification badge</label>
      <br />
      <input checked type="checkbox" id="bslp-settings-notes" />
      <label for="bslp-settings-notes">Enable note taker</label>
      <br />
      <input checked type="checkbox" id="bslp-settings-progress" />
      <label for="bslp-settings-progress">Enable progress tab enhancements</label>
      <br />
      <input checked type="checkbox" id="bslp-settings-year-bars" />
      <label for="bslp-settings-year-bars">Enable focus area progress bars</label>
    </div>
    <div class="mb-4 relative">
      <h3
        class="font-semibold text-sm text-black/50 dark:text-white/50 uppercase mb-1 sticky pt-2 pb-1 top-0 bg-white/60 dark:bg-dark-700/60 backdrop-blur-md -mx-8 px-8 z-50"
      >
        Note editor
      </h3>
      <p class="mb-1 pr-1 text-gray-700 dark:text-white/70 inline-block">Default editor font:</p>
      <select value="sans" class="w-1/3 inline-block px-2 dark:bg-neutral-700">
        <option value="sans" class="font-sans text-grape-600 font-semibold">Sans serif</option>
        <option value="serif" class="font-serif">Serif</option>
        <option value="mono" class="font-mono">Monospace</option>
      </select>
      <br />
      <p class="mb-1 pr-1 text-gray-700 dark:text-white/70 inline-block">Text scale:</p>
      <select value="100" class="w-1/3 inline-block px-2 dark:bg-neutral-700">
        <option value="80">80%</option>
        <option value="90">90%</option>
        <option value="100" class="text-grape-600 font-semibold">100%</option>
        <option value="125">125%</option>
        <option value="133">133%</option>
        <option value="150">150%</option>
        <option value="200">200%</option>
      </select>
    </div>
    <div class="mb-4 relative">
      <h3
        class="font-semibold text-sm text-black/50 dark:text-white/50 uppercase mb-1 sticky pt-2 pb-1 top-0 bg-white/60 dark:bg-dark-700/60 backdrop-blur-md -mx-8 px-8 z-50"
      >
        Advanced
      </h3>
      <input checked type="checkbox" id="bslp-settings-cache-gpa" />
      <label for="bslp-settings-cache-gpa">Cache GPA information from previous years</label>
      <br />
      <button class="btn btn-default my-1">Show notes introduction again</button>
      <button class="btn btn-default my-1">Clear all notes from device</button>
      <button class="btn btn-default my-1">View all storage data</button>
    </div>
  </div>
</div>
