import { useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import logo from "../images/logo.svg";
import Menu from "./Menu";

const Header = ({ emailUser, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((state) => !state);
  };

  const handleLogoutOfMenu = () => {
    onLogout();
    toggleMenu();
  };

  return (
    <>
      <Menu
        isMenuOpen={isMenuOpen}
        emailUser={emailUser}
        onLogout={handleLogoutOfMenu}
      />
      <header className="header">
        <img src={logo} alt="Логотип" className="header__logo" />
        <Switch>
          <Route exact path="/">
            <div className="header__info">
              <p className="header__email">{emailUser}</p>
              <button
                type="button"
                onClick={onLogout}
                className="header__button element-hover"
              >
                Выйти
              </button>
            </div>
            <div
              className={`header__burger-button ${isMenuOpen ? "header__burger-button_is-click" : ""}`}
              onClick={toggleMenu}
            >
              <span></span>
            </div>
          </Route>
          <Route path="/sign-up">
            <Link to="/sign-in" className="header__link element-hover">
              Войти
            </Link>
          </Route>
          <Route path="/sign-in">
            <Link to="/sign-up" className="header__link element-hover">
              Регистрация
            </Link>
          </Route>
        </Switch>
      </header>
    </>
  );
};

export default Header;
