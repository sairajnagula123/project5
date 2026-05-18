export const Logger = (req, res, next) => {
  console.log({
    URL: req.url,
    Method: req.method,
    Date: new Date(),
  });
  next();
};

export const errorHandle = (err, req, res, next) => {
  res.status(404).json({ Error: err.message });
};
