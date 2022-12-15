/**
 * Takes in a string in the format: 2022-12-13T10:12:17.000Z
 * And converts it to a string such as "2 hours ago", "2 days ago", "2 weeks ago", "2 months ago", "2 years ago"
 */
export const getRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
};

/**
 * Takes in a string in the format: 2022-12-13T10:12:17.000Z
 * And converts it to a date such as "Dec 13, 2022"
 */
export const getFormattedDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
