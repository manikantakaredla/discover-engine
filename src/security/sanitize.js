// Simple middleware to sanitize req.body, req.query, req.params to prevent NoSQL injection
// In production, recommend using express-mongo-sanitize package.
export const mongoSanitize = () => {
  return (req, res, next) => {
    const sanitize = (obj) => {
      if (obj instanceof Object) {
        for (const key in obj) {
          if (key.startsWith('$')) {
            delete obj[key];
          } else if (typeof obj[key] === 'object') {
            sanitize(obj[key]);
          }
        }
      }
    };
    sanitize(req.body);
    sanitize(req.query);
    sanitize(req.params);
    next();
  };
};
