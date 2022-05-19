let createDiv = (className, loader) => {
    div = document.createElement('div')
    div.classList.add(className)
    if (loader) {
        div.classList.add("skeleton-loader")
    }
    return div
}

let posTags = {
    'NN': 'common noun, singular or mass',
    'NNP': 'proper noun, singular'
}

Object.defineProperty(String.prototype, 'capitalize', {
    value: function () {
        return this.charAt(0).toUpperCase() + this.slice(1)
    },
    enumerable: false
})

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
        contentHeader.innerHTML = item.header.capitalize()
        contentSubheader.innerHTML = posTags[item.subheader]
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
            let section = generateSummarySection(resp[type])
            mainContent.appendChild(section)
        }
    }
}

let generateSkeletionLoader = () => {
    sectionWrapper = createDiv("section-wrapper", false)
    header = createDiv("header", true)
    sectionWrapper.appendChild(header)
    for (const x of Array(3).keys()) {
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
    document.getElementsByClassName("placeholder")[0].remove()
}

loadPopup = () => {
    generateSkeletionLoader()
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        let id = (tabs[0].id).toString()
        chrome.storage.sync.get(id, stored_doc => {
            chrome.storage.sync.get("selectedTypes", stored_types => {
                fetch(url = "https://3638itzwsl.execute-api.us-east-1.amazonaws.com/dev",
                    {
                        method: 'POST',
                        mode: 'cors',
                        credentials: 'omit',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ 'selectedTypes': stored_types.selectedTypes, 'doc': stored_doc[id] })
                    }).then(resp => resp.json()).then(resp => {
                        generatePage(resp)
                        removeSkeletonLoader()
                    })
            })
        })
    })
}

loadPopup()
