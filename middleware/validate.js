import { validationResult } from "express-validator";

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(item => ({ value : item.value, msg : item.msg }))
    });
  }

  next();
};

export default validate;
