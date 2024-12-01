import express from 'express';
// import db from '../config/db_config';
import loginAuth from '../auth/authcontroller.js'

const app = express();
app.use(express.json());

const router = express.Router();

router.post('/', loginAuth, async (req, res) => {
    console.log(req.body.password);
    console.log("User logged in successfully");
    // res.status(200).json({ message: 'User logged in successfully' });
});

export default router;
