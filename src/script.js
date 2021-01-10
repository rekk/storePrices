// TODO:
// - Add tags to each item for querying categorically ('vegetable', 'meat'...)
// - Ability to add or edit items
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var searchField = document.getElementById('search-input');
var results = document.getElementById('search-results');
var apiKey = getAPIKey();
if (!apiKey || apiKey === '') {
    apiKey = prompt('Enter API key: ');
    window.localStorage.setItem('apiKey', JSON.stringify({ value: apiKey }));
}
;
function onSearchChange(e) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var newValue, itemEntries, matches, elements;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!results || !((_a = e === null || e === void 0 ? void 0 : e.currentTarget) === null || _a === void 0 ? void 0 : _a.value)) {
                        return [2 /*return*/];
                    }
                    ;
                    newValue = e.currentTarget.value.trim().toLowerCase();
                    if (!newValue) {
                        return [2 /*return*/];
                    }
                    ;
                    results.removeAttribute('hidden');
                    return [4 /*yield*/, getItemEntries()];
                case 1:
                    itemEntries = _b.sent();
                    matches = itemEntries.filter(function (item) {
                        return (item.name.toLowerCase().includes(newValue));
                    });
                    if (matches.length < 1) {
                        removeAllChildren(results);
                        results.appendChild(createErrorEntry());
                        return [2 /*return*/];
                    }
                    ;
                    elements = matches.map(function (match) {
                        return createSearchEntry(match);
                    });
                    removeAllChildren(results);
                    elements.forEach(function (element) { return results.appendChild(element); });
                    return [2 /*return*/];
            }
        });
    });
}
;
searchField === null || searchField === void 0 ? void 0 : searchField.addEventListener('change', onSearchChange);
function createSearchEntry(match) {
    var container = document.createElement('div');
    var title = document.createElement('div');
    var titleValue = document.createTextNode(match.name);
    var prices = document.createElement('div');
    var storePrices = match.prices.filter(function (storePrice) { return storePrice.price; });
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
}
;
function createErrorEntry() {
    var container = document.createElement('div');
    var title = document.createElement('div');
    var titleValue = document.createTextNode('No results found!');
    title.appendChild(titleValue);
    title.classList.add('search-entry-title');
    container.appendChild(title);
    container.classList.add('search-entry');
    return container;
}
;
function removeAllChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
;
function httpGET(url, headers) {
    return __awaiter(this, void 0, void 0, function () {
        var request;
        return __generator(this, function (_a) {
            request = new Request(url, {
                method: 'GET',
                headers: headers,
                mode: 'cors',
                cache: 'default',
            });
            return [2 /*return*/, fetch(request)
                    .then(function (response) {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                })];
        });
    });
}
function getJSONValues() {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, httpGET("https://api.jsonbin.io/b/5ffaf3ce55b359028dbd32e3", { 'secret-key': apiKey !== null && apiKey !== void 0 ? apiKey : '' })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    });
}
function getItemEntries() {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var storedItemEntries, response, itemEntries;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!document.cookie.includes('itemEntriesLastUpdate')) {
                        window.localStorage.removeItem('itemEntries');
                    }
                    ;
                    try {
                        storedItemEntries = JSON.parse((_a = window.localStorage.getItem('itemEntries')) !== null && _a !== void 0 ? _a : '');
                        return [2 /*return*/, storedItemEntries];
                    }
                    catch (e) {
                        // eslint-disable-next-line no-console
                        console.warn('Could not find cached items, trying API call...');
                    }
                    return [4 /*yield*/, getJSONValues()];
                case 1:
                    response = _b.sent();
                    itemEntries = response.itemEntries;
                    window.localStorage.setItem('itemEntries', JSON.stringify(itemEntries));
                    document.cookie = "itemEntriesLastUpdate=" + Date.now() + ";max-age=86400;samesite=strict";
                    return [2 /*return*/, itemEntries];
            }
        });
    });
}
function getAPIKey() {
    var _a;
    try {
        var storedAPIKey = JSON.parse((_a = window.localStorage.getItem('apiKey')) !== null && _a !== void 0 ? _a : '');
        return storedAPIKey.value;
    }
    catch (e) {
        // eslint-disable-next-line no-console 
        console.warn('Could not find API key.');
        return null;
    }
}
export {};
