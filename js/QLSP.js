function Home(){
    window.location.href = "./Home.html";
}


function Products_Manage(){
    close_popup();
    var s = tableSP_container_inner();
    s = s + "<div class=\"add_container\"> <div class=\"add_product\">THÊM SẢN PHẨM</div> "
    s = s + "<div class=\"add_div\"><span>Tên sản phẩm</span><input class=\"input_add\" type=\"text\" id=\"name_add\"></div> ";
    s = s + "<div class=\"add_div\"><span>Thương hiệu</span><select name=\"brand\" id=\"brand_add\"> "
    s = s + "<option value=\"Dirty Coins\">Dirty Coins</option><option value=\"Yame\">Yame</option><option value=\"5TheWay\">5TheWay</option> </select></div>"
    s = s + "<div class=\"add_div\"><span>Giá</span><input class=\"input_add\" type=\"text\" id=\"price_add\"></div>"
    s = s + "<div class=\"add_div\"><span>Chọn ảnh</span><input type=\"file\" id=\"file-id\" onchange=\"show_img_add()\"><div class=\"add_img\" id=\"add_img\"></div></div>"
    s = s + "<input type=\"button\" class=\"add_btn\" value=\"THÊM SẢN PHẨM\" onclick = \"add_product()\"></div>" ; 
    document.getElementById('info_filters').innerHTML = s;
    show_table_SP();
}

function getfullPath(){
    if(document.getElementById("file-id").files.length === 0)
    {
        return "";
    }
    var filename = document.getElementById("file-id").files[0].name; 
    var fullpath = "./img/" + "DSSP" + "/" + filename;
    return fullpath;
}

function show_img_add(){
    var s = "<img src=\""+ getfullPath() + "\">"
    document.getElementById("add_img").innerHTML = s;
}


function getfullPath_fix(){
    if(document.getElementById("file-id-fix").files.length === 0)
    {
        return "";
    }
    var filename = document.getElementById("file-id-fix").files[0].name; 
    var fullpath = "./img/" + "DSSP" + "/" + filename;
    return fullpath;
}

function show_img_fix(){
    var s = "<img src=\""+ getfullPath_fix() + "\">"
    document.getElementById("fix_img").innerHTML = s;
}

function tableSP_container_inner(){
    var idtable = "";  
    idtable = "table_SP"
    var s = "<div class=\"manage_name\">Quản lý sản phẩm</div><div class=\"table_container\"><table id=\""+idtable+"\"></table></div>"
    return s ;
}

function getList_SP(){
    var list = [];
    list = JSON.parse(localStorage.getItem('DSSP'));
    return list;
}

function col_inner_SP(){
    var s = "";
    s = s + "<tr>"
    s = s + "<th>MÃ SẢN PHẨM</th>"
    s = s + "<th>TÊN SẢN PHẨM</th>"
    s = s + "<th>THƯƠNG HIỆU</th>"
    s = s + "<th>GIÁ</th>"
    s = s + "<th>IMG</th>"
    s = s + "<th>THAO TÁC</th>"
    s = s + "</tr>"
    return s;
}

function show_table_SP(){

    var s = ""
    var idtable = "";
    idtable = "table_SP";
    s = col_inner_SP('SP')
   
    var newhtml =""
    var list = [];
    list = getList_SP();
    if (localStorage.getItem('DSSP') === null) {
        localStorage.setItem('DSSP',1);
    }
        for(let i=0;i<list.length;i++){
            newhtml = newhtml + "<tr>"
            newhtml = newhtml + "<td> " + list[i].id   +"</td>"
            newhtml = newhtml + "<td >" + list[i].name +"</td>"
            newhtml = newhtml + "<td >" + list[i].brand  +"</td>"
            newhtml = newhtml + "<td >" + list[i].price  +"</td>"
            newhtml = newhtml + "<td >" + "<img src=\""+ list[i].img +"\">" + "</td>";
            newhtml = newhtml + "<td >" ;
            newhtml = newhtml + "<input type=\"button\" class=\"del_btn\" value=\"XOA\" onclick=\"Confirm_delSP('"+list[i].id+"')\">" ;
            newhtml = newhtml + "<input type=\"button\" class=\"fix_btn\" value=\"SUA\" onclick=\"open_popup('"+list[i].id+"')\">" ;
            newhtml = newhtml + "</td>"
            newhtml = newhtml + "</tr>";
        }
    document.getElementById(idtable).innerHTML = s + newhtml;
}



