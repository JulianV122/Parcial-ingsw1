const userController = require("../controllers/user");
const express = require("express");

const router = express.Router();

router.post("/signin", userController.signin);
router.post("/login",userController.login)
router.get("/get-me/:id",userController.getMe)

module.exports = router;
