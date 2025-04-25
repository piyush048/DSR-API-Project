import  express from "express";
import { connectDB, sequelize } from './config/db';
import dotenv from "dotenv";
import  router  from "./routes";
import { setupSwagger } from './docs';
import logger from "./utils/logger";
dotenv.config();

const app = express();
app.use(express.json());


app.use('/users/api', router); 

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
      await sequelize.authenticate();
      await sequelize.sync(); 
      await connectDB();
      app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
      logger.info(`Server running on port http://localhost:${PORT}`);
      setupSwagger(app);
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      logger.error('Unable to connect to the database:', error);
    }
};

start();
