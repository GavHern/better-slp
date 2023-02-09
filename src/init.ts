/*
* This is for code that runs regardless of what route the user is on

? NOTE TO CONTRIBUTORS:
Whenever adding a new appending function, check to see if the component already exists and return if it does.
The default export will run every route change just to be certain everything is properly added so make sure to prevent it from running twice.
*/

import AnnouncementBadge from "./components/AnnouncementBadge.svelte";
import SettingsToggle from "./components/SettingsToggle.svelte";
import SettingsPopover from "./components/SettingsPopover.svelte";

import { writable } from "svelte/store";
const settingsPopoverOpen = writable(false);

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

const appendSettingsToggle = () => {
  const exists = document.querySelectorAll(".bslp-settings-toggle").length > 0;
  if (exists) return;

  const navBar = document.querySelector(".page-menu .container-fluid");
  if (navBar == null) return; // For pages which dont have a navigation bar

  const container = document.createElement("div");
  container.setAttribute("style", "position:absolute;right:10px;top:10px;width:33px;height:33px;");
  container.classList.add("bslp-settings-toggle");
  container.classList.add("bslp-global-component");
  navBar.appendChild(container);

  new SettingsToggle({
    target: container,
    props: {
      settingsPopoverOpen,
    },
  });
};

export default () => {
  appendSettingsToggle();
  appendAnnouncementsBadge();

  new SettingsPopover({
    target: document.body,
    props: {
      settingsPopoverOpen,
    },
  });
};
