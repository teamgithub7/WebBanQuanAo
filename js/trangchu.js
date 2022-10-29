var input = document.getElementById("input")

function f(ele) {
    if(event.key === 'Enter') {
        alert(ele.value);        
        localStorage.setItem("key1",ele.value)
    }
}

console.log(localStorage.getItem("key1"))