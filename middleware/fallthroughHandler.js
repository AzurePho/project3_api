function fallthroughHandler(req, res, next) {
  return res.status(404).json({ message: "Incorrect endpoint" });
}

export default fallthroughHandler;
