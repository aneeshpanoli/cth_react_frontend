export const parseToDays = (dateString) => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date(dateString);
  const secondDate = new Date();

  const daysSince = Math.round(Math.abs((firstDate - secondDate) / oneDay));
  return !daysSince? "today": daysSince+" days ago"
};
