import express from 'express';

const app = express();
app.use(express.json());

const router = express.Router();

router.get('/', (req, res) => { 
    res.json({ message: "Welcome to the Dashboard" }); // REMOVE
})

export default router;