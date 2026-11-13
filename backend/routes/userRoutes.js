const express = require("express");
const router  = express.Router();
const authenticate = require("../middlewares/authenticate");
const authorize = require("../middlewares/authorize");
const {getMe, getAllUsers,getUserById} = require("../controllers/userController");
router.get("/admin/users", authenticate, authorize("admin"), getAllUsers);
router.get("/admin/users/:id", authenticate, authorize("admin"), getUserById);
module.exports = router;