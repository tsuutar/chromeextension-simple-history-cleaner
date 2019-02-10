
/**
 * オプションを保存
 */
function saveOptions(){
  var sinceDay = document.getElementById('since-day-option').value;
  var removeDownloadHistory = document.getElementById('remove-downloadhistory-option').checked;
  var removeCache = document.getElementById('remove-cache-option').checked;
  var removeAppCache = document.getElementById('remove-appcache-option').checked;
  var removeCookies = document.getElementById('remove-cookies-option').checked;

  chrome.storage.local.set({
    sinceDay: parseInt(sinceDay, 10),
    removeDownloadHistory: removeDownloadHistory,
    removeCache: removeCache,
    removeAppCache: removeAppCache,
    removeCookies: removeCookies,
  });
}

/**
 * オプションを復元
 */
function restoreOptions(){
  chrome.storage.local.get({
    sinceDay: 7,
    removeDownloadHistory: false,
    removeCache: false,
    removeAppCache: false,
    removeCookies: false,
  }, function(value){
    document.getElementById('since-day-option').value = value.sinceDay;
    document.getElementById('remove-downloadhistory-option').checked = value.removeDownloadHistory;
    document.getElementById('remove-cache-option').checked = value.removeDownloadHistory;
    document.getElementById('remove-appcache-option').checked = value.removeDownloadHistory;
    document.getElementById('remove-cookies-option').checked = value.removeDownloadHistory;
  });
}

/** イベントの登録 */
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('since-day-option').addEventListener('change', saveOptions);
document.getElementById('remove-downloadhistory-option').addEventListener('change', saveOptions);
document.getElementById('remove-cache-option').addEventListener('change', saveOptions);
document.getElementById('remove-appcache-option').addEventListener('change', saveOptions);
document.getElementById('remove-cookies-option').addEventListener('change', saveOptions);
document.getElementById('closeBtn').addEventListener('click', function (){window.close()});
