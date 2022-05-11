// gather text
// TODO: create content script to gather text and send it to popup

// post text
// TODO: post text to backend and fetch content

// display content
import * as resp from "./mock_resp.json"

let createDiv = className => {
    div = document.createElement('div');
    div.classList.add(className);
    return div
}

mainContent = document.getElementsByClassName("main-content")[0]
for (let type in resp) {
    sectionWrapper = createDiv("section-wrapper")
    header = createDiv("header")
    header.innerHtml = type
    for (let item in type) {
        card = createDiv('card')
        
    }
}
// changeColor.addEventListener("click", async () => {
//     let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

//     chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         function: setPageBackgroundColor,
//     })
// })
