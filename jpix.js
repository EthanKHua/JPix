function recognize(x1, y1, x2, y2) {
    fetch(`http://localhost:5000/foo?x=${x2}&y=${y2}`)
        .then(response => response.json())
        .then(data => {
            document.title = data.result;
            console.log(data.result);
        })
        .catch(error => {console.log(error);});
}

let mousePressed = false;
let x1 = 0, y1 = 0;
let x2 = 0, y2 = 0;

window.addEventListener("mousedown", (e) => {
    if(mousePressed) return;
    mousePressed = true;
    x1 = e.clientX; y1 = e.clientY + document.scrollingElement.scrollTop;
    x2 = x1; y2 = y1;
    
});

window.addEventListener("mousemove", (e) => {
    if(!mousePressed) return;
    // document.title = e.clientX.toString() + ", " + e.clientY.toString();
});

window.addEventListener("mouseup", (e) => {
    if(!mousePressed) return;
    mousePressed = false;
    x2 = e.clientX; y2 = e.clientY + document.scrollingElement.scrollTop;
    recognize(x1, y1, x2, y2);
});

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