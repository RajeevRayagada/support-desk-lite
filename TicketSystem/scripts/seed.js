require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/User");
const Ticket = require("../models/Ticket");

async function seed() {

  await mongoose.connect(process.env.MONGO_URI);

  await User.deleteMany({});
  await Ticket.deleteMany({});

  const password = await bcrypt.hash("password123", 10);

  const admin = await User.create({
    name: "Admin",
    email: "admin@test.com",
    password,
    role: "admin"
  });

  const agent = await User.create({
    name: "Agent",
    email: "agent@test.com",
    password,
    role: "agent"
  });

  const customer = await User.create({
    name: "Customer",
    email: "customer@test.com",
    password,
    role: "customer"
  });

  await Ticket.create([
    {
      title: "Login problem",
      description: "Unable to login after password reset",
      priority: "high",
      createdBy: customer._id
    },
    {
      title: "Payment failure",
      description: "Card payment keeps failing",
      priority: "medium",
      createdBy: customer._id
    },
    {
      title: "Slow website",
      description: "Website loads very slowly",
      priority: "low",
      createdBy: customer._id
    }
  ]);

  console.log("Database seeded successfully");

  process.exit();
}

seed();