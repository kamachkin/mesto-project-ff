(()=>{"use strict";var e="wff-cohort-16",t={authorization:"48074032-39e3-425f-b3b5-856827e3fa6b","Content-Type":"application/json"};function n(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function o(e,t,n,o,r){var c=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),i=c.querySelector(".card__image"),a=c.querySelector(".card__title"),u=c.querySelector(".card__delete-button"),l=c.querySelector(".card__like-button"),s=c.querySelector(".card__like-count");return i.src=e.link,i.alt=e.name,a.textContent=e.name,s.textContent=e.likes.length,e.owner._id===r?(u.style.display="block",u.addEventListener("click",(function(){n(c,e._id)}))):u.style.display="none",l.addEventListener("click",(function(){t(l,e._id,s)})),i.addEventListener("click",(function(){o(e.link,e.name)})),c}function r(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",i)}function c(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",i)}function i(e){"Escape"===e.key&&c(document.querySelector(".popup_is-opened"))}var a=function(e,t,n){var o=e.querySelector(".".concat(t.name,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""},u=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n.inactiveButtonClass),t.disabled=!1):(t.classList.add(n.inactiveButtonClass),t.disabled=!0)},l=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(n){a(e,n,t)})),u(n,o,t)};function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}var p,d={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};p=d,Array.from(document.querySelectorAll(p.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);u(n,o,t),n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?a(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.name,"-error"));t.classList.add(o.inputErrorClass),r.textContent=n,r.classList.add(o.errorClass)}(e,t,t.validationMessage,n)}(e,r,t),u(n,o,t)}))}))}(e,p)}));var f=document.querySelector(".popup_type_image"),_=document.querySelector(".popup_type_edit-image"),m=document.querySelector(".places__list"),y=document.querySelector(".profile__edit-button"),v=document.querySelector(".profile__add-button"),h=document.querySelector(".profile__image"),S=document.querySelectorAll(".popup"),g=document.querySelector(".popup_type_edit"),b=document.querySelector(".popup_type_new-card"),q=document.querySelector(".profile__title"),E=document.querySelector(".profile__description"),L=document.querySelector(".profile__image"),C=g.querySelector(".popup__input_type_name"),k=g.querySelector(".popup__input_type_description"),A=g.querySelector('.popup__form[name="edit-profile"]'),x=b.querySelector('.popup__form[name="new-place"]'),w=_.querySelector('.popup__form[name="edit-profile-image"]');function T(e){console.log("Отображение данных пользователя:",e),q.textContent=e.name,E.textContent=e.about,L.style.backgroundImage="url(".concat(e.avatar,")")}function j(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранить";t.querySelector(".popup__button").textContent=e?"Сохранение...":n}function O(o,r,c){(function(o,r){var c=r?"DELETE":"PUT";return fetch("https://nomoreparties.co/v1/".concat(e,"/cards/likes/").concat(o),{method:c,headers:t}).then(n)})(r,o.classList.contains("card__like-button_is-active")).then((function(e){o.classList.toggle("card__like-button_is-active"),c.textContent=e.likes.length})).catch((function(e){console.log("Ошибка при лайке карточки:",e)}))}function B(o,r){(function(o){return fetch("https://nomoreparties.co/v1/".concat(e,"/cards/").concat(o),{method:"DELETE",headers:t}).then(n)})(r).then((function(){o.remove()})).catch((function(e){console.log("Ошибка при удалении карточки:",e)}))}function D(e,t){var n=f.querySelector(".popup__image"),o=f.querySelector(".popup__caption");n.src=e,n.alt=t,o.textContent=t,r(f)}S.forEach((function(e){e.addEventListener("mousedown",(function(t){(t.target.classList.contains("popup_is-opened")||t.target.classList.contains("popup__close"))&&c(e)}))})),y.addEventListener("click",(function(){C.value=q.textContent,k.value=E.textContent,l(A,d),r(g)})),v.addEventListener("click",(function(){x.reset(),l(x,d),r(b)})),h.addEventListener("click",(function(){w.reset(),l(w,d),r(_)})),A.addEventListener("submit",(function(o){var r,i;o.preventDefault(),j(!0,A),(r=C.value,i=k.value,console.log("Отправка обновленных данных пользователя"),fetch("https://nomoreparties.co/v1/".concat(e,"/users/me"),{method:"PATCH",headers:t,body:JSON.stringify({name:r,about:i})}).then(n)).then((function(e){T(e),c(g)})).catch((function(e){console.log("Ошибка при обновлении данных профиля:",e)})).finally((function(){j(!1,A)}))})),w.addEventListener("submit",(function(o){var r;o.preventDefault(),j(!0,w),(r=w.querySelector(".popup__input_type_url").value,console.log("Отправка обновленного аватара пользователя"),fetch("https://nomoreparties.co/v1/".concat(e,"/users/me/avatar"),{method:"PATCH",headers:t,body:JSON.stringify({avatar:r})}).then(n)).then((function(e){T(e),c(_)})).catch((function(e){console.log("Ошибка при обновлении аватара пользователя:",e)})).finally((function(){j(!1,w)}))})),x.addEventListener("submit",(function(r){var i,a;r.preventDefault(),j(!0,x,"Создать"),(i=x.querySelector(".popup__input_type_card-name").value,a=x.querySelector(".popup__input_type_url").value,console.log("Отправка новой карточки на сервер"),fetch("https://nomoreparties.co/v1/".concat(e,"/cards"),{method:"POST",headers:t,body:JSON.stringify({name:i,link:a})}).then(n)).then((function(e){var t=o(e,O,B,D,e.owner._id);m.prepend(t),c(b)})).catch((function(e){console.log("Ошибка при добавлении новой карточки:",e)})).finally((function(){j(!1,x,"Создать")}))})),Promise.all([(console.log("Запрос данных пользователя отправлен"),fetch("https://nomoreparties.co/v1/".concat(e,"/users/me"),{headers:t}).then(n)),(console.log("Запрос карточек отправлен"),fetch("https://nomoreparties.co/v1/".concat(e,"/cards"),{headers:t}).then(n))]).then((function(e){var t,n,r,c,i=(c=2,function(e){if(Array.isArray(e))return e}(r=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,i,a=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(o=c.call(n)).done)&&(a.push(o.value),a.length!==t);u=!0);}catch(e){l=!0,r=e}finally{try{if(!u&&null!=n.return&&(i=n.return(),Object(i)!==i))return}finally{if(l)throw r}}return a}}(r,c)||function(e,t){if(e){if("string"==typeof e)return s(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(e,t):void 0}}(r,c)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=i[0],u=i[1];console.log("Данные пользователя и карточки успешно получены"),T(a),t=u,n=a._id,console.log("Отображение карточек:",t),0===t.length?console.log("Нет карточек для отображения."):(m.innerHTML="",t.forEach((function(e){var t=o(e,O,B,D,n);m.append(t)})))})).catch((function(e){console.log("Ошибка при инициализации данных:",e)}))})();