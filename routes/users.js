const express = require("express");
const router = express.Router();

// @route   POST api/users
// @desc    Register a users
// @access  PUBLIC
router.post("/", (req, res) => {
  res.send("Registered a user");
});

module.exports = router;
