import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';
import path from 'path';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();//source lal backend

if(process.env.NODE_ENV !== 'production') {
    app.use(cors());
}

app.use(morgan('dev'));
app.use(express.json());

app.use('/api', apiRoutes);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    });
}
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

export default app;
