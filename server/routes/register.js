import express from 'express';
// import { db } from '../config/db_config.js';
import User from '../models/User.js';

const app = express();
app.use(express.json());

const router = express.Router();

router.get('/', (req, res) => {
    res.send("HELLO")
})

router.post('/', async (req, res) => {
    console.log(req.body);

    const { email, lrn, grlvl, strand, password } = req.body;
    const user_role = "STUDENT";

    // await db.query("INSERT INTO users (email, lrn, grlvl, strand, password, user_role) VALUES ($1, $2, $3, $4, $5, $6)", [
    //     email, lrn, grlvl, strand, password, user_role
    // ]);

    await User.create({ email: email, lrn: lrn, grlvl: grlvl, strand: strand, password: password, user_role: user_role });
    res.status(201).json({ message: 'User registered!' });
});

export default router;