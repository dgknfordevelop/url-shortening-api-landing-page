let apiUrl = "https://api.shrtco.de/v2";
let linkForm = document.querySelector("#Link-shortener-form")
let userInput = document.querySelector(".User-input")
let linkBox = document.querySelector(".Link-shortener-form-box")
let localUserLinkArray;
let localShortLinkArray;
let loadLinkArray;
let loadInputArray;

linkForm.addEventListener("submit", sendLink)

// working with localStorage getItem to get the saved inputs for re-creation of the UI on reloading the page
function getUserInputLocalStorage() {

    if (localStorage.getItem("userInput") === null) {
        localUserLinkArray = [];
    } else {
        localUserLinkArray = JSON.parse(localStorage.getItem("userInput"))
    }
    return localUserLinkArray;
}

function getShortLinkLocalStorage() {
    if (localStorage.getItem("shortLink") === null) {
        localShortLinkArray = [];
    } else {
        localShortLinkArray = JSON.parse(localStorage.getItem("shortLink"))
    }
    return localShortLinkArray;
}

function loadFromLocalStorage() {
    loadInputArray = getUserInputLocalStorage()
    loadLinkArray = getShortLinkLocalStorage()

    loadInputArray.forEach(function (item, index) {
        const ReadyLinkText = document.createElement("span");
        ReadyLinkText.className = "Ready-link-text";
        ReadyLinkText.innerText = `${loadLinkArray[index]}`

        const ReadyLinkCopyButton = document.createElement("button");
        ReadyLinkCopyButton.className = "Ready-link-copy-button";
        ReadyLinkCopyButton.innerText = "Copy";

        const ReadyLinkItem = document.createElement("div");
        ReadyLinkItem.className = "Ready-link-item";
        ReadyLinkItem.append(ReadyLinkText);
        ReadyLinkItem.append(ReadyLinkCopyButton);

        const ReadyLinkBoxHorizontalLine = document.createElement("hr");
        ReadyLinkBoxHorizontalLine.className = "Ready-link-box-horizontal-line";

        const UserLinkElement = document.createElement("span");
        UserLinkElement.className = "User-link";
        UserLinkElement.innerText = `${item}`;

        const ReadyLinkBox = document.createElement("div");
        ReadyLinkBox.className = "Ready-link-box";
        ReadyLinkBox.appendChild(UserLinkElement);
        ReadyLinkBox.appendChild(ReadyLinkBoxHorizontalLine);
        ReadyLinkBox.appendChild(ReadyLinkItem)

        linkBox.appendChild(ReadyLinkBox)

        // to copy the shortened links
        ReadyLinkCopyButton.addEventListener("click", copyButton);

        function copyButton(e) {
            e.target.classList.add("bg-dark-violet")
            e.target.innerText = "Copied!"
            navigator.clipboard.writeText(ReadyLinkText.innerText)
            setTimeout(copyTimeOut, 1000)

            function copyTimeOut() {
                e.target.classList.remove("bg-dark-violet")
                e.target.innerText = "Copy"
            }

        }
    });
}

loadFromLocalStorage();
// working with localStorage ends here

// to create shortened links with the coming input from user
function sendLink(e) {
    e.preventDefault();

    let controlUrl = userInput.value
    let controlDot = ".";

    // creating UI based on the response from API
    if (controlUrl.includes(controlDot)) {
        fetch(`${apiUrl}/shorten?url=${userInput.value}`)
            .then(response => response.json())
            .then(addLinkItem)
    } else {
        userInput.value = "Please add your URL here";
    }

    function addLinkItem(response) {
        const ReadyLinkText = document.createElement("span");
        ReadyLinkText.className = "Ready-link-text";
        ReadyLinkText.innerText = `${response.result.short_link}`;
        
        const ReadyLinkCopyButton = document.createElement("button");
        ReadyLinkCopyButton.className = "Ready-link-copy-button";
        ReadyLinkCopyButton.innerText = "Copy";

        const ReadyLinkItem = document.createElement("div");
        ReadyLinkItem.className = "Ready-link-item";
        ReadyLinkItem.append(ReadyLinkText);
        ReadyLinkItem.append(ReadyLinkCopyButton);

        const ReadyLinkBoxHorizontalLine = document.createElement("hr");
        ReadyLinkBoxHorizontalLine.className = "Ready-link-box-horizontal-line";

        const UserLinkElement = document.createElement("span");
        UserLinkElement.className = "User-link";
        UserLinkElement.innerText = `${userInput.value}`;

        const ReadyLinkBox = document.createElement("div");
        ReadyLinkBox.className = "Ready-link-box";
        ReadyLinkBox.appendChild(UserLinkElement);
        ReadyLinkBox.appendChild(ReadyLinkBoxHorizontalLine);
        ReadyLinkBox.appendChild(ReadyLinkItem)

        linkBox.appendChild(ReadyLinkBox)

        // using localStorage setItem to save the items for re-creation of the UI on reloading the page 
        function setUserInputLocalStorage(itemInput) {
            localUserLinkArray = getUserInputLocalStorage();
            localUserLinkArray.push(itemInput);
            localStorage.setItem("userInput", JSON.stringify(localUserLinkArray));
        }

        setUserInputLocalStorage(userInput.value);

        function setShortLinkLocalStorage(linkInput) {
            localShortLinkArray = getShortLinkLocalStorage();
            localShortLinkArray.push(linkInput);
            localStorage.setItem("shortLink", JSON.stringify(localShortLinkArray));
        }

        setShortLinkLocalStorage(response.result.short_link);
        // working with localStorage ends here

        userInput.value = "";

        // to copy the shortened links
        ReadyLinkCopyButton.addEventListener("click", copyButton);

        function copyButton(e) {
            e.target.classList.add("bg-dark-violet")
            e.target.innerText = "Copied!"
            navigator.clipboard.writeText(ReadyLinkText.innerText)
            setTimeout(copyTimeOut, 1000)

            function copyTimeOut() {
                e.target.classList.remove("bg-dark-violet")
                e.target.innerText = "Copy"
            }

        }

    }
}