import NoteTaker from "./NoteTaker.svelte";
import NoteTakerButton from "./NoteTakerButton.svelte";

const openNotes = () => {
  new NoteTaker({
    target: document.body,
    props: {
      id: window.location.pathname.split("/").at(-1),
      title: document.title,
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
