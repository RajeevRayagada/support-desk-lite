const express = require("express");
const router = express.Router();

const Comment = require("../models/Comment");
const auth = require("../middleware/auth");

router.post("/:ticketId", auth, async (req, res) => {

  try {

    const { body, type } = req.body;

    if (type === "internal" && req.user.role === "customer") {
      return res.status(403).json({
        success: false,
        data: null,
        error: "Customers cannot create internal notes"
      });
    }

    const comment = new Comment({
      ticketId: req.params.ticketId,
      body,
      type,
      createdBy: req.user.userId
    });

    await comment.save();

    res.json({
      success: true,
      data: comment,
      error: null
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      data: null,
      error: error.message
    });

  }

});


router.get("/:ticketId", auth, async (req, res) => {

  try {

    const query = { ticketId: req.params.ticketId };

    if (req.user.role === "customer") {
      query.type = "public";
    }

    const comments = await Comment
      .find(query)
      .populate("createdBy", "-password");

    res.json({
      success: true,
      data: comments,
      error: null
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      data: null,
      error: error.message
    });

  }

});

module.exports = router;