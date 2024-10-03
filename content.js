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
    Preload(preloadHref);
}

async function Preload(hrefs){
    for(let i = 0;i < hrefs.length;++i){
        
        console.log(hrefs[i]);
        fetch(hrefs[i],{method:"GET"})
        .then(res => {
            return res.text();
        })
        .then(htmltext => {
            preloads[hrefs[i]] = htmltext;
        })
        .catch(() =>
            console.log("事前読込失敗")
        )
    }
}
    
function jumpURL(url){

    if(preloads[url]){
        //事前読込を使用
        const tmphtml = document.createElement("div");
        tmphtml.innerHTML = preloads[url];
        
        //実際に反映
        console.log("事前読込を使用");
        document.body.innerHTML = `${tmphtml.innerHTML}`;

        //bodyが新しく変化したため、もう一度リンクの収集を行いなおす
        main();
    }else{
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
        .catch(() => {
            console.log("非同期読込に失敗した代わりに遷移")
            window.location.href = url;
        })
    }
}