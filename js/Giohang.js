xoagh()
inpchange()

//-----------------chức năng---------------
const btn = document.querySelectorAll('.demo div button')
btn.forEach(function(button,index){
    button.addEventListener("click", function(event){{
        var btnItem = event.target
        var product = btnItem.parentElement
        var productImg = product.querySelector(".imgsp").src
        var productName = product.querySelector(".namesp").innerText
        var productGia = product.querySelector('.giasp').innerText
        var productSl = product.querySelector('input').value
        console.log(productSl)
        addGH(productGia,productImg,productName,productSl)
    }})
})
//------------thêm sp--------------
function addGH(productGia,productImg,productName,productSl){
    var addtr = document.createElement("tr")
    var ghItem = document.querySelectorAll("tbody tr")
    for(var i = 0; i < ghItem.length; i++){
        var productN = ghItem[i].querySelector(".sp h4").innerHTML
        if(productN == productName){
            var inputValue = ghItem[i].querySelector('input').value
            ghItem[i].querySelector('input').value = (inputValue*1) + 1
            tongtien()
            return
        }
    }
    var trcontent = '<tr>   <td data-th="Product" >     <div class="row">       <div class="img-sp"><img src="'+productImg+'"  width="100"></div>        <div class="sp">          <h4 >'+productName+'</h4>        </div>      </div>    </td>  <td class="giasp_1" >'+productGia+'</td>  <td ><input id="slsp" style="width: 50px; height: 20px;"  value="'+productSl+'" min="1" type="number"> </td>  <td class="thanh_tien">   300.000  </td>    <td class="actions" >  <button class="bt-Delete" >Delete</button>    </td>   </tr>'
    addtr.innerHTML = trcontent
    var ghTable = document.querySelector("tbody")
    ghTable.append(addtr)
    tongtien()
    xoagh()
    inpchange()
}
//------------------tinh tien -------------

 function tongtien (){
    var ghItem = document.querySelectorAll("tbody tr")
    //console.log(ghItem)
    var tongTam1 = 0
    for(var i = 0; i < ghItem.length; i++){
        var inputValue = ghItem[i].querySelector('input').value
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
    for(var i = 0; i < ghItem.length; i++){
        var DeleteItem = ghItem[i].querySelector(".bt-Delete")
        DeleteItem.addEventListener("click", function(event){
            var ghdelete = event.target
            var delete01 = ghdelete.parentElement.parentElement
            delete01.remove()
            tongtien()
        })
    }
 }
 //=-----------thay đổi inp-----------
 function inpchange(){
    var ghItem = document.querySelectorAll("tbody tr")
    for(var i = 0; i < ghItem.length; i++){
        var inpValue = ghItem[i].querySelector("input")
        inpValue.addEventListener("change", function(){
            tongtien()
        })
    }
 }