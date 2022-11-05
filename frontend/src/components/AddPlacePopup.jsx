import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

const initValue = { name: "", link: "" };

const AddPlacePopup = ({
  isOpen,
  onClose,
  onAddPlace,
  isLoading,
}) => {
  const buttonText = isLoading ? "Сохранение..." : "Создать";
  const { values, setValues, handleChange, errors, isValidForm, resetForm } = useForm(initValue);

  useEffect(() => {
    if (isOpen) {
      setValues(initValue);
      resetForm();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace(values);
  };

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
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
          value={values.name}
          onChange={handleChange}
          name="name"
          minLength="2"
          maxLength="30"
          placeholder="Название"
          required
          className="form__input"
        />
        <span className="form__error">{errors.name}</span>
      </label>
      <label>
        <input
          type="url"
          value={values.link}
          onChange={handleChange}
          name="link"
          placeholder="Ссылка на фото"
          required
          className="form__input"
        />
        <span className="form__error">{errors.link}</span>
      </label>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
