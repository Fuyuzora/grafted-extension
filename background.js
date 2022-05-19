let selectedTypes = ["keywords", "summary", "kg"]
supportedDomains = [/https:\/\/medium.com\/.+\/.+/, /https:\/\/.+medium.com\/.+/]

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.clear();
    chrome.storage.sync.set({ selectedTypes })
})

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        if (request === "current_tab_id") {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => sendResponse(tabs[0].id))
        }
        return true
    }
)

let setUpBadge = (url) => {
    const matched = supportedDomains.some(rx => rx.test(url))
    if (matched) {
        chrome.action.setBadgeBackgroundColor({ color: "#0096FF" })
        chrome.action.setBadgeText({ text: 'ON' })
    } else {
        chrome.action.setBadgeText({ text: '' })
    }
}

// TODO: add towardsdatascience and other medium franchise

chrome.tabs.onUpdated.addListener(
    (tabId, changeInfo, tab) => {
        if (changeInfo.url) {
            setUpBadge(changeInfo.url)
        } else if (tab.pendingUrl) {
            setUpBadge(tab.pendingUrl)
        }
    }
)

chrome.tabs.onActivated.addListener(activeInfo => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        setUpBadge(tabs[0].url)
    })
})