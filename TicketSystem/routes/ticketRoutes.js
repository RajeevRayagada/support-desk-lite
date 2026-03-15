const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const Ticket = require("../models/Ticket");

/* -----------------------------
CREATE TICKET
Customer creates ticket
------------------------------*/
router.post("/", auth, async (req, res) => {
  try {

    const { title, description } = req.body;

    const ticket = new Ticket({
      title,
      description,
      createdBy: req.user.userId
    });

    await ticket.save();

    res.status(201).json({
      success: true,
      data: ticket,
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


/* -----------------------------
GET TICKETS (with pagination)
------------------------------*/
router.get("/", auth, async (req, res) => {
  try {

    let { page = 1, limit = 10 } = req.query;

    page = parseInt(page);
    limit = Math.min(parseInt(limit), 50);

    const query = {};

    if (req.user.role === "customer") {
      query.createdBy = req.user.userId;
    }

    const total = await Ticket.countDocuments(query);

    const tickets = await Ticket.find(query)
      .populate("createdBy assignedTo")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      success: true,
      data: {
        tickets,
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
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


/* -----------------------------
ASSIGN TICKET
Agent/Admin only
------------------------------*/
router.patch("/:id/assign", auth, async (req, res) => {
  try {

    if (req.user.role === "customer") {
      return res.status(403).json({
        success: false,
        data: null,
        error: "Customers cannot assign tickets"
      });
    }

    const { assignedTo } = req.body;

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        data: null,
        error: "Ticket not found"
      });
    }

    ticket.assignedTo = assignedTo;

    await ticket.save();

    res.json({
      success: true,
      data: ticket,
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


/* -----------------------------
UPDATE STATUS
Agent/Admin only
------------------------------*/
router.patch("/:id/status", auth, async (req, res) => {
  try {

    if (req.user.role === "customer") {
      return res.status(403).json({
        success: false,
        data: null,
        error: "Customers cannot change ticket status"
      });
    }

    const { status } = req.body;

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        data: null,
        error: "Ticket not found"
      });
    }

    const allowedTransitions = {
      open: ["in_progress"],
      in_progress: ["resolved"],
      resolved: ["closed", "in_progress"],
      closed: []
    };

    if (!allowedTransitions[ticket.status].includes(status)) {
      return res.status(400).json({
        success: false,
        data: null,
        error: `Invalid status transition from ${ticket.status} to ${status}`
      });
    }

    ticket.status = status;

    await ticket.save();

    res.json({
      success: true,
      data: ticket,
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