import NoteTaker from "./NoteTaker.svelte";
import NoteTakerButton from "./NoteTakerButton.svelte";

export const openNotes = (id, title) => {
  new NoteTaker({
    target: document.body,
    props: {
      id,
      title,
    },
  });
};

export default () => {
  const titleBar = document.querySelector(".app-page-title-group");

  titleBar.setAttribute("style", "display: flex; justify-content: space-between;");

  new NoteTakerButton({
    target: titleBar,
    props: {
      openNotes,
    },
  });
};
