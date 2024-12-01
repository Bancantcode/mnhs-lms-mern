import express from 'express';
import User from '../models/User.js';

const app = express();
app.use(express.json());

const router = express.Router();

router.get('/', async (req, res) => { 
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

export default router;