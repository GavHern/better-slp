import NoteTakerButton from "./NoteTakerButton.svelte";

export default () => {
  const titleBar = document.querySelector(".app-page-title-group");

  titleBar.setAttribute(
    "style",
    "display: flex; justify-content: space-between;"
  );

  new NoteTakerButton({
    target: titleBar,
  });
};
