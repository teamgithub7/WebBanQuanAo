function sign_up(){
    var username = document.getElementById('us_up').value;
    var password = document.getElementById('pwd_up').value;
    var name = document.getElementById('name').value;
    var number = document.getElementById('number').value;

    if(username != "" && password != "" && name !="" && number != "" )
    {
        if(accExist() == true && checkEmail(username) == true && checkNumber(number) == true){
        var list_account = JSON.parse(localStorage.getItem("DSTK"));   
        var accounts =[];

        for(let i=0;i<list_account.length;i++){
            accounts.push(list_account[i]);
        }

        let acc ={"username":username, "password":password, "role":1, "name":name, "number":number, "date":getDay()};

        accounts.push(acc);
        localStorage.setItem("DSTK", JSON.stringify(accounts));
        alert("Đăng ký thành công")
     }
    }
    else{
        alert("Xin mời nhập đầy đủ thông tin")
    }
}


function checkNumber(number)
{
    if(isLetter(number) == false)
    {
        alert("Số điện thoại chỉ bao gồm chữ số")
        return false
    }
    return true
}

function isLetter(char) {
    return /^[0-9]+$/.test(char);
  }

function checkEmail(email) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@((gmail)+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(email)) {
        alert("nhập địa chỉ email hợp lệ. vd example@gmail.com");
        return false;
    }
    return true;
}

function accExist(){
    var us = document.getElementById('us_up').value;
    if(localStorage.getItem("DSTK") === null)
    {
        localStorage.setItem("DSTK",1);
        return true;
    }
    var list_account = JSON.parse(localStorage.getItem("DSTK"));   

    for(let i=0;i<list_account.length;i++){
        if(list_account[i].username == us){
            alert("Tài khoản đã tồn tại");
            return false;
        }
    }
    return true
}

function getDay()
{
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    var s = day + "-" + month + "-" + year;
    return s;
}

function checkAcc(us, pwd){
    var list_account = JSON.parse(localStorage.getItem("DSTK"));   

    for(let i=0;i<list_account.length;i++){
        if(list_account[i].username == us && list_account[i].password == pwd){
            alert("dang nhap thanh cong");        
            sessionStorage.setItem("isAccess",list_account[i].username);
            window.location.href = "./home.html";
        }
    }

}

function sign_in(){
    var username = document.getElementById('us_in').value;
    var password = document.getElementById('pwd_in').value;
    checkAcc(username, password);
}