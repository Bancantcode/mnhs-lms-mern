import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// ROUTES IMPORT //
// import loginRoute from './routes/login.js';
import registerRoute from './routes/register.js';
import Login from './auth/authcontroller.js';
import dboardRoute from './routes/dashboard.js';
import AdminUsersRoute from './routes/admin-users.js';

dotenv.config();
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

// app.use('/login', loginRoute);
app.use('/', dboardRoute);
app.use('/login', Login);
app.use('/register', registerRoute);
app.use('/admin-users', AdminUsersRoute)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
})