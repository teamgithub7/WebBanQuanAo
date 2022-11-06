function sign_up(){
    var username = document.getElementById('us_up').value;
    var password = document.getElementById('pwd_up').value;
    var name = document.getElementById('name').value;
    var number = document.getElementById('number').value;

    if(username != "" && password != "" && name !="" && number != "" )
    {
        if(accExist() == true){
        var list_account = JSON.parse(localStorage.getItem("list_account"));   
        var accounts =[];

        for(let i=0;i<list_account.length;i++){
            accounts.push(list_account[i]);
        }

        let acc ={"username":username, "password":password, "role":1, "name":name, "number":number};

        accounts.push(acc);
        localStorage.setItem("list_account", JSON.stringify(accounts));
     }
    }
    else{
        alert("Xin mời nhập đầy đủ thông tin")
    }
}

localStorage.setItem("list_account",1)

function accExist(){
    var us = document.getElementById('us_up').value;
    var list_account = JSON.parse(localStorage.getItem("list_account"));   

    for(let i=0;i<list_account.length;i++){
        if(list_account[i].username == us){
            alert("Tài khoản đã tồn tại");
            return false;
        }
    }
    return true
}


function checkAcc(us, pwd){
    var list_account = JSON.parse(localStorage.getItem("list_account"));   

    for(let i=0;i<list_account.length;i++){
        if(list_account[i].username == us && list_account[i].password == pwd){
            alert("dang nhap thanh cong");
            sessionStorage.setItem("isAccsess",true);
            window.location.href = "./trangchu.html";
        }
    }

}

function sign_in(){
    var username = document.getElementById('us_in').value;
    var password = document.getElementById('pwd_in').value;
    checkAcc(username, password);
}