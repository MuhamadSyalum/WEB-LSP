import {Sequelize} from "sequelize";

const db = new Sequelize('lsp-api', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;