export const dateDisplay = date => {
  return `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}.${
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  }.${date.getFullYear()}`;
};
export const sortByDate = sortArr => {
  const dates = {};
  for (const item of sortArr) {
    if (dates[new Date(item.date).getDate()]) {
      dates[new Date(item.date).getDate()] = [
        item,
        ...dates[new Date(item.date).getDate()],
      ];
      continue;
    }
    dates[new Date(item.date).getDate()] = [item];
  }
  return Object.entries(dates)
    .map(i => [i[0], i[1].sort((a, b) => new Date(b.date) - new Date(a.date))])
    .sort((a, b) => Number(b[0]) - Number(a[0]));
};
