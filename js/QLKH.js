function tableKH_container_inner(){
    var idtable = "";  
    idtable = "table_KH"
    var s = "<div class=\"manage_name\">Quản lý khách hàng</div><div class=\"table_container\"><table id=\""+idtable+"\"></table></div>"

    return s ;
}

function getList_KH(){
    var list = [];
    list = JSON.parse(localStorage.getItem('DSTK'));
    return list;
}


function col_inner_KH(){
    var s = "";
    s = s + "<tr>"
    s = s + "<th style=\"width:30%\" >HỌ TÊN KH</th>"
    s = s + "<th style=\"width:30%\">TÊN ĐĂNG NHẬP</th>"
    s = s + "<th style=\"width:30%\">NGÀY ĐĂNG KÝ</th>"
    s = s + "<th style=\"width:30%\">XÓA TÀI KHOẢN</th>"
    s = s + "</tr>"
    return s;
}
function show_table_KH(){

    var s = ""
    var idtable = "";
    idtable = "table_KH";
    s = col_inner_KH()
   
    var newhtml =""
    var list = [];
    list = getList_KH();
    
    if (localStorage.getItem('DSTK') === null) {
        localStorage.setItem('DSTK',1);
    }
        for(let i=0;i<list.length;i++){
            newhtml = newhtml + "<tr>"
            newhtml = newhtml + "<td > "+ list[i].name   +"</td>"
            newhtml = newhtml + "<td >" + list[i].username +"</td>"
            newhtml = newhtml + "<td >" + list[i].date  +"</td>"
            newhtml = newhtml + "<td >" ;
            newhtml = newhtml + "<input type=\"button\" class=\"del_btn\" value=\"XOA\" onclick=\"Confirm_delKH('"+list[i].username+"')\">"
            newhtml = newhtml + "</td>"
            newhtml = newhtml + "</tr>";
        }

    document.getElementById(idtable).innerHTML = s + newhtml;
}


function Confirm_delKH(username) {
    var r = confirm("Bạn có chắc muốn xóa tài khoản này");  
    if (r == true) {  
        del_customer(username);
        show_table_KH()
    } 
  }


function del_customer(username){
    var list = [];
    list = getList_KH();
    for(let i=0;i<list.length;i++)
    {
        if(list[i].username == username && Number(list[i].role) == 1)
        {
            list.splice(i,1);         
            break;
        }
        else if(list[i].username == username && Number(list[i].role) == 0){
            alert("Tài khoản admin không thể xóa")
            break;
        }
    }
    localStorage.setItem('DSTK', JSON.stringify(list));
}


function Customers_Manage(){
    var s = tableKH_container_inner();
    document.getElementById('info_filters').innerHTML = s;
    show_table_KH()
}   


function setAdmin()
{
    var acc ={};
    var accounts =[];
    acc ={"username":"admin", "password":"admin", "role":0, "name":"ADMIN", "number":"ADMIN", "date":"0-0-0000"}
    accounts.push(acc);
    localStorage.setItem("DSTK", JSON.stringify(accounts));
}

setAdmin(); // chạy lần đầu sau đó ẩn dòng này đi
