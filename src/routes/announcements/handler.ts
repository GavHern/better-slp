const clearMemoizedAnnouncementsBadge = () => {
  const timestamp = new Date().getTime();
  const data = JSON.stringify({ count: 0, timestamp });
  window.localStorage.setItem("bslp-announcements-badge", data);
};

export default () => {
  clearMemoizedAnnouncementsBadge();
};
