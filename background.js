let selectedTypes = ["keywords", "summary", "kg"]

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ selectedTypes })
})