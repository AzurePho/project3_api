function logger(req, res, next) {
  console.log(req.params);
  console.log(`${req.method} request received at ${req.body}`);

  if (Object.keys(req.body).length) {
    console.log("Request body: ", req.body);
  }
  next();
}

export default logger;
