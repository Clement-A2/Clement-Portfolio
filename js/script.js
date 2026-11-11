const themeButton = document.getElementById("theme-btn");

themeButton.addEventListener("click", function(){
    document.body.classList.toggle("dark-mode");
});

const scrollBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () =>{
   if(window.scrollY > 300){
    scrollBtn.classList.add("show");
   } else{
    scrollBtn.classList.remove("show");
   }
});

scrollBtn.addEventListener("click", () =>{
    window.scrollTo({
        top:0,
        behavior: "smooth"
    });
});

const phrases =[
    "Aspiring Software Developer",
    "Python Developer",
    "Frontend Developer"
];

const typedText = document.getElementById("typed-text");
let phraseIndex = 0;
let CharIndex = 0;
let isDeleting = false;
const typingSpeed = 120;
const deletingSpeed = 60;
const pauseTime = 2000;

function type(){
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting){
        typedText.textContent = currentPhrase.substring(0, CharIndex + 1);
        CharIndex++;

        if(CharIndex === currentPhrase.length){
            isDeleting = true;
            setTimeout(type,pauseTime);
            return;
        }
    }else{
        typedText.textContent = currentPhrase.substring(0, CharIndex - 1);
        CharIndex--;

        if(CharIndex === 0){
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }
    }
    setTimeout(type, isDeleting? deletingSpeed: typingSpeed);
}

type();

//ELEMENTS
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const searchInput = document.getElementById("searchInput");
const noResultsMsg = document.getElementById("noResults");

//MODAL ELEMENTS
const modal = document.getElementById("modal");
// const viewBtns = document.querySelectorAll(".view-btn");
const closeBtn = document.querySelector(".close-btn");
const modalTitle = document.getElementById("modalTitle");
const modalTech = document.getElementById("modalTech");
const modalFeatures = document.getElementById("modalFeatures");

let currentFilter ="all"

//FILTER + SEARCH FUNCTION
function filterProjects(){
    const searchTerm = searchInput.value.toLowerCase();
    let visibleCount = 0;

    projectCards.forEach(card => {
        const category = card.dataset.category || "";
        const title =(card.dataset.title || "").toLowerCase()
        //Check 1: Does it match the categoryfilter?
        const matchesCategory = currentFilter === "all" || category === currentFilter;
        //Check 2: Does it match the search term?
        const matchesSearch = title.includes(searchTerm);
        
        //Show only if Both are true
        if (matchesCategory && matchesSearch){
            card.classList.remove("hide");
            visibleCount++;
        } else{
            card.classList.add("hide");
        }
    });
    noResultsMsg.classList.toggle("hide", visibleCount !== 0);
}
//FILTER BUTTONS
filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        //1. Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove("active"));
        //2. Add active to clicked button
        btn.classList.add("active");

        currentFilter = btn.dataset.filter;

        filterProjects();
    });
});

//Search bar logic
if (searchInput){
    searchInput.addEventListener("input", filterProjects);
}
//SearchInput.addEventListener("input", filterProjects);

//MODAL FUNCTION
function openModal(btn){
    modalTitle.textContent = btn.dataset.title;
    modalTech.textContent = btn.dataset.tech;
    modalFeatures.textContent = btn.dataset.features;
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
}

function closeModal(){
    modal.classList.add("hide");
    document.body.style.overflow = "auto";
}

//Use event delegation so it works on filtered cards too
document.addEventListener("click", (e) => {
    const viewBtn = e.target.closest(".view-btn");
    if (viewBtn){
        openModal(viewBtn);
    }
});

closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
})

//Esc key to close
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
});

//CAROUSEL SLIDES
const slides = document.querySelectorAll(".slide");
const slidesContainer = document.querySelector(".slides");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const dotsContainer = document.querySelector(".dots");
const carousel = document.querySelector(".carousel");

let currentIndex = 0;
let slideInterval;
const slideTime = 4000;

//1. Create Dots Dynamically
slides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

//FINCTION TO SHOW SLIDE
function showSlide(index){
    if (slides.length === 0) return;

    if (index < 0) currentIndex = slides.length - 1;
    else if (index >= slides.length) currentIndex = 0;
    else currentIndex = index;

    //move  the slides container
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

    //updated dots
    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentIndex].classList.add("active");
}

//NEXT AND PREV FUNCTIONS
function nextSlide(){
    showSlide(currentIndex + 1);
}
function prevSlide(){
    showSlide(currentIndex - 1);
}

nextBtn.addEventListener("click", () => {
    nextSlide();
    resetInterval();
});
prevBtn.addEventListener("click", () => {
    prevSlide();
    resetInterval();
});

//AUTO SLIDE WITH SETINTERVAL
function startInterval(){
    slideInterval = setInterval(nextSlide, slideTime);
}
function resetInterval(){
    clearInterval(slideInterval);
    startInterval();
}
startInterval();

//Pause on Hover
carousel.addEventListener("mouseenter", () => clearInterval(slideInterval));
carousel.addEventListener("mouseleave", () => startInterval());

//Go to specific slide when dot is clicked
function goToSlide(i){
    showSlide(i);
    resetInterval();
}

const contactForm = document.getElementById("contactForm");
const contact = document.getElementById("contact");
const contactBtn = document.getElementById("contact-btn");
const cancelBtn = document.getElementById("cancelBtn");
const formMessage = document.getElementById("formMessage");

contactBtn.addEventListener("click", function() {

    contactForm.style.display = "flex";

    document.getElementById("contact").classList.add("show");
    document.body.style.overflow = "hidden"; // Prevent scrolling when the form is open
});

// 2. When "Cancel" button is clicked, hide the form
cancelBtn.addEventListener("click", function() {
    contactForm.style.display = "none";
    document.getElementById("contact").classList.remove("show");
    document.body.style.overflow = "auto"; // Allow scrolling when the form is closed
});

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message || !subject) {
        formMessage.textContent =
            "Please fill in all fields.";

        formMessage.className = "error";
        return;
    }

    formMessage.textContent =
        "Message form validated successfully!";

    formMessage.className = "success";

    contactForm.style.display = "none";
    document.getElementById("contact").classList.remove("show");
    document.body.style.overflow = "auto"; // Allow scrolling when the form is closed

    contactForm.reset();
});

contact.addEventListener("click", function (e) {
    if (e.target === contact) {
        contact.style.display = "none";
        document.getElementById("contact").classList.remove("show");
        document.body.style.overflow = "auto"; // Allow scrolling when the form is closed
    }
});

document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && contact.classList.contains("show")) {
        contactForm.style.display = "none";
        contact.classList.remove("show");
        document.body.style.overflow = "auto";
    }
});0