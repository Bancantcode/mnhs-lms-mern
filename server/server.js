import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import path from 'path';

// ROUTES IMPORT //
// import loginRoute from './routes/login.js';
import registerRoute from './routes/register.js';
import Login from './routes/login.js';
import dboardRoute from './routes/dashboard.js';
import AdminUsersRoute from './routes/admin-users.js';
import AdminModulesRoute from './routes/admin-modules.js';
import SubjectPageRoute from './routes/subject-page.js';

dotenv.config();
const app = express();

app.use(cors({
    origin: 'https://mnhs-lms.onrender.com',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    exposedHeaders: ['Content-Disposition']
}))

app.use(express.json());

app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).send("It's not you, it's us!");
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// app.use('/login', loginRoute);
app.use('/', dboardRoute);
app.use('/login', Login);
app.use('/register', registerRoute);
app.use('/admin-users', AdminUsersRoute)
app.use('/admin-modules', AdminModulesRoute)
app.use('/subject-page', SubjectPageRoute)

app.post("/validate-token", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ valid: false, message: "Token is required" });
    }

    try {
        const decoded = jwt.verify(token, "!MalinoNationalHighSchool");
        return res.json({ valid: true, user: decoded });
    } catch (error) {
        return res.status(401).json({ valid: false, message: "Invalid token" });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
})