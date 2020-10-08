const Model = require("../models/index");
const moment = require("moment");
const { body, validationResult } = require("express-validator");

const CommentController = {};

CommentController.addComment = async (req, res) => {
  const fecha_comentario = moment().format();
  const ArticleId = req.params.id;
  const { comentario, autor_comentario } = req.body;

  await Model.Comment.create({
    comentario,
    autor_comentario,
    fecha_comentario,
    ArticleId,
  });

  res.redirect(`/articulo/${req.params.id}`);
};

module.exports = CommentController;
