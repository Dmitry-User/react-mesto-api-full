import useForm from "../hooks/useForm";
import PasswordInput from "./PasswordInput";
const initValues = { password: "", email: "" };

const Login = ({ onLogin }) => {
  const { values, handleChange, errors, isValidForm } = useForm(initValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, email } = values;
    if (!password || !email) return;
    onLogin(password, email);
  };

  return (
    <section className="login">
      <h2 className="login__title">Вход</h2>
      <form className="form login__form" noValidate onSubmit={handleSubmit}>
        <label>
          <input
            type="email"
            value={values.email}
            name="email"
            onChange={handleChange}
            placeholder="Email"
            required
            className="login__input"
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
          aria-label="Войти"
          className={`login__submit ${!isValidForm && "login__submit_disable"}`}
        >
          Войти
        </button>
      </form>
    </section>
  );
};

export default Login;
