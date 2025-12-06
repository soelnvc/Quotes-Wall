// grabbing the DOM goodies
const quoteGrid = document.getElementById('quoteGrid');
const openModalBtn = document.getElementById('openModalBtn');
const modal = document.getElementById('quoteModal');
const cancelBtn = document.getElementById('cancelBtn');
const saveBtn = document.getElementById('saveBtn');

// form stuff
const quoteInput = document.getElementById('quoteInput');
const bgColorPicker = document.getElementById('bgColorPicker');
const textColorPicker = document.getElementById('textColorPicker');
const fontStyleSelect = document.getElementById('fontStyleSelect');

// checking the archives (local storage)
let quotes = JSON.parse(localStorage.getItem('myQuotes')) || [];
renderQuotes();


// --- listening for tea ---

openModalBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    quoteInput.focus();
});

cancelBtn.addEventListener('click', closeModal);

saveBtn.addEventListener('click', () => {
    const text = quoteInput.value.trim();

    if (!text) {
        alert("Please write a quote first!");
        return;
    }

    // creating the vibe object
    const newQuote = {
        id: Date.now(),
        text: text,
        bgColor: bgColorPicker.value,
        textColor: textColorPicker.value,
        fontFamily: fontStyleSelect.value
    };

    quotes.push(newQuote);

    // keeping receipts
    saveToLocalStorage();

    renderQuotes();
    closeModal();
    resetForm();
});

// close modal if user clicks outside (misclick check)
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});


// --- helper functions (the workers) ---

function closeModal() {
    modal.classList.add('hidden');
}

function resetForm() {
    quoteInput.value = '';
    bgColorPicker.value = '#1c1c1e'; 
    textColorPicker.value = '#ffffff';
    fontStyleSelect.selectedIndex = 0;
}

function saveToLocalStorage() {
    localStorage.setItem('myQuotes', JSON.stringify(quotes));
}

function renderQuotes() {
    quoteGrid.innerHTML = '';

    quotes.forEach(quote => {
        const tile = document.createElement('div');
        tile.classList.add('quote-tile');
        
        // aesthetic injection
        tile.style.backgroundColor = quote.bgColor;
        tile.style.color = quote.textColor;
        tile.style.fontFamily = quote.fontFamily;

        tile.innerHTML = `
            <div class="quote-text">"${quote.text}"</div>
            <button class="delete-btn" onclick="deleteQuote(${quote.id})">Delete</button>
        `;

        quoteGrid.appendChild(tile);
    });
}

// yeeting the quote out of existence
window.deleteQuote = function(id) {
    quotes = quotes.filter(quote => quote.id !== id);
    saveToLocalStorage();
    renderQuotes();
};