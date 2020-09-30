const httpStatus = require('http-status');

const pagination = async (req, res, next) => {
  const limit = parseInt(req.query.per_page) || 10;
  const skip = (parseInt(req.query.page) - 1) * limit || 0;
  const sort = req.query.sort || '-createdAt';

  res.paginate = async (query) => {
    try {
      const data = await query()
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .exec();
      const count = await query().countDocuments();
      const totalPages = Math.ceil(count / limit);
      return res.status(httpStatus.OK).json({
        data,
        count,
        totalPages,
      });
    } catch (e) {
      return next(e);
    }
  };
  return next();
};

module.exports = pagination;
