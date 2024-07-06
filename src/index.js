import './pages/index.css';
import { createCard} from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import {token, cohortId, headers, getUserInfo, getCards, updateUserInfo, updateUserAvatar, addCard, likeCard, deleteCard} from './components/api.js';
// Конфигурация валидации форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Включаем валидацию на всех формах
enableValidation(validationConfig);

// Получаем элементы из DOM
const popupImage = document.querySelector('.popup_type_image');
const popupEditImage = document.querySelector('.popup_type_edit-image');
const placesList = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarEditButton = document.querySelector('.profile__image'); // Кнопка редактирования аватара
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image'); // Элемент аватара
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const descriptionInput = popupEdit.querySelector('.popup__input_type_description');
const formEditProfile = popupEdit.querySelector('.popup__form[name="edit-profile"]');
const formNewPlace = popupNewCard.querySelector('.popup__form[name="new-place"]');
const formEditProfileImage = popupEditImage.querySelector('.popup__form[name="edit-profile-image"]'); // Форма изменения аватара


// Функция для загрузки данных пользователя




// Функция для отображения данных пользователя
function renderUserInfo(data) {
  console.log('Отображение данных пользователя:', data);
  profileTitle.textContent = data.name;
  profileDescription.textContent = data.about;
  profileAvatar.style.backgroundImage = `url(${data.avatar})`; // Устанавливаем background-image
}

// Функция для отображения карточек
function renderCards(cards, userId) {
  console.log('Отображение карточек:', cards);
  if (cards.length === 0) {
    console.log('Нет карточек для отображения.');
  } else {
    placesList.innerHTML = ''; // Очищаем список карточек перед добавлением новых
    cards.forEach(cardData => {
      const cardElement = createCard(cardData, likeCard, deleteCard, openImagePopup, userId);
      placesList.append(cardElement);
    });
  }
}

// Функция для изменения текста кнопки при отправке формы
function renderLoading(isLoading, form, buttonText = 'Сохранить') { // Новая функция для изменения текста кнопки
  const button = form.querySelector('.popup__button');
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = buttonText;
  }
}

// Добавляем обработчик события на все модальные окна
popups.forEach(popup => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close')) {
      closeModal(popup);
    }
  });
});

// Добавляем обработчик события на кнопку редактирования профиля
editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
  openModal(popupEdit);
});

// Добавляем обработчик события на кнопку добавления карточки
addButton.addEventListener('click', () => {
  formNewPlace.reset();
  clearValidation(formNewPlace, validationConfig);
  openModal(popupNewCard);
});

// Добавляем обработчик события на кнопку редактирования аватара
avatarEditButton.addEventListener('click', () => {
  formEditProfileImage.reset();
  clearValidation(formEditProfileImage, validationConfig);
  openModal(popupEditImage);
});

// Добавляем обработчик события на форму редактирования профиля
formEditProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderLoading(true, formEditProfile); // Изменяем текст кнопки на "Сохранение..."
  const newName = nameInput.value;
  const newDescription = descriptionInput.value;
  
  updateUserInfo(newName, newDescription)
    .then(data => {
      renderUserInfo(data);
      closeModal(popupEdit);
    })
    .catch(err => {
      console.log('Ошибка при обновлении данных профиля:', err);
    })
    .finally(() => {
      renderLoading(false, formEditProfile); // Возвращаем текст кнопки
    });
});

// Добавляем обработчик события на форму изменения аватара
formEditProfileImage.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderLoading(true, formEditProfileImage); // Изменяем текст кнопки на "Сохранение..."
  const avatarUrl = formEditProfileImage.querySelector('.popup__input_type_url').value;

  updateUserAvatar(avatarUrl)
    .then(data => {
      renderUserInfo(data);
      closeModal(popupEditImage);
    })
    .catch(err => {
      console.log('Ошибка при обновлении аватара пользователя:', err);
    })
    .finally(() => {
      renderLoading(false, formEditProfileImage); // Возвращаем текст кнопки
    });
});

// Добавляем обработчик события на форму добавления карточки
formNewPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderLoading(true, formNewPlace, 'Создать'); // Изменяем текст кнопки на "Сохранение..."
  const placeName = formNewPlace.querySelector('.popup__input_type_card-name').value;
  const placeLink = formNewPlace.querySelector('.popup__input_type_url').value;
  
  addCard(placeName, placeLink)
    .then(newCard => {
      const cardElement = createCard(newCard, likeCard, deleteCard, openImagePopup, newCard.owner._id);
      placesList.prepend(cardElement);
      closeModal(popupNewCard);
    })
    .catch(err => {
      console.log('Ошибка при добавлении новой карточки:', err);
    })
    .finally(() => {
      renderLoading(false, formNewPlace, 'Создать'); // Возвращаем текст кнопки
    });
});

// Открытие и закрытие модальных окон
export function openImagePopup(link, name) {
  const popupImageElement = popupImage.querySelector('.popup__image');
  const popupCaption = popupImage.querySelector('.popup__caption');
  popupImageElement.src = link;
  popupImageElement.alt = name;
  popupCaption.textContent = name;
  openModal(popupImage);
}

// Инициализация данных
Promise.all([getUserInfo(), getCards()])
  .then(([userData, cardsData]) => {
    console.log('Данные пользователя и карточки успешно получены');
    renderUserInfo(userData);
    renderCards(cardsData, userData._id); // Передаем userId для проверки владельца карточки
  })
  .catch(err => {
    console.log('Ошибка при инициализации данных:', err);
  });



  // Дополнительные вызовы функций

  getUserInfo()
  .then(data => {
    console.log('Данные пользователя:', data);
  })
  .catch(err => {
    console.error('Ошибка в getUserInfo:', err);
  });

  getCards()
  .then(data => {
    console.log('Карточки:', data);
  })
  .catch(err => {
    console.error('Ошибка в getCards:', err);
  }); 

  updateUserInfo()
  .then(data => {
    console.log('Данные пользователя обновлены:', data);
  })
  .catch(err => {
    console.error('Ошибка в updateUserInfo:', err);
  });

  updateUserAvatar()
  .then(data => {
    console.log('Аватар пользователя обновлен:', data);
  })
  .catch(err => {
    console.error('Ошибка в updateUserAvatar:', err);
  });

  addCard()
  .then(data => {
    console.log('Новая карточка добавлена:', data);
  })
  .catch(err => {
    console.error('Ошибка в addCard:', err);
  });
  
  deleteCard()
  .then(data => {
    console.log('Карточка удалена:', data);
  })
  .catch(err => {
    console.error('Ошибка в deleteCard:', err);
  });