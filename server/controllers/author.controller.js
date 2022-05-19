const Author = require("../models/author.model");

module.exports.findAllAuthors = (req, res) => {
  Author.find()
    .then((allAuthors) => res.json({ authors: allAuthors }))
    .catch((err) => res.json({ message: "Something went wrong", error: err }));
};

module.exports.findOneSingleAuthor = (req, res) => {
  Author.findOne({ _id: req.params.id })
    .then((oneSingleAuthor) => res.json({ author: oneSingleAuthor }))
    .catch((err) => res.json({ message: "Something went wrong", error: err }));
};

module.exports.createNewAuthor = (req, res) => {
  const { data } = req.body;
  Author.create(data)
    .then((newlyCreatedAuthor) => res.json({ author: newlyCreatedAuthor }))
    .catch((err) =>
      res.status(400).json({ message: "Something went wrong", error: err })
    );
};

module.exports.updateExistingAuthor = async (req, res) => {
  Author.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
      runValidators: true,
    },
    function (err, model) {
      if (err) {
        return res
          .status(422)
          .json({ message: "Something went wrong", error: err });
      }
    }
  )
    .then((updatedAuthor) => res.json({ author: updatedAuthor }))
    .catch((err) => res.json({ message: "Something went wrong", error: err }));
};

module.exports.deleteAnExistingAuthor = (req, res) => {
  Author.deleteOne({ _id: req.params.id })
    .then((result) => res.json({ result: result }))
    .catch((err) => res.json({ message: "Something went wrong", error: err }));
};
