import Popup from "./Popup";

const ImagePopup = ({ card, isOpen, onClose }) => {
  return (
    <Popup isOpen={isOpen} onClose={onClose} background="dark">
      <figure className="popup__figure">
        <img
          className="popup__image"
          src={card.link}
          alt={`Фото ${card.name}.`}
        />
        <figcaption className="popup__image-caption">{card.name}</figcaption>
        <button
          className="popup__close element-hover"
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
        />
      </figure>
    </Popup>
  );
};

export default ImagePopup;
