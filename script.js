var n = 0
var arr = []
var arr2 = []

var mousedown = 0

document.body.onmousedown = ()=> {
    mousedown++
}

document.body.onmouseup = ()=>{
    mousedown--
}


const arrCheck = [[-1,0],[0,1],[1,0],[0,-1]]

for (let i = 1; i < 901; i++ )
     {arr2.push(i)
       n++  
       
        if ( n == 30 ) { n = 0 ; arr.push([arr2]); arr2 = [] }
     }

for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++){
        
        var newBox = document.createElement('div')
        newBox.setAttribute("id", j + '-' + i )
        newBox.setAttribute("onclick", "green(this)")
        newBox.setAttribute("onmouseover", "black(this)")
        newBox.setAttribute("oncontextmenu", "red(this)")
        newBox.classList.add("boxItem")
        document.querySelector('.box').appendChild(newBox)
    }
}

var currentGreen 
var currentRed

function green(xx){
     
        if (currentGreen){currentGreen.classList.remove("green")}
        xx.classList.add("green");  
        currentGreen = xx; 
   }

 function black(xx){
    if (mousedown > 0)
        xx.classList.add("black")
 }  

function red(xx){
    if (currentRed){currentRed.classList.remove("red")}
    xx.classList.add("red")
    currentRed = xx
    pathfind()
    
}



var queue = []

function pathfind() {
    var greenBox = document.querySelector(".green")
    var redBox = document.querySelector(".red")
    var redBoxCordX = redBox.id.slice(0, redBox.id.indexOf("-"))
    var redBoxCordY = redBox.id.slice(redBox.id.indexOf("-") + 1)
    var tracker = greenBox
    var location = redBox.id
    tracker.classList.add("checked")
   
    while (tracker.id != location) {
        
        var trackerX = tracker.id.slice( 0, tracker.id.indexOf("-") )
        var trackerY = tracker.id.slice( tracker.id.indexOf("-") +1 )

        for (let i = 0; i < arrCheck.length; i++){
            var idChanger = (Number(trackerX) + arrCheck[i][1]) + "-" + (Number(trackerY) + arrCheck[i][0])
            if (document.getElementById(idChanger) && !document.getElementById(idChanger).classList.contains("checked") && !document.getElementById(idChanger).classList.contains("black") ){
                document.getElementById(idChanger).classList.add("checked")
                document.getElementById(idChanger).setAttribute("key", tracker.id)
                var X = idChanger.slice(0, idChanger.indexOf("-"))
                var Y = idChanger.slice(idChanger.indexOf("-") + 1)
                var mathArrX = [Number(redBoxCordX),Number(X)]
                mathArrX = mathArrX.sort((a,z)=>z-a)
                var mathArrY = [Number(redBoxCordY),Number(Y)]
                mathArrY = mathArrY.sort((a,z)=>z-a)
                
                var mathResult = (mathArrX[0] - mathArrX[1]) + (mathArrY[0] - mathArrY[1])
                console.log(mathResult);
                document.getElementById(idChanger).setAttribute("distance", mathResult)
                queue.push([mathResult,idChanger])
                queue[0][0]
            }
            
         
        }
        queue = queue.sort((a,z)=>a[0]-z[0])
        console.log(queue);
        
        tracker = document.getElementById(queue.shift()[1])
         if (!tracker.classList.contains("red"))
            {tracker.classList.add("blue")}
    }
    
    var backtrack = document.querySelector(".red")
    
    while (backtrack.id != greenBox.id){
        var keyValue = backtrack.getAttribute("key")
        backtrack = document.getElementById(keyValue)
        if (!backtrack.classList.contains("green")) {backtrack.classList.add("yellow")}
    }

    

}