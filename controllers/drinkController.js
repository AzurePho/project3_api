import Drinks from "../models/drink.js";

async function getAll(req, res, next) {
  try {
    const drinks = await Drinks.find();
    return res.status(200).json(drinks);
  } catch (err) {
    next(err);
  }
}

async function getOne(req, res, next) {
  const { id } = req.params;
  try {
    const foundDrink = await Drinks.findById(id);
    if (foundDrink) {
      return res.status(200).json({
        message: "The Drink is finded",
        data: foundDrink,
      });
    } else {
      return res.status(404).json({
        message: `Could not find a Drink with this id : ${id}`,
      });
    }
  } catch (err) {
    next(err);
  }
}

async function postAll(req, res) {
  const newDrink = req.body;
  await Drinks.create(newDrink);

  return res.status(200).json({ message: "You created your drink collection" });
}

async function updateOne(req, res, next) {
  const { id } = req.params;
  try {
    const foundDrink = await Drinks.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
    });
    if (foundDrink) {
      return res.status(200).json({
        message: "The Drink is updated",
        data: foundDrink,
      });
    } else {
      return res.status(404).json({
        message: `Could not find a drink with this id : ${id}`,
      });
    }
  } catch (err) {
    next(err);
  }
}

async function deleteOne(req, res, next) {
  const { id } = req.params;

  try {
    const foundDrink = await Drinks.findByIdAndDelete(id);
    if (foundDrink) {
      return res.status(200).json({
        message: "The drink is deleted",
        data: foundDrink,
      });
    } else {
      return res.status(404).json({
        message: `Could not find a drink with this id :${id}`,
      });
    }
  } catch (err) {
    next(err);
  }
}

export default {
  getAll,
  getOne,
  postAll,
  updateOne,
  deleteOne,
};
