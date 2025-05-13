console.log("test")
const txt = document.getElementById("test");
const img = document.createElement("img");
img.src = "images\\125458699_p1.jpg";
document.getElementById("images").appendChild(img);
fetch('images')
    .then(response => txt.innerText = "success")
    .catch(error => txt.innerText = "i give up");

// fetch("./images")
//     .then(response => response.json)
//     .then(data => {
//         data.forEach(image => {
//             console.log(image)
//             const img = document.createElement("img");
//             img.src = "./images/" + image;
//             document.getElementById("images").appendChild(img);
//         });
//     })
//     .catch(error => console.error(error));