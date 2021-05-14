import logo from '../images/logo.svg';
import {Route, Switch, Link} from "react-router-dom";

function Header({ onLogout, userEmail }) {
    return (
      <header className="header">
        <img className="header__logo" src={logo} alt="логотип страницы Место" />
        <nav className="header__navigation">
          <div className="header__navigation-container">
            <Switch>
              <Route path="/register">
                <Link className="header__link" to='/login'>
                  Войти
                </Link>
              </Route>
              <Route path="/login">
                <Link className="header__link" to='/register'>
                  Регистрация
                </Link>
              </Route>
              <Route path="/">
                  <p>{userEmail}</p>
                  <button className="header__button-logout" onClick={onLogout}>Выйти</button>
              </Route>
            </Switch>
          </div>
        </nav>
      </header>
    );
}

export default Header;
