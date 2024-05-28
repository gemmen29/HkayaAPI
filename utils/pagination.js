const pagination = async (model, req, queryObj = {}) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const totalMatches = await model.countDocuments(queryObj);
  const numOfPages = Math.ceil(totalMatches / limit);

  return { skip, limit, totalMatches, numOfPages };
};

module.exports = pagination;