function isLetter(char) {
    return /^[0-9]+$/.test(char);
  }

function check_input(name, price, img) {
    if (name =="") {
        alert("Không để trống tên sản phẩm");
        return false;
    }
    if (Number(price) < 0) {
        alert("Giá không âm");
        return false;
    }
    else if (price =="") {
        alert("Giá không được để trống ");
        return false;
    }
    else{
        if(isLetter(price) == false)
        {
            alert('Giá chỉ bao gồm số')
            return false;
        }
    }
    if(img =="")
    {
        alert("Hãy chọn ảnh");
        return false;
    }
    return true
}

function rewrite(price)
{
    var s ="";
if(price.length < 4)
 {
    s = price;
 }   
 if(price.length == 4)
 {
    s = price.slice(0,1) + "." + price.slice(1);
 }   
 if(price.length == 5)
 {
    s = price.slice(0,2) + "." + price.slice(2);
 }   
 if(price.length == 6)
 {
    s = price.slice(0,3) + "." + price.slice(3);
 }   
 if(price.length == 7)
 {
    s = price.slice(0,1) + "." + price.slice(1,4) + "." + price.slice(4);
 }   
 return s;
}

function add_product(){
    var list_Product = JSON.parse(localStorage.getItem('DSSP'));
    var name = document.getElementById("name_add").value;
    var brand = document.getElementById("brand_add").value; 
    var price = document.getElementById("price_add").value;
    var img = getfullPath();
    if(isClose_Popup() == false)
    {
        close_popup();
    }
    else{
        if(check_input(name,price,img) == true)
        {
            var product = {}
            var list = [];
            var id = 1000;
            price = rewrite(price);
                for(let i=0;i<list_Product.length;i++)
                {
                    list.push(list_Product[i]);
                    if(Number(list_Product[i].id) > id)
                    {
                        id = Number(list_Product[i].id);
                    }
                }
            product = {"id":id + 1, "name":name, "brand":brand, "price":price, "img":img}            
            list.push(product);
            localStorage.setItem('DSSP', JSON.stringify(list));
        }
    }
    show_table_SP();
}

function Confirm_delSP(id) {
    var r = confirm("Bạn có chắc muốn xóa sản phẩm này");  
    if (r == true) {  
        del_product(id);
        show_table_SP();
    } 
  }


function del_product(id){
    if(isClose_Popup() == false)
    {
        close_popup();
    }
    else{
    var list = [];
    list = getList_SP();
    for(let i=0;i<list.length;i++)
    {
        if(Number(list[i].id) == id)
        {
            list.splice(i,1);         
            break;
        }
    }
    localStorage.setItem('DSSP', JSON.stringify(list));
}
show_table_SP();
}

function open_popup(id){
    var list = [];
    list = getList_SP();
    var s = "";
    for(let i=0;i<list.length;i++)
    {
        if(Number(list[i].id) == id)
        {
            s = s + "<div class=\"add_container\" style=\"height:900px\"> <div class=\"add_product\">SỬA SẢN PHẨM</div> "
            s = s + "<div class=\"close_btn\" onclick=\"close_popup()\"><i class=\"fa-solid fa-rectangle-xmark\"></i></div>";
            s = s + "<div class=\"add_div\"><span>Id sản phẩm</span><input class=\"input_add\" type=\"text\" id=\"idSP\" value=\""+list[i].id+"\"></div> ";
            s = s + "<div class=\"add_div\"><span>Tên sản phẩm</span><input class=\"input_add\" type=\"text\" id=\"fix_name\"></div> ";
            s = s + "<div class=\"add_div\"><span>Thương hiệu</span><select name=\"brand\" id=\"fix_brand\"><option value=\"\"></option>"
            s = s + "<option value=\"Dirty Coins\">Dirty Coins</option><option value=\"Yame\">Yame</option><option value=\"5TheWay\">5TheWay</option> </select></div>"
            s = s + "<div class=\"add_div\"><span>Giá</span><input class=\"input_add\" type=\"text\" id=\"fix_price\"></div>"
            s = s + "<div class=\"add_div\"><span>Chọn ảnh</span><input type=\"file\" id=\"file-id-fix\" onchange=\"show_img_fix()\"><div class=\"add_img\" id=\"fix_img\"></div></div>"
            s = s + "<input type=\"button\" class=\"add_btn\" style=\"margin:350px auto\" value=\"SỬA SẢN PHẨM\" onclick = \"fix_product('"+list[i].id+"')\"></div>" ; 
            break;
        }
    }
    document.getElementById('fix_popup').innerHTML = s;
    document.getElementById('fix_popup').style.display = "block";
}

