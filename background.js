let selectedTypes = ["keywords", "summary", "kg"]

chrome.runtime.onInstalled.addListener(() => {
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

let setUpBadge = (on) => {
    if (on) {
        chrome.action.setBadgeBackgroundColor({ color: "#0096FF" })
        chrome.action.setBadgeText({ text: 'ON' })
    } else {
        chrome.action.setBadgeText({ text: '' })
    }
}

// chrome.tabs.onActivated.addListener((activeInfo) => {
//     chrome.tabs.get(activeInfo.tabId, (activeTab) => {
//         regexList = [/https:\/\/medium.com\/.+\/.+/, /https:\/\/.+medium.com\/.+/]
//         const matched = regexList.some(rx => rx.test(activeTab.url))
//         setUpBadge(matched)
//     })
// })

chrome.tabs.onUpdated.addListener(
    (tabId, changeInfo, tab) => {
        if (changeInfo.url) {
            regexList = [/https:\/\/medium.com\/.+\/.+/, /https:\/\/.+medium.com\/.+/]
            const matched = regexList.some(rx => rx.test(changeInfo.url))
            console.log("changeinfo")
            setUpBadge(matched)
        } else if (tab.pendingUrl) {
            regexList = [/https:\/\/medium.com\/.+\/.+/, /https:\/\/.+medium.com\/.+/]
            const matched = regexList.some(rx => rx.test(tab.pendingUrl))
            console.log("pending")
            setUpBadge(matched)
        }
    }
)