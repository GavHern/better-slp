<script lang="ts">
  import packageJson from "../../../package.json";
</script>

<div class="w-3/4 py-6">
  <h2 class="font-bold text-2xl mb-2">About BetterSLP</h2>

  <p>(About info goes here)</p>

  <p>
    Version: {packageJson.version}
    <details>
      <summary class="text-grape-600 hover:underline cursor-pointer">Show Packages</summary>
      <ul class="list-disc">
        {#each Object.keys(packageJson.devDependencies) as dependency}
          <li>{dependency}</li>
        {/each}
      </ul>
    </details>
  </p>
</div>
