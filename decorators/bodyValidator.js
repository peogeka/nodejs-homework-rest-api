import { HttpError } from "../helpers/index.js";

const bodyValidator = (schema) => (req, res, next) => {
   const { error } = schema.validate(req.body);
   if (error) {
      return next(new HttpError(400, error.message));
   }
   next();
};

export default bodyValidator;