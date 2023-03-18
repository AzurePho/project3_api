function errorHandler(error, req, res, next) {
  if (error.name === "JsonWebTokenError") {
    return res.status(403).json({ message: "Token could not be verified." });
  }
  if (error.name === "CastError") {
    return res
      .status(400)
      .json({ message: "ID not valid. Please enter the correct ObjectID" });
  }

  console.log(error);
  return res.status(500).json({ message: "Internal server error" });
}

export default errorHandler;
