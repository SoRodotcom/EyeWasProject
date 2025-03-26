document.addEventListener("DOMContentLoaded", function () {
    const sections = Array.from(document.querySelectorAll(".section"));
    const buttons = document.querySelectorAll(".menu-accueil button");
    const homeButton = document.querySelector("nav a[href='#accueil']");

    let currentIndex = 0; // Gère la section affichée

    function showSection(index) {
        sections.forEach((section, i) => {
            section.style.display = i === index ? "block" : "none";
        });

        // Désactive les boutons aux extrémités
        document.querySelectorAll(".prev-btn").forEach(btn => btn.disabled = index === 0);
        document.querySelectorAll(".next-btn").forEach(btn => btn.disabled = index === sections.length - 1);
    }

    // GESTION DES BOUTONS DU MENU
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const targetId = this.getAttribute("data-target");
            const newIndex = sections.findIndex(section => section.id === targetId);
            if (newIndex !== -1) {
                currentIndex = newIndex;
                showSection(currentIndex);
            }
        });
    });

    // GESTION DU BOUTON ACCUEIL
    if (homeButton) {
        homeButton.addEventListener("click", function (event) {
            event.preventDefault();
            currentIndex = 0; // Revenir à l'accueil
            showSection(currentIndex);
        });
    }

    // GESTION DES FLÈCHES
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("next-btn") && currentIndex < sections.length - 1) {
            currentIndex++;
            showSection(currentIndex);
        } else if (event.target.classList.contains("prev-btn") && currentIndex > 0) {
            currentIndex--;
            showSection(currentIndex);
        }
    });

    // Affiche uniquement l'accueil au début
    showSection(currentIndex);
});
