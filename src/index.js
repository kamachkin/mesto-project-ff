import './pages/index.css';
import { createCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getUserInfo, getCards, updateUserInfo, updateUserAvatar, addCard, likeCard, deleteCard } from './components/api.js';

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  inputErrorActive: 'popup__input-error_active',
  errorClass: 'popup__error_visible',
  buttonInactive: 'button_inactive',
};

enableValidation(validationConfig);

const popupImage = document.querySelector('.popup_type_image');
const popupEditImage = document.querySelector('.popup_type_edit-image');
const placesList = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarEditButton = document.querySelector('.profile__image');
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const descriptionInput = popupEdit.querySelector('.popup__input_type_description');
const formEditProfile = popupEdit.querySelector('.popup__form[name="edit-profile"]');
const formNewPlace = popupNewCard.querySelector('.popup__form[name="new-place"]');
const formEditProfileImage = popupEditImage.querySelector('.popup__form[name="edit-profile-image"]');

function renderUserInfo(data) {
  console.log('Отображение данных пользователя:', data);
  profileTitle.textContent = data.name;
  profileDescription.textContent = data.about;
  profileAvatar.style.backgroundImage = `url(${data.avatar})`;
}

function renderCards(cards, userId) {
  console.log('Отображение карточек:', cards);
  if (cards.length === 0) {
    console.log('Нет карточек для отображения.');
  } else {
    placesList.innerHTML = '';
    cards.forEach(cardData => {
      const cardElement = createCard(cardData, handleLikeCard, handleDeleteCard, openImagePopup, userId);
      placesList.append(cardElement);
    });
  }
}

function renderLoading(isLoading, form, buttonText = 'Сохранить') {
  const button = form.querySelector('.popup__button');
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = buttonText;
  }
}

popups.forEach(popup => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close')) {
      closeModal(popup);
    }
  });
});

editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
  openModal(popupEdit);
});

addButton.addEventListener('click', () => {
  formNewPlace.reset();
  clearValidation(formNewPlace, validationConfig);
  openModal(popupNewCard);
});

avatarEditButton.addEventListener('click', () => {
  formEditProfileImage.reset();
  clearValidation(formEditProfileImage, validationConfig);
  openModal(popupEditImage);
});

formEditProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderLoading(true, formEditProfile);
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
      renderLoading(false, formEditProfile);
    });
});

formEditProfileImage.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderLoading(true, formEditProfileImage);
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
      renderLoading(false, formEditProfileImage);
    });
});

formNewPlace.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderLoading(true, formNewPlace, 'Создать');
  const placeName = formNewPlace.querySelector('.popup__input_type_card-name').value;
  const placeLink = formNewPlace.querySelector('.popup__input_type_url').value;

  addCard(placeName, placeLink)
    .then(newCard => {
      const cardElement = createCard(newCard, handleLikeCard, handleDeleteCard, openImagePopup, newCard.owner._id);
      placesList.prepend(cardElement);
      closeModal(popupNewCard);
    })
    .catch(err => {
      console.log('Ошибка при добавлении новой карточки:', err);
    })
    .finally(() => {
      renderLoading(false, formNewPlace, 'Создать');
    });
});

function handleLikeCard(likeButton, cardId, likeCount) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  likeCard(cardId, isLiked)
    .then(data => {
      likeButton.classList.toggle('card__like-button_is-active');
      likeCount.textContent = data.likes.length;
    })
    .catch(err => {
      console.log('Ошибка при лайке карточки:', err);
    });
}

function handleDeleteCard(cardElement, cardId) {
  deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch(err => {
      console.log('Ошибка при удалении карточки:', err);
    });
}

export function openImagePopup(link, name) {
  const popupImageElement = popupImage.querySelector('.popup__image');
  const popupCaption = popupImage.querySelector('.popup__caption');
  popupImageElement.src = link;
  popupImageElement.alt = name;
  popupCaption.textContent = name;
  openModal(popupImage);
}

Promise.all([getUserInfo(), getCards()])
  .then(([userData, cardsData]) => {
    console.log('Данные пользователя и карточки успешно получены');
    renderUserInfo(userData);
    renderCards(cardsData, userData._id);
  })
  .catch(err => {
    console.log('Ошибка при инициализации данных:', err);
  });
