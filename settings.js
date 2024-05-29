document.getElementById('themeSelector').addEventListener('change', function(e) {
  const theme = e.target.value;

  // Apply or remove the 'light-theme' class based on the selected theme
  if(theme === 'light') {
      document.body.classList.add('light-theme');
  } else {
      document.body.classList.remove('light-theme');
  }

  // Save the theme choice to localStorage
  localStorage.setItem('theme', theme);
});
document.addEventListener('DOMContentLoaded', function() {
  const savedTheme = localStorage.getItem('theme');

  // If a theme is saved in localStorage, apply it
  if(savedTheme) {
      if(savedTheme === 'light') {
          document.body.classList.add('light-theme');
      } else {
          document.body.classList.remove('light-theme');
      }

      // Update the dropdown selection to reflect the loaded theme
      document.getElementById('themeSelector').value = savedTheme;
  }
});

// Check if there is a saved tab data in localStorage
var tab = localStorage.getItem("tab");

if (tab) {
// If there is saved data, try to parse it
try {
  var tabData = JSON.parse(tab);
} catch {
  // If there is an error in parsing, create an empty object
  var tabData = {};
}
} else {
// If there is no saved data, create an empty object
var tabData = {};
}
// Set the title and icon fields to the values saved in tabData, if they exist
if (tabData.title) {
  document.getElementById("title").value = tabData.title;
}
if (tabData.icon) {
  document.getElementById("icon").value = tabData.icon;
}

// Default tab settings
var settingsDefaultTab = {
  title: "My Drive - Google Drive",
  icon: "/assets/img/favicons/google-drive-ico.ico",
};

// Function to set the document title
function setTitle(title = "") {
  if (title) {
    document.title = title;
  } else {
    document.title = settingsDefaultTab.title;
  }

  // Update the saved tab data with the new title
  var tab = localStorage.getItem("tab");

  if (tab) {
    // If there is saved data, try to parse it
    try {
      var tabData = JSON.parse(tab);
    } catch {
      // If there is an error in parsing, create an empty object
      var tabData = {};
    }
  } else {
    // If there is no saved data, create an empty object
    var tabData = {};
  }

  if (title) {
    // If there is a new title, update tabData
    tabData.title = title;
  } else {
    // If the title is empty, delete the title field from tabData
    delete tabData.title;
  }

  // Save the updated tab data to localStorage
  localStorage.setItem("tab", JSON.stringify(tabData));
}

// Function to set the favicon
function setFavicon(icon) {
  if (icon) {
    document.querySelector("link[rel='icon']").href = icon;
  } else {
    document.querySelector("link[rel='icon']").href = settingsDefaultTab.icon;
  }

  // Update the saved tab data with the new icon
  var tab = localStorage.getItem("tab");

  if (tab) {
    // If there is saved data, try to parse it
    try {
      var tabData = JSON.parse(tab);
    } catch {
      // If there is an error in parsing, create an empty object
      var tabData = {};
    }
  } else {
    // If there is no saved data, create an empty object
    var tabData = {};
  }

  if (icon) {
    // If there is a new icon, update tabData
    tabData.icon = icon;
  } else {
    // If the icon is empty, delete the icon field from tabData
    delete tabData.icon;
  }

  // Save the updated tab data to localStorage
  localStorage.setItem("tab", JSON.stringify(tabData));
}

