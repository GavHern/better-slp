const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export let formatShortDate = (date) => {
  const d = date.split("-");
  return `${d[1]}/${d[2]}/${d[0]}`;
};

export let formatLongDate = (date) => {
  const d = date.split("-");
  return `${months[+d[1] - 1]} ${+d[2]}, ${d[0]}`;
};
