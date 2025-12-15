// import {DIFF_DELETE, diff_match_patch} from "diff-match-patch";

var imgY = []

function recordImgY() {
    imgY.push(this.height);
    console.log(this.height);
    if(imgY.length > 1) imgY[imgY.length - 1] += imgY[imgY.length - 2];
}

// TODO: fix bug with image ordering
window.electronAPI.getImages()
    .then(images => {
        for(const image of images) {
            console.log(image);
            const img = document.createElement("img");
            img.onload = recordImgY;
            img.src = "images/" + image;
            document.getElementById("images").appendChild(img);
        }
        console.log(imgY);
    })

const rect = document.createElement("div");
rect.style.position = "absolute";
rect.style.backgroundColor = "rgba(0,0,0,0)"; // transparent
rect.style.border = "0px dashed red";
document.body.appendChild(rect);

const activation_key = "KeyQ";
const ctrl = false;
const alt = false;
const shift = false;

let keyPressed = false;
let x1 = 0, y1 = 0;
let x2 = 0, y2 = 0;

window.addEventListener("keydown", (e) => {
    if(keyPressed) return;
    if(e.ctrlKey !== ctrl) return;
    if(e.altKey !== alt) return;
    if(e.shiftKey !== shift) return;
    if(e.code !== activation_key) return;
    keyPressed = true;
    rect.style.border = "2px dashed red";
    x1 = x2; y1 = y2;
    update_rectangle();
});

window.addEventListener("mousemove", (e) => {
    x2 = e.pageX; y2 = e.pageY;
    if(!keyPressed) return;
    update_rectangle();
});

window.addEventListener("keyup", (e) => {
    if(!keyPressed) return;
    if(e.code !== activation_key) return;
    keyPressed = false;
    recognize(x1, y1, x2, y2);
    reset_rectangle();
});

let id = get_illust_id();

window.setInterval(() => {
    let curr_id = get_illust_id();
    
}, 500)

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
    rect.style.border = "0px dashed red";
    rect.style.top = "0px";
    rect.style.left = "0px";
    rect.style.width = "0px";
    rect.style.height = "0px";
}

// function furigana(japanese, hiragana) {
//     const rp1 = document.createElement('rp')
//     rp1.innerText
//     let dmp = new diff_match_patch()
//     let diffs = dmp.diff_main(japanese, hiragana)
//     for(let diff in diffs) {
//         if(diff[0] === DIFF_DELETE) {
//
//         }
//     }
// }


async function recognize(x1, y1, x2, y2) {
    console.log(Math.min(x1, x2), Math.min(y1, y2), Math.abs(x1 - x2), Math.abs(y1 - y2));
    await window.electronAPI.captureRect(Math.min(x1, x2), Math.min(y1, y2), Math.abs(x1 - x2), Math.abs(y1 - y2))
        .then(() => fetch("http://localhost:5000/ocr"))
        .then(data => data.json())
        .then(json => {
            console.log(json.data)
            // clear div and then fill it with new entries
            const translations = document.getElementById("translations")
            translations.innerHTML = ""
            for(let t in json.data) {
                let item = json.data[t]

                let entry = document.createElement('div')
                let name = document.createElement('h2')
                name.class = "japanese"
                if(item.japanese[0].reading !== null)
                    name.innerHTML = "<ruby>" + item.slug + "<rp>(</rp><rt>" + item.japanese[0].reading + "</rt><rp>)</rp>" + "</ruby>"
                else
                    name.innerHTML = "<ruby>" + item.slug + "</ruby>"

                let meanings = document.createElement('div')
                for(let j = 0; j < item.senses.length; j++) {
                    let defns = item.senses[j].english_definitions

                    let parts = document.createElement('h3')
                    parts.innerText = item.senses[j].parts_of_speech

                    let meaning = document.createElement('p')
                    meaning.innerText = (j + 1) + ": " + defns[0]
                    for (let i = 1; i < defns.length; i++) {
                        meaning.innerText += "; " + defns[i]
                    }
                    meanings.append(parts, meaning)
                }

                entry.append(name, meanings)
                translations.appendChild(entry)
            }
        })
}

function get_illust_id() {
    const re = /artworks\/\d*$/;
    const url = window.location.href;
    const illust_id = url.match(re);
    if (illust_id) {return illust_id[0].replace("artworks/", "");}
    return -1;
}

const illust_id = get_illust_id();
// document.body.style.border = "10px solid green";
// if (illust_id === "122052434") {document.body.style.border = "10px solid blue";}