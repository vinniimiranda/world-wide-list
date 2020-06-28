import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'

interface Country {
  name: string;
  flag: string;
  capital: string;
  region: string;
  population: number;
  translations: {
    br: string;
    en: string;
    es: string;
  }
}

function App () {
  const regions = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Polar'
  ]
  const languages = [
    'br',
    'de',
    'es',
    'fr'
  ]

  const infos = {
    br: {
      capital: 'Capital',
      region: 'Região',
      population: 'População'
    },
    de: {
      capital: 'Hauptstadt',
      region: 'Region',
      population: 'Population'
    },
    es: {
      capital: 'Capital',
      region: 'Región',
      population: 'Población'
    },
    fr: {
      capital: 'Capitale',
      region: 'Región',
      population: 'Population'
    }
  }

  const [countries, setCountries] = useState<Country[]>([])
  const [selectedRegions, setSelectedRegions] = useState<String[]>(regions)
  const [search, setSearch] = useState('')
  const [selectedLang, setSelectedLang] = useState('br')

  async function getAllCountries () {
    const { data } = await axios.get("https://restcountries.eu/rest/v2/all")
    setCountries(data)
  }

  function handleRegionSelect (region: string) {
    if (selectedRegions.includes(region)) {
      setSelectedRegions(selectedRegions.filter(r => r !== region))
    } else {
      setSelectedRegions([...selectedRegions, region])
    }
  }

  useEffect(() => {
    getAllCountries()
  }, [])

  useEffect(() => {
    console.log(selectedRegions)
  }, [selectedRegions])

  return (
    <div className="App">
      <header className="App-header">

        <div className="container">
          <div className="languages">
            {languages.map(lang => (
              <span
                className={selectedLang === lang ? "lang selected-lang" : "lang"}
                onClick={() => setSelectedLang(lang)}
                key={lang}>{lang}
              </span>
            ))}
          </div>
          <div className="filters">
            <div className="search">
              <input
                type="text"
                className="search-input"
                placeholder="Pesquisar"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="regions">
              {regions.map(region => (
                <div
                  key={region}
                  className={selectedRegions.includes(region) ? "region-card selected" : "region-card"}
                  onClick={() => handleRegionSelect(region)}
                >
                  {region}
                </div>
              ))}

            </div>
          </div>

          <div className="grid">
            {countries
              .filter(country => country.name.toLocaleLowerCase()
                .match(search.toLocaleLowerCase()))
              .filter(country => selectedRegions.includes(country.region))
              .map(country => (
                <div className="card" key={country.name}>
                  <div className="country" >
                    <img className="flag" src={country.flag} alt={country.name} />
                    <span className="name">{country.translations[selectedLang]}</span>
                    <span className="capital">{infos[selectedLang].capital}: {country.capital}</span>
                    <span className="region">{infos[selectedLang].region}: {country.region}</span>
                    <span className="population">{infos[selectedLang].population}: {country.population.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
