const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

router.post("/user", controller.createUser);
router.post("/user/validate", controller.validateUser);
router.put("/user", controller.updateUser);
router.get("/user/:emailId", controller.getUserByEmail);
router.get("/user", controller.getAllUsers);
router.delete("/user/:emailId", controller.deleteUser);

module.exports = router;
