module.exports = (schema) => {
  return (req, res, next) => {

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        data: null,
        error: error.details[0].message
      });
    }

    next();
  };
};