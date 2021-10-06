const HtppError = require('../models/htpp-error');
const uuid = require('uuid').v4;
const User = require('../models/user');
const { validationResult } = require('express-validator');



const getData = async (req,res,next) => {
  const userId = req.params.uid;
  let user;
  try {
    user = await User.findOne({_id:userId});
  } catch (err) {
    const error = new HtppError("Something went wrong, Couldnt find details",500);
    return next(error);
  }
  res.status(200).json({user:user})
};

const signup = async (req,res,next) => {

  const errors = validationResult(req).errors;
  if (errors.length !== 0) {
    return next(new HtppError("Invalid data passed, check input",404));
  }
  const {name, email, password,age,contact,allergies,aadhar} = req.body;
  let hasUser;
  try {
    hasUser = await User.findOne({email:email});
  } catch (err) {
    const error = new HtppError("Something went wrong, Couldnt signup the user",500);
    return next(error);
  }
  if (hasUser) {
    const error = new HtppError("User already exists, login instead",500);
    return next(error);
  }

  const newUser = new User({
    name,
    email,
    password,
    age,
    contact,
    allergies,
    aadhar
  });

  try {
      await newUser.save();
  } catch (err) {
    const error = new HtppError("Creating User failed, try again ",404);
    console.log(err);
    return next(error);
  }
  res.status(201).json({user:newUser});
};

const login = async (req,res,next) => {
  const {email, password} = req.body;

  let identifiedUser;
  try {
    identifiedUser = await User.findOne({email:email});
  } catch (e) {
    const error = new HtppError("Something went wrong, Couldnt login the user",500);
    return next(error);
  }

  if (!identifiedUser || identifiedUser.password!=password) {
    return next(new HtppError('Couldnt login, credentials may be wrong',401));
  }

  res.status(201).json({user:identifiedUser});
};

exports.getData = getData;
exports.signup = signup;
exports.login = login;
