import FocusAreaProgress from "./FocusAreaProgress.svelte";

export default () => {
  new FocusAreaProgress({
    target: document.querySelector(".mentor-checkin-prework-reminder")
      ?.parentElement,
  });
};
