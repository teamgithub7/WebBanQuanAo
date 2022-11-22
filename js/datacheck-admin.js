function checkinadmin(price) {
    var price = document.getElementById('price').value;
    var add_id = document.getElementById('add_id').value;
    var name = document.getElementById('name').value;
    if (price.value < 0) {
        alert("giá không âm");
        return false;
    }else if (price.value =='') {
        alert("không được để trống");
        return false;
    }else if (typeof price !== Number) {
        alert("không phải số");
        return false;
    }
    if (add_id.value =='') {
        alert("không để trống mã");
        return false;
    }
    if (name.value =='') {
        alert("không để trống tên sản phẩm");
        return false;
    }
}
