import logo from '../images/logo.svg';
import {Route, Switch, Link} from "react-router-dom";

function Header() {
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
