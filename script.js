"use strict";
var searchField = document.getElementById('search-input');
var results = document.getElementById('search-results');
var onSearchChange = function (e) {
    var _a;
    searchField === null || searchField === void 0 ? void 0 : searchField.setAttribute('disabled', '');
    searchField === null || searchField === void 0 ? void 0 : searchField.removeAttribute('disabled');
    if (!results || !jsonData || !((_a = e === null || e === void 0 ? void 0 : e.currentTarget) === null || _a === void 0 ? void 0 : _a.value)) {
        return;
    }
    ;
    results.removeAttribute('hidden');
    var newValue = e.currentTarget.value.trim().toLowerCase();
    if (!newValue) {
        return;
    }
    ;
    var matches = jsonData.filter(function (item) {
        return item.name.toLowerCase().includes(newValue);
    });
    if (matches.length < 1) {
        var container = createErrorEntry();
        removeAllChildren(results);
        results.appendChild(container);
        return;
    }
    ;
    var elements = matches.map(function (match) {
        var container = createSearchEntry(match);
        return container;
    });
    removeAllChildren(results);
    elements.forEach(function (element) { return results.appendChild(element); });
};
searchField === null || searchField === void 0 ? void 0 : searchField.addEventListener('change', onSearchChange);
var createSearchEntry = function (match) {
    var container = document.createElement('div');
    var title = document.createElement('div');
    var titleValue = document.createTextNode(match.name);
    var prices = document.createElement('div');
    var storePrices = match.prices.filter(function (price) { return price; });
    var priceNodes = storePrices.map(function (storePrice) {
        return document.createTextNode(storePrice.store.toUpperCase() + ": \u20AC" + storePrice.price);
    });
    title.appendChild(titleValue);
    title.classList.add('search-entry-title');
    priceNodes.forEach(function (node) {
        prices.appendChild(node);
        prices.appendChild(document.createElement('br'));
    });
    container.appendChild(title);
    container.appendChild(prices);
    container.classList.add('search-entry');
    return container;
};
var createErrorEntry = function () {
    var container = document.createElement('div');
    var title = document.createElement('div');
    var titleValue = document.createTextNode('No results found!');
    title.appendChild(titleValue);
    title.classList.add('search-entry-title');
    container.appendChild(title);
    container.classList.add('search-entry');
    return container;
};
var removeAllChildren = function (element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
};
var Store;
(function (Store) {
    Store["HOFER"] = "HOFER";
    Store["EUROSPIN"] = "EUROSPIN";
    Store["TUS"] = "TUS";
    Store["SPAR"] = "SPAR";
    Store["MERCATOR"] = "MERCATOR";
})(Store || (Store = {}));
var jsonData = [
    {
        name: 'Canned sweet corn',
        prices: [
            { store: Store.HOFER, price: 1.44, },
            { store: Store.EUROSPIN, price: 1.72, },
        ]
    },
    {
        name: 'Sunflower oil',
        prices: [
            { store: Store.HOFER, price: 1.18, },
            { store: Store.EUROSPIN, price: 1.18, },
        ]
    },
    {
        name: 'Eggs',
        prices: [
            { store: Store.HOFER, price: 0.12, },
        ]
    },
    {
        name: 'Minced meat (beef)',
        prices: [
            { store: Store.HOFER, price: 6.58, },
            { store: Store.EUROSPIN, price: 5.38, },
        ]
    },
    {
        name: 'Milk',
        prices: [
            { store: Store.HOFER, price: 0.65, },
        ]
    },
    {
        name: 'Blueberries (frozen)',
        prices: [
            { store: Store.HOFER, price: 4.78, },
        ]
    },
    {
        name: 'Strawberries (frozen)',
        prices: [
            { store: Store.HOFER, price: 3.30, },
        ]
    },
    {
        name: 'Raspberries (frozen)',
        prices: [
            { store: Store.HOFER, price: 5.40, },
        ]
    },
    {
        name: 'Waldfrucht (frozen)',
        prices: [
            { store: Store.HOFER, price: 3.30, },
        ]
    },
    {
        name: 'Peas (frozen)',
        prices: [
            { store: Store.HOFER, price: 1.50, },
        ]
    },
    {
        name: 'Sugar',
        prices: [
            { store: Store.HOFER, price: 0.79, },
        ]
    },
    {
        name: 'Cocoa powder',
        prices: [
            { store: Store.HOFER, price: 6.95, },
            { store: Store.EUROSPIN, price: 8.00, },
        ]
    },
    {
        name: 'Hot chocolate',
        prices: [
            { store: Store.HOFER, price: 14.95, },
        ]
    },
    {
        name: 'Toast',
        prices: [
            { store: Store.HOFER, price: 1.18, },
        ]
    },
    {
        name: 'Šampinjoni',
        prices: [
            { store: Store.HOFER, price: 3.83, },
            { store: Store.EUROSPIN, price: 3.58, },
        ]
    },
    {
        name: 'Burger cheese',
        prices: [
            { store: Store.HOFER, price: 4.36, },
        ]
    },
    {
        name: 'Gauda',
        prices: [
            { store: Store.HOFER, price: 6.6, },
        ]
    },
    {
        name: 'Coffee',
        prices: [
            { store: Store.HOFER, price: 6.99, },
            { store: Store.EUROSPIN, price: 4.99, },
        ]
    },
    {
        name: 'Grapefruit (red)',
        prices: [
            { store: Store.HOFER, price: 2.29, },
            { store: Store.EUROSPIN, price: 1.69, },
        ]
    },
    {
        name: 'Grapefruit (yellow)',
        prices: [
            { store: Store.HOFER, price: 1.89, },
        ]
    },
    {
        name: 'Butter',
        prices: [
            { store: Store.HOFER, price: 7.96, },
            { store: Store.EUROSPIN, price: 7.20, },
            { store: Store.TUS, price: 10.76, },
        ]
    },
    {
        name: 'Sauerkraut',
        prices: [
            { store: Store.HOFER, price: 1.93, },
            { store: Store.TUS, price: 2.24, },
        ]
    },
    {
        name: 'Coconut flakes',
        prices: [
            { store: Store.HOFER, price: 3.95, },
            { store: Store.EUROSPIN, price: 3.96, },
        ]
    },
    {
        name: 'Chianti',
        prices: [
            { store: Store.HOFER, price: 3.72, },
        ]
    },
    {
        name: 'Onion',
        prices: [
            { store: Store.HOFER, price: 0.68, },
        ]
    },
    {
        name: 'Mouthwash',
        prices: [
            { store: Store.HOFER, price: 2.58, },
        ]
    },
    {
        name: 'Ajvar',
        prices: [
            { store: Store.HOFER, price: 4.70, },
            { store: Store.TUS, price: 6.13, },
        ]
    },
    {
        name: 'Grissini',
        prices: [
            { store: Store.HOFER, price: 5.00, },
        ]
    },
    {
        name: 'Tomato',
        prices: [
            { store: Store.HOFER, price: 1.69, },
            { store: Store.EUROSPIN, price: 1.79, },
            { store: Store.TUS, price: 3.00, },
        ]
    },
    {
        name: 'Cooking cream',
        prices: [
            { store: Store.HOFER, price: 2.12, },
            { store: Store.EUROSPIN, price: 1.98, },
        ]
    },
    {
        name: 'Orange juice',
        prices: [
            { store: Store.HOFER, price: 1.57, },
        ]
    },
    {
        name: 'Greek yogurt',
        prices: [
            { store: Store.HOFER, price: 2.99, },
        ]
    },
    {
        name: 'Parmesan',
        prices: [
            { store: Store.HOFER, price: 11.60, },
        ]
    },
    {
        name: 'Cordon bleu',
        prices: [
            { store: Store.HOFER, price: 5.32, },
        ]
    },
    {
        name: 'Chicken (stegna)',
        prices: [
            { store: Store.HOFER, price: 7.00, },
            { store: Store.EUROSPIN, price: 2.89, },
        ]
    },
    {
        name: 'Whole chicken',
        prices: [
            { store: Store.HOFER, price: 3.69, },
        ]
    },
    {
        name: 'Pork neck',
        prices: [
            { store: Store.HOFER, price: 6.00, },
        ]
    },
    {
        name: 'Chicken (bedra)',
        prices: [
            { store: Store.HOFER, price: 3.50, },
            { store: Store.EUROSPIN, price: 1.69, },
        ]
    },
    {
        name: 'Ham',
        prices: [
            { store: Store.HOFER, price: 7.00, },
        ]
    },
    {
        name: 'Oranges',
        prices: [
            { store: Store.HOFER, price: 1.45, },
        ]
    },
    {
        name: 'Carrot',
        prices: [
            { store: Store.HOFER, price: 1.19, },
        ]
    },
    {
        name: 'Solata',
        prices: [
            { store: Store.HOFER, price: 0.70, },
        ]
    },
    {
        name: 'Onion',
        prices: [
            { store: Store.HOFER, price: 0.70, },
            { store: Store.EUROSPIN, price: 0.59, },
        ]
    },
    {
        name: 'Potato',
        prices: [
            { store: Store.HOFER, price: 1.20, },
            { store: Store.EUROSPIN, price: 0.45, },
        ]
    },
    {
        name: 'Toilet paper (per roll)',
        prices: [
            { store: Store.HOFER, price: 0.30, },
        ]
    },
    {
        name: 'Wet wipes (per price: 100pcs)',
        prices: []
    },
    {
        name: 'Lettuce (price: 125g)',
        prices: [
            { store: Store.HOFER, price: 9.50, },
            { store: Store.EUROSPIN, price: 6.95, },
        ]
    },
    {
        name: 'Kidney beans (price: 425g)',
        prices: [
            { store: Store.HOFER, price: 0.90, },
            { store: Store.EUROSPIN, price: 1.61, },
        ]
    },
    {
        name: 'Gehackte Tomaten',
        prices: [
            { store: Store.HOFER, price: 1.00, },
            { store: Store.EUROSPIN, price: 1.10, },
        ]
    },
    {
        name: 'Mozzarella  (block)',
        prices: [
            { store: Store.HOFER, price: 5.00, },
        ]
    },
    {
        name: 'Smoked salmon',
        prices: [
            { store: Store.EUROSPIN, price: 30.00, },
        ]
    },
    {
        name: 'Nori',
        prices: [
            { store: Store.EUROSPIN, price: 125.00, },
        ]
    },
    {
        name: 'Detergent',
        prices: [
            { store: Store.HOFER, price: 4.00, },
        ]
    },
    {
        name: 'Smoky paprika',
        prices: [
            { store: Store.EUROSPIN, price: 22.71, },
        ]
    },
    {
        name: 'Sweet paprika',
        prices: []
    },
    {
        name: 'Mascarpone',
        prices: [
            { store: Store.HOFER, price: 5.00, },
            { store: Store.EUROSPIN, price: 5.00, },
        ]
    },
    {
        name: 'Ribs with skin',
        prices: [
            { store: Store.HOFER, price: 4.79, },
        ]
    },
    {
        name: 'Ribs KAT III',
        prices: [
            { store: Store.HOFER, price: 5.79, },
        ]
    },
    {
        name: 'White chocolate',
        prices: [
            { store: Store.HOFER, price: 5.50, },
        ]
    },
    {
        name: 'Flour (type price: 500 / 400)',
        prices: [
            { store: Store.HOFER, price: 0.47, },
        ]
    },
    {
        name: 'Sirčki',
        prices: [
            { store: Store.HOFER, price: 4.60, },
        ]
    },
    {
        name: 'Baby Keksi',
        prices: [
            { store: Store.HOFER, price: 2.73, },
        ]
    },
    {
        name: 'Apricot jam',
        prices: [
            { store: Store.HOFER, price: 1.84, },
        ]
    },
    {
        name: 'Strawberry jam',
        prices: [
            { store: Store.HOFER, price: 1.84, },
        ]
    },
    {
        name: 'Cheap hazelnut/choco spread',
        prices: [
            { store: Store.HOFER, price: 2.52, },
        ]
    },
    {
        name: 'Tuna in oil',
        prices: [
            { store: Store.HOFER, price: 6.56, },
        ]
    },
    {
        name: 'Tuna in olive oil',
        prices: [
            { store: Store.HOFER, price: 8.32, },
        ]
    },
    {
        name: 'Yeast',
        prices: [
            { store: Store.HOFER, price: 4.76, },
        ]
    },
    {
        name: 'Sponge cloth',
        prices: [
            { store: Store.HOFER, price: 0.19, },
        ]
    },
    {
        name: 'Lime',
        prices: [
            { store: Store.HOFER, price: 3.50, },
        ]
    },
    {
        name: 'Pistachios',
        prices: [
            { store: Store.HOFER, price: 2.89, },
        ]
    },
    {
        name: 'Cabbage',
        prices: [
            { store: Store.HOFER, price: 0.69, },
        ]
    },
    {
        name: 'Cooking cream',
        prices: [
            { store: Store.HOFER, price: 1.98, },
        ]
    },
    {
        name: 'Rukola',
        prices: [
            { store: Store.HOFER, price: 7.96, },
        ]
    },
    {
        name: 'Red chili (whole)',
        prices: [
            { store: Store.EUROSPIN, price: 5.99, },
        ]
    },
    {
        name: 'Figs',
        prices: [
            { store: Store.HOFER, price: 4.69, },
        ]
    },
    {
        name: 'Ketchup',
        prices: [
            { store: Store.HOFER, price: 0.95, },
        ]
    },
    {
        name: 'Margarine',
        prices: [
            { store: Store.HOFER, price: 1.50, },
        ]
    },
    {
        name: 'Aloe Vera',
        prices: [
            { store: Store.HOFER, price: 16.50, },
        ]
    },
    {
        name: 'Muškat',
        prices: [
            { store: Store.HOFER, price: 14.75, },
        ]
    },
    {
        name: 'Hot paprika',
        prices: [
            { store: Store.HOFER, price: 14.75, },
        ]
    },
    {
        name: 'Curry powder',
        prices: [
            { store: Store.HOFER, price: 16.86, },
        ]
    },
    {
        name: 'Chicory',
        prices: [
            { store: Store.HOFER, price: 2.00, },
        ]
    },
    {
        name: 'Barley',
        prices: [
            { store: Store.HOFER, price: 1.85, },
        ]
    },
    {
        name: 'Citric acid',
        prices: [
            { store: Store.HOFER, price: 3.45, },
        ]
    },
    {
        name: 'Mustard',
        prices: [
            { store: Store.HOFER, price: 1.36, },
        ]
    },
    {
        name: 'Lemon squeezie',
        prices: [
            { store: Store.HOFER, price: 1.95, },
        ]
    },
    {
        name: 'Clean whole squid',
        prices: [
            { store: Store.HOFER, price: 11.18, },
        ]
    },
    {
        name: 'Squid rings',
        prices: [
            { store: Store.HOFER, price: 9.98, },
        ]
    },
    {
        name: 'Shrimp tails',
        prices: [
            { store: Store.HOFER, price: 17.88, },
        ]
    },
    {
        name: 'Napkins price: 450pcs/2.19',
        prices: []
    },
    {
        name: 'Paper towels price: 4rolls/1.09',
        prices: [
            { store: Store.EUROSPIN, price: 0.30, },
        ]
    },
    {
        name: 'Geschälte Tomaten',
        prices: [
            { store: Store.HOFER, price: 1.63, },
        ]
    },
    {
        name: 'Tomato paste',
        prices: [
            { store: Store.HOFER, price: 0.67, },
        ]
    },
    {
        name: 'Balsamico (Basic)',
        prices: [
            { store: Store.HOFER, price: 2.58, },
            { store: Store.EUROSPIN, price: 2.58, },
        ]
    },
    {
        name: 'Olives (pitiless)',
        prices: [
            { store: Store.HOFER, price: 4.76, },
        ]
    },
    {
        name: 'Por',
        prices: [
            { store: Store.HOFER, price: 4.30, },
        ]
    },
    {
        name: 'Avocado',
        prices: [
            { store: Store.HOFER, price: 1.49, },
        ]
    },
    {
        name: 'Kaki',
        prices: [
            { store: Store.HOFER, price: 1.99, },
        ]
    },
    {
        name: 'Balsamico (premium)',
        prices: [
            { store: Store.HOFER, price: 11.69, },
            { store: Store.EUROSPIN, price: 11.98, },
        ]
    },
    {
        name: 'Cheap coffee beans',
        prices: [
            { store: Store.HOFER, price: 4.39, },
            { store: Store.EUROSPIN, price: 4.99, },
        ]
    },
    {
        name: 'Sour cream',
        prices: [
            { store: Store.HOFER, price: 2.12, },
        ]
    },
    {
        name: 'Argentinian steak',
        prices: [
            { store: Store.HOFER, price: 19.97, },
        ]
    },
    {
        name: 'Chicken breast (filet)',
        prices: [
            { store: Store.HOFER, price: 8.78, },
        ]
    },
    {
        name: 'Tortilla chips',
        prices: [
            { store: Store.HOFER, price: 3.17, },
        ]
    },
    {
        name: 'Sweet cream',
        prices: [
            { store: Store.HOFER, price: 3.40, },
        ]
    },
    {
        name: 'Vanilla sugar',
        prices: [
            { store: Store.HOFER, price: 3.85, },
        ]
    },
    {
        name: 'Lemon squeezie',
        prices: [
            { store: Store.HOFER, price: 1.90, },
        ]
    },
    {
        name: 'Listnato testo',
        prices: [
            { store: Store.HOFER, price: 3.20, },
        ]
    },
    {
        name: 'Tequila',
        prices: [
            { store: Store.HOFER, price: 22.84, },
            { store: Store.TUS, price: 20.00, },
        ]
    },
    {
        name: 'Whipping cream',
        prices: [
            { store: Store.EUROSPIN, price: 2.77, },
        ]
    },
    {
        name: '(Frozen) cauliflower',
        prices: [
            { store: Store.HOFER, price: 1.69, },
            { store: Store.TUS, price: 1.98, },
        ]
    },
    {
        name: 'Garlic',
        prices: [
            { store: Store.HOFER, price: 4.99, },
            { store: Store.TUS, price: 7.99, },
        ]
    },
    {
        name: 'Carob (ground)',
        prices: [
            { store: Store.HOFER, price: 3.45, },
            { store: Store.EUROSPIN, price: 3.95, },
        ]
    },
    {
        name: 'Worcestershire sauce',
        prices: [
            { store: Store.EUROSPIN, price: 12.53, },
        ]
    },
    {
        name: 'Apple vinegar',
        prices: [
            { store: Store.EUROSPIN, price: 2.68, },
        ]
    },
    {
        name: 'Caper price: 1.49)',
        prices: [
            { store: Store.HOFER, price: 4.54, },
        ]
    },
    {
        name: 'Anchoves price: 2.08)',
        prices: [
            { store: Store.HOFER, price: 14.33, },
            { store: Store.TUS, price: 14.93, },
        ]
    },
    {
        name: 'Himalayan salt',
        prices: [
            { store: Store.EUROSPIN, price: 4.50, },
        ]
    },
    {
        name: 'Dijon mustard',
        prices: [
            { store: Store.EUROSPIN, price: 7.25, },
        ]
    },
    {
        name: 'Red paprika',
        prices: [
            { store: Store.HOFER, price: 3.00, },
        ]
    },
    {
        name: 'Sugar',
        prices: [
            { store: Store.HOFER, price: 0.79, },
        ]
    },
    {
        name: 'Camembert',
        prices: [
            { store: Store.HOFER, price: 7.92, },
        ]
    },
    {
        name: 'Pork rinds',
        prices: [
            { store: Store.HOFER, price: 12.45, },
        ]
    },
    {
        name: 'Pečena mesna slanina',
        prices: [
            { store: Store.HOFER, price: 6.39, },
        ]
    },
    {
        name: 'Ground cheese',
        prices: [
            { store: Store.HOFER, price: 6.60, },
        ]
    },
    {
        name: 'Mozzarella (small)',
        prices: [
            { store: Store.HOFER, price: 6.00, },
        ]
    },
    {
        name: 'Parmigiano Reggiano',
        prices: [
            { store: Store.HOFER, price: 15.92, },
        ]
    },
    {
        name: 'Grana padano',
        prices: [
            { store: Store.HOFER, price: 11.60, },
        ]
    }
];
