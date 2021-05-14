import { Link } from 'react-router-dom';

function Login () {
  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form">
        <input name="email" className="auth__input" placeholder="Email"></input>
        <input name="password" className="auth__input" placeholder="Пароль"></input>
      </form>
      <button className="auth__submit-button">Зарегистрироваться</button>
      <div>
        <p>Уже зарегистрированы?</p>
        <Link to="/login">
          Войти
        </Link>
      </div>
    </div>
  )
}

export default Login;
