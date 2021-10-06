const express = require('express');
const { check } = require('express-validator');
const doctorsControllers = require('../controllers/doctors-controllers');
const fileUpload = require('../middleware/file-upload')
const router = express.Router();

router.post('/signup',
fileUpload.single('cert'),
[check('name').not().isEmpty(),
check('gender').not().isEmpty(),
check('degree').not().isEmpty(),
check('contact').not().isEmpty(),
check('email').normalizeEmail().isEmail(),
check('specialization').not().isEmpty(),
check('clinic_add').not().isEmpty()],
doctorsControllers.signup);

router.get('/search',doctorsControllers.searchDoctor);
router.get('/:uid',doctorsControllers.getDocumentsByUserId);
router.post('/upvote',doctorsControllers.upvoteDoc)

module.exports = router;
