const sendMessage = (message) => {//メッセージを送る関数
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        // content.js にメッセージを送信する
        if(tabs){
            chrome.tabs.sendMessage(tabs[0].id, { action: message }, (response) => {
                if (response !== undefined && response.status !== undefined) {
                    console.log(response.status);
                } else {
                    console.log('Response is undefined or does not contain status');
                }
            });
        }
    });
}