const method = document.getElementById("method");
const url = document.getElementById("url");
const content = document.getElementById("content");

document.getElementById("submit").addEventListener("click", (event) => {
    event.preventDefault();
    if(!window.fetch) {
        content.innerText = "Unsupported browser: missing fetch";
        return;
    }

    fetch(`${location.protocol}//${location.host}/${url.value}`, {
        method: method.value
    }).then((data) => data.text())
        .then((text) => {
            try {
                content.innerText = JSON.stringify(JSON.parse(text), null, 2);
            } catch {
                content.innerText = text;
            }
        })
        .catch((err) => {
            content.innerHTML = `
                <span stlye="color: red;">Internal error: ${err}</span>
            `
        })
})