const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const contactController = require('../controllers/contactController');


// Endpoint to handle contact form submission
router.get('/', contactController.getAdminContacts);

router.post('/update', verifyToken, contactController.updateAdminContacts);


module.exports = router;


