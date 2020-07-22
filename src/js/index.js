var usersList = [];
var form = null


function start() {
    form = document.getElementById("form-user");
    form.onsubmit = submitFormUser;

    let formIpt = document.getElementById("form-ipt-user");
    formIpt.onkeyup = keyUpInput;

    getAllUsers();
}

function submitFormUser(event) {

    var valueInput = event.target.children.namedItem("form-ipt-user").value;

    if (valueInput !== "") {
        let filtered = usersList.filter(user => user.name.toLocaleLowerCase().includes(valueInput.toLocaleLowerCase()));

        renderUsers(filtered);
    } else {
        renderUsers([]);
    }

    event.preventDefault();
    event.stopPropagation();
}

function keyUpInput(event) {
    let btn = form.children.namedItem("form-btn-user");
    if (event.target.value.length > 0) {
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }
}

async function getAllUsers() {
    let response = await fetch("https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo");

    if (response.ok) {
        let data = await response.json();

        usersList = data.results.map((user) => {
            return {
                id: user.login.uuid,
                age: user.dob.age,
                gender: user.gender,
                name: `${user.name.first} ${user.name.last}`,
                img: user.picture.thumbnail
            }
        });

        usersList = usersList.sort((a, b) => a.name.localeCompare(b.name));
    }
}

function renderUsers(users) {
    let spanCount = document.createElement("span");
    spanCount.id = "spn-count-users"
    spanCount.textContent = `${users.length} users found`;

    let divInfo = document.createElement("div");
    divInfo.className = "user";
    divInfo.appendChild(spanCount);

    let divUsers = document.getElementById("users");
    divUsers.innerHTML = "";
    divUsers.appendChild(divInfo);

    users.forEach(user => {
        let img = document.createElement("img");
        img.className = "img"
        img.src = user.img;

        let divImg = document.createElement("div");
        divImg.className = "div-inline";
        divImg.appendChild(img);

        let spanInfoUser = document.createElement("span");
        spanInfoUser.textContent = `${user.name}, ${user.age} y.o`;

        let divInfoUser = document.createElement("div");
        divInfoUser.className = "div-inline";
        divInfoUser.appendChild(spanInfoUser);

        let divUser = document.createElement("div");
        divUser.className = "user";
        divUser.appendChild(divImg);
        divUser.appendChild(divInfoUser);

        divUsers.appendChild(divUser);
    });

    renderStatistics(users);
}

function renderStatistics(users) {

    let amountFemale = users.filter(user => user.gender === "female").length;
    let amountMale = users.filter(user => user.gender === "male").length;
    let totalAges = users.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.age;
    }, 0);

    let average = totalAges > 0 ? (totalAges / users.length) : 0;

    let pAmountFemale = document.createElement("p");
    pAmountFemale.textContent = `Female: ${amountFemale}`;

    let pAmountmale = document.createElement("p");
    pAmountmale.textContent = `Male: ${amountMale}`;

    let pTotalAges = document.createElement("p");
    pTotalAges.textContent = `Total Ages: ${totalAges}`;

    let pAverage = document.createElement("p");
    pAverage.textContent = `Avarage Ages: ${average}`;

    let divStatistics = document.createElement("div");
    divStatistics.appendChild(pAmountFemale);
    divStatistics.appendChild(pAmountmale);
    divStatistics.appendChild(pTotalAges);
    divStatistics.appendChild(pAverage);

    let h2 = document.createElement("h2");
    h2.textContent = "Statistics";

    let usersStatistics = document.getElementById("users-statistics");
    usersStatistics.innerHTML = "";
    usersStatistics.appendChild(h2);
    usersStatistics.appendChild(divStatistics);
}


start();