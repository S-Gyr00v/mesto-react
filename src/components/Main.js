import React, {useState, useEffect} from 'react'

import addImage from '../../src/images/profile-button-plus.svg'; 
import pencilImage from '../../src/images/profile-button-pen.svg'; 
import {api} from '../utils/Api'
import Card from './Card'
  

export default function Main({onEditProfile,onAddPlace,onEditAvatar, onCardClick}) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);
 
  useEffect(() => {
    api.getProfile()
    .then((res) => {
      setUserName(res.name);
      setUserDescription(res.about);
      setUserAvatar(res.avatar);
  }).catch((err) => console.log(err))},[]);
  
  useEffect(() => {
     api.getCards()
    .then((elements) => {
      const renderCard = elements.map((data) => {
        return {
          name: data.name,
          link: data.link,
          likes: data.likes,
          id: data._id
        };
      });
      setCards(renderCard);
    }).catch((err) => console.log(err))},[]);
     
   return (
    <div className="content">
     <section className="profile">
      <button className="profile__avatar-box" onClick = {onEditAvatar} >
        <img
          className="profile__avatar"
          src={userAvatar}
          alt="Аватар"
        />
         </button>
            <div className="profile__box">
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <div className="profile__button">
            <button type="button" className="profile__edit" onClick = {onEditProfile} >
            <img alt='Редактировать' src={ pencilImage } className="profile__pencil" / >  
            </button>
          </div>
        </div>
        <p className="profile__subtitle">{userDescription}</p>
      </div>
      <div className="profile__add">
        <button type="button" className="profile__add-button" onClick = {onAddPlace}>
        <img alt='Добавить' src={addImage} className="profile__add-image"/>
        </button>
      </div>
    </section>

    <section className="newelements">
      {cards.map((card) => {
        return (
          <Card key={card.id} card={card} onCardClick={onCardClick}/>

          );
        })}
      </section>

</div>
  )}
