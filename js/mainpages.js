function loadPage(dssp){
    var s = ""
    var pages = "";
    var n = JSON.parse(localStorage.getItem(dssp)).length; // số sản phẩm đang  có
    var products_1_page = 8;
    var m = Number(n) % 8;
    var list_Product = JSON.parse(localStorage.getItem(dssp));
    
    if(m === 0){
        m = Number(n) / 8;
    }
    else{
        m =Math.floor( (Number(n) / 8) + 1);
    }

    for(let i=0 ;i < m ;i++){
        var page = "page"+"(\'" + String(i+1) +"\'" + ",\'" + dssp +"\'" +")";
        pages = pages + " <li><a "  + " onclick=\"" + page + "\">"+(i+1)+"</a></li>"
        console.log("i",i);
    }

    for(let i=0;i<8;i++){
        if(i == list_Product.length){
            break;
        }
        else{
            s = s + "<li><img src=\"" + list_Product[i].img + "\" ></li>";
        }
        
    }

    console.log(s);
    document.getElementById('pages').innerHTML = pages
    document.getElementById('list-products').innerHTML = s
}



function page(id,dssp){
    var max = id * 8 ;
    var min = max -7;
    var s = ""
    var MAXProducts = JSON.parse(localStorage.getItem(dssp)).length;
    for(let i=min;i<=max;i++){     
        if(i>= MAXProducts)
        {
            break;
        }
        s = s + "<li><img src=\"" + list_Product[i].img + "\"></li>";
    }
    document.getElementById('list-products').innerHTML = s

   
}

