const express = require('express');
const router = express.Router();

const { authenHrToken } = require('../middlewares/auth.js');
const { signUpHr, loginHr, logout } = require('../controllers/auth.js');
const { updateCompany, uploadCompanyLogo, getCompanyInfo } = require('../controllers/company.js');
const upload = require("../middlewares/upload.js");
const { getAllCompanyJobs } = require("../controllers/company.js")

router.post('/signUpHr', signUpHr);
router.post('/loginHr', loginHr);
router.put('/', authenHrToken, updateCompany);
router.post('/logout', logout);
router.post('/companyLogo', authenHrToken, upload.single("logo"), uploadCompanyLogo);
router.get('/Info', authenHrToken, getCompanyInfo);
router.get('/jobs', authenHrToken, getAllCompanyJobs);
module.exports = router;