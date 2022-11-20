function checkinlogin() {
    var username = document.getElementById('us_up').value;
    var password = document.getElementById('pwd_up').value;
    if (username.value.trim() =="") {
        alert('username trống');
    }else if (password.value.trim() =="") {
        alert("password trống");
    }else if (password.value.trim().length < 8){
        alert("password không được dưới 8 ký tự");
    }
    countstring(sub1,sub2,str);
}

function countstring(sub1,sub2,str) {
    let str=password;
    let sub1='a';'b';'c';'d';'e';'f';'g';'h';'i';'j';'k';'l';'m';'n';'o';'p';'q';'r';'s';'t';'u';'v';'w';'x';'y';'z';
    let sub2='0';'1';'2';'3';'4';'5';'6';'7';'8';'9';
    let count1 =0;
    let count2 =0;
    for (let i = 0; i < str.length; i++) {
        if (str.substring(i,i + sub1.length)==sub1) {
            count1=1;
        } 
        if (str.substring(i,i + sub2.length)==sub2) {
            count2=1;
        }
        if (count1=count2) {
            return true;
        }else alert("password không có chữ cái/chữ số")
        return false;
    }
}

