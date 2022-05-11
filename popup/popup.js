// post text
// TODO: post text to backend and fetch content
url = chrome.runtime.getURL('popup/mock_resp.json')

// display content
let createDiv = (className, loader) => {
    div = document.createElement('div')
    div.classList.add(className)
    if (loader) {
        div.classList.add("skeleton-loader")
    }
    return div
}

let generateKeywordsSection = (data, type) => {
    sectionWrapper = createDiv("section-wrapper", false)
    header = createDiv("header", true)
    header.innerHTML = type
    sectionWrapper.appendChild(header)
    for (let ind in data) {
        item = data[ind]
        let card = createDiv('card', false)
        let contentHeader = createDiv("content-header", true)
        let contentSubheader = createDiv("content-subheader", true)
        let contentItem = createDiv("content-item", true)
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

let generatePage = (resp) => {
    let mainContent = document.getElementsByClassName("main-content")[0]
    for (let type in resp) {
        if (type === 'keywords') {
            let section = generateKeywordsSection(resp[type], type)
            mainContent.appendChild(section)
        }
    }
}

let generateSkeletionLoader = (data) => {
    data = data["keywords"]
    sectionWrapper = createDiv("section-wrapper", false)
    header = createDiv("header", true)
    sectionWrapper.appendChild(header)
    for (let ind in data) {
        item = data[ind]
        let card = createDiv('card', false)
        let contentHeader = createDiv("content-header", true)
        let contentSubheader = createDiv("content-subheader", true)
        let contentItem = createDiv("content-item", true)
        contentHeader.appendChild(contentSubheader)
        card.appendChild(contentHeader)
        card.appendChild(contentItem)
        sectionWrapper.appendChild(card)
    }
    let placeholder = document.getElementsByClassName("placeholder")[0]
    placeholder.appendChild(sectionWrapper)
}

let removeSkeletonLoader = () => {
    let mainContent = document.getElementsByClassName("main-content")[0]
    let placeholder = document.getElementsByClassName("placeholder")[0]
    mainContent.removeChild(placeholder)
}

fetch(url).then(resp => resp.json()).then(resp => {generateSkeletionLoader(resp)})

// changeColor.addEventListener("click", async () => {
//     let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

//     chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         function: setPageBackgroundColor,
//     })
// })
