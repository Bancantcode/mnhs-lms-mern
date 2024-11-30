import express from 'express';
// import db from '../config/db_config';

const app = express();
app.use(express.json());

const router = express.Router();

router.post('/', (req, res) => {
    console.log(req.body);
    res.status(200).json({ message: 'Registration data received' });
});

export default router;
