export const token = '48074032-39e3-425f-b3b5-856827e3fa6b';
export const cohortId = 'wff-cohort-16';

export const headers = {
  authorization: token,
  'Content-Type': 'application/json'
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function getUserInfo() {
  console.log('Запрос данных пользователя отправлен');
  return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
    headers: headers
  })
  .then(checkResponse);
}

// Функция для загрузки карточек
export function getCards() {
  console.log('Запрос карточек отправлен');
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
    headers: headers
  })
  .then(checkResponse);
}

// Функция для обновления данных пользователя
export function updateUserInfo(name, about) {
  console.log('Отправка обновленных данных пользователя');
  return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(checkResponse);
}

// Функция для обновления аватара пользователя
export function updateUserAvatar(avatarUrl) {
  console.log('Отправка обновленного аватара пользователя');
  return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me/avatar`, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify({
      avatar: avatarUrl
    })
  })
  .then(checkResponse);
}

// Функция для добавления новой карточки
export function addCard(name, link) {
  console.log('Отправка новой карточки на сервер');
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(checkResponse);
}

export function likeCard(likeButton, cardId, likeCount) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  const method = isLiked ? 'DELETE' : 'PUT';

  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/likes/${cardId}`, {
    method: method,
    headers: headers
  })
  .then(checkResponse)
  .then(data => {
    likeButton.classList.toggle('card__like-button_is-active');
    likeCount.textContent = data.likes.length;
  });
}

// Функция для удаления карточки
export function deleteCard(cardElement, cardId) {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/${cardId}`, {
    method: 'DELETE',
    headers: headers
  })
  .then(checkResponse)
  .then(() => {
    cardElement.remove();
  });
}
