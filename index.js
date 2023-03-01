function loadCountries() {
    fetch(`https://restcountries.com/v3.1/all`)
        .then(res => res.json())
        .then(data => getLanguage(data))
}
function getLanguage(countries) {
    let allLanguages = [];
    countries.map(country => {
        const languages = country.languages;
        if (languages) {
            const languageValue = Object.values(languages);
            // console.log(languageValue)
            allLanguages = [...languageValue, ...allLanguages];
        }
    })
    // console.log(allLanguages);
    // console.log(countries.languages);
    let uniqueLanguage = [...new Set(allLanguages.map(lg => lg))];
    // console.log(uniqueLanguage);
    const languagesContainer = document.getElementById('languages-container');
    uniqueLanguage.forEach(lng => {
        // console.log(lng);
        const li = document.createElement('li');
        li.setAttribute('onclick', `searchLanguage('${lng}')`)
        li.innerHTML = `
        <a class="dropdown-item" href="#">${lng}</a>
        `;
        languagesContainer.appendChild(li);
    })
}
function searchLanguage(lang) {
    fetch(`https://restcountries.com/v3.1/lang/${lang}`)
        .then(res => res.json())
        .then(data => showCountries(data))
}
function showCountries(countries) {
    const countriesContainer = document.getElementById('countries-container');
    countriesContainer.textContent = '';
    countries.forEach(country => {
        const languages = country.languages;
        const countryDiv = document.createElement('div');
        countryDiv.innerHTML = `
        <div class="col">
            <div class="card">
                <img src="${country.flags.png}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${country.name.official}</h5>
                    <p class="card-text">Languages: ${Object.values(languages)}</p>
                </div>
            </div>
        </div>
        `;
        countriesContainer.appendChild(countryDiv);
    })
}
loadCountries();
function searchRegion(region) {
    try {
        fetch(`https://restcountries.com/v3.1/region/${region}`)
            .then(res => res.json())
            .then(data => displayCountries(data))
    } catch {
        console.error('error', error);
    }
}

function displayCountries(countries) {
    const countriesContainer = document.getElementById('cards-container');
    countriesContainer.textContent = '';
    countries.forEach(country => {
        // console.log(country);
        const languages = country.languages;
        const countryDiv = document.createElement('div');
        countryDiv.innerHTML = `
        <div class="col">
            <div class="card">
                <img src="${country.flags.png}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${country.name.official}</h5>
                    <p class="card-text">Languages: ${Object.values(languages)}</p>
                </div>
            </div>
        </div>
    `;
        countriesContainer.appendChild(countryDiv);
    });
}