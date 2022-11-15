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
    }
    
    localStorage.setItem("list", JSON.stringify(list));
}

function loadPage(){
    var dssp = String(sessionStorage.getItem("choose"))
    var s = ""
    var pages = "";
    var products_1_page = 8;
    var list_Product = JSON.parse(localStorage.getItem(dssp));
    var n = number_products(list_Product);
    var m = Number(n) % 8;
    var type = String(sessionStorage.getItem("type_product"));

    type_product_page(String(dssp));


    if(m === 0){
        m = Number(n) / 8;
    }
    else{
        m = Math.floor( (Number(n) / 8) + 1);
    }

    for(let i=0 ;i < m ;i++){
        var page = "page"+"(\'" + String(i+1) +"\'" + ",\'" + dssp +"\'"  + ",\'" + n +"\'" +")";
        pages = pages + " <li><a "  + " onclick=\"" + page + "\">"+(i+1)+"</a></li>"
    }

    var i=0;
    var j=0;

    while(i<8){
        if(i == n){
            break;
        }
        else{
            if(type == "All")
            {
                 s = s + "<li><img src=\"" + list_Product[j].img + "\"  onclick=\"" + "details_product('" + list_Product[j].id + "')" + "\">" 
                 s = s + " <div class=\"name_price\"><span class=\"name\">"+ list_Product[j].name + "</span>";
                 s = s+ "<span class=\"price\">"+ list_Product[j].price +"đ</span></div>" + "</li>"; 
                 i++;
            }
            else if(type == "Áo" && list_Product[j].type == "Áo")
            {
                s = s + "<li><img src=\"" + list_Product[j].img + "\"></li>";
                i++;
            }
            else if(type == "Quần" && list_Product[j].type == "Quần")
            {
                s = s + "<li><img src=\"" + list_Product[j].img + "\" ></li>";
                i++;
            }
        }
        j++;
    }
    document.getElementById('pages').innerHTML = pages
    document.getElementById('list-products').innerHTML = s
}


function number_products(list_Product){
    var n = Number(0);
    var s = String(sessionStorage.getItem("type_product"))

    if(s=="All")
    {
        return list_Product.length;
    }

    for(let i=0;i<list_Product.length;i++)
    {
        if( String(list_Product[i].type) == s )
        {
            n++;
        }
    }
    console.log(n);
    return n;
}


function type_product_page(dssp)
{
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
    var min = max -7;
    var s = ""
    var type_product = String(sessionStorage.getItem("type_product"));
    var list_Product = JSON.parse(localStorage.getItem(dssp));
    var list_Product_type =[];

    for(let i=0;i<list_Product.length;i++)
    {
        if(list_Product[i].type == type_product){
            list_Product_type.push(list_Product[i]);
        }
        else if(type_product == "All")
        {
            list_Product_type.push(list_Product[i]);
        }
    }

    var MAXProducts = n;
    for(let i=min;i<=max;i++){     
        if(i == MAXProducts)
        {
            break;
        }
        s = s + "<li><img src=\"" + list_Product_type[i].img + "\"></li>";
    }
    document.getElementById('list-products').innerHTML = s

   
}

function details_product(id){
    sessionStorage.setItem("id",id)
    //window.location.href = "../trangchu.html";
}