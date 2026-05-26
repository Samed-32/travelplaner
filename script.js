const imageApiKey = "FrxgG00936WZmS3lrUoh0C2bb3uycZwUlhL0k7GQzL8";


const THEME_CONFIG = {
  default:   { logo:"✈", title:"Travel<span>Planner</span>", tagline:"Explore the world, one city at a time" },
  trollface: { logo:"?", title:"El Teach — Check Your <span>Email</span>", tagline:"Problem?" },
  loji:      { logo:"TFR", title:"Loji<span>Maps</span>", tagline:"Long March terminal online" },
  samed32:   { logo:">", title:"samed<span>32.exe</span>", tagline:"// AI-assisted navigation system online" },
  retro:     { logo:">_", title:"DOS<span>TRAVEL</span>", tagline:"C:\\> EXPLORE THE WORLD" },
  luxury:    { logo:"♦", title:"Prestige<span>Travel</span>", tagline:"First class destinations" }
};


const searchBtn       = document.getElementById("searchBtn");
const cityInput       = document.getElementById("cityInput");
const btnText         = document.querySelector(".btn-text");
const btnLoader       = document.querySelector(".btn-loader");
const cityName        = document.getElementById("cityName");
const countryCode     = document.getElementById("countryCode");
const citySubtitle    = document.getElementById("citySubtitle");
const tempEl          = document.getElementById("temp");
const weatherEl       = document.getElementById("weather");
const weatherIcon     = document.getElementById("weatherIcon");
const windEl          = document.getElementById("wind");
const distanceEl      = document.getElementById("distance");
const flightCostEl    = document.getElementById("flightCost");
const costCard        = document.getElementById("costCard");
const cityImage       = document.getElementById("cityImage");
const imagePlaceholder= document.getElementById("imagePlaceholder");
const imageOverlay    = document.getElementById("imageOverlay");
const overlayWeather  = document.getElementById("overlayWeather");	
const cityInfo        = document.getElementById("cityInfo");
const mapFrame        = document.getElementById("mapFrame");
const saveBtn         = document.getElementById("saveBtn");
const saveIcon        = document.getElementById("saveIcon");
const savedGrid       = document.getElementById("savedGrid");
const savedCount      = document.getElementById("savedCount");
const autocompleteDropdown = document.getElementById("autocompleteDropdown");
const bioSection      = document.getElementById("bioSection");
const bioText         = document.getElementById("bioText");
const bioCity         = document.getElementById("bioCity");
const bioLoading      = document.getElementById("bioLoading");
const gearBtn         = document.getElementById("gearBtn");
const settingsPanel   = document.getElementById("settingsPanel");
const settingsClose   = document.getElementById("settingsClose");
const themeBtns       = document.querySelectorAll(".theme-btn");
const modeBtns        = document.querySelectorAll(".mode-btn");
const homeCityInput   = document.getElementById("homeCityInput");
const saveHomeCityBtn = document.getElementById("saveHomeCity");
const homeCityNote    = document.getElementById("homeCityNote");
const siteTitle       = document.getElementById("siteTitle");
const siteTagline     = document.getElementById("siteTagline");
const siteLogo        = document.getElementById("siteLogo");


let homeCity = JSON.parse(localStorage.getItem("travelHomeCity")) || { name:"Borås", lat:57.7211, lon:13.0503 };

function updateHomeCityDisplay() {
  homeCityInput.value = homeCity.name;
  homeCityNote.textContent = `📍 Distances from ${homeCity.name}`;
}
updateHomeCityDisplay();

