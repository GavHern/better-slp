<script lang="ts">
  import { scale } from "svelte/transition";

  let data: Promise<number>;

  const timestamp = new Date().getTime();

  const getMemoizedData = () => {
    const memo = window.localStorage.getItem("bslp-announcements-badge");
    return JSON.parse(memo);
  };

  const validateCache = (memo) => {
    if (memo == null) return false;

    const secondsAgo = (timestamp - memo.timestamp) / 1000;

    return secondsAgo < 1800; // 30min
  };

  const memoize = (count) => {
    const data = JSON.stringify({ count, timestamp });
    window.localStorage.setItem("bslp-announcements-badge", data);
  };

  data = new Promise(async (resolve) => {
    const memo = getMemoizedData();

    if (validateCache(memo)) return resolve(memo.count);

    const data: SummitLearningAnnouncementsAPI = await fetch(
      "https://www.summitlearning.org/my/announcements.json"
    ).then((res) => res.json());

    // Sum of unseen posts. Leading "+" casts boolean to number
    const count = data.announcements.reduce((t, a) => t + +a.unseen, 0);

    memoize(count);

    resolve(count);
  });
</script>

{#await data then count}
  {#if count !== 0}
    <div transition:scale={{ duration: 200 }} class="bslp-announcements-badge">
      {count}
    </div>
  {/if}
{/await}

<style>
  .bslp-announcements-badge {
    position: absolute;
    top: 0px;
    left: 27px;
    background: #5162d2;
    color: #fff;
    display: flex;
    font-size: 11px;
    font-weight: bold;
    justify-content: center;
    width: 20px;
    border-radius: 100%;
  }
</style>
