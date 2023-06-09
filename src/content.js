console.log('content script loaded')

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('Received a message:', request);
    if (request.message === 'playOpusJex') {
        console.log('received OPUS data from background')
        const audio = new Audio()
        audio.src = `data:audio/ogg;base64,${request.audio}`
        audio.play()
    }
});
