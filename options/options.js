let checkboxesDiv = document.getElementById("checkboxes-div");
const defaultTypes = ["keywords", "summary", "kg"];

let handleCheckboxClick = (e) => {
    chrome.storage.local.get("selectedTypes", data => {
        selectedTypes = data.selectedTypes
        if (!selectedTypes.includes(e.target.value)) {
            selectedTypes.push(e.target.value)
        } else {
            selectedTypes = selectedTypes.filter(type => type !== e.target.value)
        }
        chrome.storage.local.set({ selectedTypes })
    })
}

let constructOptions = (defaultTypes) => {
    chrome.storage.local.get("selectedTypes", data => {
        selectedTypes = data.selectedTypes
        for (let defaultType of defaultTypes) {
            let input = document.createElement("input");
            input.type = "checkbox"
            input.value = defaultType
            input.checked = selectedTypes.includes(defaultType) ? true : false
            let label = document.createElement("label")
            label.innerText = defaultType
            input.addEventListener("click", handleCheckboxClick);
            checkboxesDiv.appendChild(input)
            checkboxesDiv.appendChild(label)
        }
    })
}

constructOptions(defaultTypes)