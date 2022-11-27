function getList_SP(){
    var list = [];
    list = JSON.parse(localStorage.getItem('DSSP'));
    return list;
}

function keyword(s)
{
    sessionStorage.setItem('keyword',s)
}

function getList_Search(){
    var s = sessionStorage.getItem('keyword')
    var list = [];
    var list_load = [];
    list = getList_SP();

    for(let i=0;i<list.length;i++)
    {
        if(new RegExp(s).test(list[i].name))
        {
            list_load.push(list[i]);
        }
    }
    return list_load;
}

function search() // khoi tao trang tim kiem
{
    var s = document.getElementById('search_bar').value;
    if(s == "")
    {
        alert("Hãy nhập từ khóa tìm kiếm")
    }
    else{
    keyword(String(s));
    window.location.href = "./Search.html";
    }
}

function loadSearch()
{
    localStorage.setItem('DSBL', JSON.stringify(getList_Search()));
    load(getList_Search(),"DSBL");
    if(localStorage.getItem('DSBL') == "[]")
    {
        document.getElementById('bar').innerText = "KẾT QUẢ TÌM KIẾM TỪ KHÓA: " + sessionStorage.getItem('keyword') + " ====> KHÔNG TÌM THẤY KẾT QUẢ";
    }
    else{
    document.getElementById('bar').innerText = "KẾT QUẢ TÌM KIẾM TỪ KHÓA: " + sessionStorage.getItem('keyword');
}
}

function reset_choose(s) // chi boi den 1 bo loc dc chon
{
    var s1 ="amount"
    var s2 ="brand"
    if(new RegExp(s1).test(s))
        {
            for(let i=1;i<=4;i++)
            {
                if( (s1+i) != s)
                {
                    document.getElementById(s1+i).style.backgroundColor = "white"
                    document.getElementById(s1+i).style.color = "black"
                }
            }
        }
    else if(new RegExp(s2).test(s)){
        for(let i=1;i<=3;i++)
            {
                if( (s2+i) != s)
                {
                    
                    document.getElementById(s2+i).style.backgroundColor = "white"
                    document.getElementById(s2+i).style.color = "black"
                }
            }
    }
}

function bol_choose(id,name_filter,value_filter){ // boi den bo loc click vao
    if(document.getElementById(id).style.backgroundColor == "white")
    {
        document.getElementById(id).style.backgroundColor = "black"
        document.getElementById(id).style.color = "white"
        sessionStorage.setItem(String(name_filter),value_filter)
        reset_choose(id)
    }
   else if(document.getElementById(id).style.backgroundColor == "black")
    {
        document.getElementById(id).style.backgroundColor = "white"
        document.getElementById(id).style.color = "black"
        sessionStorage.removeItem(String(name_filter));
        reset_choose(id)
    }
}



function check_bol(id, name_filter, value_filter){ // kiem tra xem bao nhieu bo loc duoc chon
    bol_choose(id,name_filter,value_filter);
    if(sessionStorage.getItem('filter1') !== null && sessionStorage.getItem('filter2') !== null){
        var list_load = [];
        var list= []
        list = getList_Search();
        var a = String(String(sessionStorage.getItem('filter1'))).split("-");
        var min_price = Number(a[0].replace(".",""));
        var max_price = Number(a[1].replace(".",""));
    
    for(let i=0;i<list.length;i++)
    {
        var temp = list[i].price;
        temp = temp.replace(".","")
        temp = Number(temp);
        if(temp > min_price && temp <= max_price && String(sessionStorage.getItem('filter2')) == String(list[i].brand))
        {
            list_load.push(list[i]);
        }
        localStorage.setItem('DSBL', JSON.stringify(list_load));
        load(list_load,"DSBL");
    }
    }
    else if(sessionStorage.getItem('filter1') === null && sessionStorage.getItem('filter2') === null){
        loadSearch();
    }
    else if(sessionStorage.getItem('filter1') !== null && sessionStorage.getItem('filter2') === null){
        Price_FilterS();
    }
    else if(sessionStorage.getItem('filter1') === null && sessionStorage.getItem('filter2') !== null){
        Brand_FilterS()
    }
}

function Price_FilterS(amount)
{
    var list = [];
    list = getList_Search();
    var list_load = [];
    var a = String(amount).split("-");
    var a = String(String(sessionStorage.getItem('filter1'))).split("-");
    var min_price = Number(a[0].replace(".",""));
    var max_price = Number(a[1].replace(".",""));
    for(let i=0;i<list.length;i++)
    {
        var temp = list[i].price;
        temp = temp.replace(".","")
        temp = Number(temp);
        if(temp > min_price && temp <= max_price)
        {
            list_load.push(list[i]);
        }
    }
    localStorage.setItem('DSBL', JSON.stringify(list_load));
    load(list_load,"DSBL");
}

function Brand_FilterS()
{
    var list = [];
    list = getList_Search()
    var list_load = []; 

    
    for(let i=0;i<list.length;i++)
    { 
        if(String(list[i].brand) == String(sessionStorage.getItem('filter2')))
        {
            list_load.push(list[i]);
        }
    }
    localStorage.setItem('DSBL', JSON.stringify(list_load));
    load(list_load,"DSBL");
}
