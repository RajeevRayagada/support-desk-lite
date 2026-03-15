const express = require("express");
const auth = require("../middleware/auth");
const Comment = require("../models/Comment");
const Ticket = require("../models/Ticket");

const router = express.Router();

/* Add Comment */
router.post("/:ticketId", auth, async (req, res) => {

    try {

        const { body, type } = req.body;

        if (type === "internal" && req.user.role === "customer") {
            return res.status(403).json({
                message: "Customers cannot create internal notes"
            });
        }

        const ticket = await Ticket.findById(req.params.ticketId);

        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        const comment = new Comment({
            ticketId: req.params.ticketId,
            body,
            type: type || "public",
            createdBy: req.user.userId
        });

        await comment.save();

        res.json(comment);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});

/* Get Comments for Ticket */
router.get("/:ticketId", auth, async (req, res) => {

    try {

        let filter = { ticketId: req.params.ticketId };

        if (req.user.role === "customer") {
            filter.type = "public";
        }

        const comments = await Comment.find(filter)
            .populate("createdBy");

        res.json(comments);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});

module.exports = router;