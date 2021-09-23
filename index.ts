import express from 'express';
import { json } from 'body-parser';
import { mainRoutes } from './routes/mainRoutes';
import { errorHandler } from "./middlewares/error-handler";

const app = express();
app.use(json());
app.use(mainRoutes);
app.use(errorHandler);

try {
    app.listen(3000, () => {
        console.log('listeing on port 3000');
    });
} catch (error) {
    console.log(error);
}