function setCloak() { // applies only to premade cloaks
  var cloak = document.getElementById("premadecloaks").value; // cloak seems kind of weird when you spell it out
  switch (cloak) {
    case "search": // Google Search
      setTitle("Google");
      setFavicon("/assets/img/favicons/google.ico");
      location.reload();
      break;
    case "drive": // Google Drive
      setTitle("My Dive - Google Drive");
      setFavicon("/assets/img/favicons/google-drive-ico.ico");
      location.reload();
      break;
    case "classroom": // Google Classroom
      setTitle("Google Classroom");
      setFavicon("/assets/img/favicons/google-classroom.ico");
      location.reload();
      break;
    case "gmail": // Gmail
      setTitle("Gmail");
      setFavicon("/assets/img/favicons/gmail.ico");
      location.reload();
      break;
    case "word": // Word
      setTitle("Document.docx");
      setFavicon("/assets/img/favicons/word.ico");
      location.reload();
      break;
    case "powerpoint": // Powerpoint
      setTitle("Presentation.pptx");
      setFavicon("/assets/img/favicons/powerpoint.ico");
      location.reload();
      break;
    case "youtube": // YouTube 
      setTitle("YouTube");
      setFavicon("/assets/img/favicons/youtube.ico");
      location.reload();
      break;
    case "calendar": // Google Calendar
      setTitle("Google Calendar");
      setFavicon("/assets/img/favicons/google-calender.ico");
      location.reload();
      break;
    case "meets": // Google Meet
      setTitle("Google Meet");
      setFavicon("/assets/img/favicons/google-meet.ico");
      location.reload();
      break;
    case "canvas": // Canvas 
      setTitle("Canvas");
      setFavicon("/assets/img/favicons/canvas.ico");
      location.reload();
      break;
    case "zoom": // Zoom
      setTitle("Zoom");
      setFavicon("/assets/img/favicons/zoom.ico");
      location.reload();
      break;
    case "khan": // Khan Academy
      setTitle("Khan Academy"); 
      setFavicon("/assets/img/favicons/khan-academy.ico");
      location.reload();
      break;
  }
}

// Function to reset the tab settings to default
function resetTab() {
  document.title = settingsDefaultTab.title;
  document.querySelector("link[rel='icon']").href = settingsDefaultTab.icon;
  document.getElementById("title").value = "";
  document.getElementById("icon").value = "";
  localStorage.setItem("tab", JSON.stringify({}));
}



// Checks if a CDN is blocked by testing the README.md file
async function isBlocked(url) {
  try {
    var README = await fetch(url + '/README.md');
    var content = await README.text();
    if (content.startsWith('# 3kh0 Assets')) {
      // The CDN is not blocked
      return false;
    } else {
      // The CDN is not returning a valid response or is blocked
      return true;
    }
  } catch {
    return true;
  }
}

async function getCDN(cdns) {
  for (let cdn of cdns) {
    var blocked = await isBlocked(cdn);
    if (!blocked) {
      return cdn;
    }
  }
  return cdns[0];
}

// Define some varibles for later
const path = location.pathname;
const origin = localStorage.getItem('instance');
const cdn = localStorage.getItem('cdn');
const queryString = window.location.search;
window.history.pushState({}, '', path);
const urlParams = new URLSearchParams(queryString);
const onLoadData = urlParams.get('onload');

const base = document.createElement('base');
base.href = location.origin + path.replace(path.split('\\').pop().split('/').pop(), '');
document.head.appendChild(base);

// If we do not have the origin var, we make it
if (!origin) {
  localStorage.setItem('instance', base.href);
  location.reload();
}

// If we do not have the cdn var, we make it
if (!cdn) {
  fetch('./assets/json/cdns.json')
    .then((res) => res.json())
    .then(async (cdns) => {
      localStorage.setItem('cdn', await getCDN(cdns));
      location.reload();
    });
}

const instance = encodeURIComponent(origin.replace(location.origin, ''));

// If we have onLoadData, we run it now
window.onload = () => {
  if (onLoadData) {
    eval(onLoadData);
  }
};

// If we have any errors, we will log it
window.onerror = (e) => {
  throw new Error(e);
};

// Collect Tab Cloak data from local storage
var tab = localStorage.getItem('tab');
if (tab) {
  try {
    // Parse the data, it is in JSON
    var tabData = JSON.parse(tab);
  } catch {
    var tabData = {};
  }
} else {
  var tabData = {};
}

// Set the Tab title if the Tab cloak data is there
if (tabData.title) {
  document.title = tabData.title;
}

// Set the Tab icon if the Tab cloak data is there
if (tabData.icon) {
  document.querySelector('link[rel="icon"]').href = tabData.icon;
}

