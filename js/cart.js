/* xoagh()
inpchange() */
//-----------------chức năng---------------
/* const btn = document.querySelectorAll('.demo div button')
btn.forEach(function(button,index){
    button.addEventListener("click", function(event){{
        var btnItem = event.target
        var product = btnItem.parentElement
        var productImg = product.querySelector(".imgsp").src
        var productName = product.querySelector(".namesp").innerText
        var productGia = product.querySelector('.giasp').innerText
        var productSl = product.querySelector('input').value
        //console.log('OK')
        //addGH(productGia,productImg,productName,productSl)
    }})
}) */
function loadgh(){
    
    readsp()
    xoagh()
    inpchange()
}
//--------------local storage-------------
//---------------đọc dữ liệu trên local và add vào trang -------------
function readsp(){
    let product = localStorage.getItem('gioHang') ?  JSON.parse(localStorage.getItem('gioHang')) : []
    if(product.length === 0) return false
    product.forEach((product,index)=>{
        index++
        addGH(product.productId,product.productGia,product.productImg,product.productName,product.productSl)
    }) 
 }
 //--xóa sp ở local có id cần xóa
 function deletelocal(id){
    let product = localStorage.getItem('gioHang') ?  JSON.parse(localStorage.getItem('gioHang')) : []
    for(let i = 0; i < product.length; i++){
        if(id == product[i].productId)
        {
            product.splice(i,1)   
            localStorage.setItem('gioHang', JSON.stringify(product))                 
        }       
    }   
 }

//------------thêm sp--------------
function addGH(productId,productGia,productImg,productName,productSl){
    var addtr = document.createElement("tr")
    var ghItem = document.querySelectorAll("tbody tr")
    for(var i = 0; i < ghItem.length; i++){
        var productN = ghItem[i].querySelector(".add_id").value
        //console.log(productN)
        if(productN == productId){
            var inputValue = ghItem[i].querySelector('.slgsp').value
            //console.log(inputValue)
            ghItem[i].querySelector('.slgsp').value = Number(inputValue) + 1
            tongtien()
            return
        }
    }
    var trcontent = `<tr>   <td data-th="Product" >     <div class="row">       <div class="img-sp"><img src="${productImg}"  width="100">`
    trcontent = trcontent + `</div> <input type="text" class="add_id" value="${productId}" readonly style="display: none;">`    
    trcontent = trcontent + `<div class="sp">          <h4 >${productName}</h4>        </div>      </div>    </td>  <td class="giasp_1" >${productGia}</td>`
    trcontent = trcontent + `<td ><input class="slgsp" style="width: 50px; height: 20px;"  value="${productSl}" min="1" max="10" type="number"> </td> `
    trcontent = trcontent + `<td class="thanh_tien">   300.000  </td>    <td class="actions" >  <button class="bt-Delete" >Delete</button>    </td>   </tr>`
    addtr.innerHTML = trcontent
    var ghTable = document.querySelector("tbody")
    ghTable.append(addtr)
    tongtien()
  /*   xoagh()
    inpchange() */
}
//------------------tinh tien -------------

 function tongtien (){
    var ghItem = document.querySelectorAll("tbody tr")
    //console.log(ghItem)
    var tongTam1 = 0
    for(var i = 0; i < ghItem.length; i++){
        var inputValue = ghItem[i].querySelector('.slgsp').value
        var Giasp = ghItem[i].querySelector(".giasp_1").innerHTML
        var tongTemp= 0
        tongTemp = inputValue*Giasp*1000
        { //tinh tien 1 sp
            var tongtam2 = tongTemp
            var tonggia = ghItem[i].querySelector('.thanh_tien')
            tongtam2 = tongtam2.toLocaleString('de-DE')
            tonggia.innerHTML = tongtam2 
        }
        tongTam1 = tongTam1+tongTemp
    }
    var tongsp = document.querySelector('tfoot tr td p span')
    tongTam1 = tongTam1.toLocaleString('de-DE')
    tongsp.innerHTML = tongTam1 
 }
 //--------------------xóa sp---------------

 function xoagh(){
    var ghItem = document.querySelectorAll("tbody tr")
    //console.log(ghItem)
    for(var i = 0; i < ghItem.length; i++){
        var DeleteItem = ghItem[i].querySelector(".bt-Delete")
        DeleteItem.addEventListener("click", function(event){
            var ghdelete = event.target
            var delete01 = ghdelete.parentElement.parentElement
            var delete02 = delete01.querySelector('.add_id').value
            deletelocal(delete02)
            delete01.remove()
            tongtien()
        })
    }
 }
 //=-----------thay đổi inp-----------
 function inpchange(){
    var ghItem = document.querySelectorAll("tbody tr")
    for(var i = 0; i < ghItem.length; i++){
        var inpValue = ghItem[i].querySelector(".slgsp")
        var inp = ghItem[i].querySelector(".slgsp").value
        var Id = ghItem[i].querySelector(".add_id").value
        inpValue.addEventListener("change", function(){
            //console.log('click')
            console.log(inp)
            tongtien()
            //inpchangelocal(Id,inp)
        })
    }
 }
 function inpchangelocal(Id,inp){
    console.log('vao change')
    let product = localStorage.getItem('gioHang') ?  JSON.parse(localStorage.getItem('gioHang')) : []
    for(var i = 0; i < product.length; i++){
/*         console.log(Id)
        console.log(product[i].productId) */
        console.log('vao for')
        if(Id === product[i].productId)
        { 
            console.log('vao if')
            var productId = product[i].productId
            var productGia = product[i].productGia
            var productImg = product[i].productImg
            var productName = product[i].productName
            var productSl = product[i].productSl
            //console.log('vao if')
            //var Sl = productSl
            console.log('inp',inp)
            product.splice(i,1)
            localStorage.setItem('gioHang', JSON.stringify(product))
            //Sl = Sl + 1
            //console.log('sl',Sl)
            productSl = String(inp)
            product.push({productId,productGia,productImg,productName,productSl})
            localStorage.setItem('gioHang', JSON.stringify(product)) 
            break    
        }           
    } 
 }