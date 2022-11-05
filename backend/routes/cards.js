const router = require('express').Router();
const { verifyCard, verifyCardId } = require('../middlewares/verify-card');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', verifyCard, createCard);
router.delete('/:cardId', verifyCardId, deleteCard);
router.put('/:cardId/likes', verifyCardId, likeCard);
router.delete('/:cardId/likes', verifyCardId, dislikeCard);

module.exports = router;
