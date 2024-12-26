const rect = document.createElement("div");
rect.style.position = "absolute";
rect.style.backgroundColor = "rgba(0,0,0,0)"; // transparent
rect.style.border = "1.5px dashed red";
document.body.appendChild(rect);

const activation_key = "KeyQ";
const ctrl = false;
const alt = false;
const shift = false;

let keyPressed = false;
let x1 = 0, y1 = 0;
let x2 = 0, y2 = 0;

window.addEventListener("keydown", (e) => {
    if(keyPressed || e.code !== activation_key) return;
    keyPressed = true;
    x1 = x2; y1 = y2;
    update_rectangle();
});

window.addEventListener("mousemove", (e) => {
    x2 = e.pageX; y2 = e.pageY;
    if(!keyPressed) return;
    update_rectangle();
});

window.addEventListener("keyup", (e) => {
    if(!keyPressed || e.code !== activation_key) return;
    keyPressed = false;
    recognize(x1, y1, x2, y2);
    reset_rectangle();
});

function update_rectangle() {
    let x0 = Math.min(x1, x2);
    let y0 = Math.min(y1, y2);
    let width = Math.abs(x1 - x2);
    let height = Math.abs(y1 - y2);
    rect.style.left = x0 + "px";
    rect.style.top = y0 + "px";
    rect.style.width = width + "px";
    rect.style.height = height + "px";
}

function reset_rectangle() {
    rect.style.top = "0px";
    rect.style.left = "0px";
    rect.style.width = "0px";
    rect.style.height = "0px";
}

function recognize(x1, y1, x2, y2) {
    fetch(`http://localhost:5000/foo?x=${x2}&y=${y2}`)
        .then(response => response.json())
        .then(data => {
            document.title = data.result;
        })
        .catch(error => {console.log(error);});
}

function get_illust_id() {
    const re = /artworks\/\d*$/;
    const url = window.location.href;
    const illust_id = url.match(re);
    if (illust_id) {return illust_id[0].replace("artworks/", "");}
    return -1;
}

const illust_id = get_illust_id();
document.body.style.border = "10px solid red";
if (illust_id === "122052434") {document.body.style.border = "10px solid blue";}