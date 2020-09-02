export const parseToDays = (dateString) => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date(dateString);
  const secondDate = new Date();

  const daysSince = Math.round(Math.abs((firstDate - secondDate) / oneDay));
  return !daysSince? "Today": daysSince+" days ago"
};

export const parseToDaysHoursAgo = (dateString) => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date(dateString);
  const secondDate = new Date();
  const inHours = secondDate.getHours() - firstDate.getHours()
  const isJustnow = inHours < 1?"Less than an hour ago":inHours+" hours ago"

  const daysSince = Math.round(Math.abs((firstDate - secondDate) / oneDay));
  return !daysSince? isJustnow: daysSince+" days ago"
};
