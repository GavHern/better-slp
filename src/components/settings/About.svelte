<script lang="ts">
  import packageJson from "../../../package.json";
</script>

<div class="w-3/4 py-6">
  <h2 class="font-bold text-2xl mb-2">About BetterSLP</h2>

  <p>(About info goes here)</p>

  <p>
    Version: {packageJson.version}
    <br />
    <a href="https://github.com/GavHern/better-slp" target="_blank" rel="noreferrer">View on GitHub</a>
    <details>
      <summary class="text-grape-600 hover:underline font-bold tracking-wide cursor-pointer">Show Packages</summary>
      <ul class="list-disc">
        {#each Object.keys(packageJson.devDependencies) as dependency}
          <li>
            <a class="hover:underline" target="_blank" rel="noreferrer" href="https://npmjs.com/package/{dependency}">
              {dependency}
            </a>
          </li>
        {/each}
      </ul>
    </details>
  </p>
</div>
