import { app } from './src/app';
import { initDatabase } from './src/sequelize';

app.slsInitialize = async () => {
  try {
    await initDatabase();
  } catch (e) {
    console.log(`[DB Error]: ${e}`);
  }
};

app.binaryTypes = ['*/*'];

module.exports = app;
