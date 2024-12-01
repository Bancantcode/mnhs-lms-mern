import express from 'express';
import Module from '../models/Module.js';

// file upload imports
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// file uploads config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    },
});
  
const upload = multer({ storage });
const app = express();
app.use(express.json());
const router = express.Router();

router.get('/', async (req, res) => { 
    try {
        const modules = await Module.findAll();
        // console.log(modules);
        res.status(200).json(modules);
    } catch (error) {
        console.error('Error fetching modules:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.post('/', upload.single('file'), async (req, res) => {
    console.log(req.file.path);
    const { subject, title } = req.body;
    const file = req.file;
    const fileData = fs.readFileSync(file.path);

    console.log({ 
        subject: subject, 
        title: title, 
        file: file, 
        uploader: "EMAIL MO", // soon
    }); // REMOVE

    const newModule = await Module.create({
        subject: subject,
        title: title,
        file_name: file.originalname,
        file_data: fileData,
        uploader: "DEV"
    }) 

    console.log(newModule);

    res.status(201).json({ message: 'Module has been uploaded successfully!' }); // FOR TESTING

    // try {
    //     await Module.create({ 
    //         email: email, 
    //         lrn: lrn, 
    //         grlvl: grlvl, 
    //         strand: strand, 
    //         password: password, 
    //         user_role: user_role 
    //     });
    //     res.status(201).json({ message: 'User has been registered successfully!' });
    // } 
    // catch (error) {
    //     console.error("Error registering user:", error);

    //     if (error.name === 'SequelizeUniqueConstraintError') {
    //         res.status(400).json({ message: 'Email or LRN already exists!' });
    //     } 
    //     else if (error.name === 'SequelizeValidationError') {
    //         res.status(400).json({ message: 'Validation error: Check your inputs.' });
    //     } 
    //     else {
    //         res.status(500).json({ message: 'Internal server error. Please try again later.' });
    //     }
    // }
});

router.get('/download/:id', async (req, res) => { 
    try {
        const module = await Module.findByPk(req.params.id);
    
        if (!module) {
            return res.status(404).json({ message: 'Module not found' });
        }

        const filePath = path.join('uploads', module.file_name);
        const fileName = module.file_name;

        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', `attachment; filename="${module.file_name}"`);
        res.download(filePath, fileName, (err) => {
            if (err) {
                res.status(500).send({ message: 'Error downloading the file', error: err });
            }
        });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error retrieving the file', error: err.message });
        }
});

export default router;