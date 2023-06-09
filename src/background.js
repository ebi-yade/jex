const handleStart = (info, tab) => {
    if (info.menuItemId !== 'startJex' || !info.selectionText?.trim()) {
        return
    }

    console.log('start speaking')
    chrome.identity.getAuthToken({interactive: true}, async (token) => {
        console.log(`text: ${info.selectionText}`)
        const input = {
            input: {
                text: info.selectionText
            },
            voice: {
                languageCode: 'en-US',
                name: 'en-US-Neural2-J', // IMPORTANT: the killer voice!
                ssmlGender: 'MALE'
            },
            audioConfig: {
                audioEncoding: 'OGG_OPUS',
                speakingRate: 1.0,
                pitch: 0,
            }
        }
        const response = await fetch('https://texttospeech.googleapis.com/v1beta1/text:synthesize', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(input),
        })
        const data = await response.json()
        const {audioContent} = data
        if (!audioContent) {
            console.log('no audio content')
            return
        }
        console.log('got audio content from google cloud')
        console.log({tab})
        await chrome.tabs.sendMessage(
            tab.id,
            {
                message: 'playOpusJex',
                audio: audioContent,
            }
        );
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
