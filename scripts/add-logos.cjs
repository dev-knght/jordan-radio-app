const path = require('path');
const fs = require('fs');

const stationsPath = path.join(__dirname, '..', 'src', 'data', 'stations.json');
const stations = JSON.parse(fs.readFileSync(stationsPath, 'utf8'));

const logoMap = {
  'Mood FM 92': 'https://www.google.com/s2/favicons?domain=mood.fm&sz=64',
  'Beat FM': 'https://www.google.com/s2/favicons?domain=mybeat.fm&sz=64',
  'Melody Jordan 91.1 FM': 'https://www.google.com/s2/favicons?domain=melody-fm.com&sz=64',
  'QuranGO - Mohammed Ayyub': 'https://www.google.com/s2/favicons?domain=qurango.net&sz=64',
  'QuranGO - Mukhtasar Tafsir': 'https://www.google.com/s2/favicons?domain=qurango.net&sz=64',
  'QuranGO - Tafseer Ibn Uthaymeen': 'https://www.google.com/s2/favicons?domain=qurango.net&sz=64',
  'Radio Dahab': 'https://www.google.com/s2/favicons?domain=radiodahab.com&sz=64',
  'Husna FM': 'https://www.google.com/s2/favicons?domain=husna.fm&sz=64',
  'Bliss FM': 'https://www.google.com/s2/favicons?domain=bliss.jo&sz=64',
  'Ain FM': 'https://www.google.com/s2/favicons?domain=radio.ainfm.site&sz=64',
  'Hala FM': 'https://www.google.com/s2/favicons?domain=hala.jo&sz=64',
  'Radio Jordan 96.3': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Jordan_Radio_Logo.svg/200px-Jordan_Radio_Logo.svg.png'
};

const updated = stations.map(s => {
  if (logoMap[s.name]) {
    return { ...s, logo: logoMap[s.name] };
  }
  return s;
});

fs.writeFileSync(stationsPath, JSON.stringify(updated, null, 2) + '\n');
console.log('Updated logos for:', Object.keys(logoMap));
