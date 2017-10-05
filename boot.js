import app from './app';
import db from './db';
import { fillDB } from './__mocks__/db';

const PORT = process.env.PORT || 3000;
const isDev = process.env.ENV === 'production';

db.sequelize
  .sync({ force: true })
  .then(() => console.log('successfully connected to DB'))
  .then(() => fillDB(db))
  .then(() =>
    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`)),
  );
