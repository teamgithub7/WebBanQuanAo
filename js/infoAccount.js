function myAccount(){

    var s = "" ;
    var list_account = JSON.parse(localStorage.getItem(String("DSTK")));
    var username = sessionStorage.getItem('isAccess');

    for(let i=0;i<list_account.length;i++)
    {
        if(list_account[i].username == username)
        {
            s = s + " <div class=\"filter_infor\"><h2>TÀI KHOẢN CỦA TÔI</h2><span style=\"color: grey;\">Thông tin tài khoản<hr></span></div>"
            s = s + " <div class=\"filter_infor\" style=\"width: 40%;\"><h2>Họ và tên</h2><span style=\"color: grey;\">" + String(list_account[i].name) +"</span></div>"
            s = s + " <div class=\"filter_infor\" style=\"width: 40%;\"><h2>Số điện thoại</h2><span style=\"color: grey;\">"+ String(list_account[i].number) +"</span></div>"
        
        }
    }
    document.getElementById('filters_infor').innerHTML = s;
}

function myOrder(){

}

function sign_Out(){
    sessionStorage.removeItem('isAccess');
    window.location.href = "./home.html";
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