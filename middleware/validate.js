import { validationResult } from "express-validator";

function validate(req, res, next) {
  const erros = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: erros.array() });
  }
  next();
}

export default validate;
