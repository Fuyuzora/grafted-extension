let postToPopup = body => {
    chrome.runtime.sendMessage('current_tab_id', id =>  chrome.storage.local.set({ [id]: body }))
}

let manualScrape = () => {
    headers = [...document.querySelectorAll("h1, h2, h3, h4, h5, h6")]
    headers[0] = headers[0].parentNode
    paragraphs = []
    for (let header of headers) {
        paragraph = ''
        while (header.nextSibling) {
            paragraph += (header.textContent + ' ')
            header = header.nextSibling
        }
        if (paragraph) {
            paragraphs.push(paragraph)
        }
    }
    return paragraph
}

paragraphs = [...document.querySelectorAll("p[data-selectable-paragraph]")].map(p => p.textContent)
doc = paragraphs.join(' ').replace(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/g, "")
postToPopup(doc)