saveHomeCityBtn.addEventListener("click", async () => {
  const val = homeCityInput.value.trim();
  if (!val) return;
  homeCityNote.textContent = "Searching...";
  try {
    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(val)}&count=1&language=en&format=json`);
    const data = await res.json();
    if (data.results && data.results[0]) {
      homeCity = { name: data.results[0].name, lat: data.results[0].latitude, lon: data.results[0].longitude };
      localStorage.setItem("travelHomeCity", JSON.stringify(homeCity));
      homeCityNote.textContent = `✅ Set to ${homeCity.name} (${homeCity.lat.toFixed(2)}, ${homeCity.lon.toFixed(2)})`;
    } else {
      homeCityNote.textContent = " City not found";
    }
  } catch { homeCityNote.textContent = " Error"; }
});

gearBtn.addEventListener("click", () => { settingsPanel.classList.toggle("open"); });
settingsClose.addEventListener("click", () => { settingsPanel.classList.remove("open"); });
document.addEventListener("click", (e) => {
  if (!settingsPanel.contains(e.target) && e.target !== gearBtn) settingsPanel.classList.remove("open");
});

let savedTheme = localStorage.getItem("travelTheme") || "default";
let savedMode  = localStorage.getItem("travelMode") || "dark";
applyTheme(savedTheme);
applyMode(savedMode);

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("travelTheme", theme);
  themeBtns.forEach(b => b.classList.toggle("active", b.dataset.theme === theme));
  const cfg = THEME_CONFIG[theme] || THEME_CONFIG.default;
  siteLogo.textContent = cfg.logo;
  siteTitle.innerHTML = cfg.title;
  siteTagline.textContent = cfg.tagline;
}

function applyMode(mode) {
  document.documentElement.setAttribute("data-mode", mode);
  localStorage.setItem("travelMode", mode);
  modeBtns.forEach(b => b.classList.toggle("active", b.dataset.mode === mode));
}

themeBtns.forEach(btn => btn.addEventListener("click", () => applyTheme(btn.dataset.theme)));
modeBtns.forEach(btn => btn.addEventListener("click", () => applyMode(btn.dataset.mode)));

const COUNTRY_CODES = {
  "SE":"🇸🇪","US":"🇺🇸","GB":"🇬🇧","DE":"🇩🇪","FR":"🇫🇷","ES":"🇪🇸","IT":"🇮🇹",
  "JP":"🇯🇵","CN":"🇨🇳","AU":"🇦🇺","BR":"🇧🇷","CA":"🇨🇦","NO":"🇳🇴","DK":"🇩🇰",
  "FI":"🇫🇮","NL":"🇳🇱","PL":"🇵🇱","TR":"🇹🇷","RU":"🇷🇺","IN":"🇮🇳","MX":"🇲🇽",
  "AR":"🇦🇷","ZA":"🇿🇦","NG":"🇳🇬","EG":"🇪🇬","BA":"🇧🇦","HR":"🇭🇷","RS":"🇷🇸",
  "AT":"🇦🇹","CH":"🇨🇭","BE":"🇧🇪","PT":"🇵🇹","GR":"🇬🇷","CZ":"🇨🇿","HU":"🇭🇺",
  "RO":"🇷🇴","UA":"🇺🇦","NZ":"🇳🇿","TH":"🇹🇭","KR":"🇰🇷","SG":"🇸🇬","AE":"🇦🇪",
  "SA":"🇸🇦","IL":"🇮🇱","PK":"🇵🇰","ID":"🇮🇩","MY":"🇲🇾","PH":"🇵🇭","VN":"🇻🇳",
  "MA":"🇲🇦","KE":"🇰🇪","GH":"🇬🇭","TZ":"🇹🇿","ET":"🇪🇹","CO":"🇨🇴","CL":"🇨🇱",
  "PE":"🇵🇪","VE":"🇻🇪","EC":"🇪🇨","SK":"🇸🇰","BG":"🇧🇬","LT":"🇱🇹","LV":"🇱🇻",
  "EE":"🇪🇪","SI":"🇸🇮","MK":"🇲🇰","AL":"🇦🇱","ME":"🇲🇪","LU":"🇱🇺","IS":"🇮🇸",
  "IE":"🇮🇪","MT":"🇲🇹","CY":"🇨🇾","GE":"🇬🇪","AM":"🇦🇲","AZ":"🇦🇿","KZ":"🇰🇿",
  "AF":"🇦🇫","IQ":"🇮🇶","IR":"🇮🇷","SY":"🇸🇾","JO":"🇯🇴","LB":"🇱🇧","KW":"🇰🇼",
  "QA":"🇶🇦","BH":"🇧🇭","OM":"🇴🇲","YE":"🇾🇪","LY":"🇱🇾","TN":"🇹🇳","DZ":"🇩🇿",
  "SD":"🇸🇩","UG":"🇺🇬","RW":"🇷🇼","ZM":"🇿🇲","ZW":"🇿🇼","MZ":"🇲🇿","BW":"🇧🇼",
  "SN":"🇸🇳","CM":"🇨🇲","CI":"🇨🇮","AO":"🇦🇴","HK":"🇭🇰","TW":"🇹🇼","MM":"🇲🇲",
  "KH":"🇰🇭","BD":"🇧🇩","LK":"🇱🇰","NP":"🇳🇵","MN":"🇲🇳","CU":"🇨🇺","DO":"🇩🇴",
  "GT":"🇬🇹","HN":"🇭🇳","CR":"🇨🇷","PA":"🇵🇦","BO":"🇧🇴","PY":"🇵🇾","UY":"🇺🇾"
};

function getFlag(cc) { return COUNTRY_CODES[cc] || "🌐"; }

function getWeatherInfo(code) {
  if (code === 0) return { text:"Clear Sky",   icon:"☀️" };
  if (code <= 2)  return { text:"Partly Cloudy",icon:"⛅" };
  if (code === 3) return { text:"Overcast",    icon:"☁️" };
  if (code <= 48) return { text:"Fog",         icon:"🌫️" };
  if (code <= 55) return { text:"Drizzle",     icon:"🌦️" };
  if (code <= 67) return { text:"Rain",        icon:"🌧️" };
  if (code <= 77) return { text:"Snow",        icon:"❄️" };
  if (code <= 82) return { text:"Showers",     icon:"🌨️" };
  if (code <= 99) return { text:"Storm",       icon:"⛈️" };
  return { text:"Unknown", icon:"🌡️" };
}

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371, dLat = (lat2-lat1)*Math.PI/180, dLon = (lon2-lon1)*Math.PI/180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
}

function estimateFlight(distKm) {
  const base = 800;
  const perKm = distKm < 500 ? 2.2 : distKm < 2000 ? 1.4 : distKm < 5000 ? 0.9 : 0.65;
  const est = Math.round((base + distKm * perKm) / 100) * 100;
  return est.toLocaleString("sv-SE");
}

let acResults = [], acIndex = -1, acTimeout = null;
let currentCityData = null;

cityInput.addEventListener("input", () => {
  clearTimeout(acTimeout);
  const val = cityInput.value.trim();
  if (val.length < 2) { closeDropdown(); return; }
  acTimeout = setTimeout(() => fetchAutocomplete(val), 240);
});

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") { acIndex = Math.min(acIndex+1, acResults.length-1); renderDropdown(); e.preventDefault(); }
  else if (e.key === "ArrowUp") { acIndex = Math.max(acIndex-1, -1); renderDropdown(); e.preventDefault(); }
  else if (e.key === "Enter") { acIndex >= 0 && acResults[acIndex] ? selectCity(acResults[acIndex]) : searchBtn.click(); }
  else if (e.key === "Escape") closeDropdown();
});

document.addEventListener("click", (e) => { if (!e.target.closest(".search-wrapper")) closeDropdown(); });

async function fetchAutocomplete(query) {
  try {
    const res  = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=6&language=en&format=json`);
    const data = await res.json();
    acResults  = data.results || [];
    acIndex    = -1;
    if (!acResults.length) { closeDropdown(); return; }

    const wPromises = acResults.map(r =>
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${r.latitude}&longitude=${r.longitude}&current=weather_code`)
        .then(r => r.json()).catch(() => null)
    );
    const wData = await Promise.all(wPromises);
    acResults = acResults.map((r, i) => ({
      ...r,
      weatherCode: wData[i]?.current?.weather_code ?? null,
      distance: haversine(homeCity.lat, homeCity.lon, r.latitude, r.longitude)
    }));
    renderDropdown();
  } catch { closeDropdown(); }
}

function renderDropdown() {
  if (!acResults.length) { closeDropdown(); return; }
  autocompleteDropdown.innerHTML = acResults.map((r, i) => {
    const wInfo = r.weatherCode !== null ? getWeatherInfo(r.weatherCode) : null;
    const cc = r.country_code || "";
    const active = i === acIndex ? "active" : "";
    return `<div class="ac-item ${active}" data-index="${i}">
      <span class="ac-flag">${getFlag(cc)}</span>
      <div style="flex:1"><div class="ac-name">${r.name}</div><div class="ac-sub">${r.admin1 ? r.admin1+", ":""}${r.country||""}</div></div>
      <span class="ac-country-code">${cc}</span>
      ${wInfo ? `<span class="ac-weather-icon">${wInfo.icon}</span>` : ""}
      <span class="ac-distance">${r.distance?.toLocaleString()} km</span>
    </div>`;
  }).join("");
  autocompleteDropdown.querySelectorAll(".ac-item").forEach(el => {
    el.addEventListener("mousedown", e => { e.preventDefault(); selectCity(acResults[+el.dataset.index]); });
  });
  autocompleteDropdown.classList.add("open");
}

function closeDropdown() {
  autocompleteDropdown.classList.remove("open");
  autocompleteDropdown.innerHTML = "";
  acResults = []; acIndex = -1;
}

function selectCity(result) { cityInput.value = result.name; closeDropdown(); loadCity(result); }

searchBtn.addEventListener("click", () => {
  const val = cityInput.value.trim();
  if (!val) { alert("Please enter a city"); return; }
  if (acResults.length > 0) { selectCity(acResults[0]); return; }
  fetchAndLoadCity(val);
});

async function fetchAndLoadCity(city) {
  setLoading(true);
  try {
    const res  = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
    const data = await res.json();
    if (!data.results?.[0]) { showNotFound(city); setLoading(false); return; }
    await loadCity(data.results[0]);
  } catch { alert("Error fetching city."); }
  setLoading(false);
}

async function loadCity(result) {
  setLoading(true);
  closeDropdown();

  const { latitude, longitude, name, country, country_code, admin1 } = result;
  const cc   = country_code || "";
  const dist = haversine(homeCity.lat, homeCity.lon, latitude, longitude);

  imagePlaceholder.style.display = "none";
  cityImage.style.display = "none";
  imageOverlay.style.display = "none";
  cityInfo.style.display = "none";
  bioSection.style.display = "none";

  const [weatherData, imageUrl] = await Promise.all([
    fetchWeather(latitude, longitude),
    fetchImage(name)
  ]);

  if (!weatherData) { showNotFound(name); setLoading(false); return; }

  const wCode  = weatherData.current.weather_code;
  const wInfo  = getWeatherInfo(wCode);
  const tempVal = weatherData.current.temperature_2m;
  const windVal = weatherData.current.wind_speed_10m;

  cityName.textContent     = name;
  countryCode.textContent  = `${getFlag(cc)} ${cc}`;
  citySubtitle.textContent = `${admin1 ? admin1+" · ":""}${country||""}`;
  tempEl.textContent       = tempVal;
  weatherEl.textContent    = wInfo.text;
  weatherIcon.textContent  = wInfo.icon;
  windEl.textContent       = windVal;
  distanceEl.textContent   = `${dist.toLocaleString()} km`;

  const flightEst = estimateFlight(dist);
  flightCostEl.textContent = `~${flightEst} SEK`;
  costCard.style.display   = "block";

  if (imageUrl) {
    cityImage.style.display = "block";
    cityImage.style.opacity = "0";
    cityImage.src = imageUrl;
    cityImage.onload = () => { cityImage.style.opacity = "1"; };
    imageOverlay.style.display = "block";
    overlayWeather.innerHTML = `
      <span class="overlay-chip">${wInfo.icon} ${wInfo.text}</span>
      <span class="overlay-chip">🌡 ${tempVal}°C</span>
      <span class="overlay-chip">💨 ${windVal} km/h</span>`;
  } else {
    imagePlaceholder.style.display = "flex";
    imagePlaceholder.innerHTML = `<div class="placeholder-icon">🌍</div><p>${name}</p>`;
  }

  mapFrame.src = `https://maps.google.com/maps?q=${latitude},${longitude}&z=10&output=embed`;
  cityInfo.style.display = "block";

  currentCityData = { name, country, country_code:cc, latitude, longitude, dist, imageUrl, wInfo, temp:tempVal };
  updateSaveButton();
  setLoading(false);

  loadBio(name, country);
}

async function loadBio(city, country) {
  bioSection.style.display = "block";
  bioCity.textContent = city;
  bioText.textContent = "";
  bioLoading.style.display = "inline-flex";

  try {
    const searchRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(city)}`);
    if (!searchRes.ok) throw new Error("Not found");
    const data = await searchRes.json();
    bioText.textContent = data.extract || `No information found for ${city}.`;
  } catch {
    bioText.textContent = `Could not load information for ${city}.`;
  }
  bioLoading.style.display = "none";
}

async function fetchWeather(lat, lon) {
  try {
    const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,weather_code`);
    return await r.json();
  } catch { return null; }
}

