/* eslint-env es6 */
/* eslint-disable no-console */

const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options_container");

const optionList = document.querySelectorAll(".option");


document.getElementById("Graf").onclick = function () {
        location.href = 'http://92.37.74.98:54321/SpendLess/graf.php';
    };


selected.addEventListener("click", () => {
    optionsContainer.classList.toggle("active");
});

optionList.forEach( o => {
	o.addEventListener("click", () => {
		selected.innerHTML = o.querySelector("label").innerHTML;
		optionsContainer.classList.remove("active");
	});
});

