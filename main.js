(()=>{"use strict";function e(e,t,n,o){var r=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),c=r.querySelector(".card__image"),p=r.querySelector(".card__title"),u=r.querySelector(".card__delete-button"),a=r.querySelector(".card__like-button");return c.src=e.link,c.alt=e.name,p.textContent=e.name,u.addEventListener("click",(function(){n(r)})),a.addEventListener("click",(function(){t(a)})),c.addEventListener("click",(function(){o(e.link,e.name)})),r}function t(e){e.classList.toggle("card__like-button_is-active")}function n(e){e.remove()}function o(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",c)}function r(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",c)}function c(e){"Escape"===e.key&&r(document.querySelector(".popup_is-opened"))}var p=document.querySelector(".popup_type_image"),u=document.querySelector(".places__list"),a=document.querySelector(".profile__edit-button"),i=document.querySelector(".profile__add-button"),d=document.querySelectorAll(".popup"),s=document.querySelector(".popup_type_edit"),l=document.querySelector(".popup_type_new-card"),_=document.querySelector(".profile__title"),m=document.querySelector(".profile__description"),y=s.querySelector(".popup__input_type_name"),v=s.querySelector(".popup__input_type_description"),f=s.querySelector('.popup__form[name="edit-profile"]'),k=l.querySelector('.popup__form[name="new-place"]');function q(e,t){var n=p.querySelector(".popup__image"),r=p.querySelector(".popup__caption");n.src=e,n.alt=t,r.textContent=t,o(p)}d.forEach((function(e){e.addEventListener("mousedown",(function(t){(t.target.classList.contains("popup_is-opened")||t.target.classList.contains("popup__close"))&&r(e)}))})),a.addEventListener("click",(function(){y.value=_.textContent,v.value=m.textContent,o(s)})),i.addEventListener("click",(function(){o(l)})),f.addEventListener("submit",(function(e){e.preventDefault(),_.textContent=y.value,m.textContent=v.value,r(s)})),k.addEventListener("submit",(function(o){o.preventDefault();var c=e({name:k.querySelector(".popup__input_type_card-name").value,link:k.querySelector(".popup__input_type_url").value},t,n);u.prepend(c),k.reset(),r(l)})),[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(o){var r=e(o,t,n,q);u.append(r)}))})();