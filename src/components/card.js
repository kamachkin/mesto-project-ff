import {cohortId, token, headers} from '../index.js';
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

// Функция для лайка карточки
export function likeCard(likeButton, cardId, likeCount) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  const method = isLiked ? 'DELETE' : 'PUT';

  fetch(`https://nomoreparties.co/v1/${cohortId}/cards/likes/${cardId}`, {
    method: method,
    headers: headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then(data => {
    likeButton.classList.toggle('card__like-button_is-active');
    likeCount.textContent = data.likes.length;
  })
  .catch(err => {
    console.log('Ошибка при лайке карточки:', err);
  });
}

// Функция для удаления карточки
export function deleteCard(cardElement, cardId) {
  fetch(`https://nomoreparties.co/v1/${cohortId}/cards/${cardId}`, {
    method: 'DELETE',
    headers: headers
  })
  .then(res => {
    if (res.ok) {
      cardElement.remove();
      return;
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch(err => {
    console.log('Ошибка при удалении карточки:', err);
  });
}
