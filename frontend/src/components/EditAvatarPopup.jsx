import { useEffect, useRef } from "react";
import useForm from "../hooks/useForm";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({
  isOpen,
  onClose,
  onUpdateAvatar,
  isLoading,
}) => {
  const refValue = useRef();
  const buttonText = isLoading ? "Сохранение..." : "Обновить";
  const { values, setValues, errors, handleChange, isValidForm, resetForm } = useForm({ avatar: "" });

  useEffect(() => {
    if (isOpen) {
      setValues({ avatar: "" });
      resetForm();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: refValue.current.value,
    });
  };

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isValidForm={isValidForm}
      buttonText={buttonText}
    >
      <label>
        <input
          ref={refValue}
          type="url"
          value={values.avatar}
          onChange={handleChange}
          name="avatar"
          placeholder="Ссылка на фото"
          required
          className="form__input"
        />
        <span className="form__error">{errors.avatar}</span>
      </label>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
