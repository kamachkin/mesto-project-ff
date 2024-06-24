// src/index.js

import './pages/index.css';
import { createCard, likeCard, deleteCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { initialCards } from './components/cards.js';

const popupImage = document.querySelector('.popup_type_image');
const placesList = document.querySelector('.places__list');


  const editButton = document.querySelector('.profile__edit-button');
  const addButton = document.querySelector('.profile__add-button');
  const popups = document.querySelectorAll('.popup');
  const popupEdit = document.querySelector('.popup_type_edit');
  const popupNewCard = document.querySelector('.popup_type_new-card');
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  const nameInput = popupEdit.querySelector('.popup__input_type_name');
  const descriptionInput = popupEdit.querySelector('.popup__input_type_description');
  const formEditProfile = popupEdit.querySelector('.popup__form[name="edit-profile"]');
  const formNewPlace = popupNewCard.querySelector('.popup__form[name="new-place"]');

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
    openModal(popupEdit);
  });

  addButton.addEventListener('click', () => {
    openModal(popupNewCard);
  });

  formEditProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closeModal(popupEdit);
  });

  formNewPlace.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const placeName = formNewPlace.querySelector('.popup__input_type_card-name').value;
    const placeLink = formNewPlace.querySelector('.popup__input_type_url').value;
    const newCard = createCard({ name: placeName, link: placeLink }, likeCard, deleteCard);
    placesList.prepend(newCard);
    formNewPlace.reset();
    closeModal(popupNewCard);
  });

  initialCards.forEach(cardData => {
    const cardElement = createCard(cardData, likeCard, deleteCard, openImagePopup);
    placesList.append(cardElement);
  });


  export function openImagePopup(link, name) {
    const popupImageElement = popupImage.querySelector('.popup__image');
    const popupCaption = popupImage.querySelector('.popup__caption');
    popupImageElement.src = link;
    popupImageElement.alt = name;
    popupCaption.textContent = name;
    openModal(popupImage);
  }
