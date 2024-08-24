import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import connect from './database/conn.js';
import router from './router/route.js';

const app = express();

// App middlewares
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
config();

// Application port
const port = process.env.PORT || 8080;

// Routes
app.use('/api', router);

// Test route
app.get('/', (req, res) => {
    res.json("Get Request");
});

// Start server only when we have a valid connection
connect().then(() => {
    app.listen(port, () => {
        console.log(`Server connected to http://localhost:${port}`);
    });
}).catch(error => {
    console.error("Invalid Database Connection:", error);
});
