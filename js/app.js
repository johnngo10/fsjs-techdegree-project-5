// --------------------------------------
// Variables
// --------------------------------------
let employees = [];
const urlAPI =
  "https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US";
const gallery = document.getElementById("gallery");
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
    <img class="avatar" src="${picture.large}">
    <div class="text-container modal-info" data-index="${index}">
      <h2 class="name">${name.first} ${name.last}</h2>
      <p class="email">${email}</p>
      <p class="address">${city}</p>
      <hr>
      <p>${phone}</p>
      <p class="address">${street.number} ${
    street.name
  }, ${state} ${postcode}</p>
      <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
  `;

  overlay.classList.remove("hidden");
  modalContainer.innerHTML = modalHTML;
}
