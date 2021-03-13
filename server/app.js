import express from 'express'
import hpp from 'hpp';
import mongoose from 'mongoose'
import config from './config';
import cors from "cors";
import helmet from "helmet"

//Routes
import postsRoutes from './routes/api/post';
import userRoutes from './routes/api/user';
import authRoutes from './routes/api/auth';

import morgan from 'morgan';

const app = express();
const {MONGO_URI} = config;

app.use(helmet());
app.use(hpp());

app.use(cors({origin: true, cerdentials: true}));
app.use(morgan("dev"));

app.use(express.json());


mongoose
.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,  
})
.then(()=> console.log("mongoDB connecting Success! "))
.catch((e)=> console.log(e))

//Use routes
app.get('/');
app.use('/api/post', postsRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
export default app;
