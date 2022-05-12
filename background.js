let selectedTypes = ["keywords", "summary", "kg"]

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.clear()
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

chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (activeTab) => {
        if (activeTab.url.match("https://*.medium.com/@*")) {
            chrome.action.setBadgeBackgroundColor({ color: "#0096FF" })
            chrome.action.setBadgeText({ text: 'ON' })
        } else {
            chrome.action.setBadgeText({ text: '' })
        }
    })
})