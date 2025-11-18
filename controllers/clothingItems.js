const ClothingItem = require("../models/clothingItem");
const { handleItemError, handleError, FORBIDDEN_ERROR_CODE } = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(201).send(item))
    .catch((err) => handleItemError(err, res));
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => handleItemError(err, res));
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } },
    { new: true }
  )
    .then((item) => res.status(201).send(item))
    .catch((err) => handleError(err, res));
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== userId.toString()) {
        return res.status(FORBIDDEN_ERROR_CODE).send({ message: "Forbidden: You can only delete your own items" });
      }

      return ClothingItem.findByIdAndDelete(itemId);
    })
    .then((deletedItem) => {
      res.status(200).send(deletedItem);
    })
    .catch((err) => handleError(err, res));
};


const likeItem = (req, res) => {

  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(201).send(item))
    .catch((err) => handleError(err, res));
};


const deleteLikeItem = (req, res) => {

  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => handleError(err, res));
};



module.exports = { createItem, getItems, updateItem, deleteItem, likeItem, deleteLikeItem };
