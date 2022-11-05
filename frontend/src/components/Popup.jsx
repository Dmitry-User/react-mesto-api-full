import { useEffect } from "react";

const Popup = ({ isOpen, onClose, children, background }) => {
  useEffect(() => {
    const handleCloseByEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) document.addEventListener("keydown", handleCloseByEsc);

    return () => {
      document.removeEventListener("keydown", handleCloseByEsc);
    };
  }, [isOpen, onClose]);

  const handleCloseByOverlay = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onMouseDown={handleCloseByOverlay}
      className={`popup popup_background_${background} ${
        isOpen ? "popup_is-open" : ""
      }`}
    >
      {children}
    </div>
  );
};

export default Popup;
