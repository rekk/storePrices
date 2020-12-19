const searchField = document.getElementById('search-input');
const results = document.getElementById('search-results');

const onSearchChange = (e) => {
    const newValue = e.target.value.trim().toLowerCase();
    
    if (!newValue) {
        return;
    };

    const matches = jsonData.entries.filter(item =>
        item.name.toLowerCase().includes(newValue)
    );

    if (matches.length < 1) {
        const container = createErrorEntry();

        removeAllChildren(results);

        return results.appendChild(container);
    };

    const elements = matches.map(match => {
        const container = createSearchEntry(match);

        return container;
    });

    removeAllChildren(results);
    elements.forEach(element => results.appendChild(element));
}; 

searchField.addEventListener('change', onSearchChange);
searchField.value = '';

const createSearchEntry = (match) => {
    const container = document.createElement('div');

    const title = document.createElement('div');
    const titleValue = document.createTextNode(match.name);

    const prices = document.createElement('div');
    const priceEntries = Object.keys(match)
        .map(key => { 
            const keyPrice = parseFloat(match[key]);

            if (!keyPrice) {
                return
            };

            return { [key]: parseFloat(match[key]) }
        })
        .filter(entry => entry);
    const priceNodes = priceEntries.map(priceEntry => document.createTextNode(`${Object.keys(priceEntry)[0].toUpperCase()}: €${Object.values(priceEntry)[0]}`));

    title.appendChild(titleValue);
    title.classList.add('search-entry-title');
    priceNodes.forEach(node => { 
        prices.appendChild(node)
        prices.appendChild(document.createElement('br'))
    });
    
    container.appendChild(title);
    container.appendChild(prices);
    container.classList.add('search-entry');

    return container;
};

const createErrorEntry = () => {
    const container = document.createElement('div');

    const title = document.createElement('div');
    const titleValue = document.createTextNode('No results found!');

    title.appendChild(titleValue);
    title.classList.add('search-entry-title');
    title.classList.add('error');

    container.appendChild(title);
    container.classList.add('search-entry');

    return container;
};

const removeAllChildren = (element) => {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
};
