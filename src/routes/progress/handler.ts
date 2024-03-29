import GPAEstimate from "./GPAEstimate.svelte";
import YearProgressUpdate from "./YearProgressUpdate.svelte";
import NextDayOff from "./NextDayOff.svelte";

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
      res: data,
    },
  });
};

const appendNextDayOff = (data, container) => {
  const nextDayOffContainer = container.appendChild(document.createElement("div"));

  new NextDayOff({
    target: nextDayOffContainer,
    props: {
      response: data,
    },
  });
};

export default () => {
  const container = document.querySelector(".sdl-course-grades").parentElement;

  const data: Promise<SummitLearningProgressAPI> = fetch("https://www.summitlearning.org/my/progress.json")
    .then((res) => res.json())
    .catch((err) => console.error(err));

  appendGPAEstimate(data, container);
  appendYearProgressUpdate(data, container);
  appendNextDayOff(data, container);
};
