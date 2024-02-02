import express from 'express'; 
import cors from 'cors'; 
import bodyParser from 'body-parser'; 
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import dotenv from 'dotenv'; 
import mongoose from 'mongoose';


const app = express();


app.use(cors());

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use('/posts', postRoutes);
app.use('/user', userRoutes);
app.get('/', (req, res) => {
    res.send('APP IS RUNNING!')
});


dotenv.config();
const PORT = 5000;

mongoose.connect('mongodb+srv://Tsogt:UZGHqXbYKSYiu7Vg@mydb.vwlgrb8.mongodb.net/?retryWrites=true&w=majority')
    .then(() => app.listen(PORT, () => 
    console.log(`Server is running on port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect!`));

export default app;


