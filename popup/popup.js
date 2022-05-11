// gather text
// TODO: create content script to gather text and send it to popup

// post text
// TODO: post text to backend and fetch content
url = chrome.runtime.getURL('popup/mock_resp.json')

// display content
let createDiv = className => {
    div = document.createElement('div')
    div.classList.add(className)
    return div
}

let generateKeywordsSection = (data, type) => {
    sectionWrapper = createDiv("section-wrapper")
    header = createDiv("header")
    header.innerHTML = type
    sectionWrapper.appendChild(header)
    console.log(data)
    for (let ind in data) {
        item = data[ind]
        console.log(item.header)
        let card = createDiv('card')
        let contentHeader = createDiv("content-header")
        let contentSubheader = createDiv("content-subheader")
        let contentItem = createDiv("content-item")
        contentHeader.innerHTML = item.header
        contentSubheader.innerHTML = item.subheader
        contentItem.innerHTML = item.content
        contentHeader.appendChild(contentSubheader)
        card.appendChild(contentHeader)
        card.appendChild(contentItem)
        sectionWrapper.appendChild(card)
    }
    return sectionWrapper
}

generatePage = (resp) => {
    mainContent = document.getElementsByClassName("main-content")[0]
    for (let type in resp) {
        if (type === 'keywords') {
            let section = generateKeywordsSection(resp[type], type)
            mainContent.appendChild(section)
        }
    }
}

fetch(url).then(resp => resp.json()).then(resp => generatePage(resp))

// changeColor.addEventListener("click", async () => {
//     let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

//     chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         function: setPageBackgroundColor,
//     })
// })
