import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Info = db.define('info', {
    judul: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gambar: {
        type: DataTypes.JSON, // Untuk menyimpan banyak gambar dalam format array JSON
        allowNull: true
    },
    ket: {
        type: DataTypes.TEXT, // Keterangan berita panjang
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    freezeTableName: true,
    timestamps: false // Karena menggunakan `created_at` manual
});

export default Info;

 (async () => {
     await db.sync();
 })();
