import success_img from '../images/success_img.svg';
import error_img from '../images/error_img.svg';

function InfoTooltip({isOpen, onClose, success, message}) {
  return(
    <section className={`popup popup_type_tooltype ${isOpen && 'popup_display_flex'}`}>
      <div className="popup__container">
        <img src={success ? success_img : error_img} alt={success ? "успешно" : "ошибка"}></img>
        <h2 className="popup__title">{message}</h2>
        <button type="button" className={`popup__close popup__close_tooltip}`} onClick={onClose}></button>
      </div>
    </section>
  )
}

export default InfoTooltip;
