import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(false)
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
  return (
    <div className="App">
           <div className="page">
        <title>Mesto</title>
        <Header />
        <Main  
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick = {handleCardClick}

        />
        <Footer className="footer" />
        <PopupWithForm name="profile" title="Редактировать профиль" isOpen={isEditProfilePopupOpen } onClose = {closeAllPopups}>
        <label className="popup__profile-info">
          <input type="text" id="popup__name" className="popup__input popup__input_edit" name="name" placeholder="Имя"
            defaultValue="Жак-Ив Кусто" required="" minLength={2} maxLength={40}
          />
          <span className="popup__name-error" />
        </label>
        <label className="popup__profile-info">
          <input type="text" id="popup__info" className="popup__input popup__input_edit" name="subtitle"
            placeholder="Кратко о себе" defaultValue="Исследователь океана" required="" minLength={2} maxLength={200}
          />
          <span className="popup__info-error" />
        </label>
        </PopupWithForm> 

        <PopupWithForm name="add" title="Новое место" isOpen={isAddPlacePopupOpen} onClose = {closeAllPopups} >
        <label className="popup__profile-info">
          <input type="text" id="popup__place" className="popup__input popup__input_add"
            name="name_add" placeholder="Название" defaultValue="" minLength={2} maxLength={40}
            required=""
          />
          <span className="popup__place-error" />
        </label>
        <label className="popup__profile-info">
          <input type="url" id="popup__src" className="popup__input popup__input_add" name="src_add"
            placeholder="Ссылка на картинку" defaultValue="" required=""
          />
          <span className="popup__src-error" />
        </label>   
        </PopupWithForm> 

        <PopupWithForm name="avatar" title="Обновить аватар"  isOpen={isEditAvatarPopupOpen} onClose = {closeAllPopups}>
        <label className="popup__profile-info">
          <input type="url" id="popup__avatar" className="popup__input popup__input_avatar" name="avatar_input"
            placeholder="Ссылка на картинку" defaultValue="https://cdn.getyourguide.com/img/location/5457947d8d6b8.jpeg/88.jpg"
            required=""
          />
          <span className="popup__avatar-error" />
        </label>
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        </div>
    </div>
  );
}

export default App;
