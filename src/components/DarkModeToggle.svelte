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

<button class="bslp-dark-mode-toggle-button bslp-global-component" on:click={toggleDark}>
  <i class="material-icons">{dark ? "wb_sunny" : "brightness_3"}</i>
</button>

<style>
  .bslp-dark-mode-toggle-button {
    width: 100%;
    height: 100%;
    color: #ffffff;
    font-size: 1.1rem;
  }

  .bslp-dark-mode-toggle-button .material-icons {
    transform: rotate(45deg);
  }
</style>
