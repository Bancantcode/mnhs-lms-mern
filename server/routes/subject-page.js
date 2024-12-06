import express from 'express';
import Module from '../models/Module.js';
import path from 'path';

const app = express();
app.use(express.json());

const router = express.Router();

router.get('/', async (req, res) => { 
    const { subject } = req.query;
    try {
        const modules = await Module.findAll({ where: { 'subject' : subject } });
        res.status(200).json({ modules });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch module' });
    }
});

export default router;
    
//     try {
//         const user = await User.findOne({ where: { 'UID' : id } });
//         const { grlvl, strand, name, user_role } = user;
//         let modules;

//         if (user_role === "IRREG"){
//             modules = await Module.findAll({ where: { strand }}); 
//         } else {
//             modules = await Module.findAll({       
//                 where: { 
//                     strand, 
//                     grlvl 
//                 } 
//             });
//         }
//         res.status(200).json({ name, modules });
//     } catch (err) {
//         res.status(500).json({ message: 'Failed to fetch modules' });
//     }
// })