url = "";
text = [...document.querySelectorAll("p[data-selectable-paragraph]")].map(p => p.textContent)
let req = await fetch(url, {
    method:"POST",
    body: JSON.stringify({"text": text})
})
let resp = await req.json()
let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
let key = `${tab.id}-content`
chrome.storage.sync.set({key: resp})