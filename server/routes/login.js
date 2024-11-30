import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/login');
});

router.get('/login', (req, res) => {
    res.send("TESTING LOGIN");
})

export default router;