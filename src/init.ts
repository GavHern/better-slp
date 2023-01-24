/*
* This is for code that runs regardless of what route the user is on

? NOTE TO CONTRIBUTORS:
Whenever adding a new appending function, check to see if the component already exists and return if it does.
The default export will run every route change just to be certain everything is properly added so make sure to prevent it from running twice.
*/

import AnnouncementBadge from "./components/AnnouncementBadge.svelte";

const appendAnnouncementsBadge = () => {
  const exists = document.querySelectorAll(".bslp-announcements-badge").length > 0;
  if (exists) return;

  const announcementsLink = document.querySelector('.page-menu [href="/my/announcements"]');
  if (announcementsLink == null) return; // For pages which dont have a navigation bar

  const container = document.createElement("div");
  announcementsLink.appendChild(container);

  new AnnouncementBadge({
    target: container,
  });
};

export default () => {
  appendAnnouncementsBadge();
};
