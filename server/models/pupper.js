const mongoose = require('mongoose');

const Pupper = mongoose.model('pupper', {
  name: {
    type: String,
    require: true,
    minlength: 1
  },
  age: {
    type: String || Number,
    require: true,
    minlength: 1
  },
  description: {
    type: String,
    require: true,
    minlength:1
  },
  sex: {
    type: String,
    require: true,
    minlength: 1
  },
  size: {
    type: String,
    minlength: 1
  },
  photo: {
    type: String,
    minlength: 1,
    require: true,
  },
  animal: {
    type: String,
    require: true,
    minlength: 1,
  },
  breed: {
    type: String,
    require: true,
    minlength: 1,
  },
  _id: {
    type: Number,
    require: true,
    minlength: 1,
  },
});

module.exports = { Pupper };
