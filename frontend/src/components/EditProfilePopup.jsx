import { useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

const EditProfilePopup = ({
  isOpen,
  onClose,
  onUpdateUser,
  isLoading,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const buttonText = isLoading ? "Сохранение..." : "Сохранить";
  const { values, setValues, errors, handleChange, isValidForm, resetForm } = useForm(currentUser);

  useEffect(() => {
    if (isOpen) {
      setValues(currentUser);
      resetForm();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(values);
  };

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isValidForm={isValidForm}
      buttonText={buttonText}
    >
      <label>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
          className="form__input"
        />
        <span className="form__error">{errors.name}</span>
      </label>
      <label>
        <input
          type="text"
          name="about"
          value={values.about}
          onChange={handleChange}
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          required
          className="form__input"
        />
        <span className="form__error">{errors.about}</span>
      </label>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
