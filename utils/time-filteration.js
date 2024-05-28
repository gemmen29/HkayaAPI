const timeFilteration = (query) => {
  const { from, to } = query;
  const startDate = new Date(from ?? Date.now());
  const endDate = new Date(to ?? Date.now());
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  console.log(startDate.toLocaleString(), endDate.toLocaleString());

  return { startDate, endDate };
};

module.exports = timeFilteration;
