(()=>{"use strict";var e="wff-cohort-16",t={authorization:"48074032-39e3-425f-b3b5-856827e3fa6b","Content-Type":"application/json"};function n(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function o(){return console.log("Запрос данных пользователя отправлен"),fetch("https://nomoreparties.co/v1/".concat(e,"/users/me"),{headers:t}).then(n)}function r(){return console.log("Запрос карточек отправлен"),fetch("https://nomoreparties.co/v1/".concat(e,"/cards"),{headers:t}).then(n)}function c(o,r){return console.log("Отправка обновленных данных пользователя"),fetch("https://nomoreparties.co/v1/".concat(e,"/users/me"),{method:"PATCH",headers:t,body:JSON.stringify({name:o,about:r})}).then(n)}function u(o){return console.log("Отправка обновленного аватара пользователя"),fetch("https://nomoreparties.co/v1/".concat(e,"/users/me/avatar"),{method:"PATCH",headers:t,body:JSON.stringify({avatar:o})}).then(n)}function i(o,r){return console.log("Отправка новой карточки на сервер"),fetch("https://nomoreparties.co/v1/".concat(e,"/cards"),{method:"POST",headers:t,body:JSON.stringify({name:o,link:r})}).then(n)}function a(o,r,c){var u=o.classList.contains("card__like-button_is-active")?"DELETE":"PUT";return fetch("https://nomoreparties.co/v1/".concat(e,"/cards/likes/").concat(r),{method:u,headers:t}).then(n).then((function(e){o.classList.toggle("card__like-button_is-active"),c.textContent=e.likes.length}))}function l(o,r){return fetch("https://nomoreparties.co/v1/".concat(e,"/cards/").concat(r),{method:"DELETE",headers:t}).then(n).then((function(){o.remove()}))}function s(e,t,n,o,r){var c=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),u=c.querySelector(".card__image"),i=c.querySelector(".card__title"),a=c.querySelector(".card__delete-button"),l=c.querySelector(".card__like-button"),s=c.querySelector(".card__like-count");return u.src=e.link,u.alt=e.name,i.textContent=e.name,s.textContent=e.likes.length,e.owner._id===r?(a.style.display="block",a.addEventListener("click",(function(){n(c,e._id)}))):a.style.display="none",l.addEventListener("click",(function(){t(l,e._id,s)})),u.addEventListener("click",(function(){o(e.link,e.name)})),c}function p(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",f)}function d(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",f)}function f(e){"Escape"===e.key&&d(document.querySelector(".popup_is-opened"))}var _=function(e,t){var n=e.querySelector(".".concat(t.name,"-error"));t.classList.remove("popup__input_type_error"),n.classList.remove("popup__input-error_active"),n.textContent=""},m=function(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?t.classList.remove("button_inactive"):t.classList.add("button_inactive")},y=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(t){_(e,t)})),m(n,o)};function v(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}var h={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};Array.from(document.querySelectorAll(".popup__form")).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e){var t=Array.from(e.querySelectorAll(".popup__input")),n=e.querySelector(".popup__button");m(t,n),t.forEach((function(o){o.addEventListener("input",(function(){!function(e,t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?_(e,t):function(e,t,n){var o=e.querySelector(".".concat(t.name,"-error"));t.classList.add("popup__input_type_error"),o.textContent=n,o.classList.add("popup__input-error_active")}(e,t,t.validationMessage)}(e,o),m(t,n)}))}))}(e)}));var S=document.querySelector(".popup_type_image"),g=document.querySelector(".popup_type_edit-image"),b=document.querySelector(".places__list"),q=document.querySelector(".profile__edit-button"),L=document.querySelector(".profile__add-button"),E=document.querySelector(".profile__image"),C=document.querySelectorAll(".popup"),k=document.querySelector(".popup_type_edit"),A=document.querySelector(".popup_type_new-card"),x=document.querySelector(".profile__title"),w=document.querySelector(".profile__description"),T=document.querySelector(".profile__image"),j=k.querySelector(".popup__input_type_name"),O=k.querySelector(".popup__input_type_description"),D=k.querySelector('.popup__form[name="edit-profile"]'),I=A.querySelector('.popup__form[name="new-place"]'),P=g.querySelector('.popup__form[name="edit-profile-image"]');function M(e){console.log("Отображение данных пользователя:",e),x.textContent=e.name,w.textContent=e.about,T.style.backgroundImage="url(".concat(e.avatar,")")}function U(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранить";t.querySelector(".popup__button").textContent=e?"Сохранение...":n}function N(e,t){var n=S.querySelector(".popup__image"),o=S.querySelector(".popup__caption");n.src=e,n.alt=t,o.textContent=t,p(S)}C.forEach((function(e){e.addEventListener("mousedown",(function(t){(t.target.classList.contains("popup_is-opened")||t.target.classList.contains("popup__close"))&&d(e)}))})),q.addEventListener("click",(function(){j.value=x.textContent,O.value=w.textContent,y(D,h),p(k)})),L.addEventListener("click",(function(){I.reset(),y(I,h),p(A)})),E.addEventListener("click",(function(){P.reset(),y(P,h),p(g)})),D.addEventListener("submit",(function(e){e.preventDefault(),U(!0,D),c(j.value,O.value).then((function(e){M(e),d(k)})).catch((function(e){console.log("Ошибка при обновлении данных профиля:",e)})).finally((function(){U(!1,D)}))})),P.addEventListener("submit",(function(e){e.preventDefault(),U(!0,P),u(P.querySelector(".popup__input_type_url").value).then((function(e){M(e),d(g)})).catch((function(e){console.log("Ошибка при обновлении аватара пользователя:",e)})).finally((function(){U(!1,P)}))})),I.addEventListener("submit",(function(e){e.preventDefault(),U(!0,I,"Создать"),i(I.querySelector(".popup__input_type_card-name").value,I.querySelector(".popup__input_type_url").value).then((function(e){var t=s(e,a,l,N,e.owner._id);b.prepend(t),d(A)})).catch((function(e){console.log("Ошибка при добавлении новой карточки:",e)})).finally((function(){U(!1,I,"Создать")}))})),Promise.all([o(),r()]).then((function(e){var t,n,o,r,c=(r=2,function(e){if(Array.isArray(e))return e}(o=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,u,i=[],a=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;a=!1}else for(;!(a=(o=c.call(n)).done)&&(i.push(o.value),i.length!==t);a=!0);}catch(e){l=!0,r=e}finally{try{if(!a&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw r}}return i}}(o,r)||function(e,t){if(e){if("string"==typeof e)return v(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?v(e,t):void 0}}(o,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),u=c[0],i=c[1];console.log("Данные пользователя и карточки успешно получены"),M(u),t=i,n=u._id,console.log("Отображение карточек:",t),0===t.length?console.log("Нет карточек для отображения."):(b.innerHTML="",t.forEach((function(e){var t=s(e,a,l,N,n);b.append(t)})))})).catch((function(e){console.log("Ошибка при инициализации данных:",e)})),o().then((function(e){console.log("Данные пользователя:",e)})).catch((function(e){console.error("Ошибка в getUserInfo:",e)})),r().then((function(e){console.log("Карточки:",e)})).catch((function(e){console.error("Ошибка в getCards:",e)})),c().then((function(e){console.log("Данные пользователя обновлены:",e)})).catch((function(e){console.error("Ошибка в updateUserInfo:",e)})),u().then((function(e){console.log("Аватар пользователя обновлен:",e)})).catch((function(e){console.error("Ошибка в updateUserAvatar:",e)})),i().then((function(e){console.log("Новая карточка добавлена:",e)})).catch((function(e){console.error("Ошибка в addCard:",e)})),l().then((function(e){console.log("Карточка удалена:",e)})).catch((function(e){console.error("Ошибка в deleteCard:",e)}))})();