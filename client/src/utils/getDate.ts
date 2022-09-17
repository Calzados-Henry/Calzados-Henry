export const getDate = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  let newMonth = month.toString();
  if (month < 10) newMonth = `0${month}`;
  const day = date.getDate();
  const newDate = `${year}-${newMonth}-${day}`;
  return newDate;
};
