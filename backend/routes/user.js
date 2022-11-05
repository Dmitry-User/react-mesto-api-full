const router = require('express').Router();
const { verifyUserId, verifyUserUpdate, verifyAvatar } = require('../middlewares/verify-user');
const {
  getUsers,
  getUser,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/user');

router.get('/', getUsers);
router.get('/me', getUser);
router.get('/:userId', verifyUserId, getUserById);
router.patch('/me', verifyUserUpdate, updateUser);
router.patch('/me/avatar', verifyAvatar, updateAvatar);

module.exports = router;
