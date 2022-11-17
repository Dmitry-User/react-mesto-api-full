import { Link } from "react-router-dom";
import useForm from "../hooks/useForm";
import PasswordInput from "./PasswordInput";
const initValues = { password: "", email: "" };

const Register = ({ onRegister, isLoading }) => {
  const buttonText = isLoading ? "Регистрация..." : "Зарегистрироваться";
  const { values, handleChange, errors, isValidForm } = useForm(initValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, email } = values;
    if (!password || !email) return;
    onRegister(password, email);
  };

  return (
    <section className="register">
      <h2 className="register__title">Регистрация</h2>
      <form className="form register__form" noValidate onSubmit={handleSubmit}>
        <label>
          <input
            type="email"
            value={values.email}
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="register__input"
          />
          <span className="form__error">{errors.email}</span>
        </label>
        <label>
          <PasswordInput
            isValue={values.password}
            onChange={handleChange}
          />
          <span className="form__error">{errors.password}</span>
        </label>
        <button
          type="submit"
          disabled={isLoading}
          className={`register__submit ${!isValidForm && "register__submit_disable"}`}
          aria-label={buttonText}
        >
          {buttonText}
        </button>
      </form>
      <div className="register__signin">
        <p className="register__signin-text">Уже зарегистрированы?&ensp;</p>
        <Link to="/sign-in" className="register__login-link element-hover">
          Войти
        </Link>
      </div>
    </section>
  );
};

export default Register;
