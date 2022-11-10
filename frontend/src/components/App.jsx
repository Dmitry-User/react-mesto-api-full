import { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";
import ImagePopup from "./ImagePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import * as api from "../utils/Api";
import * as auth from "../utils/Auth";
import InfoTooltip from "./InfoTooltip";
import LoadingPage from "./LoadingPage";

const App = () => {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({ name: "", about: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [cardId, setCardId] = useState("");
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setConfirmDeletePopupOpen] = useState(false);
  const [isPlacePopupOpen, setIsPlacePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [loggedIn, setLoggetIn] = useState(false);
  const [emailUser, setEmailUser] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(true);

  useEffect(() => {
    setIsLoadingPage(true);
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userInfo, cards]) => {
        setCurrentUser(userInfo);
        setCards(cards);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoadingPage(false));
  }, [loggedIn]);

  useEffect(() => {
    const checkToken = () => {
      auth
        .getContent()
        .then((res) => {
          setEmailUser(res.email);
          setLoggetIn(true);
          history.push("/");
        })
        .catch((err) => console.log(err));
    };
    checkToken();
  }, []);

  const handleUpdateUser = ({ name, about }) => {
    setIsLoading(true);
    api
      .setUserInfo(name, about)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleUpdateAvatar = ({ avatar }) => {
    setIsLoading(true);
    api
      .setAvatar(avatar)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    setIsLoading(true);
    api
      .addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelete = () => {
    setIsLoading(true);
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((newCards) => newCards.filter((c) => c._id !== cardId));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleDeleteCardClick = (cardId) => {
    setConfirmDeletePopupOpen(!isConfirmDeletePopupOpen);
    setCardId(cardId);
  };

  const handleEditAvatarClick = () =>
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);

  const handleEditProfileClick = () =>
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);

  const handleAddPlaceClick = () =>
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsPlacePopupOpen(!isPlacePopupOpen);
  };

  const handleRegister = (password, email) => {
    return auth
      .register(password, email)
      .then(() => {
        handleInfoTooltip(true);
        history.push("/sign-in");
      })
      .catch((err) => {
        handleInfoTooltip(false);
        console.log(err);
      });
  };

  const handleLogin = (password, email) => {
    return auth
      .authorize(password, email)
      .then(() => {
        setEmailUser(email);
        setLoggetIn(true);
        history.push("/");
      })
      .catch((err) => {
        handleInfoTooltip(false);
        console.log(err);
      });
  };

  const handleLogout = () => {
    auth
      .logout()
      .then(() => {
        setEmailUser("");
        setLoggetIn(false);
        history.push("/sign-in");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInfoTooltip = (status) => {
    setIsSuccess(status);
    setIsInfoTooltipOpen(!isInfoTooltipOpen);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setConfirmDeletePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setIsPlacePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setCardId("");
  };

  return isLoadingPage ? (
    <LoadingPage />
  ) : (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="wrapper">
        <Header
          emailUser={emailUser}
          onLogout={handleLogout}
        />
        <main className="content">
          <Switch>
            <Route path="/sign-in">
              <Login onLogin={handleLogin} />
            </Route>
            <Route path="/sign-up">
              <Register onRegister={handleRegister} />
            </Route>
            <ProtectedRoute path="/" loggedIn={loggedIn}>
              <Main
                cards={cards}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteCardClick}
                onCardClick={handleCardClick}
                onAddCard={handleAddPlaceClick}
              />
            </ProtectedRoute>
          </Switch>
        </main>
        <Footer />
      </div>

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoading}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        isLoading={isLoading}
      />
      <ConfirmDeletePopup
        isOpen={isConfirmDeletePopupOpen}
        onClose={closeAllPopups}
        onDeleteCard={handleCardDelete}
        isLoading={isLoading}
      />
      <ImagePopup
        card={selectedCard}
        isOpen={isPlacePopupOpen}
        onClose={closeAllPopups}
      />
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        isSuccess={isSuccess}
      />
    </CurrentUserContext.Provider>
  );
};

export default App;
