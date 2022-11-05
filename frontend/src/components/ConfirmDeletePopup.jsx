import PopupWithForm from "./PopupWithForm";

const ConfirmDeletePopup = ({
  isOpen,
  onClose,
  isLoading,
  onDeleteCard,
}) => {
  const buttonText = isLoading ? "Удаление..." : "Удалить";

  const handleSubmit = (e) => {
    e.preventDefault();
    onDeleteCard();
  };

  return (
    <PopupWithForm
      name="delete-card"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isValidForm={true}
      buttonText={buttonText}
    />
  );
};

export default ConfirmDeletePopup;
