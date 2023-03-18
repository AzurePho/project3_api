import Drink from "../models/drink.js";

async function createComment(req, res, next) {
  const { text } = req.body;
  const { drinkId } = req.params;
  const { id: userId } = req.currentUser;

  try {
    const foundDrink = await Drink.findById(drinkId);

    if (!foundDrink) {
      return res
        .status(404)
        .json({ message: `No Drink with id of ${drinkId}` });
    }
    foundDrink.comments.push({ text, createdBy: userId });
    await foundDrink.save();
    return res.status(200).json({ message: "comment updated" });
  } catch (err) {
    next(err);
  }
}

async function updateComment(req, res, next) {
  const { drinkId, commentId } = req.params;

  try {
    const foundDrink = await Drink.findById(catId);
    if (!foundDrink) {
      return res
        .status(404)
        .json({ message: `No drink with id of ${drinkId}` });
    }
    const commentUpdate = foundDrink.comments.find(
      (comment) => comment.id === commentId
    );
    if (!commentUpdate) {
      return res
        .status(404)
        .json({ message: `No comment with id of ${commentId}` });
    }
    console.log({ "User making the request": req.currentUser });
    console.log("comment createdBy id", commentToUpdate.createdBy.toString());

    if (
      req.currentUser.role !== "admin" &&
      req.currentUser.id !== commentToUpdate.createdBy.toString()
    ) {
      return res.status(403).json({ message: "Unauthorised" });
    }

    commentToUpdate.text = req.body.text;
    await foundDrink.save();

    return res.status(200).json({
      message: "Comment has been updated",
      updatedComment: commentUpdate,
    });
  } catch (err) {
    next(err);
  }
}

async function deleteComment(req, res, next) {
  const { drinkId, commentId } = req.params;
  try {
    const foundDrink = await Drink.findById(catId);
    if (!foundDrink) {
      return res
        .status(404)
        .json({ message: `No drink with id of ${drinkId}` });
    }
    const commentDelete = foundDrink.comments.find(
      (comment) => comment.id === commentId
    );
    if (!commentDelete) {
      return res
        .status(404)
        .json({ message: `No comment with id of ${commentId}` });
    }
    if (
      req.currentUser.role !== "admin" &&
      req.currentUser.id !== commentDelete.createdBy.toString()
    ) {
      return res.status(403).json({ message: "unauthorised" });
    }
    commentDelete.remove();
    await foundDrink.save();

    return res.status(200).json({
      message: "Comment has been deleted",
      deletedComment: commentDelete,
    });
  } catch (err) {
    next(err);
  }
}

export default { createComment, updateComment, deleteComment };
