const timeFilteration = (query) => {
  const { from, to } = query;
  const startDate = new Date(from ?? Date.now());
  const endDate = new Date(to ?? Date.now());
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  return { startDate, endDate };
};

module.exports = timeFilteration;
