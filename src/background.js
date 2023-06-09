chrome.contextMenus.create({
    id: 'start',
    title: 'Start speaking selected text',
    contexts: ['selection'],
    onclick: (info, tab) => {
        console.log(info, tab)
    }
})
