// src/components/modal.js

const popupImage = document.querySelector('.popup_type_image');

export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEscape);
}

export function closeModal(popup) {
  popup.addEventListener('transitionend', onTransitionEnd);
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEscape);
}

function onTransitionEnd(evt) {
  if (evt.propertyName === 'opacity' && !evt.target.classList.contains('popup_is-opened')) {
    evt.target.removeEventListener('transitionend', onTransitionEnd);
  }
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
}
