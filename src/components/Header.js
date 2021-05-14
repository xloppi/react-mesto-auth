import logo from '../images/logo.svg';
import {Route, Switch, Link} from "react-router-dom";

function Header({ onLogout, userEmail }) {
    return (
      <header className="header">
        <img className="header__logo" src={logo} alt="логотип страницы Место" />
        <nav className="header__navigation">
          <Switch>
            <Route path="/register">
              <Link to='/login'>
                Войти
              </Link>
            </Route>
            <Route path="/login">
              <Link to='/register'>
                Регистрация
              </Link>
            </Route>
            <Route path="/">
              <p>{userEmail}</p>
              <button onClick={onLogout}>Выйти</button>
            </Route>
          </Switch>
        </nav>
      </header>
    );
}

export default Header;
