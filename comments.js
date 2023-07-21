// create web server
const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const User = require('../models/User');

// create comment
router.post('/create', (req, res) => {
  const comment = new Comment(req.body);
  comment
    .save()
    .then((comment) => {
      return User.findById(comment.author);
    })
    .then((user) => {
      user.comments.unshift(comment);
      return user.save();
    })
    .then(() => {
      res.redirect(`/posts/show/${req.body.post}`);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

// delete comment
router.delete('/:id', (req, res) => {
  Comment.findByIdAndDelete(req.params.id)
    .then((comment) => {
      return User.findById(comment.author);
    })
    .then((user) => {
      user.comments.pull(req.params.id);
      return user.save();
    })
    .then(() => {
      res.redirect(`/posts/show/${req.body.post}`);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

module.exports = router;