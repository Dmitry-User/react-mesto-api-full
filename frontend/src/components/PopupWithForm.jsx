import Popup from "./Popup";

const PopupWithForm = ({
  name,
  title,
  isOpen,
  onClose,
  onSubmit,
  children,
  isLoading,
  isValidForm,
  buttonText,
}) => {
  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      children={children}
      background="light"
    >
      <div className="popup__container">
        <button
          onClick={onClose}
          type="button"
          className="popup__close element-hover"
          aria-label="Закрыть"
        />
        <h2 className="popup__title">{title}</h2>
        <form name={name} onSubmit={onSubmit} noValidate className="form">
          {children}
          <button
            type="submit"
            disabled={isLoading}
            className={`form__submit ${!isValidForm && "form__submit_disable"}`}
            aria-label={buttonText}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </Popup>
  );
};

export default PopupWithForm;
