// 1. Array declaration
var images = [['title', 'points', 'views', 'src'],
              ['title', 'points', 'views', 'src'],
              ['title', 'points', 'views', 'src'],
              ['title', 'points', 'views', 'src'],
              ['title', 'points', 'views', 'src'],
              
             ];

var dropList = document.getElementById("sort");
             
// 2. API

var flag = true;
function doClick() {
    dropList.value = "none";
    var searchTerm = document.getElementById('search').value;
    var xhttp = new XMLHttpRequest();
    // When the request is successful, finished, and response is ready, execute these function
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var resObj = JSON.parse(xhttp.responseText);
  
        for (var i =0; i<5; i++) {
          images[i].src= resObj.data[i].link;
          images[i].title= resObj.data[i].title;
          images[i].points= resObj.data[i].points;
          images[i].views= resObj.data[i].views;
         // images[i].dateUploaded= resObj.data[i].Date;
        }
        if(flag){
        createDomElem();
        flag = false;
       }
       else{
         reCreateDomElem();
       }
      }
    }

    // Send an asynchronous HTTP GET request to the given end point (url)
    xhttp.open("GET", "https://api.imgur.com/3/gallery/search/top/all/1?q=" + searchTerm, true);
    xhttp.setRequestHeader("Authorization",
      "Client-ID f0993144ea9ba7b")
    xhttp.send();

  }


// 3. Sort your array (images) by the selected key
function sortElements() {
   if(dropList.value != "none"){
    if(dropList.value == "title")
    images.sort(title);

    if(dropList.value == "points")
    images.sort(points);

    if(dropList.value == "views")
    images.sort(views);

    // if(dropList.value == "recent"){
    // images.sort(dates);
    // }

   reCreateDomElem();
   }
}

  function title(a, b) {
    var nameA = a.title.toLowerCase()
    var nameB = b.title.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
}

  function points(a,b) {
    if (a.points < b.points)
      return 1;
    if (a.points > b.points)
      return -1;
    return 0;
  }
  function views(a,b) {
    if (a.views < b.views)
      return 1;
    if (a.views > b.views)
      return -1;
    return 0;
  }
  
  // function dates(a, b) {
  //   var dateA = new Date(a.dateUploaded);
  //   var dateB = new Date(b.dateUploaded);
  //   return dateB - dateA;
  // }

// 4. Regenerate your HTML elements using the new sorted array
function createDomElem(){

    var ulElement = document.getElementById("my-list");
        
    for(var i=0; i<images.length; i++){

        var liElement1=document.createElement("li");
        var imageElemnt = document.createElement("IMG");
       
        var div = document.createElement("div");

div.style.background = "brown";
div.style.color = "white";
div.innerHTML = images[i].title+'<br>'+
                'Points: '+images[i].points+
                '&nbsp;&nbsp;&nbsp;&nbsp; Views: '+images[i].views;


        imageElemnt.src = images[i].src;

        liElement1.appendChild(imageElemnt);
        liElement1.appendChild(div);
        ulElement.appendChild(liElement1);

        
        
        
    }
}

function reCreateDomElem(){

    var ulElement = document.getElementById("my-list");
        
    for(var i=0; i<images.length; i++){

        var liElement1=document.createElement("li");
        var imageElemnt = document.createElement("IMG");

        
        var div = document.createElement("div");

div.style.background = "brown";
div.style.color = "white";
div.innerHTML = images[i].title+'<br>'+
                'Points: '+images[i].points+
                '&nbsp;&nbsp;&nbsp;&nbsp; Views: '+images[i].views;
        imageElemnt.src = images[i].src;
        
        liElement1.appendChild(imageElemnt);
        liElement1.appendChild(div);
        ulElement.replaceChild(liElement1, ulElement.children[i]);
    }
    
}