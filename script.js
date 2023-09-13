// Helper function to create elements
function createElement(tag, attributes = {}, text = "") {
    const element = document.createElement(tag);
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    if (text) {
        element.textContent = text;
    }
    return element;
}

// Get DOM elements
const newItemInput = document.getElementById("newItem");
const addItemButton = document.getElementById("addItem");
const shoppingListContainer = document.getElementById("shoppingList");
const clearListButton = document.getElementById("clearList");

// Initialize shoppingList
// const shoppingList = [];
const shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];


// Add item to shopping list
function addItem() {
    const newItemText = newItemInput.value.trim();
    if (newItemText !== "") {
        const newItem = { name: newItemText, completed: false };
        shoppingList.push(newItem);
        newItemInput.value = "";
        displayList();
        updateLocalStorage();
    }
}

// Remove item from shopping list
function removeItem(index) {
    const confirmed = window.confirm("Bist du sicher, dass du dieses Element löschen möchtest?");
    if (confirmed) {
        shoppingList.splice(index, 1);
        displayList();
        updateLocalStorage();
    }
}

// Clear the entire list
function clearList() {
    shoppingList.length = 0;
    displayList();
    updateLocalStorage();
}

// Update local storage
function updateLocalStorage() {
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
}

// Display the shopping list
function displayList() {
    shoppingListContainer.innerHTML = "";
    // Check if shoppingList is empty
    if (shoppingList.length === 0) {
        const emptyMessage = createElement("div", { class: "empty-list-message" }, "Die Einkaufsliste ist leer.");
        shoppingListContainer.appendChild(emptyMessage);
    }
    // Render items if shoppingList is not empty
    else {
        shoppingList.forEach((item, index) => {
            const itemContainer = createElement("div", { class: "item-container" });
            const itemGridContainer = createElement("div", { class: "item-grid-container" });
            const checkboxContainer = createElement("div", { class: "checkbox-container" });
            const removeBtnContainer = createElement("div", { class: "remove-btn-container" });
            const checkbox = createElement("input", { type: "checkbox" });
            checkbox.checked = item.completed;
            checkbox.addEventListener("change", () => {
                item.completed = checkbox.checked;
                displayList();
                updateLocalStorage();
            });
            const itemValue = createElement("div", { class: `item-value ${item.completed ? 'completed-item' : ''}` }, item.name);
            const removeButton = createElement("button", { class: "remove-btn" }, "Entfernen");
            removeButton.addEventListener("click", () => removeItem(index));
            checkboxContainer.appendChild(checkbox);
            itemGridContainer.appendChild(checkboxContainer);
            itemGridContainer.appendChild(itemValue);
            removeBtnContainer.appendChild(removeButton);
            itemGridContainer.appendChild(removeBtnContainer);
            itemContainer.appendChild(itemGridContainer);
            shoppingListContainer.appendChild(itemContainer);
        });
    }
}

// Event listeners
addItemButton.addEventListener("click", addItem);
clearListButton.addEventListener("click", clearList);

// Initial display
displayList();
