import express from 'express';

const app = express();
app.use(express.json());

const router = express.Router();

router.get('/', (req, res) => { 
    res.json({ message: "Welcome to the Dashboard" }); // REMOVE
})

router.get('/download/:id', async (req, res) => { // TESTING PURPOSES ONLY
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

//REACT CODE 
// const handleDownload = async (id) => {
//     try {
//       const response = await axios.get(`http://localhost:3000/admin-modules/download/${id}`, {
//         responseType: 'blob', 
//       });

//       console.log(response.headers);
//       console.log(response.data);


//       const contentDisposition = response.headers['content-disposition'];
//       console.log(contentDisposition);

//       if (contentDisposition) {
//         const filename = contentDisposition.split('filename=')[1].replace(/"/g, '');
//         const url = window.URL.createObjectURL(new Blob([response.data]));
//         const link = document.createElement('a');
//         link.href = url;
//         link.setAttribute('download', filename);  // Use the filename extracted from the header
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//       } else {
//         alert('No file to download');
//       }
//     } catch (err) {
//       console.error('Download failed:', err);
//       alert('Failed to download file');
//     }
//   };

//<td>
    //<button onClick={() => handleDownload(module.MID)}>Download</button> { /* FOR TESTING PURPOSES */}
//</td>