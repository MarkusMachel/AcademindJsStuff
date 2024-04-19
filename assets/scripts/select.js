const selectTag = document.getElementsByTagName("select");

const renderSelect = () => {
  createParentDiv();
  renderMenu();
};

function multiOptionClickHandler(e) {
  this.childNodes[1].checked = !this.childNodes[1].checked;
  
  let checked = [];
  let unChecked = [];

  const inputElmnts = this.parentNode.getElementsByTagName('input');
  
  for (let i = 0; i < inputElmnts.length; i++) {
    if (inputElmnts[i].type === 'checkbox')  {
      if (inputElmnts[i].checked) {
        checked.push(inputElmnts[i].value);
      } else {
        unChecked.push(inputElmnts[i].value);
      }
    }
  }
  
  this.parentNode.parentNode.getElementsByClassName('select-selected')[0].childNodes[0].innerHTML = checked;
}

function optionClickHandler(e) {
  let y, i, k, s, h, sl, yl;
  s = this.parentNode.parentNode.getElementsByTagName("select")[0];
  h = this.parentNode.previousSibling;

  for (i = 0; i < s.length; i++) {
    if (s.options[i].innerHTML === this.childNodes[0].innerHTML) {
      s.selectedIndex = i;
      h.innerHTML = this.childNodes[0].innerHTML;
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
}

const applyMultiSelect = (elmnt) => {
  elmnt = document.getElementById("modelYear");
  const dropdownElmnt =
    elmnt.parentNode.getElementsByClassName("selected-items")[0].childNodes;


  console.log(dropdownElmnt[0])
  const filterElmnt = dropdownElmnt[0];

  const childDiv = document.createElement('div');
  const checkDiv = document.createElement('div');
  const uncheckDiv = document.createElement('div');

  checkDiv.setAttribute('class', 'multi-check');
  uncheckDiv.setAttribute('class', 'multi-check');

  const checkIconElmnt = document.createElement('span');
  checkIconElmnt.setAttribute('class', 'ui-icon ui-icon-check');

  const uncheckIconElmnt = document.createElement('span');
  uncheckIconElmnt.setAttribute('class', 'ui-icon ui-icon-closethick');

  const checkAllElmnt =  document.createElement('span');
  checkAllElmnt.innerHTML = 'Check All';

  const uncheckAll = document.createElement('span');
  uncheckAll.innerHTML = 'Uncheck All'

  filterElmnt.appendChild(childDiv);
  childDiv.appendChild(checkDiv);
  childDiv.appendChild(uncheckDiv);

  checkDiv.appendChild(checkIconElmnt);
  checkDiv.appendChild(checkAllElmnt);
  uncheckDiv.appendChild(uncheckIconElmnt);
  uncheckDiv.appendChild(uncheckAll);

  checkDiv.addEventListener('click', checkClickHandler);
  uncheckDiv.addEventListener('click', uncheckClickHandler);



  for (let i = 0; i < dropdownElmnt.length; i++) {
    if (
      dropdownElmnt[i].classList.contains("options") ||
      dropdownElmnt[i].classList.contains("same-as-selected")
    ) {
      const checkBoxElmnt = document.createElement("input");
      checkBoxElmnt.setAttribute("type", "checkbox");
      checkBoxElmnt.setAttribute("class", "multi-checkBox")
      checkBoxElmnt.setAttribute("value", dropdownElmnt[i].childNodes[0].innerHTML);

      dropdownElmnt[i].removeEventListener("click", optionClickHandler);
      dropdownElmnt[i].addEventListener("click", multiOptionClickHandler);

      if (dropdownElmnt[i].classList.contains('same-as-selected')) {
        dropdownElmnt[i].classList.remove('same-as-selected');
        dropdownElmnt[i].classList.add("options");
      }

      dropdownElmnt[i].classList.add("multi-container");
      dropdownElmnt[i].appendChild(checkBoxElmnt);
    }
  }

  const displayItem = elmnt.parentNode.getElementsByClassName('select-selected')[0];
  const spanElmnt = document.createElement('span');
  spanElmnt.setAttribute('class', 'multi-displayed');

  spanElmnt.innerHTML = displayItem.innerHTML;
  displayItem.innerHTML = '';
  displayItem.appendChild(spanElmnt);
};

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
  }
};

const renderFilter = () => {
  const menuElms = document.getElementsByClassName("selected-items");

  for (let i = 0; i < menuElms.length; i++) {
    const divElm = document.createElement("div");
    const inpElm = document.createElement("input");
    inpElm.type = "text";
    inpElm.classList.add('select-filter')

    divElm.appendChild(inpElm);

    const firstChild = menuElms[i].firstElementChild;
    menuElms[i].insertBefore(divElm, firstChild);

    inpElm.addEventListener("input", inputChangeHandler(menuElms[i]));
  }
};

const renderMenu = () => {
  let parentDiv, i, j, selElmnt, a, b, c, d;

  parentDiv = document.getElementsByClassName("custom-select");

  for (i = 0; i < parentDiv.length; i++) {
    selElmnt = parentDiv[i].getElementsByTagName("select")[0];

    a = document.createElement("div");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    parentDiv[i].appendChild(a);

    b = document.createElement("div");
    b.setAttribute("class", "selected-items select-hide");

    for (j = 0; j < selElmnt.length; j++) {
      c = document.createElement("div");
      d = document.createElement('span');
      d.setAttribute('class', 'item');
      d.innerHTML = selElmnt.options[j].innerHTML;
      d.innerHTML === a.innerHTML
        ? c.classList.add("same-as-selected")
        : c.classList.add("options");
      c.addEventListener("click", optionClickHandler);
      b.appendChild(c);
      c.appendChild(d);
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

function closeAllSelect(elmnt) {
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
