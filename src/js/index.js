var usersList = [];

function start() {
    getAllUsers();
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

        renderUsers();
    }
}

function renderUsers() {
    let divUsers = document.getElementById("users");

    usersList.forEach(user => {
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