function check_input_fix(price)
{
    if(price =="")
    {
        return true;
    }
    if (Number(price) < 0) {
        alert("Giá không âm");
        return false;
    }
    else{
        if(isLetter(price) == false)
        {
            alert('Giá chỉ bao gồm số')
            return false;
        }
    }
}

function fix_product(id){
    var list = [];
    list = getList_SP();
    
    var name = document.getElementById('fix_name').value;
    var brand = document.getElementById('fix_brand').value;
    var price = document.getElementById('fix_price').value
    var img = getfullPath_fix();

    for(let i=0;i<list.length;i++)
    {
        if(Number(list[i].id) == Number(id))
        {
            if(check_input_fix(price) == false)
            {
                break;
            }
            if(name  != "")
            list[i].name = name;
            if(brand != "")
            list[i].brand = brand;
            if(price != "")
            list[i].price = price;
            if(img   !="")
            list[i].img = img;
            break;
        }
    }

    localStorage.setItem('DSSP', JSON.stringify(list));
    show_table_SP();
    close_popup();
}


function close_popup(){
    document.getElementById('fix_popup').style.display = "none";
}

function isClose_Popup(){
    if(document.getElementById('fix_popup').style.display == "block")
    {
        return false;
    }
    else{
        return true;
    }
}

function back(){
    window.location.href="./home.html"
}



