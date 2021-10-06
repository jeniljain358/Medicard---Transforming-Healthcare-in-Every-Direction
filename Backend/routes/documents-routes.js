const express = require('express');
const documentsControllers = require('../controllers/documents-controllers');
const { check } = require('express-validator');
const fileUpload = require('../middleware/file-upload')

const router = express.Router();

router.get('/:did',documentsControllers.getDocumentById);
router.get('/getdetails/:aid',documentsControllers.getDocumentsByAadharId);

router.get('/users/:uid',documentsControllers.getDocumentsByUserId);

router.post('/',
 fileUpload.single('image'),
 [check('title').not().isEmpty(),
check('des').not().isEmpty()],
 documentsControllers.createDoc);

router.patch('/:did',[check('title').not().isEmpty(),
check('des').not().isEmpty()],
documentsControllers.updateDoc);

router.delete('/:did',documentsControllers.deleteDoc);
module.exports = router;
