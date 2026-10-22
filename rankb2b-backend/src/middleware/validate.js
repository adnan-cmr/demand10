import { AppError } from '../utils/AppError.js';

export function validate(schema, source = 'body') {
  return (req, res, next) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      return next(new AppError('Request validation failed', 400, result.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      }))));
    }
    req[source] = result.data;
    return next();
  };
}
