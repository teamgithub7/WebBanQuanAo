localStorage.setItem("DSSPNu",Number(0))
localStorage.setItem("idNu",Number(0));
localStorage.setItem("DSSPNam",Number(0))
localStorage.setItem("idNam",Number(0));
localStorage.setItem("DSSPUnisex",Number(0))
localStorage.setItem("idUnisex",Number(0));
sessionStorage.setItem("choose","SPNam")
localStorage.removeItem("DSSPBeTrai");
localStorage.removeItem("idBeGai")

function show(danhmucsp){
    var danhmuc = String(danhmucsp);
    var arr="" ;
    var s=""
    var newhtml ="";
    switch (danhmuc){
        case 'SPNam':
            arr = "DSSPNam"
            s="DANH MỤC NAM";
            idtable = "tableNam";
            sessionStorage.setItem("idtable",idtable)
            break;
        case 'SPNu':
            arr = "DSSPNu"
            s="DANH MỤC NỮ";
            idtable = "tableNu";
            sessionStorage.setItem("idtable",idtable)
            break;
        case 'SPUnisex':
            arr = "DSSPUnisex"
            s="DANH MỤC UNISEX";
            idtable = "tableUnisex";
            sessionStorage.setItem("idtable",idtable)
            break;
        default:
            break;
    }
    sessionStorage.setItem("choose",String(danhmuc));
    document.getElementById('title').innerText = s;

    var idtable = sessionStorage.getItem("idtable");
    var list_Product = JSON.parse(localStorage.getItem(arr));

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
    var foldername = sessionStorage.getItem("choose");
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
    var danhmuc = String(sessionStorage.getItem("choose"))
    var arr ;
    switch (danhmuc){
        case 'SPNam':
            arr = "DSSPNam"
            break;
        case 'SPNu':
            arr = "DSSPNu"
            break;
        case 'SPUnisex':
            arr = "DSSPUnisex"
        default:
            break;
    }
    var list_Product = JSON.parse(localStorage.getItem(arr));
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
    show(danhmuc);
}

function add(){
    var danhmuc = String(sessionStorage.getItem("choose"))
    var idcur ;
    var arr ;

    var id ;
    var name = document.getElementById("name").value;
    var type = document.getElementById("type").value;
    var brand = document.getElementById("brand").value; 
    var price = document.getElementById("price").value;
    var img = getfullPath();

    switch (danhmuc){
        case 'SPNam':
            idcur = Number(localStorage.getItem("idNam"));
            arr = "DSSPNam"
            id = Number(idcur +1);
            localStorage.setItem("idNam",id)
            break;
        case 'SPNu':
            idcur = Number(localStorage.getItem("idNu"));
            arr = "DSSPNu"
            id = Number(idcur +1);
            localStorage.setItem("idNu",id)
            break;
        case 'SPUnisex':
            idcur = Number(localStorage.getItem("idUnisex"));
            arr = "DSSPUnisex"
            id = Number(idcur +1);
            localStorage.setItem("idUnisex",id)
            break;
        default:
            break;
    }

 var list_Product = JSON.parse(localStorage.getItem(arr));
 var products = [];
 let product = {"id":id,"name":name, "type":type, "brand":brand, "price":price, "img":img}

 for(let i=0;i<list_Product.length;i++){
    products.push(list_Product[i]);
}

products.push(product);
localStorage.setItem(arr, JSON.stringify(products));
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
    var danhmuc = String(sessionStorage.getItem("choose"))
    var arr ;
    switch (danhmuc){
        case 'SPNam':
            arr = "DSSPNam"
            break;
        case 'SPNu':
            arr = "DSSPNu"
            break;
        case 'SPUnisex':
            arr = "DSSPUnisex"
            break;
        default:
            break;
    }
    var list_Product = JSON.parse(localStorage.getItem(arr));
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
    localStorage.setItem(arr, JSON.stringify(list_Product));
    show(danhmuc);

    document.getElementById("add_id").value = "";
}

function del(){
    var id    = document.getElementById("add_id").value ;
             var name  = document.getElementById("name").value
             var type  = document.getElementById("type").value 
             var brand = document.getElementById("brand").value 
             var price = document.getElementById("price").value 
             var img_path = getfullPath();
    var danhmuc = String(sessionStorage.getItem("choose"))
    var arr ;
    switch (danhmuc){
        case 'SPNam':
            arr = "DSSPNam"
            break;
        case 'SPNu':
            arr = "DSSPNu"
            break;
        default:
            break;
    }
    var list_Product = JSON.parse(localStorage.getItem(arr));
    for(let i=0;i<list_Product.length;i++){
        if(list_Product[i].id == id){
            list_Product.splice(i,1);         
            break;
        }
    }
    localStorage.setItem(arr, JSON.stringify(list_Product));
    show(danhmuc);

    document.getElementById("add_id").value = "";
}



