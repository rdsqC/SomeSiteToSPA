const recieveMessage = (MessageToReceive,Efunction) => {
    chrome.runtime.onMessage.addListener((message,sender,sendResponse) => {
        if(message.action === MessageToReceive){
            Efunction();
            sendResponse({status: 'done'});
        }
    });
let preloads = {};
main();
}
}