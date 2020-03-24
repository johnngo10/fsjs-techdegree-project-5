// --------------------------------------
// Variables
// --------------------------------------
let employees = [];
const urlAPI =
  "https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US";
const gallery = document.getElementById("gallery");
const body = document.querySelector("body");
const modalDiv = document.getElementById("modal-div");
// --------------------------------------
// Fetch Function
// --------------------------------------

fetch(urlAPI)
  .then(res => res.json())
  .then(res => res.results)
  .then(displayEmployees)
  .catch(err => console.log(err));

// --------------------------------------
// Functions
// --------------------------------------
function displayEmployees(employeeData) {
  employees = employeeData;

  // store the employee HTML
  let employeeHTML = "";

  // loop through each employee and create HTML markup
  employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;

    employeeHTML += `
      <div class="card" data-index="${index}">
        <div class="card-img-container">
          <img class="card-img" src="${picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
          <h2 id="name" class="card-name cap">${name.first} ${name.last}</h2>
          <p class="card-text">${email}</p>
          <p class="card-text cap">${city}</p>
        </div>
      </div>
    `;
  });

  gallery.innerHTML = employeeHTML;
}

function displayModal(index) {
  // object destructuring
  let {
    name,
    dob,
    phone,
    email,
    location: { city, street, state, postcode },
    picture
  } = employees[index];

  let date = new Date(dob.date);

  const modalHTML = `
  <div class="modal-container">
  <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
       <div class="modal-info-container" data-index="${index}">
          <img class="modal-img" src="${picture.large}" alt="profile picture">
          <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
          <p class="modal-text">${email}</p>
          <p class="modal-text cap">${city}</p>
          <hr>
          <p class="modal-text">${phone}</p>
          <p class="modal-text">${street.number} ${
    street.name
  }, ${state} ${postcode}</p>
          <p class="modal-text">${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
      </div>
  </div>

  <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>
  `;
  // Add content to modal
  modalDiv.innerHTML = modalHTML;

  const modalContainer = document.querySelector(".modal-container");
  const modalClose = document.getElementById("modal-close-btn");

  modalContainer.classList.remove("hidden");
  // Hide modal when close button is clicked
  modalClose.addEventListener("click", () => {
    modalContainer.classList.add("hidden");
  });

  const prevButton = document.getElementById("modal-prev");
  const nextButton = document.getElementById("modal-next");
  // Show prev employees
  prevButton.addEventListener("click", () => {
    const modalInfo = document.querySelector(".modal-info-container");
    const index = modalInfo.getAttribute("data-index");
    const prevIndex = parseInt(index) - 1;
    if (index > 0) {
      displayModal(prevIndex);
    }
  });
  // Show next employees
  nextButton.addEventListener("click", () => {
    const modalInfo = document.querySelector(".modal-info-container");
    const index = modalInfo.getAttribute("data-index");
    const nextIndex = parseInt(index) + 1;
    if (index < 12) {
      displayModal(nextIndex);
    }
  });
}

// --------------------------------------
// EVENT LISTENERS
// --------------------------------------

gallery.addEventListener("click", e => {
  if (e.target !== gallery) {
    const card = e.target.closest(".card");
    const index = card.getAttribute("data-index");

    displayModal(index);
  }
});
