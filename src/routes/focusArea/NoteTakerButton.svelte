<script lang="ts">
  const handleClick = () => {
    alert("Open Note Taker");
  };
</script>

<button class="bslp-route-specific" on:click={handleClick}>
  <i class="material-icons material-icons-default">edit</i>
  <span>Take Notes</span>
</button>

<style>
  button {
    background: #6b65e2;
    padding-inline: 1em;
    margin-block: -0.4em;
    border-radius: 9999px;
    color: #ffffff;
    font-weight: 500;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
      rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    transition: box-shadow 300ms, background-color 150ms;
  }

  button:hover {
    background: #5751d2;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
      rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  }

  button span {
    padding-left: 0.2em;
  }
</style>
