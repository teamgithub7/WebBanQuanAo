function getList_SP(){
    var list = [];
    list = JSON.parse(localStorage.getItem('DSSP'));
    return list;
}

function inner_pages(m,name_list)
{
    var pages = "";

    for(let i=0 ;i < m ;i++){
        var page = "page"+"(\'" + String(i+1) +"\'"+ ",\'" + name_list + "\'" + ")";
        pages = pages + " <li><a "  + " onclick=\"" + page + "\">"+(i+1)+"</a></li>"
    }
    return pages;
}

function divide_page(n){
    var m = Number(n) % 8;
    if(m === 0){
        m = Number(n) / 8;
    }
    else{
        m = Math.floor( (Number(n) / 8) + 1);
    }
    return m;
}

function loadPage(brand)
{
    var list = []
    var list_load = []
    list = getList_SP();

    for(let i =0;i<list.length;i++)
    {
        if(String(list[i].brand) == String(brand))
        {
            list_load.push(list[i]);
        }
    }
    isAdmin();
    localStorage.setItem('DSBL', JSON.stringify(list_load));
    load(list_load,"DSBL");
}

function load(list,name_list){
    var s = "";
    var n = Number(list.length);
    for(let i=0;i<n;i++)
    {          
        if(i == 8)
        {
            break;
        }
        s = s + "<li><img src=\"" + list[i].img + "\"  onclick=\"" + "detail_product('" + list[i].id + "')" + "\">" 
        s = s + "<div class=\"name_price\"><span class=\"name\">"+ list[i].name + "</span>";
        s = s + "<span class=\"price\">"+ list[i].price +"đ</span></div>" + "</li>";         
    }
    document.getElementById('pages').innerHTML = inner_pages(Number(divide_page(n)),name_list);
    document.getElementById('list-products').innerHTML = s
}


function page(cur,name_list){
    var max = cur * 8 ;
    var min = max - 8;
    var s = ""
    var list = JSON.parse(localStorage.getItem(String(name_list)));
    var MAXProducts = Number(list.length);

    for(let i= min ; i < max;i++){     

        if(i >= MAXProducts)
        {
            break;
        }
        s = s + "<li><img src=\"" + list[i].img + "\"  onclick=\"" + "detail_product('" + list[i].id + "')" + "\">" 
        s = s + " <div class=\"name_price\"><span class=\"name\">"+ list[i].name + "</span>";
        s = s + "<span class=\"price\">"+ list[i].price +"đ</span></div>" + "</li>";
    }

    document.getElementById('list-products').innerHTML = s

}

function Price_Filter(amount,brand)
{
    var list = [];
    list = getList_SP();
    var list_load = [];
    var a = String(amount).split("-");
    var min_price = Number(a[0].replace(".",""));
    var max_price = Number(a[1].replace(".",""));
    for(let i=0;i<list.length;i++)
    {
        var temp = list[i].price;
        temp = temp.replace(".","")
        temp = Number(temp);
        if(temp > min_price && temp <= max_price && String(list[i].brand) == String(brand))
        {
            list_load.push(list[i]);
        }
    }
    localStorage.setItem('DSBL', JSON.stringify(list_load));
    load(list_load,"DSBL");
}

function Brand_Filter(brand)
{
    var list = [];
    list = getList_SP()
    var list_load = []; 

    
    for(let i=0;i<list.length;i++)
    { 
        if(String(list[i].brand) == String(brand))
        {
            list_load.push(list[i]);
        }
    }
    localStorage.setItem('DSBL', JSON.stringify(list_load));
    load(list_load,"DSBL");
}


function detail_product(id){
    sessionStorage.setItem("idctsp",id)
    window.location.href ="./detailproduct.html";
}

function isLogin(){
    if(sessionStorage.getItem('isAccess') === null)
    {
        window.location.href = "./login.html";      
    }
    else{
        window.location.href = "/infoAccount.html";      
    }
}

function getList_TK(){
    var list = [];
    list = JSON.parse(localStorage.getItem('DSTK'));
    return list;
}


function isAdmin(){
    var list_account =[];
    var username = sessionStorage.getItem('isAccess');
    list_account = getList_TK();

    for(let i=0;i<list_account.length;i++)
    {
        if(list_account[i].username == username && Number(list_account[i].role) == 0)
        {        
            var s = document.getElementById('topmenu-container1').innerHTML;
            s = s + "<a href=\"./admin.html\"> <i class=\"fa-solid fa-gear\"></i></a> ";
            document.getElementById('topmenu-container1').innerHTML = s;
            return true;
        }
    }
    return false;
}