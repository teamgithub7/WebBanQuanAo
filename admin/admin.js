localStorage.setItem("DSSPNu",Number(0))
localStorage.setItem("idNu",Number(1000));
localStorage.setItem("DSSPNam",Number(0))
localStorage.setItem("idNam",Number(0));
localStorage.setItem("DSSPUnisex",Number(0))
localStorage.setItem("idUnisex",Number(2000));
localStorage.setItem("choose_admin","DSSPNam")


function show(danhmuc){
    var s=""
    var newhtml ="";
    switch (danhmuc){
        case 'DSSPNam':
            s = "DANH MỤC NAM";
            idtable = "tableNam";
            localStorage.setItem("idtable",idtable)
            break;
        case 'DSSPNu':
            s = "DANH MỤC NỮ";
            idtable = "tableNu";
            localStorage.setItem("idtable",idtable)
            break;
        case 'DSSPUnisex':
            s = "DANH MỤC UNISEX";
            idtable = "tableUnisex";
            localStorage.setItem("idtable",idtable)
            break;
        default:
            break;
    }

    localStorage.setItem("choose_admin",String(danhmuc));
    document.getElementById('title').innerText = s;

    var idtable = localStorage.getItem("idtable");
    var list_Product = JSON.parse(localStorage.getItem(String(danhmuc)));

    var innerTable = "<table id=\"" + idtable +"\">";
    innerTable = innerTable + title_col() + "</table>";
    document.getElementById('table_container').innerHTML = innerTable;

    if(list_Product.length != undefined || list_Product.length == Number){
    for(let i=0;i<list_Product.length;i++){
        newhtml = newhtml + "<tr>"
        newhtml = newhtml + "<td onclick=\"showinfo(\'"+ list_Product[i].id +"\')\">" + list_Product[i].id    +"</td>"
        newhtml = newhtml + "<td onclick=\"showinfo(\'"+ list_Product[i].id +"\')\">" + list_Product[i].name  +"</td>"
        newhtml = newhtml + "<td onclick=\"showinfo(\'"+ list_Product[i].id +"\')\">" + list_Product[i].type  +"</td>"
        newhtml = newhtml + "<td onclick=\"showinfo(\'"+ list_Product[i].id +"\')\">" + list_Product[i].brand  +"</td>"
        newhtml = newhtml + "<td onclick=\"showinfo(\'"+ list_Product[i].id +"\')\">" + list_Product[i].price  +"</td>"
        newhtml = newhtml + "<td onclick=\"showinfo(\'" + list_Product[i].id + "\')\">" + "<img src=\""+ list_Product[i].img +"\">" +"</td>"
        newhtml = newhtml + "</tr>";
    }
    document.getElementById(String(idtable)).innerHTML = title_col() + newhtml;
}
}

function title_col(){
    var s = "";
    s = s + "<tr>"
    s = s + "<th>MÃ SẢN PHẨM</th>"
    s = s + "<th>TÊN SẢN PHẨM</th>"
    s = s + "<th>LOẠI</th>"
    s = s + "<th>THƯƠNG HIỆU</th>"
    s = s + "<th>GIÁ</th>"
    s = s + "<th>IMG</th>"
    s = s + "</tr>"
    return s;
}


function getfullPath(){
    var filename = document.getElementById("file-id").files[0].name; 
    var foldername = localStorage.getItem("choose_admin");
    var fullpath = "../img/" + foldername + "/" + filename;
    return fullpath;
}

function showimage(){
    var texthtml = "<img src=\""+ getfullPath() + "\">"
    document.getElementById("add_fix_img").innerHTML = texthtml;
}

function back(){
    window.location.href = "../trangchu.html";
}

function showinfo(id){
    var danhmuc = String(localStorage.getItem("choose_admin"))
    var list_Product = JSON.parse(localStorage.getItem(danhmuc));
    for(let i=0;i<list_Product.length;i++){
        if(list_Product[i].id == id){
            document.getElementById("add_id").value = id;
            document.getElementById("name").value = list_Product[i].name;
            document.getElementById("type").value = list_Product[i].type;
            document.getElementById("brand").value = list_Product[i].brand;
            document.getElementById("price").value = list_Product[i].price;
            var texthtml = "<img src=\""+ list_Product[i].img + "\">"
            document.getElementById("img").innerHTML = texthtml;
            break;
        }
    }
}

function add(){
    var danhmuc = String(localStorage.getItem("choose_admin"))
    var idcur ;

    var id ;
    var name = document.getElementById("name").value;
    var type = document.getElementById("type").value;
    var brand = document.getElementById("brand").value; 
    var price = document.getElementById("price").value;
    var img = getfullPath();

    switch (danhmuc){
        case 'DSSPNam':
            idcur = Number(localStorage.getItem("idNam"));
            id = Number(idcur +1);
            localStorage.setItem("idNam",id)
            break;
        case 'DSSPNu':
            idcur = Number(localStorage.getItem("idNu"));
            id = Number(idcur +1);
            localStorage.setItem("idNu",id)
            break;
        case 'DSSPUnisex':
            idcur = Number(localStorage.getItem("idUnisex"));
            id = Number(idcur +1);
            localStorage.setItem("idUnisex",id)
            break;
        default:
            break;
    }

 var list_Product = JSON.parse(localStorage.getItem(danhmuc));
 var products = [];
 let product = {"id":id,"name":name, "type":type, "brand":brand, "price":price, "img":img}

 for(let i=0;i<list_Product.length;i++){
    products.push(list_Product[i]);
}

products.push(product);
localStorage.setItem(String(danhmuc), JSON.stringify(products));
show(danhmuc)

document.getElementById("add_id").value = "";
}

function fix(){
    var id    = document.getElementById("add_id").value ;
    var name  = document.getElementById("name").value
    var type  = document.getElementById("type").value 
    var brand = document.getElementById("brand").value 
    var price = document.getElementById("price").value 
    var img_path = getfullPath();
    var danhmuc = String(localStorage.getItem("choose_admin"))
    
    var list_Product = JSON.parse(localStorage.getItem(danhmuc));
    for(let i=0;i<list_Product.length;i++){
        if(list_Product[i].id == id){
            list_Product[i].name = name;
            list_Product[i].brand = brand;
            list_Product[i].price = price;
            list_Product[i].type = type;
            list_Product[i].img = img_path;
            break;
        }
    }
    localStorage.setItem(String(danhmuc), JSON.stringify(list_Product));
    show(danhmuc);

    document.getElementById("add_id").value = "";
}

function del(){
    var id = document.getElementById("add_id").value ;
    var danhmuc = String(localStorage.getItem("choose_admin"))
    var list_Product = JSON.parse(localStorage.getItem(danhmuc));
    for(let i=0;i<list_Product.length;i++){
        if(list_Product[i].id == id){
            list_Product.splice(i,1);         
            break;
        }
    }
    localStorage.setItem(String(danhmuc), JSON.stringify(list_Product));
    show(danhmuc);

    document.getElementById("add_id").value = "";
}



