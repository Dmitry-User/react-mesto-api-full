import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `card__delete-button ${isOwn ? "card__delete-button_visible" : "card__delete-button_hidden"}`;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like ${isLiked ? "card__like_visible" : "card__like_hidden"}`;

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card._id);
  };

  const handleClick = () => {
    onCardClick(card);
  };

  return (
    <article className="card">
      <button
        type="button"
        onClick={handleDeleteClick}
        className={cardDeleteButtonClassName}
        aria-label="Удалить карточку"
      />
      <img
        className="card__image"
        src={card.link}
        alt={`Фото ${card.name}.`}
        onClick={handleClick}
      />
      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-conteiner">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
            aria-label="Поставить лайк"
          />
          {card.likes.length !== 0 && <span className="card__like-count">{card.likes.length}</span>}
        </div>
      </div>
    </article>
  );
};

export default Card;
