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

function detailPage()
{
    var id = Number(localStorage.getItem("ctsp"));
    var list_Product ;
   
        if( id <= 1000 )
            list_Product = JSON.parse(localStorage.getItem(String("DSSPNam")));
        if( id > 1000 && id <= 2000 )
            list_Product = JSON.parse(localStorage.getItem(String("DSSPNu")));
        if( id > 2000 )
            list_Product = JSON.parse(localStorage.getItem(String("DSSPUnisex")));
    

    for(let i=0;i<list_Product.length;i++){
       if ( Number(list_Product[i].id) == id )
       {
        document.getElementById('detail_name_product').innerText = list_Product[i].name;
        document.getElementById('detail_id_product').innerText = list_Product[i].id;
        document.getElementById('price').innerText = list_Product[i].price;
        document.getElementById('brand').innerText = list_Product[i].brand;
        document.getElementById('detail_img_product').src = list_Product[i].img;
       }
    }
}

function getList_All()
{
    var list_Product1 = JSON.parse(localStorage.getItem('DSSPNam'));
    var list_Product2 = JSON.parse(localStorage.getItem('DSSPNu'));
    var list_Product3 = JSON.parse(localStorage.getItem('DSSPUnisex'));
    var list = [];

    var subString = String(localStorage.getItem('search'));

    for(let i=0;i<list_Product1.length;i++)
    {
        if(new RegExp(subString).test(list_Product1[i].name))
        {
            list.push(list_Product1[i]);
        }
    }

    for(let i=0;i<list_Product2.length;i++)
    {
        if(new RegExp(subString).test(list_Product2[i].name))
        {
            list.push(list_Product2[i]);
        }
    }

    for(let i=0;i<list_Product3.length;i++)
    {
        if(new RegExp(subString).test(list_Product3[i].name))
        {
            list.push(list_Product3[i]);
        }
    }

    localStorage.setItem("list", JSON.stringify(list));
    return list;
}

function loadPage(type)
{
    var list = [];
    if(Number(type) == 1)
    {
        list = getList();
        loadProducts(list,type);
    } 
    
    if(Number(type) == 2)
    {
        detailPage()
    }

    if(Number(type) == 3)
    {
        list = getList_All();
        loadProducts(list,type);
    }
}

function inner_pages(m,n,type)
{
    var pages = "";

    for(let i=0 ;i < m ;i++){
        var page = "page"+"(\'" + String(i+1) +"\'" + ",\'" + n +"\'"  + ",\'" + type +"\'" +")";
        pages = pages + " <li><a "  + " onclick=\"" + page + "\">"+(i+1)+"</a></li>"
    }
    return pages;
}

function loadProducts(list,type){
    var s = ""
    var pages ;
    var products_1_page = 8;
    var list_Product = list;
    var n = list_Product.length;
    var m = Number(n) % 8;

    if(Number(type == 1))
    {
        type_product_page(); 
    } 

    if(m === 0){
        m = Number(n) / 8;
    }
    else{
        m = Math.floor( (Number(n) / 8) + 1);
    }
    
    pages = inner_pages(m,n,type);

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


function page(cur,n,type){
    var max = cur * 8 ;
    var min = max - 8;
    var s = ""
    var list_Product =[];
    if(Number(type) == 1)
    {
        list_Product = getList();
    }
    if(Number(type) == 3)
    {
        list_Product = getList_All();
    }
    var MAXProducts = n;

    for(let i= min ; i < max;i++){     

        if(i >= MAXProducts)
        {
            break;
        }
        s = s + "<li><img src=\"" + list_Product[i].img + "\"  onclick=\"" + "details_product('" + list_Product[i].id + "')" + "\">" 
        s = s + " <div class=\"name_price\"><span class=\"name\">"+ list_Product[i].name + "</span>";
        s = s + "<span class=\"price\">"+ list_Product[i].price +"đ</span></div>" + "</li>";
 

    }
    document.getElementById('list-products').innerHTML = s
}

function Price_Filter(type,type1)
{
    var list = [];
    var list_Product = [];
    var min_price = 0;
    var max_price = 0;
    if(Number(type1) == 1)
    {
        list = getList();
    }

    if(Number(type1) == 3)
    {
        list = getList_All();
    }

    switch(Number(type)){
        case 1:
            min_price = 100;
            max_price = 200;
            break;
        case 2:
            min_price = 200;
            max_price = 300;
            break;
        case 3:
            min_price = 300;
            max_price = 500;
            break;
        case 4:
            min_price = 500;
            max_price = 99999;
            break;
        default:
            break;
    }

    for(let i=0;i<list.length;i++)
    {
        var temp = [];
        temp = list[i].price.split(".");
        var price_product = temp[0];
        if(price_product > min_price && price_product <= max_price)
        {
            list_Product.push(list[i]);
        }
    }

    loadProducts(list_Product);
}

function Type_Filter(type,type1)
{
    var list = [];
    var list_Product = [];
    if(Number(type1) == 1)
    {
        list = getList();
    }

    if(Number(type1) == 3)
    {
        list = getList_All();
    }

    
    for(let i=0;i<list.length;i++)
    { 
        if(list[i].type == type)
        {
            list_Product.push(list[i]);
        }
    }

    loadProducts(list_Product);
}


function Brand_Filter(type,type1)
{
    var list = [];
    var list_Product = [];
    if(Number(type1) == 1)
    {
        list = getList();
    }

    if(Number(type1) == 3)
    {
        list = getList_All();
    }

    
    for(let i=0;i<list.length;i++)
    { 
        if(list[i].brand == type)
        {
            list_Product.push(list[i]);
        }
    }

    loadProducts(list_Product);
}

function decrease(){
    var oldvalue = Number(document.getElementById('number').value);
    if(oldvalue > 1)
    {
        oldvalue = oldvalue - 1;
        document.getElementById('number').value = oldvalue;
    }
    
    }
    
function increase(){
        var oldvalue = Number(document.getElementById('number').value);
       
            oldvalue = oldvalue + 1;
            document.getElementById('number').value = oldvalue;
        
    }

function search()
{
    var s = document.getElementById('search_bar').value;
    localStorage.setItem('search',s);
    window.location.href ="./timkiem.html";
}

function details_product(id){
    localStorage.setItem("ctsp",id)
    window.location.href ="./chitietsanpham.html";
}