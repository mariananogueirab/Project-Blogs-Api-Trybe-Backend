const { categoryCreate } = require('../services/category.service');
const { created, success } = require('../utils/dictionary/statusCode');

const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    const category = await categoryCreate(name);

    return res.status(created).json(category);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCategory,
};