function checkemail() {
    var email = document.getElementById('us_up');
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([gmail])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(email.value)) {
        alert("nhập địa chỉ email hợp lệ");
        email.focus;
        return false;
    }
}
