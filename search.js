async function search() {
    var id = document.getElementById("manga-search").value;
    id = parseInt(id);
    console.log(id);
    await fetch(`http://localhost:5000/dlimg`, {
        method: "POST",
        body: JSON.stringify({id: id})})
    .then(response => document.getElementById("image-href").click())
    .catch(error => {
        console.log(error);
        document.getElementById("img-error-href").click();
    });
}

var searchBar = document.getElementById("manga-search");
searchBar.addEventListener("keypress", (event) => {
    if(event.key == "Enter") {
        search();
    }
});

var searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", () => {
    search();
});