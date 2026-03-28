const addCards = (items) => {
  items.forEach(item => {
    let itemToAppend = `
      <div class="col s12 m6 l4">
        <div class="card medium">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="${item.image}" alt="${item.title}">
          </div>
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">
              ${item.title}
              <i class="material-icons right">more_vert</i>
            </span>
            <p><a href="#">${item.link}</a></p>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">
              ${item.title}
              <i class="material-icons right">close</i>
            </span>
            <p>${item.description}</p>
          </div>
        </div>
      </div>
    `;
    $("#card-section").append(itemToAppend);
  });
};

const getBooks = () => {
  $.get("/api/books", (response) => {
    if (response.statusCode === 200) {
      addCards(response.data);
    }
  });
};

$(document).ready(function () {
  $('.materialboxed').materialbox();
  $('.modal').modal();

  $('#clickMeButton').click(() => {
    console.log("Button clicked");
  });

  getBooks();
});