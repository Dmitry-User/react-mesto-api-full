import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

const Main = ({
  onEditAvatar,
  onEditProfile,
  onAddCard,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <section className="profile" aria-label="Секция профиль">
        <div className="profile__avatar">
          <img
            className="profile__avatar-image"
            src={currentUser.avatar}
            alt="Аватар"
          />
          <button
            className="profile__avatar-button"
            type="button"
            onClick={onEditAvatar}
            aria-label="Изменить аватар"
          />
        </div>
        <div className="profile__description">
          <div className="profile__top">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit element-hover"
              type="button"
              onClick={onEditProfile}
              aria-label="Редактировать"
            />
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-card element-hover"
          type="button"
          onClick={onAddCard}
          aria-label="Добавить"
        />
      </section>
      <section className="card-list" aria-label="Секция с карточками">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </>
  );
};

export default Main;
