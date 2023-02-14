const path = require('path');
const { saveReports, downloadReport } = require('../controllers/reportController');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

router.post("/:id/uploadreport", upload.single('report'), saveReports);
router.get('/:id/downloadreport', downloadReport);
