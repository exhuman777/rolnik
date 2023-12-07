const plantSeedButton = document.getElementById('plantSeed');
const harvestCropButton = document.getElementById('harvestCrop');
const farmField = document.getElementById('farmField');
const storageAmount = document.getElementById('storageAmount');
const loseMessage = document.getElementById('loseMessage'); // Dodane ID dla komunikatu o przegranej
const newGameButton = document.getElementById('newGame'); // Dodany przycisk "Nowa gra"

let cropReady = false;
let storage = 0;

plantSeedButton.addEventListener('click', function() {
    plantSeed();
});

harvestCropButton.addEventListener('click', function() {
    if (cropReady) {
        harvestCrop();
    }
});

newGameButton.addEventListener('click', function() {
    newGame();
});

// ... (reszta kodu bez zmian)

const buyHouseButton = document.getElementById('buyHouse'); // Przycisk "Kup osadę"
const housesDiv = document.getElementById('houses'); // Div do wyświetlania osad

// Inicjalizacja liczby osad i zmiennej do przechowywania zakupionych domków
let numberOfHouses = 0;
let housesBought = 0;

buyHouseButton.addEventListener('click', function() {
    if (storage >= 5) { // Sprawdzanie, czy jest wystarczająco punktów w spichlerzu
        storage -= 5; // Odejmowanie 5 punktów za zakup domku
        numberOfHouses++; // Zwiększenie liczby osad
        housesBought++; // Zwiększenie liczby zakupionych domków
        displayHouses(); // Wyświetlenie osad
        storageAmount.textContent = storage; // Aktualizacja liczby punktów w spichlerzu
    }
});

function displayHouses() {
    const houseEmoji = '🏡'; // Emoji domku
    const housesDiv = document.getElementById('houses');

    // Usuń wszystkie dzieci kontenera osad
    while (housesDiv.firstChild) {
        housesDiv.removeChild(housesDiv.firstChild);
    }

    // Dodaj osady do kontenera
    for (let i = 0; i < numberOfHouses; i++) {
        const houseElement = document.createElement('div');
        houseElement.textContent = houseEmoji;
        housesDiv.appendChild(houseElement);
    }
}


// ... (reszta kodu bez zmian)


// Funkcja do obsługi zdarzeń losowych
function handleRandomEvent() {
    const randomEvent = Math.random(); // Losujemy zdarzenie
    const eventMessage = document.getElementById('eventMessage'); // Pobieramy element z komunikatem

    if (randomEvent < 0.1) {
        // 10% szansa na suszę
        eventMessage.textContent = 'Nadszedł okres suszy!';
        storage -= 3; // Zmniejsz magazyn o 3
    } else if (randomEvent < 0.2) {
        // 10% szansa na szkodniki
        eventMessage.textContent = 'Twoje pola zostały zaatakowane przez szkodniki!';
        storage -= 2; // Zmniejsz magazyn o 2
    } else if (randomEvent < 0.3) {
        // 10% szansa na chorobę roślin
        eventMessage.textContent = 'Za mało słońca!';
        storage -= 1; // Zmniejsz magazyn o 1
    } else if (randomEvent < 0.4) {
        // 10% szansa na gradobicie
        eventMessage.textContent = 'Gradobicie zniszczyło Twoje plony!';
        storage -= 4; // Zmniejsz magazyn o 4
    } else if (randomEvent < 0.5) {
        // 10% szansa na deszcz
        eventMessage.textContent = 'Ulewny deszcz nawodnił Twoje pola. Plony są obfite!';
        storage += 5; // Zwiększ magazyn o 5
    } else if (randomEvent < 0.6) {
        // 10% szansa na wsparcie lokalnej społeczności
        eventMessage.textContent = 'Lokalna społeczność wspiera Twój gospodarstwo. Otrzymujesz dodatkowe zapasy!';
        storage += 3; // Zwiększ magazyn o 3
    } else if (randomEvent < 0.7) {
        // 10% szansa na dostęp do nowej technologii
        eventMessage.textContent = 'Dostałeś dostęp do nowoczesnych technologii rolniczych. Plony rosną szybciej!';
        // Zwiększ szybkość wzrostu roślin
        setTimeout(() => {
            const isGoodCrop = Math.random() < 0.5; // 50% chance for a good crop
            if (isGoodCrop) {
                farmField.textContent = '🌾';
                cropReady = true;
                harvestCropButton.disabled = false;
            } else {
                farmField.textContent = '☠️'; // Display toxic crop
                cropReady = true;
                harvestCropButton.disabled = false;
            }
        }, 500); // Szybszy wzrost roślin (500ms = 0.5 sekundy)
    } else if (randomEvent < 0.8) {
        // 10% szansa na hodowlę zwierząt
        eventMessage.textContent = 'Rozpocząłeś hodowlę zwierząt. Masz dodatkowy dostęp do produktów spożywczych!';
        storage += 4; // Zwiększ magazyn o 4
    } else if (randomEvent < 0.9) {
        // 10% szansa na dostęp do nowego rynku zbytu
        eventMessage.textContent = 'Otrzymałeś dostęp do nowego rynku zbytu. Możesz sprzedawać swoje produkty po wyższych cenach!';
        // Zwiększ wartość sprzedaży plonów
        storage += 2; // Zwiększ magazyn o 2
    } else {
        // Brak zdarzenia
        eventMessage.textContent = 'Brak zdarzenia.';
    }

    // Aktualizacja stanu magazynu po zdarzeniu
    storageAmount.textContent = storage;

    if (storage <= -5) {
        eventMessage.textContent = 'Jesteś złym Rolnikiem. Może AI?';
        disableButtons();
    }
}



function plantSeed() {
    farmField.textContent = '🌱';
    cropReady = false;
    setTimeout(() => {
        const isGoodCrop = Math.random() < 0.5; // 50% chance for a good crop
        if (isGoodCrop) {
            farmField.textContent = '🌾';
            cropReady = true;
            harvestCropButton.disabled = false;
        } else {
            farmField.textContent = '☠️'; // Display toxic crop
            cropReady = true;
            harvestCropButton.disabled = false;
        }
        handleRandomEvent();
    }, 1000); // Growth time for the crop, 1000ms = 1 second
}

function harvestCrop() {
    if (farmField.textContent === '🌾') { // Check if the crop is good
        storage++;
    } else if (farmField.textContent === '☠️') { // Check if the crop is toxic
        storage -= 2; // Decrease storage by -2 points
    }
    storageAmount.textContent = storage;
    farmField.textContent = '';
    cropReady = false;
    harvestCropButton.disabled = true;

    if (storage >= 5) { // Sprawdzanie, czy punkty są wieksze lub równe 5
        loseMessage.textContent = 'Jesteś super Rolnikiem.'; // Wyświetlenie komunikatu o przegranej
        disableButtons();
    } else if (storage <= -5) { // Sprawdzanie, czy punkty są mniejsze lub równe -5
        loseMessage.textContent = 'Jesteś złym Rolnikiem. Może AI?'; // Wyświetlenie komunikatu o przegranej
        disableButtons();
    }
}

function newGame() {
    storage = 0;
    storageAmount.textContent = storage;
    loseMessage.textContent = '';
    enableButtons();
}

function disableButtons() {
    plantSeedButton.disabled = true;
    harvestCropButton.disabled = true;
}

function enableButtons() {
    plantSeedButton.disabled = false;
    harvestCropButton.disabled = true;
}

