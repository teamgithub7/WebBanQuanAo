function click1(){
    var value_local = JSON.parse(localStorage.getItem("acc"));
        var accs =[];

        for(let i=0;i<value_local.length;i++){
            accs.push(value_local[i]);
        }
        var username=document.getElementById("text1").value;
        var password=document.getElementById("text2").value
        let acc ={"us":username,"pw":password};

        accs.push(acc);
        localStorage.setItem("acc", JSON.stringify(accs));
}
localStorage.setItem("acc",1);

function click2(){
    var value_local = JSON.parse(localStorage.getItem("acc"));
    var a=[]
    a=value_local;
    for(let i=0;i<value_local.length;i++){
        a[i]
    }
    
}