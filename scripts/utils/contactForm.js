// Function to display the modal
function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
    document.getElementById("btn-close").focus(); // Set focus to close button
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

// Function to display input values
function displayValeurs() {
    const firstName = document.getElementById("prenom").value;
    const lastName = document.getElementById("nom").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    console.log("First Name: " + firstName);
    console.log("Last Name: " + lastName);
    console.log("Email: " + email);
    console.log("Message: " + message);
}

// Manage keyboard navigation between input fields
document.addEventListener("keydown", function(event) {
    const focusableElements = document.querySelectorAll(
        "input[type=text], input[type=email], textarea"
    );

    let currentIndex = Array.from(focusableElements).findIndex(
        element => element === document.activeElement
    );

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        currentIndex = (currentIndex + 1) % focusableElements.length;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        currentIndex = (currentIndex - 1 + focusableElements.length) % focusableElements.length;
    }
});