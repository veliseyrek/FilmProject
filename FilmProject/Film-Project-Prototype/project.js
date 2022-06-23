const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");

//UI projesini başlatma
const ui = new UI();

//Storage Onjesi Üret
const storage = new Storage();
//Tüm eventleri yüklemek için

eventListener();

function eventListener() {
  form.addEventListener("submit", addFilm);
  document.addEventListener("DOMContentLoaded", function () {
    let films = storage.getFilmsFromStorage();
    ui.loadAllFilms(films);
  });

  cardBody.addEventListener("click", deleteFilm);
  clear.addEventListener("click", clearAllFilms);
}

function addFilm(e) {
  const title = titleElement.value;
  const director = directorElement.value;
  const url = urlElement.value;

  if (title === "" || director === "" || url === "") {
    //Hata
    ui.displayMessage("Tüm alanları doldurun..", "danger");
  } else {
    const newFilm = new Film(title, director, url);
    ui.addFilmToUI(newFilm); //ARayüze film ekleme
    storage.addFilmToStorage(newFilm); //Storage film ekleme
    ui.displayMessage("Kayıt başarılı", "success");
  }

  ui.clearInputs(titleElement, directorElement, urlElement);
  e.preventDefault();
}

function deleteFilm(e) {
  if (e.target.id === "delete-film") {
    ui.deleteFilmFromUI(e.target);
    storage.deleteFilmFromStorage(
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent
    );

    ui.displayMessage("Silme işlemi başarılı...", "success");
  }
}

function clearAllFilms(e) {
  if (confirm("Emin misiniz?")) {
    ui.clearAllFilmsFromUI();
    storage.clearAllFilmsFromStorage();
  }
}
