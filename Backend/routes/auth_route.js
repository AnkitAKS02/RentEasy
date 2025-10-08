import express from 'express'
import { login, logout, signup, updateProfile ,checkAuth} from "../controllers/auth_controller.js";
import { protectRoute , adminRoute, ownerRoute, restrictTo,userRoute} from '../middleware/auth_middleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);
router.put("/update-profile", protectRoute,userRoute,ownerRoute, updateProfile);
router.get('/check', protectRoute, checkAuth);
export default router;