function setType(type_product,dssp){
    sessionStorage.setItem("type_product",String(type_product));
    sessionStorage.setItem("choose",String(dssp));
}

function getList(){
    var dssp = String(sessionStorage.getItem("choose"))
    var list_Product = JSON.parse(localStorage.getItem(dssp));
    var type = String(sessionStorage.getItem("type_product"));

    var list = [];

    for(let i=0;i<list_Product.length;i++)
    {
        if(list_Product[i].type == type)
        {
            list.push(list_Product[i]);
        }
        if(type == "All")
        {
            list.push(list_Product[i]);
        }
    }
    localStorage.setItem("list", JSON.stringify(list));
    return list;
}

function loadPage()
{
    var list = [];
    list = getList();
    loadProducts(list);
}

function inner_pages(m,n)
{
    var pages = "";
    var dssp = String(sessionStorage.getItem("choose"))
    for(let i=0 ;i < m ;i++){
        var page = "page"+"(\'" + String(i+1) +"\'" + ",\'" + dssp +"\'"  + ",\'" + n +"\'" +")";
        pages = pages + " <li><a "  + " onclick=\"" + page + "\">"+(i+1)+"</a></li>"
    }
    return pages;
}

function loadProducts(list){
    var s = ""
    var pages ;
    var products_1_page = 8;
    var list_Product = list;
    var n = list_Product.length;
    var m = Number(n) % 8;

    type_product_page();   

    if(m === 0){
        m = Number(n) / 8;
    }
    else{
        m = Math.floor( (Number(n) / 8) + 1);
    }
    
    pages = inner_pages(m,n);

    for(let i=0;i<8;i++)
    {
        if(i == n){
            break;
        }
        else{         
                 s = s + "<li><img src=\"" + list_Product[i].img + "\"  onclick=\"" + "details_product('" + list_Product[i].id + "')" + "\">" 
                 s = s + " <div class=\"name_price\"><span class=\"name\">"+ list_Product[i].name + "</span>";
                 s = s + "<span class=\"price\">"+ list_Product[i].price +"đ</span></div>" + "</li>";   
        }
    }

    document.getElementById('pages').innerHTML = pages
    document.getElementById('list-products').innerHTML = s
}

function type_product_page()
{
    var dssp = String(sessionStorage.getItem("choose"))
    var s ="";
    switch (dssp){
        case "DSSPNam":
            s=" NAM"
            break;
        case "DSSPNu":
            s=" NỮ"
            break;
        case "DSSPUnisex":
            s=" UNISEX"
            break;
        default:
            break;
    }
    var s1 = String(sessionStorage.getItem("type_product"))
    switch (s1){
        case "All":
            s1="SẢN PHẨM" + s;
            break;
        case "Áo":
            s1="ÁO" + s;
            break;
        case "Quần":
            s1 = "QUẦN" + s;
            break;
        default:
            break;
    }
    document.getElementById("bar").textContent = s1;
}


function page(cur,dssp,n){
    var max = cur * 8 ;
    var min = max - 8;
    var s = ""
    var list_Product =[];
    list_Product = getList();
    var MAXProducts = n;
    for(let i= min ; i < max;i++){     
        if(i == MAXProducts)
        {
            break;
        }
        s = s + "<li><img src=\"" + list_Product[i].img + "\"  onclick=\"" + "details_product('" + list_Product[i].id + "')" + "\">" 
        s = s + " <div class=\"name_price\"><span class=\"name\">"+ list_Product[i].name + "</span>";
        s = s + "<span class=\"price\">"+ list_Product[i].price +"đ</span></div>" + "</li>";   
    }
    document.getElementById('list-products').innerHTML = s
}

function details_product(id){
    sessionStorage.setItem("id",id)
    //window.location.href = "../trangchu.html";
}