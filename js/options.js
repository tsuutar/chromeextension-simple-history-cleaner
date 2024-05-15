/**
 * オプションを保存
 */
function saveOptions() {
  var keepDay = document.getElementById("keep-day-option").value;
  var removeDownloadHistory = document.getElementById(
    "remove-downloadhistory-option"
  ).checked;
  var removeCache = document.getElementById("remove-cache-option").checked;
  var removeAppCache = document.getElementById(
    "remove-appcache-option"
  ).checked;
  var removeCookies = document.getElementById("remove-cookies-option").checked;

  chrome.storage.local.set({
    keepDay: parseInt(keepDay, 10),
    removeDownloadHistory: removeDownloadHistory,
    removeCache: removeCache,
    removeAppCache: removeAppCache,
    removeCookies: removeCookies,
  });
}

/**
 * オプションを復元
 */
function restoreOptions() {
  chrome.storage.local.get(
    {
      keepDay: 7,
      removeDownloadHistory: true,
      removeCache: true,
      removeAppCache: true,
      removeCookies: true,
    },
    function (value) {
      document.getElementById("keep-day-option").value = value.keepDay;
      document.getElementById("remove-downloadhistory-option").checked =
        value.removeDownloadHistory;
      document.getElementById("remove-cache-option").checked =
        value.removeCache;
      document.getElementById("remove-appcache-option").checked =
        value.removeAppCache;
      document.getElementById("remove-cookies-option").checked =
        value.removeCookies;
    }
  );
}

/** イベントの登録 */
document.addEventListener("DOMContentLoaded", restoreOptions);
document
  .getElementById("keep-day-option")
  .addEventListener("change", saveOptions);
document
  .getElementById("remove-downloadhistory-option")
  .addEventListener("change", saveOptions);
document
  .getElementById("remove-cache-option")
  .addEventListener("change", saveOptions);
document
  .getElementById("remove-appcache-option")
  .addEventListener("change", saveOptions);
document
  .getElementById("remove-cookies-option")
  .addEventListener("change", saveOptions);
document.getElementById("closeBtn").addEventListener("click", function () {
  window.close();
});
