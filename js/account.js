class account{
    constructor(username, password, role){
        this.username = username;
        this.password = password;
        this.role = role;
    }

    get getUsername(){
        return this.username;
    }

    get getPassword(){
        return this.password;
    }

    get getRole(){
        return this.role;
    }

    set setPassword(newPassword){
        this.password = newPassword;
    }

    set setRole(newRole){
        this.role = newRole;
    }
}


function sign_up(){
    var username = document.getElementById('us').value;
    var password = document.getElementById('pwd').value;

    if(username != "" && password != "")
    {

    let acc = new account(username,password,1)
    var n = Number(localStorage.getItem('N'));

    // cap nhat lai so luong account
    n=n+1;
    localStorage.setItem('N',n)

    // khoi tao bien key cho local storage
    var key = String("us" + n)
    
    localStorage.setItem(key, JSON.stringify(acc));
    }
    else{
        alert("Xin mời nhập đầy đủ thông tin")
    }
}
localStorage.clear()
localStorage.setItem('N',0);

function checkAcc(us, pwd){
    var n = Number(localStorage.getItem('N'));
    let acc = new Array(n);
    
    for(let i=1;i<=n;i++){
        var key = String("us" + i)
        var retrievedObject = localStorage.getItem(key);
        var temp = JSON.parse(retrievedObject);

        var username = temp.username;
        var password = temp.password;
        var role = temp.role;

        acc[i] = new account(username, password, role);
    }
    for(let i=1;i<=n;i++){
        if(us == acc[i].getUsername && pwd == acc[i].getPassword)
        {
            alert('dang nhap thanh cong')
        }
    }
}

function sign_in(){
    var username = document.getElementById('us').value;
    var password = document.getElementById('pwd').value;
    checkAcc(username, password);
}

