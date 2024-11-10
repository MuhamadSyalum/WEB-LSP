import {Sequelize} from "sequelize";

const db = new Sequelize('web-lsp', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;