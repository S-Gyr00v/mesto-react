import React from 'react'
export default function Card({card,onCardClick}) 

{
  function handleClick() {
    onCardClick(card);
  }

  return (
<article className="card" >
  <img
    className="card__image"
     src={card.link}
     alt={card.name}
     onClick={handleClick} 
  />
  <button className="card__delete-button" />
  <div className="card__container">
    <h2 className="card__name">{card.name}</h2>
    <div className="card__like-box">
      <button className="card__like-button" type="button" />
      <span className="card__like-count"> {card.likes.length}  </span> 
    </div>
  </div>
</article>
      )}

