import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import api from '../utils/api';
import Login from './Login';
import Register from './Register';
import auth from '../utils/auth';
import ProtectedRoute from './ProtectedRoute';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isTooltipOpen, setTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [successfulRequest, setSuccessfulRequest] = useState(false);
  const [messageTooltip, setMessageTooltip] = useState('');

  useEffect(() => {
    api.getUserInfo()
    .then(res => {
      setCurrentUser(res);
    })
    .catch((err) => {
      console.log('Ошибка: ', err);
    });
  }, [])

  useEffect(() => {
    api.getInitialCards()
    .then(data => {
      setCards(data);
    })
    .catch((err) => {
      console.log('Ошибка: ', err);
    });
  }, [])

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log('Ошибка: ', err);
    });
  }

  const handleCardDelete = (card) => {
    api.deletePlaceTask(card._id).then((res) => {
      setCards((state) => state.filter((c) => c._id !== card._id))
    })
    .catch((err) => {
      console.log('Ошибка: ', err);
    });
  }

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  }

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({});
    setTooltipOpen(false);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const handleUpdateUser = (data) => {
    api.editProfileTask(data)
    .then(res => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log('Ошибка: ', err);
    });
  }

  const handleUpdateAvatar = (data) => {
    api.editAvatarTask(data)
    .then(res => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log('Ошибка: ', err);
    });
  }

  const handleAddPlaceSubmit = (data) => {
    api.addPlaceTask(data)
    .then(newCard => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log('Ошибка: ', err);
    });
  }

  const register = (data) => {
    return auth.register(data)
      .then(() => {
        setSuccessfulRequest(true);
        setTooltipOpen(true);
      })
      .catch(() => {
        setSuccessfulRequest(false);
        setTooltipOpen(true);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Header />
          <Switch>
            <ProtectedRoute
            exact path="/"
            component={Main}
            loggedIn={loggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            />
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register onRegister={(data) =>{
                console.log(data)
              }} />
            </Route>
            <Route>
            {loggedIn ? (
              <Redirect to="/main" />
            ) : (
              <Redirect to="/login" />
            )}
            </Route>
          </Switch>
          <Footer />

          {/*<Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer /> */}
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
          <PopupWithForm name="submit-delete" title="Вы уверены?" buttonTitle="Да" />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip
            isOpen={isTooltipOpen}
            onClose={closeAllPopups}
            success={successfulRequest}
            message={messageTooltip}/>
        </div>
      </div>
    </CurrentUserContext.Provider>

  );
}

export default App;
