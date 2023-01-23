import GPAEstimate from "./GPAEstimate.svelte";

export default () => {
  const container = document.querySelector("span:has(> .sdl-course-grades)").appendChild(document.createElement("div"));

  new GPAEstimate({
    target: container,
  });
};
