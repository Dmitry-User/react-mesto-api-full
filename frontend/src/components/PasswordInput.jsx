import { useState } from "react";

const PasswordInput = ({ value, onChange }) => {
  const [isHiden, setIsHiden] = useState(true);

  const toggleViewPassword = () => setIsHiden(state => !state);

  const type = isHiden ? "password" : "text";
  const iconClass = isHiden ? "pass-icon_type_unvisible" : "pass-icon_type_visible";

  return (
    <>
      <input
        type={type}
        value={value}
        name="password"
        placeholder="Пароль"
        required
        onChange={onChange}
        className="pass-input"
      />
      <span className={`pass-icon ${iconClass}`} onClick={toggleViewPassword} />
    </>
  );
};

export default PasswordInput;