let getCurrentTabId = () => {
    return new Promise(
        resolve => {
            chrome.runtime.sendMessage('current_tab_id', resp => resolve(resp))
        }
    )
}

let postToPopup = ((id, body) => {
    chrome.runtime.sendMessage({ [id]: body })
    chrome.storage.sync.set({ [id]: body })
})

let getSelectedTypes = async () => {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.sync.get("selectedTypes", data => {
                resolve(data.selectedTypes)
            })
        } catch (e) {
            reject(e)
        }
    })
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

let fetchAndStoreContent = async (doc) => {
    let selectedTypes = await getSelectedTypes()
    let data = { 'selectedTypes': selectedTypes, 'doc': doc }
    let resp = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify(data)
    }).then(resp => resp.json()).then(resp => resp)
    let id = await getCurrentTabId()
    postToPopup(id, resp)
}

url = "https://3638itzwsl.execute-api.us-east-1.amazonaws.com/dev"
dummy = chrome.runtime.getURL('popup/mock_resp.json')
paragraphs = [...document.querySelectorAll("p[data-selectable-paragraph]")].map(p => p.textContent)
doc = paragraphs.join(' ').replace(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/g, "")
fetchAndStoreContent(doc)