const ClothingItem = require("../models/clothingItem");

const createItem = (req, res) => {
  const { name, weather, imageUrl, userId } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: userId })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err.message });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send({ items }))
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err.message });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err.message });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(204).send({ item }))
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err.message });
    });
};

const likeItem = (req, res) => {

  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((item) => res.status(204).send({ item }))
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Like not added', err });

    });
};


const deleteLikeItem = (req, res) => {

  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((item) => res.status(204).send({ item }))
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: 'Like stll there', err });

    });
};



module.exports = { createItem, getItems, updateItem, deleteItem, likeItem, deleteLikeItem };
