import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Product = db.define('product', {  // Change 'skema' to 'product'
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
    keterangan: DataTypes.TEXT  // Add 'keterangan' field for the description
}, {
    freezeTableName: true
});

export default Product;

(async () => {
    await db.sync();
})();
