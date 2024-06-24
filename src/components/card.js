// src/components/card.js



export function createCard(cardData, likeCard, deleteCard, openImagePopup) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement);
  });

  likeButton.addEventListener('click', () => {
    likeCard(likeButton);
  });

  cardImage.addEventListener('click', () => {
    openImagePopup(cardData.link, cardData.name);
  });

  return cardElement;
}
export function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

export function deleteCard(cardElement) {
  cardElement.remove();
}