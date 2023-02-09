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

<div class="w-2/3 py-6">
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
      <button class="w-6 h-6 rounded-full bg-grape-600 !ring-1 ring-grape-600 ring-offset-2 disabled:opacity-50" />
      <button disabled class="w-6 h-6 rounded-full bg-fuchsia-500 !ring-2 ring-white disabled:opacity-50" />
      <button disabled class="w-6 h-6 rounded-full bg-pink-500 !ring-2 ring-white disabled:opacity-50" />
    </div>
  </div>
</div>
