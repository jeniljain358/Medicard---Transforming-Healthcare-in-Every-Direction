const HtppError = require('../models/htpp-error');
const Doctor = require('../models/doctor');
const User = require('../models/user');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');


const signup = async (req,res,next) => {

  const errors = validationResult(req).errors;
  if (errors.length !== 0) {
    return next(new HtppError("Invalid data passed, check input",404));
  }
  const {name, email, gender,degree,contact,specialization,clinic_add,votes} = req.body;
  let hasDoctor;
  try {
    hasDoctor = await Doctor.findOne({email:email});
  } catch (err) {
    const error = new HtppError("Something went wrong, Couldnt signup the Doctor",500);
    return next(error);
  }
  if (hasDoctor) {
    const error = new HtppError("Doctor already exists",500);
    return next(error);
  }

  const newDoctor = new Doctor({
    name,
    email,
    gender,
    degree,
    contact,
    specialization,
    clinic_add,
    votes,
    cert: req.file.path,
  });

  try {
      await newDoctor.save();
  } catch (err) {
    const error = new HtppError("Creating Doctor failed, try again ",404);
    console.log(err);
    return next(error);
  }
  res.status(201).json({doctor:newDoctor});
};

const searchDoctor = async (req,res,next) => {

  const clinic_add = req.query.clinic_add;
  const specialization = req.query.specialization;
  const degree = req.query.degree;


  if (clinic_add && specialization && degree) {
    let hasDoctor;
    try {
      hasDoctor = await Doctor.find({clinic_add:clinic_add, specialization:specialization, degree:degree});
    } catch (err) {
      console.log(err);
      const error = new HtppError("Something went wrong, Couldnt signup the Doctor",500);
      return next(error);
    }
    if (!hasDoctor) {
      const error = new HtppError("Doctor didn't found",500);
      return next(error);
    }
    res.status(201).json({doctor:hasDoctor});
  }

}

const upvoteDoc = async(req,res,next) => {
  const {id} = req.body;
  let hasDoctor
  try {
    hasDoctor = await Doctor.findById(id);
  } catch (err) {
    console.log(err);
    const error = new HtppError("Something went wrong, Couldnt signup the Doctor",500);
    return next(error);
  }
  if (!hasDoctor) {
    const error = new HtppError("Doctor didn't found",500);
    return next(error);
  }
  hasDoctor.votes = hasDoctor.votes+1
  try {
      await hasDoctor.save();
  } catch (err) {
    const error = new HtppError("Updating document failed, try again ",404);
    console.log(err);
    return next(error);
  }
  res.status(201).json({doc: hasDoctor.toObject()});
}


const getDocumentsByUserId = async (req,res,next) => {
  const userId = req.params.uid;
  let docs
  try {
    docs = await User.aggregate([{$match : { "_id": mongoose.Types.ObjectId(userId)}}, {$lookup : {from: "documents", localField: "_id", foreignField: "patient_id", as:"documents"}}])

  } catch (err) {
    const error = new HtppError("Something went wrong, Couldnt find doc with that user id",500);
    console.log(err);
    return next(error);
  }

  if (!docs || docs.length === 0) {
    const error = new HtppError("Couldnt find document with that user id",404);
    return next(error);
  }

  res.json({doc:docs});
}

exports.signup = signup;
exports.getDocumentsByUserId = getDocumentsByUserId;
exports.searchDoctor = searchDoctor;
exports.upvoteDoc = upvoteDoc;
