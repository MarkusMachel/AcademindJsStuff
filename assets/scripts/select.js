const selectTag = document.getElementsByTagName("select");

const renderSelect = () => {
  createParentDiv();
  renderMenu();
};

// const applyMultiSelect = (elmnt) => {
//   elmnt = document.getElementById('modelYear');
//   elmnt.

// }

const inputChangeHandler = (sourceMenu) => {
  return (event) => {
    const inputValue = event.target.value;
    const childElmnts = sourceMenu.querySelectorAll(".options");

    if (inputValue.trim() !== "") {
      childElmnts.forEach((f) => {
        if (f.innerHTML.includes(inputValue)) {
          f.classList.remove("options-hide");
        } else {
          f.classList.add("options-hide");
        }
      });
    } else if (inputValue.trim() === "") {
      childElmnts.forEach((f) => {
        f.classList.remove("options-hide");
      });
    }
  };
};

const createParentDiv = () => {
  for (let i = 0; i < selectTag.length; i++) {
    const divElement = document.createElement("div");
    divElement.classList.add("custom-select");

    divElement.appendChild(selectTag[i].cloneNode(true));

    selectTag[i].parentNode.replaceChild(divElement, selectTag[i]);
    console.log(selectTag[i]);
  }
};

const renderFilter = () => {
  const menuElms = document.getElementsByClassName("selected-items");

  for (let i = 0; i < menuElms.length; i++) {
    const divElm = document.createElement("div");
    const inpElm = document.createElement("input");
    inpElm.type = "text";

    divElm.appendChild(inpElm);

    const firstChild = menuElms[i].firstElementChild;
    menuElms[i].insertBefore(divElm, firstChild);

    inpElm.addEventListener("input", inputChangeHandler(menuElms[i]));
  }
};

const renderMenu = () => {
  let parentDiv, i, j, selElmnt, a, b, c;

  parentDiv = document.getElementsByClassName("custom-select");

  for (i = 0; i < parentDiv.length; i++) {
    selElmnt = parentDiv[i].getElementsByTagName("select")[0];

    a = document.createElement("div");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    parentDiv[i].appendChild(a);

    b = document.createElement("div");
    b.setAttribute("class", "selected-items select-hide");

    for (j = 1; j < selElmnt.length; j++) {
      c = document.createElement("div");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.classList.add("options");
      c.addEventListener("click", function (e) {
        let y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].classList.add("options");
              y[k].classList.remove("same-as-selected");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
      });
      b.appendChild(c);
    }
    parentDiv[i].appendChild(b);
    a.addEventListener("click", function (e) {
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }
  renderFilter();
};

const closeAllSelect = (elmnt) => {
  var x,
    y,
    i,
    xl,
    yl,
    arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
};

document.addEventListener("click", closeAllSelect);

const dummyData2 = [12, 219, 208, 7, 26];
const dummyData = [2020, 2019, 2018, 2017, 2016];

// Function to populate select element with dummy data
function populateSelect() {
  const selectElement = document.getElementById("modelYear");

  // Clear any existing options
  selectElement.innerHTML = "";

  // Add dummy data options
  dummyData.forEach((year) => {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    selectElement.appendChild(option);
  });

  const selectElement2 = document.getElementById("data2");

  // Clear any existing options
  selectElement2.innerHTML = "";

  // Add dummy data options
  dummyData2.forEach((year) => {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    selectElement2.appendChild(option);
  });
}

// Call the function to populate the select element
populateSelect();
