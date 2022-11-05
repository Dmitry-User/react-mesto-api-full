import { Link } from "react-router-dom";

const Menu = ({ isMenuOpen, emailUser, onLogout }) => {

  return (
    <div className={`menu ${!isMenuOpen ? "menu_hiden" : ""}`}>
      <p className="menu__email">{emailUser}</p>
      <Link
        to="/sign-in"
        onClick={onLogout}
        className="menu__link element-hover"
      >
        Выйти
      </Link>
    </div>
  );
};

export default Menu;
