import express from 'express'; 
import cors from 'cors'; 
import bodyParser from 'body-parser'; 
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import dotenv from 'dotenv'; 
import mongoose from 'mongoose';


const app = express();

app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, 
    Accept, x-client-key, x-client-token, x-client-secret, Authorization");
      next();
});
app.use(cors({
    origin: ['https://abc-website-client.vercel.app'],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true, // Optional depending on your requirements
}));

// app.use((req, res, next) => {
//     req.setHeader('Access-Control-Allow-Origin', 'https://abc-website-client.vercel.app');
//     req.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     req.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     req.setHeader('Access-Control-Allow-Credentials', true);
//     res.setHeader('Access-Control-Allow-Origin', 'https://abc-website-client.vercel.app');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });
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


