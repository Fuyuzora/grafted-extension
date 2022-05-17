let getContent = async () => {
    await fetch(url, {
        method: "POST",
        body: JSON.stringify({ text })
    })
}

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

let fetchAndStoreContent = async () => {
    // TODO: change this to correct url
    let resp = await fetch(dummy).then(resp => resp.json()).then(resp => resp)
    let id = await getCurrentTabId()
    setTimeout(() => {
        postToPopup(id, resp)
    }, 3000)
}
url = ""
dummy = chrome.runtime.getURL('popup/mock_resp.json')
paragraphs = [...document.querySelectorAll("p[data-selectable-paragraph]")].map(p => p.textContent)
// headers = [...document.querySelectorAll("h1, h2, h3, h4, h5, h6")]
// headers[0] = headers[0].parentNode
// paragraphs = []
// for(let header of headers) {
//     paragraph = ''
//     while (header.nextSibling) {
//         paragraph += (header.textContent + ' ')
//         header = header.nextSibling
//     }
//     if (paragraph) {
//         paragraphs.push(paragraph)
//     }
// }
console.log(paragraphs)
fetchAndStoreContent()