function setData()
{
    localStorage.setItem('DSSP',1);
    var product = {};
    var list =[];
product = {"id":1001, "name":"Áo Thun Cổ Tròn Ngân Hà Space Ver39", "brand": "Yame", "price": "181.600", "img":"./img/DSSP/1.jpg"}   
list.push(product);
product = {"id":1002, "name":"Áo Thun Cổ Trụ Đơn Giản Y Nguyên Bản Ver114", "brand": "Yame", "price": "287.000", "img":"./img/DSSP/2.jpg"}
list.push(product);   
product = {"id":1003, "name":"Áo Thun Cổ Trụ Đơn Giản Y Nguyên Bản Ver100", "brand": "Yame", "price": "257.000", "img":"./img/DSSP/3.jpg"}   
list.push(product);
product = {"id":1004, "name":"Áo Thun Cổ Tròn Ngân Hà Space Ver31", "brand": "Yame", "price": "205.600", "img":"./img/DSSP/4.jpg"}   
list.push(product);
product = {"id":1005, "name":"Áo Thun Cổ Tròn Đơn Giản Y Nguyên Bản Ver90", "brand": "Yame", "price": "227.000", "img":"./img/DSSP/5.jpg"}   
list.push(product);
product = {"id":1006, "name":"Áo Thun Cổ Tròn Y Nguyên Bản 18+ Ver113", "brand": "Yame", "price": "181.600", "img":"./img/DSSP/6.jpg"}   
list.push(product);
product = {"id":1007, "name":"Áo Thun Cổ Tròn Ngân Hà Space Ver21", "brand": "Yame", "price": "257.000", "img":"./img/DSSP/7.jpg"}
list.push(product);
product = {"id":1008, "name":"Áo Thun Cổ Tròn Linh Vật Bbuff Ver10", "brand": "Yame", "price": "199.000", "img":"./img/DSSP/8.jpg"}   
list.push(product);
product = {"id":1009, "name":"Áo Thun Cổ Tròn Đơn Giản Linh Vật Rồng Ver7", "brand": "Yame", "price": "181.600", "img":"./img/DSSP/9.jpg"} 
list.push(product);  
product = {"id":1010, "name":"Áo Thun Cổ Tròn Ngân Hà Space Ver28", "brand": "Yame", "price": "287.000", "img":"./img/DSSP/10.jpg"}
list.push(product);
product = {"id":1011, "name":"Áo Thun Cổ Tròn Y Nguyên Bản 18- Ver39", "brand": "Yame", "price": "255.000", "img":"./img/DSSP/11.jpg"}
list.push(product);
product = {"id":1012, "name":"Áo Thun Cổ Tròn Linh Vật Rồng Ver19", "brand": "Yame", "price": "167.000", "img":"./img/DSSP/12.jpg"}
list.push(product);
product = {"id":1013, "name":"Áo Thun Cổ Tròn Y Nguyên Bản 18+ Ver84", "brand": "Yame", "price": "229.600", "img":"./img/DSSP/13.jpg"}
list.push(product);
product = {"id":1014, "name":"Áo Thun Cổ Tròn 12VAHDT Yên Tử Hàn Ver4", "brand": "Yame", "price": "205.600", "img":"./img/DSSP/14.jpg"}
list.push(product);
product = {"id":1015, "name":"Áo Thun Cổ Tròn Y Nguyên Bản 18- Ver120", "brand": "Yame", "price": "205.600", "img":"./img/DSSP/15.jpg"}
list.push(product);
product = {"id":1016, "name":"DC x OPF:R The Crew T-shirt - Black", "brand": "Dirty Coins" , "price": "450.000", "img":"./img/DSSP/16.jpg"}
list.push(product);
product = {"id":1017, "name":"16 Typh - Million Dollar Club: Bling T-shirt - Black", "brand": "Dirty Coins" , "price": "427.500", "img":"./img/DSSP/17.jpg"}
list.push(product);
product = {"id":1018, "name":"DICO XRAY T-SHIRT - BLACK", "brand": "Dirty Coins" , "price": "294.000", "img":"./img/DSSP/18.jpg"}
list.push(product);
product = {"id":1019, "name":"DirtyCoins Fukyba Boom T-shirt - Cream", "brand": "Dirty Coins", "price": "292.500", "img":"./img/DSSP/19.jpg"}
list.push(product);
product = {"id":1020, "name":"DirtyCoins Academy Logo Wash Polo - Black", "brand": "Dirty Coins" , "price": "416.500", "img":"./img/DSSP/20.jpg"}
list.push(product);
product = {"id":1021, "name":"DirtyCoins Gothic Big Logo T-shirt - Cream", "brand": "Dirty Coins" , "price": "300.000", "img":"./img/DSSP/21.jpg"}
list.push(product);
product = {"id":1022, "name":"DirtyCoins Fukyba Active T-shirt - Cream", "brand": "Dirty Coins" , "price": "315.000", "img":"./img/DSSP/22.jpg"}; list.push(product);
product = {"id":1023, "name":"Dico Star Raglan T-shirt - Black", "brand": "Dirty Coins" , "price": "294.000", "img":"./img/DSSP/23.jpg"}; list.push(product);
product = {"id":1024, "name":"DirtyCoins Twin Flowers T-shirt - White", "brand": "Dirty Coins" , "price": "360.", "img":"./img/DSSP/24.jpg"}; list.push(product);
product = {"id":1025, "name":"DC x OP Sanji T-shirt - White", "brand": "Dirty Coins" , "price": "336.000", "img":"./img/DSSP/25.jpg"}; list.push(product);
product = {"id":1026, "name":"Dico Comfy Polo - Black", "brand": "Dirty Coins" , "price": "382.500", "img":"./img/DSSP/26.jpg"}; list.push(product);
product = {"id":1027, "name":"Dico Baby Dico T-Shirt - Brown", "brand": "Dirty Coins" , "price": "280.000", "img":"./img/DSSP/27.jpg"}; list.push(product);
product = {"id":1028, "name":"DirtyCoins Fukyba Tiedye T-Shirt - Green", "brand": "Dirty Coins" , "price": "225.000", "img":"./img/DSSP/28.jpg"}; list.push(product);
product = {"id":1029, "name":"DirtyCoins x 16Typh The Rapper T-Shirt", "brand": "Dirty Coins" , "price": "420.000", "img":"./img/DSSP/29.jpg"}; list.push(product);
product = {"id":1030, "name":"DirtyCoins x LilWuyn ABCDE T-Shirt - Black", "brand": "Dirty Coins" , "price": "420.000", "img":"./img/DSSP/30.jpg"}; list.push(product);

product = {"id":1031, "name":"SHORT SLEEVE SHIRT - BLACK", "brand": "5TheWay" , "price": "356.000", "img":"./img/DSSP/31.jpg"}; list.push(product);
product = {"id":1032, "name":"DYE EDITION - BURN", "brand": "5TheWay" , "price": "275.000", "img":"./img/DSSP/32.jpg"}; list.push(product);
product = {"id":1033, "name":"ZIGZAG NEW TEE - BLACK", "brand": "5TheWay" , "price": "287.000","img":"./img/DSSP/33.jpg"}; list.push(product);
product = {"id":1034, "name":"LETTER DROP SHOULDER TEE - BLACK", "brand": "5TheWay" , "price": "305.000", "img":"./img/DSSP/34.jpg"}; list.push(product);
product = {"id":1035, "name":"SQUARE TEE - WHITE", "brand": "5TheWay" , "price": "280.000", "img":"./img/DSSP/35.jpg"}; list.push(product);
product = {"id":1036, "name":"NEW TEE - GEOGRIA PEACH", "brand": "5TheWay" , "price": "279.000", "img":"./img/DSSP/36.jpg"}; list.push(product);
product = {"id":1037, "name":"BIG LOGO SQUARE TEE - INDIGO PUNTING", "brand": "5TheWay" , "price": "287.000", "img":"./img/DSSP/37.jpg"}; list.push(product);
product = {"id":1038, "name":"/ROM/ NEW TEE - BLACK", "brand": "5TheWay" , "price": "490.000", "img":"./img/DSSP/38.jpg"}; list.push(product);
product = {"id":1039, "name":"/oreo/ NEW TEE™ - WHITE", "brand": "5TheWay" , "price": "350.000", "img":"./img/DSSP/39.jpg"}; list.push(product);
product = {"id":1040, "name":"/teddy bear/ CROP TEE™ - BLACK", "brand": "5TheWay" , "price": "109.000", "img":"./img/DSSP/40.jpg"}; list.push(product);
product = {"id":1041, "name":"/YILAC/ SQUARE LONG SLEEVE TEE - WHITE", "brand": "5TheWay" , "price": "225.000", "img":"./img/DSSP/41.jpg"}; list.push(product);
product = {"id":1042, "name":"/stroke/ BIG LOGO LS NEW TEE - PASTEL LILAC", "brand": "5TheWay" , "price": "215.000", "img":"./img/DSSP/42.jpg"}; list.push(product);
product = {"id":1043, "name":"/public icon/ \"EARTH n PLANT\" EDITION - PLANT", "brand": "5TheWay" , "price": "295.000", "img":"./img/DSSP/43.jpg"}; list.push(product);
product = {"id":1044, "name":"/fruit & juice/ NEW TEE™ - BLACK", "brand": "5TheWay" , "price": "315.000", "img":"./img/DSSP/44.jpg"}; list.push(product);
product = {"id":1045, "name":"/public icon/ BIG LOGO SQUARE TEE™ - LIME LIGHT", "brand": "5TheWay" , "price": "287.000", "img":"./img/DSSP/45.jpg"}; list.push(product);
localStorage.setItem('DSSP', JSON.stringify(list));
}


setData(); // chạy lần đầu sau đó ẩn dòng này đi