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
        const container = createSearchEntry('No results found!');
        container.classList.add('error');

        removeAllChildren(results);

        return results.appendChild(container);
    };

    const elements = matches.map(match => {
        const container = createSearchEntry(match.name);

        return container;
    });

    removeAllChildren(results);
    elements.forEach(element => results.appendChild(element));
}; 

searchField.addEventListener('change', onSearchChange);
searchField.value = '';

const createSearchEntry = (text) => {
    const container = document.createElement('div');
    const textNode = document.createTextNode(text);
    container.appendChild(textNode);
    
    container.classList.add('search-entry');

    return container;
};

const removeAllChildren = (element) => {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
};
