const express = require("express");
const { Medicine, Receipt, sequelize } = require("./db");
const { Op } = require("sequelize");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

sequelize
  .sync({ alter: true })
  .then(() => console.log("Database synced"))
  .catch((err) => console.error("Database sync error:", err));

app.get("/api/medicines", async (req, res) => {
  try {
    const medicines = await Medicine.findAll();
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: "Error fetching medicines", error });
  }
});

app.post("/api/medicines", async (req, res) => {
  try {
    const { name, quantity, price } = req.body;
    const newMedicine = await Medicine.create({ name, quantity, price });
    res.status(201).json(newMedicine);
  } catch (error) {
    res.status(500).json({ message: "Error creating medicine", error });
  }
});
app.put("/api/medicines/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, price } = req.body;
    const medicine = await Medicine.findByPk(id);

    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    await medicine.update({ name, quantity, price });
    res.json(medicine);
  } catch (error) {
    res.status(500).json({ message: "Error updating medicine", error });
  }
});

app.delete("/api/medicines/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const medicine = await Medicine.findByPk(id);

    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    await medicine.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting medicine", error });
  }
});

app.post("/api/receipts", async (req, res) => {
  try {
    const { items, total } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0 || !total) {
      return res.status(400).json({ message: "Invalid data provided" });
    }

    const receipt = await Receipt.create({ date: new Date(), total });

    for (let item of items) {
      const medicine = await Medicine.findByPk(item.id);
      if (!medicine) {
        return res
          .status(404)
          .json({ message: `Medicine with id ${item.id} not found` });
      }

      if (medicine.quantity < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for medicine: ${medicine.name}`,
        });
      }

      medicine.quantity -= item.quantity;
      await medicine.save();
    }

    res.status(201).json(receipt);
  } catch (error) {
    res.status(500).json({ message: "Error creating receipt", error });
  }
});

app.get("/api/receipts", async (req, res) => {
  try {
    const receipts = await Receipt.findAll();
    res.json(receipts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching receipts", error });
  }
});

app.get("/api/reports/sales", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const receipts = await Receipt.findAll({
      where: {
        date: {
          [Op.between]: [new Date(startDate), new Date(endDate)],
        },
      },
    });
    res.json(receipts);
  } catch (error) {
    res.status(500).json({ message: "Error generating report", error });
  }
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
