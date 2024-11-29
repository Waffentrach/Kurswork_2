const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./pharmacy.db",
});

const Medicine = sequelize.define("Medicine", {
  name: { type: DataTypes.STRING, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
});

const Receipt = sequelize.define("Receipt", {
  number: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false },
  total: { type: DataTypes.FLOAT, allowNull: false },
});

Medicine.sync();
Receipt.sync();

module.exports = { sequelize, Medicine, Receipt };
