import express from 'express';
import cors from 'cors';

// ROUTES IMPORT //
import loginRoute from './routes/login.js';
import registerRoute from './routes/register.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE'
}))

app.use(express.json());

app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).send("It's not you, it's us!");
});

app.use('/login', loginRoute);
app.use('/register', registerRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
})