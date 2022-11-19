function loadPage()
{
    var id = Number(localStorage.getItem("ctsp"));
    var list_Product ;
   
        if( id <= 1000 )
            list_Product = JSON.parse(localStorage.getItem(String("DSSPNam")));
        if( id > 1000 && id <= 2000 )
            list_Product = JSON.parse(localStorage.getItem(String("DSSPNu")));
        if( id > 2000 )
            list_Product = JSON.parse(localStorage.getItem(String("DSSPUnisex")));
    

    for(let i=0;i<list_Product.length;i++){
       if ( Number(list_Product[i].id) == id )
       {
        document.getElementById('detail_name_product').innerText = list_Product[i].name;
        document.getElementById('detail_id_product').innerText = list_Product[i].id;
        document.getElementById('price').innerText = list_Product[i].price;
        document.getElementById('brand').innerText = list_Product[i].brand;
        document.getElementById('detail_img_product').src = list_Product[i].img;
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