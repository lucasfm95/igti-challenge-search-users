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
        spanInfoUser.textContent = `${user.name}, ${user.age} anos`;

        let divInfoUser = document.createElement("div");
        divInfoUser.className = "div-inline";
        divInfoUser.appendChild(spanInfoUser);

        let divUser = document.createElement("div");
        divUser.className = "user";
        divUser.appendChild(divImg);
        divUser.appendChild(divInfoUser);

        divUsers.appendChild(divUser);
    });
}


start();