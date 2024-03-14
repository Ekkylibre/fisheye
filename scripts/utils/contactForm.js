function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
    document.getElementById("prenom").focus();
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

function afficherValeurs() {
    // Récupérer les valeurs des champs
    const prenom = document.getElementById("prenom").value;
    const nom = document.getElementById("nom").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Afficher les valeurs dans la console
    console.log("Prénom: " + prenom);
    console.log("Nom: " + nom);
    console.log("Email: " + email);
    console.log("Message: " + message);
}

 // Gestion des touches pour changer le focus entre les champs
 document.addEventListener("keydown", function(event) {
    const focusableElements = document.querySelectorAll(
        "input[type=text], input[type=email], textarea"
    );

    let currentIndex = Array.from(focusableElements).findIndex(
        element => element === document.activeElement
    );

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        currentIndex =
            (currentIndex + 1) % focusableElements.length;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        currentIndex =
            (currentIndex - 1 + focusableElements.length) %
            focusableElements.length;
    }
});