function getList_SP(){
    var list = [];
    list = JSON.parse(localStorage.getItem('DSSP'));
    return list;
}

function add_cart(){
    var productId = document.getElementById('detail_id_product').innerText
    var productName = document.getElementById('detail_name_product').innerText
    var productImg = document.getElementById('detail_img_product').src
    var productGia = document.getElementById('price').innerText
    var productSl = document.getElementById('number').value
    //console.log(productId,productGia,productImg,productName,productSl)
    addlocal(productId,productGia,productImg,productName,productSl)

  }

function load()
{
var id = Number(sessionStorage.getItem("idctsp"));
var list_Product = [];
list_Product = getList_SP();

for(let i=0;i<list_Product.length;i++){
   if ( Number(list_Product[i].id) == id )
   {
    document.getElementById('detail_name_product').innerText = list_Product[i].name;
    document.getElementById('detail_id_product').innerText = list_Product[i].id;
    document.getElementById('price').innerText = "GIÁ:  " + list_Product[i].price;
    document.getElementById('brand').innerText ="THƯƠNG HIỆU: " + list_Product[i].brand;
    document.getElementById('detail_img_product').src = list_Product[i].img;
    break;
   }
}
}

function decrease(){
var oldvalue = Number(document.getElementById('number').value);
if(oldvalue > 1)
{
oldvalue = oldvalue - 1;
document.getElementById('number').value = oldvalue;
}

}

function increase(){
var oldvalue = Number(document.getElementById('number').value);

    oldvalue = oldvalue + 1;
    document.getElementById('number').value = oldvalue;

}

//sua o cho nay
function addlocal(productId,productGia,productImg,productName,productSl){
let product = localStorage.getItem('gioHang') ?  JSON.parse(localStorage.getItem('gioHang')) : []
if(product.length === 0) {
    //console.log('vao if dau')
    // Nếu chưa có sp thì add luôn vào local
    product.push({productId,productGia,productImg,productName,productSl})
    localStorage.setItem('gioHang', JSON.stringify(product))
}
else if(product.length !== 0) {
    var temp = 0
for(var i = 0; i < product.length; i++){
    if(productId === product[i].productId)
    { 
        //console.log('vao if')
        temp = temp + 1
        var Sl = Number(product[i].productSl)
        //console.log('sl doc dc ',Sl)
        product.splice(i,1)
        localStorage.setItem('gioHang', JSON.stringify(product))
        Sl = Sl + 1
        //console.log('sl',Sl)
        productSl = String(Sl)
        product.push({productId,productGia,productImg,productName,productSl})
        localStorage.setItem('gioHang', JSON.stringify(product)) 
        break    
    }           
} 
if(temp == 0){
    //-khong tim duoc là sp mới add vào dssp
    //console.log('vao else')
    product.push({productId,productGia,productImg,productName,productSl})
    localStorage.setItem('gioHang', JSON.stringify(product))
}     
}
}
