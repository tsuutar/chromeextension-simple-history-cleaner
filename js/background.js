/**
 * ブラウジングデータの削除
 * @param {Object} options - オプション
 */
function removeBrowsingData(options) {
  var callback = function () {
    console.log("history has removed.");
  };

  var endTime = new Date().getTime() - 1000 * 60 * 60 * 24 * options.keepDay;
  chrome.history.deleteRange(
    {
      startTime: 0,
      endTime: endTime,
    },
    callback
  );

  var removalOptions = {
    since: endTime,
  };

  if (options.removeCache) removalOptions.cache = true;
  if (options.removeAppCache) removalOptions.appcache = true;
  if (options.removeCookies) removalOptions.cookies = true;

  chrome.browsingData.remove(removalOptions, callback);
}

/**
 * ダウンロード履歴を削除
 * @param {Object} downloadItem - ダウンロードアイテム
 */
function removeDownloadHistory(downloadItem) {
  if (typeof downloadItem.state !== "undefined") {
    if (
      downloadItem.state.current === "complete" ||
      downloadItem.state.current === "interrupted"
    ) {
      chrome.downloads.erase({
        id: downloadItem.id,
      });
    }
  }
}

(function () {
  /** インストール／アップデート後の処理：オプションページを開く */
  chrome.runtime.onInstalled.addListener(function (details) {
    chrome.runtime.openOptionsPage();
  });

  chrome.storage.local.get(
    {
      keepDay: 7,
      removeDownloadHistory: false,
      removeCache: false,
      removeAppCache: false,
      removeCookies: false,
    },
    function (options) {
      /** 起動時処理 */
      /** ダウンロード完了時、履歴を削除*/
      if (options.removeDownloadHistory) {
        chrome.downloads.onChanged.addListener(function (downloadItem) {
          removeDownloadHistory(downloadItem);
        });
      }

      chrome.runtime.onStartup.addListener(function () {
        /** 履歴・キャッシュの削除 */
        removeBrowsingData(options);
      });

      chrome.history.onVisited.addListener(function () {
        /** 履歴・キャッシュの削除 */
        removeBrowsingData(options);
      });

      /** 履歴・キャッシュの削除 */
      removeBrowsingData(options);
    }
  );
})();
