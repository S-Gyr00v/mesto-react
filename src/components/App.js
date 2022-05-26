import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";

import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {api} from '../utils/Api'
function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }
    const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }
    const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
    
   }
   const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard(null)
  }
   function handleCardClick (card) {
    setSelectedCard(card)
  }

  function handleUpdateUser({name,about}) {
    api.editProfile(name,about)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups()})
    .catch((err) => console.log(err))}

    function handleUpdateAvatar({avatar}) {
      api.updateAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups()})
      .catch((err) => console.log(err))}

  useEffect(() => {
    api.getProfile()
    .then((res) => {
      setCurrentUser(res)
  }).catch((err) => console.log(err))},[]);
  
  useEffect(() => {
    api.getCards()
   .then((renderCard) => {
      setCards(renderCard);
   }).catch((err) => console.log(err))},[]);


   function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
        // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch((err) => console.log(err))
}


function handleAddPlaceSubmit({ name, link }) {
  api.addCard(name, link)
  .then(newCard => {
    setCards([newCard, ...cards]);
    closeAllPopups()})
  .catch((err) => console.log(err))}



function handleCardDelete(card) {
  api.deleteCard(card._id)
  .then(() => {setCards((state) => state.filter((с) => с._id !== card._id))})
  .catch((err) => console.log(err))}


  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="App">
           <div className="page">
        <title>Mesto</title>
        <Header />
        <Main  
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick = {handleCardClick}
        cards={cards}
        setCards = {setCards}
        onCardDelete = { handleCardDelete}
        onCardLike = { handleCardLike}
        />


        <Footer className="footer" />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddPlaceSubmit}/>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>


        </div>
      </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
