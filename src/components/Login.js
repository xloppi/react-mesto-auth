

function Login () {
  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form">
        <input name="email" className="auth__input" placeholder="Email"></input>
        <input name="password" className="auth__input" placeholder="Пароль"></input>
      </form>
      <button className="auth__submit-button">Войти</button>
    </div>
  )
}

export default Login;
