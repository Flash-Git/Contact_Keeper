const express = require("express");
const router = express.Router();

// @route   GET api/contacts
// @desc    Get all user's contacts
// @access  PRIVATE
router.get("/", (req, res) => {
  res.send("Get all contacts");
});

// @route   POST api/contacts
// @desc    Add new contact
// @access  PRIVATE
router.post("/", (req, res) => {
  res.send("Add contact");
});

// @route   PUT api/contacts/:id
// @desc    Update contact
// @access  PRIVATE
router.put("/:id", (req, res) => {
  res.send("Update contact");
});

// @route   DELETE api/contacts/:id
// @desc    Delete contact
// @access  PRIVATE
router.delete("/:id", (req, res) => {
  res.send("Delete contact");
});

module.exports = router;
