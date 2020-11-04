const car = document.querySelector("#carrito");
const carContainer = document.querySelector("#lista-carrito tbody");
const emptyCarBtn = document.querySelector("#vaciar-carrito");
const coursesList = document.querySelector("#lista-cursos");
let shoppingCar = [];

loadListeners();

function loadListeners() {
  //add courses
  coursesList.addEventListener("click", addCourse);
  //delete courses
  car.addEventListener("click", deleteCourse);
  //empty car
  emptyCarBtn.addEventListener("click", (e) => {
    e.preventDefault();
    shoppingCar = [];
    clearHTML();
  });

  document.addEventListener("DOMContentLoaded", () => {
    shoppingCar = JSON.parse(localStorage.getItem("shoppingCarItems")) || [];
    shoppingCarHTML();
  });
}

// functions
function addCourse(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const selectedCourse = e.target.parentElement.parentElement;
    readCourseData(selectedCourse);
  }
}

function deleteCourse(e) {
  e.preventDefault();
  if (e.target.classList.contains("borrar-curso")) {
    const idCourseToDelete = e.target.getAttribute("data-id");
    shoppingCar = shoppingCar.filter((curse) => curse.id !== idCourseToDelete);
    console.log(shoppingCar);
    shoppingCarHTML();
  }
}

//read course data using html and dom scriping
function readCourseData(selectedCourse) {
  const courseInfo = {
    title: selectedCourse.querySelector("h4").textContent,
    img: selectedCourse.querySelector("img").src,
    price: selectedCourse.querySelector(".precio span").textContent,
    id: selectedCourse.querySelector("a").getAttribute("data-id"),
    amount: 1,
  };

  const exist = shoppingCar.some((curse) => courseInfo.id === curse.id);
  if (exist) {
    const curses = shoppingCar.map((curse) => {
      if (courseInfo.id === curse.id) {
        curse.amount++;
        return curse;
      } else {
        return curse;
      }
      shoppingCar = [...curses];
    });
  } else {
    shoppingCar = [...shoppingCar, courseInfo];
  }
  shoppingCarHTML();
  console.log(shoppingCar);
}

function shoppingCarHTML() {
  clearHTML();
  shoppingCar.forEach((curse) => {
    const { img, title, amount, price, id } = curse;
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>
                <img src="${img}" width="100">
            </td>
            <td>
                ${title}
            </td>
             <td>
                ${price}
            </td>
             <td>
                ${amount}
            </td>
            <td>
               <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;
    carContainer.appendChild(row);
  });

  syncStorage();
}

function clearHTML() {
  while (carContainer.firstChild) {
    carContainer.removeChild(carContainer.firstChild);
  }
}

function syncStorage() {
  localStorage.setItem("shoppingCarItems", JSON.stringify(shoppingCar));
}
