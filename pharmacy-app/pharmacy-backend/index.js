const express = require("express");
const { Medicine, Receipt, sequelize } = require("./db");
const { Op } = require("sequelize");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Синхронізація бази даних
sequelize
  .sync()
  .then(() => console.log("Database synced successfully"))
  .catch((err) => console.error("Database sync error:", err));

// Роут для отримання всіх ліків
app.get("/api/medicines", async (req, res) => {
  try {
    const medicines = await Medicine.findAll();
    res.json(medicines);
  } catch (error) {
    console.error("Error fetching medicines:", error);
    res
      .status(500)
      .json({ message: "Error fetching medicines", error: error.message });
  }
});

// Роут для додавання нового лікарського засобу
app.post("/api/medicines", async (req, res) => {
  try {
    const { name, quantity, price } = req.body;

    // Валідація вхідних даних
    if (!name || quantity === undefined || price === undefined) {
      return res
        .status(400)
        .json({ message: "All fields (name, quantity, price) are required" });
    }

    const newMedicine = await Medicine.create({ name, quantity, price });
    res.status(201).json(newMedicine);
  } catch (error) {
    console.error("Error creating medicine:", error);
    res
      .status(500)
      .json({ message: "Error creating medicine", error: error.message });
  }
});

// Роут для оновлення даних про лікарський засіб
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
    console.error("Error updating medicine:", error);
    res
      .status(500)
      .json({ message: "Error updating medicine", error: error.message });
  }
});

// Роут для видалення лікарського засобу
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
    console.error("Error deleting medicine:", error);
    res
      .status(500)
      .json({ message: "Error deleting medicine", error: error.message });
  }
});

// Роут для створення нового чека
app.post("/api/receipts", async (req, res) => {
  try {
    const { items, total } = req.body;

    if (
      !items ||
      !Array.isArray(items) ||
      items.length === 0 ||
      total === undefined
    ) {
      return res.status(400).json({ message: "Invalid data provided" });
    }

    // Генеруємо номер чека (можна використовувати інші методи генерації)
    const receiptNumber = `R-${Date.now()}`;

    const receipt = await Receipt.create({
      number: receiptNumber, // Генеруємо унікальний номер
      date: new Date(),
      total,
    });

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
    console.error("Error creating receipt:", error);
    res.status(500).json({ message: "Error creating receipt", error });
  }
});

// Роут для отримання всіх чеків
app.get("/api/medicines", async (req, res) => {
  try {
    const medicines = await Medicine.findAll();
    res.json(medicines);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching medicines", error: error.message });
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
    console.error("Error deleting medicine:", error);
    res
      .status(500)
      .json({ message: "Error deleting medicine", error: error.message });
  }
});
// Роут для звіту по продажам
app.get("/api/reports/sales", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Перевірка дат
    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ message: "Both startDate and endDate are required" });
    }

    const receipts = await Receipt.findAll({
      where: {
        date: {
          [Op.between]: [new Date(startDate), new Date(endDate)],
        },
      },
    });

    res.json(receipts);
  } catch (error) {
    console.error("Error generating report:", error);
    res
      .status(500)
      .json({ message: "Error generating report", error: error.message });
  }
});

// Запуск сервера
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
