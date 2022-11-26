function checkemail() {
    var email = document.getElementById('email').value;
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(email.value)) {
        alert("nhập địa chỉ email hợp lệ. vd example@gmail.com");
        email.focus;
        return false;
    }
}