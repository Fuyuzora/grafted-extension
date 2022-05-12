// post text
// TODO: post text to backend and fetch content
dummy = chrome.runtime.getURL('popup/mock_resp.json')

// display content
let createDiv = (className, loader) => {
    div = document.createElement('div')
    div.classList.add(className)
    if (loader) {
        div.classList.add("skeleton-loader")
    }
    return div
}

let generateKeywordsSection = (data) => {
    sectionWrapper = createDiv("section-wrapper", false)
    header = createDiv("header", false)
    header.innerHTML = "Keywords"
    sectionWrapper.appendChild(header)
    for (let ind in data) {
        item = data[ind]
        let card = createDiv('card', false)
        let contentHeader = createDiv("content-header", false)
        let contentSubheader = createDiv("content-subheader", false)
        let contentItem = createDiv("content-item", false)
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

let generateSummarySection = (data) => {
    sectionWrapper = createDiv("section-wrapper", false)
    header = createDiv("header", false)
    header.innerHTML = "Summary"
    sectionWrapper.appendChild(header)
    for (let ind in data) {
        item = data[ind]
        let card = createDiv('card', false)
        let contentItem = createDiv("content-item", false)
        contentItem.innerHTML = item
        card.appendChild(contentItem)
        sectionWrapper.appendChild(card)
    }
    return sectionWrapper
}

let generatePage = (resp) => {
    let mainContent = document.getElementsByClassName("main-content")[0]
    for (let type in resp) {
        if (type === 'keywords') {
            let section = generateKeywordsSection(resp[type])
            mainContent.appendChild(section)
        } else if (type === "summary") {
            let section = generateSummarySection(resp[type], type)
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

let getRespFromContent = async (id) => {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.sync.get((id).toString(), data => {
                resolve(data[id])
            }) 
        } catch (e) {
            chrome.runtime.onMessage.addListener((request) => {
                if (request[id] !== undefined) {
                    resolve(request[id])
                }
            })
        }
    })
}

loadPopup = async () => {
    let dummyData = await fetch(dummy).then(resp => resp.json())
    generateSkeletionLoader(dummyData)
    let tabs = await chrome.tabs.query({ active: true, currentWindow: true })
    let resp = await getRespFromContent(tabs[0].id)
    removeSkeletonLoader()
    generatePage(resp)
}

loadPopup()
