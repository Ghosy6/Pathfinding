var n = 0
var arr = []
var arr2 = []
var speed = document.getElementById("speed")

// Array values to check for north, east, south, west
const arrCheck = [[-1,0],[0,1],[1,0],[0,-1]]

for (let i = 1; i < 901; i++ )
     {arr2.push(i)
       n++  
       
        if ( n == 30 ) { n = 0 ; arr.push([arr2]); arr2 = [] }
     }

// Creating a grid with X-Y coordinates inside ID and setting an atribute for each box element, including onclick events
for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++){
        
        var newBox = document.createElement('div')
        newBox.setAttribute("id", j + '-' + i )
        newBox.setAttribute("onclick", "green(this)")
        newBox.setAttribute("onmouseover", "black(this, event)")
        newBox.setAttribute("oncontextmenu", "red(this)")
        newBox.classList.add("boxItem")
        document.querySelector('.box').appendChild(newBox)
    }
}

var currentGreen 
var currentRed

// Onclick function to set the starting point and remove any existing starting points. Also executes pathfinding if the end point is set.
function green(xx){
     
        if (currentGreen){currentGreen.classList.remove("green")}
        xx.classList.add("green");  
        xx.classList.remove("black");
        currentGreen = xx;

        if (currentGreen && currentRed) {
            clearPath();
            pathfind();
        }
   }
// Click and slide function for setting up walls in the grid
 function black(element, event){
    if (event.buttons == 1) {
        element.classList.add("black")
    }
 }  
// Onclick function to set the end point and remove existing end points
function red(xx){
    if (currentRed){currentRed.classList.remove("red")}
    xx.classList.add("red")
    xx.classList.remove("black");
    currentRed = xx
    if (currentGreen && currentRed) {
        clearPath();
        pathfind();
    }
}

// Delay timer set in reverse. If slider is maxed out, delay will be 0
function resolveTimer() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('resolved');
      },500 - speed.value);
    });
  }


var queue = []


async function pathfind() {
    queue = [];
    
    // Fetch X-Y coordinates of starting and end points
    var greenBox = document.querySelector(".green")
    var redBox = document.querySelector(".red")
    var redBoxCordX = redBox.id.slice(0, redBox.id.indexOf("-"))
    var redBoxCordY = redBox.id.slice(redBox.id.indexOf("-") + 1)
    var tracker = greenBox
    var location = redBox.id
    tracker.classList.add("checked")
   
    // Start the loop by going through elements and marking them as visited (checked), ending the loop only when the end point is found(location)
    while (tracker.id != location) {
        const result = await resolveTimer();
        var trackerX = tracker.id.slice( 0, tracker.id.indexOf("-") )
        var trackerY = tracker.id.slice( tracker.id.indexOf("-") +1 )

        // Loop through each neighbour of the element using the array (arrCheck) and setting their "key" value their parents X-Y coordinates, marking the backtrack path
        for (let i = 0; i < arrCheck.length; i++){
            var idChanger = (Number(trackerX) + arrCheck[i][1]) + "-" + (Number(trackerY) + arrCheck[i][0])
            if (document.getElementById(idChanger) && !document.getElementById(idChanger).classList.contains("checked") && !document.getElementById(idChanger).classList.contains("black") ){
                document.getElementById(idChanger).classList.add("checked")
                document.getElementById(idChanger).setAttribute("key", tracker.id)
                var X = idChanger.slice(0, idChanger.indexOf("-"))
                var Y = idChanger.slice(idChanger.indexOf("-") + 1)
                var mathResult = Math.abs(redBoxCordX - X) + Math.abs(redBoxCordY - Y)
                document.getElementById(idChanger).setAttribute("distance", mathResult)
                queue.push([mathResult,idChanger])
                
            }
            
         
        }

        // Create a priority queue, sorting it by the distance from the end point.
        queue = queue.sort((a,z)=>a[0]-z[0])
        
        
        tracker = document.getElementById(queue.shift()[1])
         if (!tracker.classList.contains("red"))
            {tracker.classList.add("blue")}
    }
    
    var backtrack = document.querySelector(".red")
    
    // Execute backtrack, moving through marked child-parent elements
    while (backtrack.id != greenBox.id){
        var keyValue = backtrack.getAttribute("key")
        backtrack = document.getElementById(keyValue)
        if (!backtrack.classList.contains("green")) {backtrack.classList.add("yellow")}
    }
}

function clearPath() {
    var gridElements = document.querySelector('.box').childNodes;
    gridElements.forEach(function(gridElement){
        gridElement.classList.remove("checked");
        gridElement.classList.remove("blue");
        gridElement.classList.remove("yellow");
        gridElement.removeAttribute('distance');
        gridElement.removeAttribute('key');
    });
}