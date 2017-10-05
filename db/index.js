import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

let sequelize;

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, config);
} else {
  sequelize = new Sequelize('share-it', 'shareItUser', '123', {
    host: 'localhost',
    dialect: 'postgres',
  });
}

const db = {};

fs
  .readdirSync(path.join(__dirname, 'models'))
  .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, 'models', file));
    db[model.name] = model;
  });

Object.keys(db).forEach(
  modelName => db[modelName].associate && db[modelName].associate(db),
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
