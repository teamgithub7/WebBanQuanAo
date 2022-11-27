function getList_SP(){
    var list = [];
    list = JSON.parse(localStorage.getItem('DSSP'));
    return list;
}

function loadProduct(brand)
{
    var list =[]
    var s ="";
    var j = 0;
    list = getList_SP();


    for(let i=0;i<list.length;i++)
    {
        if(String(list[i].brand) == String(brand))
        {
            s = s + "<li onclick=\"detail_product('"+ list[i].id +"')\"><img src="+ list[i].img +"></li>";
            j++;
        }
        if(j == 5)
        {
            break;
        }
    }
    brand = String(brand).toLocaleUpperCase();
    document.getElementById(brand).innerHTML = s;
}



function loadHome(){
    var list =[]
    list = getList_SP();
    loadProduct('Yame');
    loadProduct('Dirty Coins');
    loadProduct('5TheWay');
    isAdmin()
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

function detail_product(id){
    sessionStorage.setItem("idctsp",id)
    window.location.href ="./detailproduct.html";
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