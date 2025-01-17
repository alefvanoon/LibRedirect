"use strict";

let disableNitter = document.querySelector("#disable-nitter");
let disableInvidious = document.querySelector("#disable-invidious");
let disableBibliogram = document.querySelector("#disable-bibliogram");
let disableOsm = document.querySelector("#disable-osm");
let disableReddit = document.querySelector("#disable-reddit");
let disableSearchEngine = document.querySelector("#disable-searchEngine");
let disableSimplyTranslate = document.querySelector("#disable-simplyTranslate");
let disableWikipedia = document.querySelector("#disable-wikipedia");
let disableScribe = document.querySelector("#disable-scribe");

window.browser = window.browser || window.chrome;

browser.storage.sync.get(
  [
    "disableNitter",
    "disableInvidious",
    "disableBibliogram",
    "disableOsm",
    "disableReddit",
    "disableSearchEngine",
    "disableSimplyTranslate",
    "disableWikipedia",
    "disableScribe",
    "theme",
  ],
  (result) => {
    if (result.theme) document.body.classList.add(result.theme);
    disableNitter.checked = !result.disableNitter;
    disableInvidious.checked = !result.disableInvidious;
    disableBibliogram.checked = !result.disableBibliogram;
    disableOsm.checked = !result.disableOsm;
    disableReddit.checked = !result.disableReddit;
    disableSearchEngine.checked = !result.disableSearchEngine;
    disableSimplyTranslate.checked = !result.disableSimplyTranslate;
    disableWikipedia.checked = !result.disableWikipedia;
    disableScribe.checked = !result.disableScribe;
  }
);

disableNitter.addEventListener("change", (event) => {
  browser.storage.sync.set({ disableNitter: !event.target.checked });
});

disableInvidious.addEventListener("change", (event) => {
  browser.storage.sync.set({ disableInvidious: !event.target.checked });
});

disableBibliogram.addEventListener("change", (event) => {
  browser.storage.sync.set({ disableBibliogram: !event.target.checked });
});

disableOsm.addEventListener("change", (event) => {
  browser.storage.sync.set({ disableOsm: !event.target.checked });
});

disableReddit.addEventListener("change", (event) => {
  browser.storage.sync.set({ disableReddit: !event.target.checked });
});

disableSearchEngine.addEventListener("change", (event) => {
  browser.storage.sync.set({ disableSearchEngine: !event.target.checked });
});

disableSimplyTranslate.addEventListener("change", (event) => {
  browser.storage.sync.set({ disableSimplyTranslate: !event.target.checked });
});

disableWikipedia.addEventListener("change", (event) => {
  browser.storage.sync.set({ disableWikipedia: !event.target.checked });
});

disableScribe.addEventListener("change", (event) => {
  browser.storage.sync.set({ disableScribe: !event.target.checked });
});

const apiEndpoint = 'https://raw.githubusercontent.com/libredirect/instances/main/data.json';
document.querySelector("#update-instances").addEventListener("click", () => {
  let request = new XMLHttpRequest();
  request.open('GET', apiEndpoint, false);
  request.send(null);

  if (request.status === 200) {
    document.querySelector("#update-instances").innerHTML = 'gav';
    const instances = JSON.parse(request.responseText);
    const nitterRandomPool = instances.twitter.join(',');
    const invidiousRandomPool = instances.youtube.join(',');
    const bibliogramRandomPool = instances.instagram.join(',');
    browser.storage.sync.set({ nitterRandomPool, invidiousRandomPool, bibliogramRandomPool });
    document.querySelector("#update-instances").innerHTML = 'Done!';
  }
});

document.querySelector("#more-options").addEventListener("click", () => {
  browser.runtime.openOptionsPage();
});
