function initPage(sanpham){
    var s = ""
    var pages = "";
    var n = localStorage.getItem(String(sanpham)); // số sản phẩm đang  có
    var m = Number(n) % 8;

    if(m == 0){
        m = Number(n) / 8;
    }
    else{
        m = (Number(n) / 8) + 1;
    }

    var products_1_page = 8;

    for(let i=1;i<=m;i++){
        var page = "page"+"(\'" + String(i) +"\'" + ",\'" + sanpham +"\'" +")";
        pages = pages + " <li><a "  + " onclick=\"" + page + "\">"+i+"</a></li>"
    }

    for(let i=1;i<=8;i++){
        s = s + "<li><img src=\"./img/" + String(sanpham) + "/"+i+".jpg\"></li>";
    }

    console.log(s);
    document.getElementById('pages').innerHTML = pages
    document.getElementById('list-products').innerHTML = s
}
/*
localStorage.setItem("SPNam",Number(10))
localStorage.setItem("SPNu",Number(13))
localStorage.setItem("SPTreEm",Number(10))
*/

/*
localStorage.setItem("DSSPNam",1);
localStorage.setItem("DSSPNu",1);
localStorage.setItem("DSSPTreEm",1);
*/



function page(id,sanpham){
    var max = id * 8 ;
    var min = max -7;
    var s = ""
    var MAXProducts = localStorage.getItem(String(sanpham));
    for(let i=min;i<=max;i++){     
        if(i> MAXProducts)
        {
            break;
        }
        s = s + "<li><img src=\"./img/" + String(sanpham) + "/"+i+".jpg\"></li>";
    }
    document.getElementById('list-products').innerHTML = s

   
}

function test(){
    var idProduct;
    var imgProduct;
    var list_Product = JSON.parse(localStorage.getItem("DSSanPhamNu"));
    var products = [];
    for(let i=0;i<list_Product.length;i++){
        products.push(list_Product[i]);
    }

    s=" ./img/SPNu/2.jpg";
    let product ={"id":2,"img":s};
    products.push(product);
    localStorage.setItem("DSSanPhamNu", JSON.stringify(products));
}
