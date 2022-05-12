url = ""
dummy = chrome.runtime.getURL('popup/mock_resp.json')
text = [...document.querySelectorAll("p[data-selectable-paragraph]")].map(p => p.textContent)

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

let postToPopup = (id, body) => chrome.runtime.sendMessage({[id]: body})

let fetchAndStoreContent = async () => {
    // TODO: change this to correct url
    let resp = await fetch(dummy).then(resp => resp.json()).then(resp => resp)
    let id = await getCurrentTabId()
    setTimeout(() => {
        postToPopup(id, resp)
    }, 3000);
}

fetchAndStoreContent()