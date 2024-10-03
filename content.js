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
        fetch(url,{method : "GET"})
        .then(res => {
            return res.text();
        })
        .then(htmltext => {
            //一次要素に取得したhtmlを入れて適切に取り出す
            const tmphtml = document.createElement("div");
            tmphtml.innerHTML = htmltext;
            
            //実際に反映
            console.log("非同期読込を使用")
            document.body.innerHTML = `${tmphtml.innerHTML}`;

            //bodyが新しく変化したため、もう一度リンクの収集を行いなおす
            main();
        })
}