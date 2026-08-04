// ======================================================
// TRAVEL GUIDE 2.0
// Luxury Travel Planner
// Part 1
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // ACTIVE NAVIGATION
    // ==========================================

    const currentPage = window.location.pathname.split("/").pop();

    document.querySelectorAll(".nav-links a").forEach(link => {

        const href = link.getAttribute("href");

        if (!href) return;

        if (
            href.endsWith(currentPage) ||
            (currentPage === "" && href.endsWith("index.html"))
        ) {
            link.classList.add("active-link");
        }

    });

    // ==========================================
    // SMOOTH SCROLL
    // ==========================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", e => {

            e.preventDefault();

            const target = document.querySelector(anchor.getAttribute("href"));

            if (target) {

                target.scrollIntoView({

                    behavior: "smooth"

                });

            }

        });

    });

    // ==========================================
    // CARD ANIMATION
    // ==========================================

    const cards = document.querySelectorAll(

        ".stat-card,.dashboard-card,.experience-card,.why-card,.overview-card"

    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        }, {

            threshold: 0.15

        });

        cards.forEach(card => observer.observe(card));

    } else {

        cards.forEach(card => card.classList.add("show"));

    }

    // ==========================================
    // SCROLL TO TOP
    // ==========================================

    const topButton = document.createElement("button");

    topButton.id = "topButton";

    topButton.innerHTML = "↑";

    document.body.appendChild(topButton);

    topButton.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            topButton.style.opacity = "1";

            topButton.style.pointerEvents = "auto";

        } else {

            topButton.style.opacity = "0";

            topButton.style.pointerEvents = "none";

        }

    });

    // ==========================================
    // DARK MODE
    // ==========================================

    const darkButton = document.createElement("button");

    darkButton.id = "darkModeButton";

    document.body.appendChild(darkButton);

    function applyTheme(theme) {

        if (theme === "dark") {

            document.body.classList.add("dark-mode");

            darkButton.innerHTML = "☀";

        } else {

            document.body.classList.remove("dark-mode");

            darkButton.innerHTML = "🌙";

        }

    }

    applyTheme(localStorage.getItem("theme") || "light");

    darkButton.addEventListener("click", () => {

        const newTheme = document.body.classList.contains("dark-mode")

            ? "light"

            : "dark";

        localStorage.setItem("theme", newTheme);

        applyTheme(newTheme);

    });

});
// ======================================================
// PART 2
// COUNTDOWN • PROGRESS • PACKING • BUDGET
// ======================================================

document.addEventListener("DOMContentLoaded",()=>{

// ==========================================
// READING PROGRESS BAR
// ==========================================

const progress=document.createElement("div");

progress.id="readingProgress";

document.body.appendChild(progress);

window.addEventListener("scroll",()=>{

const scrollTop=document.documentElement.scrollTop;

const scrollHeight=document.documentElement.scrollHeight-document.documentElement.clientHeight;

const percentage=(scrollTop/scrollHeight)*100;

progress.style.width=percentage+"%";

});

// ==========================================
// TRIP COUNTDOWN
// ==========================================

const countdown=document.getElementById("tripCountdown");

if(countdown){

function updateCountdown(){

const tripDate=new Date("December 19, 2026 08:00:00").getTime();

const today=new Date().getTime();

const difference=tripDate-today;

if(difference<=0){

countdown.innerHTML="✈ Enjoy your holiday!";

return;

}

const days=Math.floor(difference/(1000*60*60*24));

countdown.innerHTML=days+" Days Remaining";

}

updateCountdown();

setInterval(updateCountdown,3600000);

}

// ==========================================
// CURRENT YEAR
// ==========================================

document.querySelectorAll(".year").forEach(item=>{

item.textContent=new Date().getFullYear();

});

// ==========================================
// LAST UPDATED
// ==========================================

document.querySelectorAll(".lastUpdated").forEach(item=>{

item.textContent=new Date().toLocaleDateString();

});

// ==========================================
// PACKING CHECKLIST
// ==========================================

document.querySelectorAll(".packing-item input").forEach(box=>{

const saved=localStorage.getItem(box.id);

if(saved==="true"){

box.checked=true;

}

box.addEventListener("change",()=>{

localStorage.setItem(box.id,box.checked);

});

});

// ==========================================
// DAILY BUDGET
// ==========================================

const dailyBudget=document.getElementById("dailyBudget");

const budgetOutput=document.getElementById("budgetOutput");

if(dailyBudget && budgetOutput){

dailyBudget.addEventListener("input",()=>{

const total=(Number(dailyBudget.value)||0)*17;

budgetOutput.textContent="$"+total.toLocaleString();

});

}

// ==========================================
// USD ↔ KES
// ==========================================

const usd=document.getElementById("usd");

const kes=document.getElementById("kes");

const exchangeRate=129;

if(usd && kes){

usd.addEventListener("input",()=>{

kes.value=(Number(usd.value||0)*exchangeRate).toFixed(2);

});

kes.addEventListener("input",()=>{

usd.value=(Number(kes.value||0)/exchangeRate).toFixed(2);

});

}

});
// ======================================================
// PART 3
// RESTAURANTS • GALLERY • FAVOURITES • PRINT
// ======================================================

