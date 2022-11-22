function checkinadmin(price) {
    var price = document.getElementById('price');
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
}
