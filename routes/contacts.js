const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const auth = require("../middleware/auth");
const Contact = require("../models/Contact");
const handleErrors = require("./handleErrors");

// @route   GET api/contacts
// @desc    Get all user's contacts
// @access  PRIVATE
router.get("/", auth, async (req, res) => {
  try {
    //Get contacts by most recent
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (e) {
    console.error(e.message);
    res.status(500).send({ msg: "Server Error" });
  }
});

// @route   POST api/contacts
// @desc    Add new contact
// @access  PRIVATE
router.post(
  "/",
  [
    auth,
    [
      check("name", "Please enter a name")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    handleErrors(req, res);

    const { name, email, phone, type } = req.body;

    //Build contact object
    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    try {
      const newContact = new Contact({
        ...contactFields,
        user: req.user.id
      });
      const contact = await newContact.save();
      res.json(contact);
    } catch (e) {
      console.error(e.message);
      res.status(500).send({ msg: "Server Error" });
    }
  }
);

// @route   PUT api/contacts/:id
// @desc    Update contact
// @access  PRIVATE
router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  //Build contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).send({ msg: "Contact not found" });

    //Validate that user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).send({ msg: "Unauthorized request" });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        $set: contactFields
      },
      {
        new: true //Create it if it doesn't exist
      }
    );

    res.json(contact);
  } catch (e) {
    console.error(e.message);
    res.status(500).send({ msg: "Server Error" });
  }
});

// @route   DELETE api/contacts/:id
// @desc    Delete contact
// @access  PRIVATE
router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).send({ msg: "Contact not found" });

    //Validate that user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).send({ msg: "Unauthorized request" });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.send({ msg: "Contact removed" });
  } catch (e) {
    console.error(e.message);
    res.status(500).send({ msg: "Server Error" });
  }
});

module.exports = router;