document.addEventListener("DOMContentLoaded",()=>{

// ==========================================
// RESTAURANT SEARCH
// ==========================================

const search=document.getElementById("search");

if(search){

search.addEventListener("keyup",()=>{

const value=search.value.toLowerCase();

document.querySelectorAll(".restaurant-card").forEach(card=>{

const text=card.textContent.toLowerCase();

card.style.display=text.includes(value)?"block":"none";

});

});

}

// ==========================================
// RESTAURANT FILTER
// ==========================================

const filter=document.getElementById("restaurantFilter");

if(filter){

filter.addEventListener("change",()=>{

const value=filter.value.toLowerCase();

document.querySelectorAll(".restaurant-card").forEach(card=>{

if(value==="all"){

card.style.display="block";

return;

}

const category=(card.dataset.category||"").toLowerCase();

card.style.display=category===value?"block":"none";

});

});

}

// ==========================================
// RESTAURANT SORT
// ==========================================

const sort=document.getElementById("restaurantSort");

const restaurantList=document.querySelector(".restaurant-list");

if(sort && restaurantList){

sort.addEventListener("change",()=>{

const cards=[...restaurantList.querySelectorAll(".restaurant-card")];

cards.sort((a,b)=>{

if(sort.value==="az"){

return a.querySelector("h3").textContent.localeCompare(

b.querySelector("h3").textContent

);

}

if(sort.value==="za"){

return b.querySelector("h3").textContent.localeCompare(

a.querySelector("h3").textContent

);

}

return 0;

});

cards.forEach(card=>restaurantList.appendChild(card));

});

}

// ==========================================
// FAVOURITES
// ==========================================

document.querySelectorAll(".favourite").forEach(button=>{

const id=button.dataset.id;

if(localStorage.getItem(id)==="saved"){

button.classList.add("saved");

button.textContent="❤️ Saved";

}

button.addEventListener("click",()=>{

if(button.classList.contains("saved")){

button.classList.remove("saved");

button.textContent="🤍 Favourite";

localStorage.removeItem(id);

}else{

button.classList.add("saved");

button.textContent="❤️ Saved";

localStorage.setItem(id,"saved");

}

});

});

// ==========================================
// IMAGE POPUP
// ==========================================

document.querySelectorAll(".gallery img").forEach(image=>{

image.style.cursor="pointer";

image.addEventListener("click",()=>{

const popup=document.createElement("div");

popup.className="popup";

popup.innerHTML=`

<div class="popup-content">

<img src="${image.src}" alt="Gallery Image">

</div>

`;

popup.addEventListener("click",()=>popup.remove());

document.body.appendChild(popup);

});

});

// ==========================================
// PRINT BUTTON
// ==========================================

const printButton=document.getElementById("printButton");

if(printButton){

printButton.addEventListener("click",()=>{

window.print();

});

}

});
// ======================================================
// PART 4
// MOBILE • PERFORMANCE • FINAL SETUP
// ======================================================

document.addEventListener("DOMContentLoaded",()=>{

// ==========================================
// MOBILE NAVIGATION
// ==========================================

const navbar=document.querySelector(".navbar");
const navLinks=document.querySelector(".nav-links");

if(navbar && navLinks){

let menuButton=document.getElementById("mobileMenu");

if(!menuButton){

menuButton=document.createElement("button");

menuButton.id="mobileMenu";

menuButton.innerHTML="☰";

menuButton.style.display="none";

navbar.appendChild(menuButton);

}

function checkScreen(){

if(window.innerWidth<768){

menuButton.style.display="block";

navLinks.style.display="none";

}else{

menuButton.style.display="none";

navLinks.style.display="flex";

}

}

checkScreen();

window.addEventListener("resize",checkScreen);

menuButton.addEventListener("click",()=>{

if(navLinks.style.display==="flex"){

navLinks.style.display="none";

}else{

navLinks.style.display="flex";

navLinks.style.flexDirection="column";

navLinks.style.width="100%";

}

});

}

// ==========================================
// LAZY IMAGE LOADING
// ==========================================

document.querySelectorAll("img").forEach(image=>{

image.loading="lazy";

});

// ==========================================
// KEYBOARD SHORTCUTS
// ==========================================

document.addEventListener("keydown",(event)=>{

if(event.key==="Home"){

window.scrollTo({

top:0,

behavior:"smooth"

});

}

if(event.ctrlKey && event.key.toLowerCase()==="p"){

event.preventDefault();

window.print();

}

});

// ==========================================
// REMOVE POPUPS WITH ESC
// ==========================================

document.addEventListener("keydown",(event)=>{

if(event.key==="Escape"){

document.querySelectorAll(".popup").forEach(p=>p.remove());

}

});

// ==========================================
// AUTO OPEN EXTERNAL MAP LINKS
// ==========================================

document.querySelectorAll(".mapButton").forEach(button=>{

button.addEventListener("click",()=>{

const url=button.dataset.map;

if(url){

window.open(url,"_blank");

}

});

});

// ==========================================
// PAGE READY
// ==========================================

document.body.classList.add("loaded");

console.log("Travel Guide 2.0 Loaded Successfully");

});