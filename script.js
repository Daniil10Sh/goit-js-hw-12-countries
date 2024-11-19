const countryNameInput = document.getElementById('country-name');
const countryContainer = document.getElementById('country-container');

async function fetchCountryData(country) {
  if (!country) {
    countryContainer.innerHTML = '<p>Please enter a country name.</p>';
    return;
  }

  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    if (!response.ok) {
      throw new Error('Country not found');
    }

    const data = await response.json();
    displayCountryData(data[0]);
  } catch (error) {
    countryContainer.innerHTML = '<p>Country not found. Try again!</p>';
  }
}

function displayCountryData(country) {
  countryContainer.innerHTML = `
    <div>
      <h2>${country.name.common}</h2>
      <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
      <p><strong>Region:</strong> ${country.region}</p>
      <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
      <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'No capital'}</p>
    </div>
  `;
}

countryNameInput.addEventListener('input', () => {
  const countryName = countryNameInput.value.trim();
  if (countryName.length > 2) {
    fetchCountryData(countryName);
  } else {
    countryContainer.innerHTML = ''; 
  }
});
