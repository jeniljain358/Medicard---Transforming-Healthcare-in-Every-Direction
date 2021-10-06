const HtppError = require('../models/htpp-error');
const uuid = require('uuid').v4;
const { validationResult } = require('express-validator');
const Document = require('../models/document');
const User = require('../models/user');



const getDocumentById  = async (req,res,next) => {
  const documentId = req.params.did;

let doc
  try {
      doc = await Document.findById(documentId);
  } catch (err) {
    const error = new HtppError("Something went wrong, Couldnt find doc with that id",500);
    return next(error);
  }


  if (!doc) {
    const error = new HtppError("Couldnt find document with that id",404);
    return next(error);
  }
  res.json({doc:doc.toObject()});
}

//function getDocumentById() { } or const getDocumentById= function () {}


const getDocumentsByUserId = async (req,res,next) => {
  const userId = req.params.uid;
  let docs
  try {
    docs = await Document.find({patient_id:userId});

  } catch (err) {
    const error = new HtppError("Something went wrong, Couldnt find doc with that user id",500);
    return next(error);
  }

  if (!docs || docs.length === 0) {
    const error = new HtppError("Couldnt find document with that user id",404);
    return next(error);
  }

  const newdocs=docs.map((doc) => {
    doc.toObject()
    return newdoc={
      _id:doc._id,
      title:doc.title,
      des:doc.des,
      image:doc.image,
      patient_id:doc.patient_id,
      date:docs[0].date.getDate()+'-'+docs[0].date.getMonth()+'-'+docs[0].date.getFullYear()
    }
   })

  res.json({doc:newdocs});
}


const getDocumentsByAadharId = async (req,res,next) => {
  const aadharId = req.params.aid;
  console.log(aadharId);
  let user;
  try {
    user = await User.find({aadhar:aadharId});
  } catch (err) {
    const error = new HtppError("Something went wrong,Couldnt find user",404);
    console.log(err);
    return next(error);
  }
  if (!user) {
    const error = new HtppError("Couldnt find the user",404);
    return next(error);
  }

  let docs
  try {
    docs = await Document.find({patient_id:user[0]._id});

  } catch (err) {
    const error = new HtppError("Something went wrong, Couldnt find doc with that user id",500);
    return next(error);
  }
  console.log(user);
  console.log(docs);
  if (!docs || docs.length === 0) {
    const error = new HtppError("Couldnt find document with that user id, Login to upoad documents",404);
    return next(error);
  }

  res.json({user:user[0],doc:docs.map((doc) => doc.toObject() )});
}


const createDoc = async (req,res,next) => {
  const errors = validationResult(req).errors;
console.log(req.file);
  if (errors.length !== 0) {
    throw new HtppError("Invalid data passed, check input",404);
  }

  const { title, des, creator } = req.body;
  const newDoc = new Document({
    title,
    des,
    image: req.file.path,
    patient_id: creator
  });

  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HtppError("Something went wrong,Couldnt find user",404);
    console.log(err);
    return next(error);
  }
  if (!user) {
    const error = new HtppError("Couldnt find the user",404);
    return next(error);
  }

  try {
      await newDoc.save();
  } catch (err) {
    const error = new HtppError("Creating document failed, try again ",404);
    console.log(err);
    return next(error);
  }
  res.status(201).json({document:newDoc})
}


const updateDoc = async (req,res,next) => {

  const errors = validationResult(req).errors;
  if (errors.length !== 0) {
    throw new HtppError("Invalid data passed, check input",404);
  }


  const { title, des,} = req.body;
  const docId = req.params.did;

  let doc
    try {
        doc = await Document.findById(docId);
    } catch (err) {
      const error = new HtppError("Something went wrong, Couldnt update the doc",500);
      return next(error);
    }

    if (!doc || doc.length === 0) {
      const error = new HtppError("Couldnt find document with that id",404);
      return next(error);
    }

    doc.title = title;
    doc.des = des;

    try {
        await doc.save();
    } catch (err) {
      const error = new HtppError("Updating document failed, try again ",404);
      console.log(err);
      return next(error);
    }


  res.status(201).json({doc: doc.toObject()});
}

const deleteDoc = async (req,res,next) => {
  const docId = req.params.did;
  let doc
    try {
        doc = await Document.findById(docId);
    } catch (err) {
      const error = new HtppError("Something went wrong, Couldnt delete the doc",500);
      return next(error);
    }

    if (!doc || doc.length === 0) {
      const error = new HtppError("Couldnt find document with that id",404);
      return next(error);
    }

    try {
        await doc.remove();
    } catch (err) {
      const error = new HtppError("Deleting document failed, try again ",404);
      console.log(err);
      return next(error);
    }

  res.status(201).json({message:"Doc deleted"});
}

exports.getDocumentById = getDocumentById;
exports.getDocumentsByUserId = getDocumentsByUserId;
exports.createDoc = createDoc;
exports.updateDoc = updateDoc;
exports.deleteDoc = deleteDoc;
exports.getDocumentsByAadharId = getDocumentsByAadharId;
