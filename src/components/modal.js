// src/components/modal.js

const popupImage = document.querySelector('.popup_type_image');

export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEscape);
}

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEscape);
}

export function openImagePopup(link, name) {
  const popupImageElement = popupImage.querySelector('.popup__image');
  const popupCaption = popupImage.querySelector('.popup__caption');
  popupImageElement.src = link;
  popupImageElement.alt = name;
  popupCaption.textContent = name;
  openModal(popupImage);
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
}
