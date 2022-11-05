import Popup from "./Popup";
import errorImage from "../images/error-icon.svg";
import sucsessImage from "../images/sucsess-icon.svg";

const InfoTooltip = ({ isOpen, onClose, isSuccess }) => {
  return (
    <Popup isOpen={isOpen} onClose={onClose} background="light">
      <div className="tooltip">
        <button
          onClick={onClose}
          type="button"
          className="popup__close element-hover"
          aria-label="Закрыть"
        />
        <div
          className="tooltip__image"
          style={{
            backgroundImage: `url(${isSuccess ? sucsessImage : errorImage})`,
          }}
        />
        <h2 className="tooltip__title">
          {isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </Popup>
  );
};

export default InfoTooltip;