async function fetchImage(city) {
  try {
    const r = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${encodeURIComponent(city)}&client_id=${imageApiKey}`);
    const d = await r.json();
    return d.results?.[0]?.urls?.regular || null;
  } catch { return null; }
}

function showNotFound(city) {
  imagePlaceholder.style.display = "flex";
  imagePlaceholder.innerHTML = `<div class="not-found-msg"><div class="nf-icon">🔍</div><p>No city named "<strong>${city}</strong>" was found.<br>Try a different search.</p></div>`;
  cityImage.style.display = "none";
  imageOverlay.style.display = "none";
  cityInfo.style.display = "none";
  currentCityData = null;
}

function setLoading(on) {
  searchBtn.disabled = on;
  btnText.style.display = on ? "none" : "inline";
  btnLoader.style.display = on ? "inline" : "none";
}

saveBtn.addEventListener("click", () => {
  if (!currentCityData) return;
  let saved = getSaved();
  const key = currentCityData.name.toLowerCase();
  const exists = saved.find(c => c.name.toLowerCase() === key);
  if (exists) saved = saved.filter(c => c.name.toLowerCase() !== key);
  else saved.push(currentCityData);
  localStorage.setItem("travelCities", JSON.stringify(saved));
  updateSaveButton();
  renderSavedGrid();
});

function updateSaveButton() {
  if (!currentCityData) return;
  const isSaved = getSaved().some(c => c.name.toLowerCase() === currentCityData.name.toLowerCase());
  saveIcon.textContent = isSaved ? "★" : "☆";
  saveBtn.classList.toggle("saved", isSaved);
}

function getSaved() { return JSON.parse(localStorage.getItem("travelCities")) || []; }

function deleteCity(name) {
  let saved = getSaved().filter(c => c.name.toLowerCase() !== name.toLowerCase());
  localStorage.setItem("travelCities", JSON.stringify(saved));
  if (currentCityData?.name.toLowerCase() === name.toLowerCase()) updateSaveButton();
  renderSavedGrid();
}

function renderSavedGrid() {
  const saved = getSaved();
  savedCount.textContent = saved.length;
  if (!saved.length) {
    savedGrid.innerHTML = `<div class="saved-empty"><div style="font-size:2rem">🗺️</div><p>No saved destinations yet</p></div>`;
    return;
  }
  savedGrid.innerHTML = saved.map(c => {
    const flag = getFlag(c.country_code||"");
    const img  = c.imageUrl
      ? `<img class="saved-card-img" src="${c.imageUrl}" alt="${c.name}" loading="lazy" />`
      : `<div class="saved-card-img-placeholder">🌍</div>`;
    return `<div class="saved-card" data-name="${c.name}">
      ${img}
      <button class="saved-delete" onclick="event.stopPropagation();deleteCity('${c.name.replace(/'/g,"\\'")}')">✕</button>
      <div class="saved-card-body">
        <div class="saved-card-name">${c.name}</div>
        <div class="saved-card-meta">
          <span class="saved-card-country">${flag} ${c.country_code||""}</span>
          ${c.wInfo ? `<span>${c.wInfo.icon} ${c.temp||""}°C</span>` : ""}
          ${c.dist ? `<span>· ${c.dist.toLocaleString()} km</span>` : ""}
        </div>
      </div>
    </div>`;
  }).join("");

  savedGrid.querySelectorAll(".saved-card").forEach(el => {
    el.addEventListener("click", () => {
      const city = getSaved().find(c => c.name === el.dataset.name);
      if (city) {
        cityInput.value = city.name;
        loadCity({ name:city.name, country:city.country, country_code:city.country_code, latitude:city.latitude, longitude:city.longitude, admin1:"" });
        window.scrollTo({ top:0, behavior:"smooth" });
      }
    });
  });
}

renderSavedGrid();