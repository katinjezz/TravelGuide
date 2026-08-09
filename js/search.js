// ==========================================
// KAMAU FAMILY CHRISTMAS TOUR GUIDE
// SEARCH
// ==========================================

const travelPages = [

{
title:"Home",
keywords:["home","welcome","tour","kamau"],
url:"index.html"
},

{
title:"San Francisco",
keywords:["san francisco","golden gate","pier 39","alcatraz","cable car"],
url:"dest-san-francisco/index.html"
},

{
title:"Los Angeles",
keywords:["los angeles","hollywood","universal","disneyland","santa monica"],
url:"dest-los-angeles/index.html"
},

{
title:"Las Vegas",
keywords:["las vegas","bellagio","sphere","strip","fremont"],
url:"dest-las-vegas/index.html"
},

{
title:"San Diego",
keywords:["san diego","balboa","la jolla","uss midway","coronado"],
url:"dest-san-diego/index.html"
},

{
title:"Flights",
keywords:["flight","airport","boarding","passport"],
url:"general/flights.html"
},

{
title:"Packing",
keywords:["packing","checklist","luggage","clothes"],
url:"general/packing.html"
},

{
title:"Budget",
keywords:["budget","money","cost","expenses"],
url:"general/budget.html"
},

{
title:"Emergency",
keywords:["emergency","hospital","police","embassy","passport"],
url:"general/emergency.html"
}

];

function searchGuide(){

const input=document
.getElementById("searchBox")
.value
.toLowerCase()
.trim();

if(input===""){

return;

}

const result=travelPages.find(page=>{

if(page.title.toLowerCase().includes(input)){

return true;

}

return page.keywords.some(keyword=>keyword.includes(input));

});

if(result){

window.location.href=result.url;

}

else{

alert("No matching page found.");

}

}

document.addEventListener("DOMContentLoaded",()=>{

const box=document.getElementById("searchBox");

if(!box){

return;

}

box.addEventListener("keypress",(event)=>{

if(event.key==="Enter"){

searchGuide();

}

});

});