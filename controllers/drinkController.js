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
        message: "Drink has been found",
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

async function postAll(req, res, next) {
  
  const newDrink = { ...req.body, createdBy: req.currentUser.id };

  console.log(req.currentUser);

  try {
    const dbResponse = await Drinks.create(newDrink);
    return res.status(200).json({
      message: "You created your drink collection",
      addedDrink: dbResponse,
    });
  } catch (err) {
    next(err);
  }
}

async function updateOne(req, res, next) {
  const { id } = req.params;
  const dataToUpdated = req.body;



  try {


    const foundDrink = await Drinks.findById(id);
console.log(foundDrink);

    if(!foundDrink){
      return res.status(404).json({message:`Drink with id ${id} not found.`});
    }
console.log(req.currentUser.id);
console.log(req.currentUser.role);
    if(
      req.currentUser.id !== foundDrink.createdBy.toString()&&
      req.currentUser.role !== "admin"
    ){
      return res.status(403).json({message:"Unauthorized"});
    }


    const updatedDrink = await Drinks.findByIdAndUpdate(id, dataToUpdated, {
      returnDocument: "after",
    });

    return res.status(200).json({
      message: "The Drink is updated",
      data: updatedDrink,
    });

  }catch (err) {
    next(err);
  }
}


async function deleteOne(req, res, next) {

  const {id }  = req.params;
  console.log(id);

  try {

    const drinkToDelete = await Drinks.findById(id);
console.log(drinkToDelete);
    if(!drinkToDelete) {

      return res
      .status(404)
      .json({message: `Drink with id ${id} could not be found.`});
    }

    if(
      req.currentUser.id !== drinkToDelete.createdBy.toString() &&
      req.currentUser.role !== "admin"
    ){
      return res.status(403).json({message: "Unauthorized"});
    }


    const deleteDrink = await Drinks.findByIdAndDelete(id);


    if (deleteDrink) {
      return res.status(200).json({
        message: "The drink is deleted",
        data: deleteDrink,
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
