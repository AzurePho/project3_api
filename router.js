import express from "express";
import drinkController from "./controllers/drinkController.js";
import userController from "./controllers/userController.js";
import commentController from "./controllers/commentController.js";
import auth from "./middleware/auth.js";
import validate from "./middleware/validate.js";
import { body } from "express-validator";

const router = express.Router();

router
  .route("/drinks")
  .get(drinkController.getAll)
  .post(auth, drinkController.postAll);
router
  .route("/drinks/:id")
  .get(drinkController.getOne)
  .patch(auth, body("_id").not().exists(),
  validate, drinkController.updateOne)
  .delete(auth, drinkController.deleteOne);

router.route("/comment/:drinkId").post(auth, commentController.createComment);
router
  .route("/comment:drinkId/:commentId")
  .patch(
    auth,
    body("text").trim().isLength({ min: 1 }),
    validate,
    commentController.updateComment
  )
  .delete(auth, commentController.deleteComment);

router.route("/register").post(userController.register);
router.route("/login").post(userController.login);

export default router;
