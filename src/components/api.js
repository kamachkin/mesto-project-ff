export const token = '48074032-39e3-425f-b3b5-856827e3fa6b';
export const cohortId = 'wff-cohort-16';

export const headers = {
  authorization: token,
  'Content-Type': 'application/json'
};
export function getUserInfo() {
    console.log('Запрос данных пользователя отправлен');
    return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
      headers: headers
    })
    .then(res => {
      if (res.ok) {
        console.log('Данные пользователя получены');
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => {
      console.log('Ошибка при получении данных пользователя:', err);
      throw err;
    });
  }
  
  // Функция для загрузки карточек
  export function getCards() {
    console.log('Запрос карточек отправлен');
    return fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
      headers: headers
    })
    .then(res => {
      if (res.ok) {
        console.log('Карточки получены');
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => {
      console.log('Ошибка при получении карточек:', err);
      throw err;
    });
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
    .then(res => {
      if (res.ok) {
        console.log('Данные пользователя обновлены');
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => {
      console.log('Ошибка при обновлении данных пользователя:', err);
      throw err;
    });
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
    .then(res => {
      if (res.ok) {
        console.log('Аватар пользователя обновлен');
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => {
      console.log('Ошибка при обновлении аватара пользователя:', err);
      throw err;
    });
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
    .then(res => {
      if (res.ok) {
        console.log('Новая карточка успешно добавлена');
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => {
      console.log('Ошибка при добавлении новой карточки:', err);
      throw err;
    });
  }