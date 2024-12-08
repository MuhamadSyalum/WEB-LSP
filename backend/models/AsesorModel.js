import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Asesor = db.define('asesor', {
    nama: DataTypes.STRING,
    foto: DataTypes.STRING,
    met: DataTypes.STRING,
    profil: DataTypes.TEXT,
    url: DataTypes.STRING
}, {
    freezeTableName: true
});

export default Asesor;

 (async () => {
     await db.sync();
 })();
