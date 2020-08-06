// добавляем .webp к body, если он поддерживается
function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height === 2);
  };
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support) {
    document.body.classList.add("webp");
  } else {
    document.body.classList.add("no-webp");
  }
});
// ----------------------------------------

// Обработка карточек с проектами
let cards = document.querySelector(".projects__cards");

// Фикс бага при перезагрузке страницы, когда отображались все карточки, но была отмечена радиокнопка, активная до перезагрузки. Принудительно отмечаем первую
document.querySelector("#pr1").checked = "true";

for (let i = 2; i < cards.children.length; ++i) {
  cards.children[i].style.display = "none";
}

function loadMoreHandler() {
  loadMore.remove();
  for (let card of cards.children) {
    card.style.display = "block";
  }
}

function radioHandler(evt) {
  let btns = evt.target.closest(".projects__buttons");
  if (!btns) return;
  let label = evt.target.closest("label");
  if (!label) {
    let radioId = evt.target.closest('input[type="radio"]');
    if (!radioId) return;
    label = btns.querySelector(`label[for=${radioId.id}]`);
  }
  let type = label.textContent;
  loadMoreHandler();
  if (type === "All") {
    for (let card of cards.children) {
      card.style.display = "block";
    }
    return;
  }
  for (let card of cards.children) {
    if (card.dataset.category === type) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  }
}
document.addEventListener("change", radioHandler);

let loadMore = document.querySelector("#loadmore");
loadMore.addEventListener("click", loadMoreHandler);
// ----------------------------------------
