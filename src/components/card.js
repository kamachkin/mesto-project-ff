import {cohortId, token, headers} from './api';
export function createCard(cardData, likeCard, deleteCard, openImagePopup, userId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count'); // Элемент для количества лайков

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCount.textContent = cardData.likes.length;

  // Отображаем кнопку удаления только для карточек, созданных текущим пользователем
  if (cardData.owner._id === userId) {
    deleteButton.style.display = 'block';
    deleteButton.addEventListener('click', () => {
      deleteCard(cardElement, cardData._id);
    });
  } else {
    deleteButton.style.display = 'none';
  }

  likeButton.addEventListener('click', () => {
    likeCard(likeButton, cardData._id, likeCount);
  });

  cardImage.addEventListener('click', () => {
    openImagePopup(cardData.link, cardData.name);
  });

  return cardElement;
}