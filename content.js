const recieveMessage = (MessageToReceive,Efunction) => {
    chrome.runtime.onMessage.addListener((message,sender,sendResponse) => {
        if(message.action === MessageToReceive){
            Efunction();
            sendResponse({status: 'done'});
        }
    });
}
let preloads = {};
main();
async function main(){
    let hrefs = [];
    const ankers = document.querySelectorAll("a");
    for(anker of ankers){
        hrefs.push(anker.href || null);
    }
    const preloadHref = structuredClone(hrefs);
    ankers.forEach((anker,index) => {
        anker.href = "javascript:void(0);";
        anker.addEventListener("click",(event) => {
            event.preventDefault();
            jumpURL(hrefs[index]);
        })
    })
}
}
    
function jumpURL(url){
}