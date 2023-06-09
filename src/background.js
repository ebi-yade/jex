const handleStart = (info) => {
    if (info.menuItemId !== 'startJex') {
        return
    }
    console.log('start speaking')
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
        console.log("got token", token)
    })
}

// manipulate context menu
chrome.contextMenus.removeAll()
chrome.contextMenus.create({
    id: 'startJex',
    title: 'Start speaking selected text',
    contexts: ['selection'],
})
chrome.contextMenus.onClicked.addListener(handleStart)
