const addCards = (items) => {
  $("#card-section").empty();

  items.forEach((item) => {
    const card = `
      <div class="col s12 m6 l4">
        <div class="card medium">
          <div class="card-image">
            <img src="${item.image}" alt="${item.stationName}">
          </div>
          <div class="card-content">
            <span class="card-title">${item.stationName}</span>
            <p><strong>Suburb:</strong> ${item.suburb}</p>
            <p><strong>Charger:</strong> ${item.chargerType}</p>
            <p><strong>Status:</strong> ${item.availability}</p>
            <p><strong>Price/kWh:</strong> $${item.pricePerKwh}</p>
          </div>
        </div>
      </div>
    `;
    $("#card-section").append(card);
  });
};

const getStations = () => {
  $.get("/api/stations", (response) => {
    if (response.statusCode === 200) {
      addCards(response.data);
    }
  });
};

const submitForm = () => {
  const stationData = {
    stationName: $("#stationName").val(),
    suburb: $("#suburb").val(),
    chargerType: $("#chargerType").val(),
    availability: $("#availability").val(),
    pricePerKwh: parseFloat($("#pricePerKwh").val()),
    image: $("#image").val()
  };

  $.ajax({
    url: "/api/stations",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(stationData),
    success: function () {
      M.toast({ html: "Station added successfully!" });
      getStations();

      $("#stationName").val("");
      $("#suburb").val("");
      $("#chargerType").val("");
      $("#availability").val("");
      $("#pricePerKwh").val("");
      $("#image").val("images/station1.jpg");
      M.updateTextFields();
    },
    error: function (err) {
      M.toast({ html: "Error: " + err.responseJSON.message });
    }
  });
};

$(document).ready(function () {
  $("#formSubmit").click(() => {
    submitForm();
  });

  getStations();
});