/**
 * Get the current URL.
 *
 * @param {function(string)} callback called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {
    var tab = tabs[0];
    var url = tab.url;

    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
}

/**
 * Change Font Color
 *
 * @param {string} color The new font color.
 */
function changeFontColor(color) {
  var script = 'document.body.style.color="' + color + '";';
  chrome.tabs.executeScript({
    code: script
  });
}

function changeBackgroundColor(color) {
  var script = 'document.body.style.backgroundColor="' + color + '";';
  chrome.tabs.executeScript({
    code: script
  });
}

document.addEventListener('DOMContentLoaded', () => {
  getCurrentTabUrl((url) => {
    var fontDropdown = document.getElementById('font-dropdown');
    var bgColorDropdown = document.getElementById('bgColor-dropdown');

    fontDropdown.addEventListener('change', () => {
      changeFontColor(fontDropdown.value);
    });
    bgColorDropdown.addEventListener('change',() => {
      changeBackgroundColor(bgColorDropdown.value);
    });
  });
});