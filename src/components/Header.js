import logo from '../images/logo.svg';
import {Route, Switch} from "react-router-dom";

function Header() {
    return (
      <header className="header">
        <img className="header__logo" src={logo} alt="логотип страницы Место" />
        <nav className="header__navigation">
          <Switch>
            <Route path="/register">
              <p>Войти</p>
            </Route>
            <Route path="/login">
              <p>Регистрация</p>
            </Route>
            <Route path="/main">
              <p>email</p>
              <button>Выйти</button>
            </Route>
          </Switch>
        </nav>
      </header>
    );
}

export default Header;
