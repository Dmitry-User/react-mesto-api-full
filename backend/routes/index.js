const router = require('express').Router();
const userRouter = require('./user');
const cardsRouter = require('./cards');
const auth = require('../middlewares/auth');
const { verifyLogin, verifyUserCreate } = require('../middlewares/verify-user');
const { login, logout, createUser } = require('../controllers/user');
const NotFoundError = require('../errors/not-found-err');

router.post('/signup', verifyUserCreate, createUser);
router.post('/signin', verifyLogin, login);

router.use('/users', auth, userRouter);
router.use('/cards', auth, cardsRouter);
router.get('/logout', auth, logout);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый адрес не найден'));
});

module.exports = router;
