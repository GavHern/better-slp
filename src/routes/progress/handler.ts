import GPAEstimate from "./GPAEstimate.svelte";
import YearProgressUpdate from "./YearProgressUpdate.svelte";

const appendGPAEstimate = (data, container) => {
  const gpaContainer = container.appendChild(document.createElement("div"));

  new GPAEstimate({
    target: gpaContainer,
    props: {
      req: data,
    },
  });
};

const appendYearProgressUpdate = (data, container) => {
  const yearProgressContainer = container.appendChild(document.createElement("div"));

  new YearProgressUpdate({
    target: yearProgressContainer,
    props: {
      req: data,
    },
  });
};

export default () => {
  const container = document.querySelector("span:has(> .sdl-course-grades)");

  const data = fetch("https://www.summitlearning.org/my/progress.json")
    .then((res) => res.json())
    .catch((err) => console.error(err));

  appendGPAEstimate(data, container);
  appendYearProgressUpdate(data, container);
};
