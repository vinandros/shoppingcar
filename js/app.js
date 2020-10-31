const car = document.querySelector("#carrito");
const carContainer = document.querySelector("#lista-carrito tbody");
const empyCarBtn = document.querySelector("#vaciar-carrito");
const coursesList = document.querySelector("#lista-cursos");
let shoppingCar = [];

loadListeners();

function loadListeners() {
  coursesList.addEventListener("click", addCourse);
}

// functions
function addCourse(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const selectedCourse = e.target.parentElement.parentElement;
    readCourseData(selectedCourse);
  }
}

//read course data using html and dom scriping
function readCourseData(selectedCourse) {
  const courseInfo = {
    title: selectedCourse.querySelector("h4").textContent,
    img: selectedCourse.querySelector("img").src,
    price: selectedCourse.querySelector(".precio span").textContent,
    id: selectedCourse.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  shoppingCar = [...shoppingCar, courseInfo];
  shoppingCarHTML();
  console.log(shoppingCar);
}

function shoppingCarHTML() {
  clearHTML();
  shoppingCar.forEach((curse) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>
                ${curse.title}
            </td>
        `;
    carContainer.appendChild(row);
  });
}

function clearHTML() {
  while (carContainer.firstChild) {
    carContainer.removeChild(carContainer.firstChild);
  }
}
