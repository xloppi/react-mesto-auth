import success from '../images'
import error from '../images'

function InfoTooltip() {
  return(
    <section className={`popup popup_type_${props.name} ${props.isOpen && 'popup_display_flex'}`}>
      <div className="popup__container">
        <img src=""></img>
        <h2 className="popup__title">{props.title}</h2>
        <button type="button" className={`popup__close popup__close_type_${props.name}`} onClick={props.onClose}></button>
      </div>
    </section>
  )
}
