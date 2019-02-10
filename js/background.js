/**
 * ブラウジングデータの削除
 * @param {Object} options - オプション
 */
function removeBrowsingData(options){
  var callback = function () {
  };

  var milliseconds = 1000 * 60 * 60 * 24 * options.sinceDay;
  var sinceTime = (new Date()).getTime() - milliseconds;

  chrome.browsingData.remove({
    "since": sinceTime
  }, {
    "appcache": options.removeAppCache,
    "cache": options.removeCache,
    "cacheStorage": options.removeCacheStorage,
    "cookies": options.removeCookies,
    "downloads": true,
    "history": true,
  }, callback);
}

/**
 * ダウンロード履歴を削除
 * @param {Object} downloadItem - ダウンロードアイテム
 */
function removeDownloadHistory(downloadItem){
  if(typeof downloadItem.state !== 'undefined'){
    if(downloadItem.state.current === 'complete' || downloadItem.state.current === 'interrupted'){
      chrome.downloads.erase({
        limit: 1,
        id: downloadItem.id
      });
    }
  }
}

(function(){
  /**　インストール／アップデート後の処理：オプションページを開く */
  chrome.runtime.onInstalled.addListener(function(details){
    chrome.runtime.openOptionsPage();
  });

  chrome.storage.local.get({
    sinceDay: 7,
    removeDownloadHistory: false,
    removeCache: false,
    removeCacheStorage: false,
    removeAppCache: false,
    removeCookies: false,
  }, function(options){
    /** 起動時処理 */

    /** ダウンロード完了時、履歴を削除*/
    if(options.removeDownloadHistory){
      chrome.downloads.onChanged.addListener(function(downloadItem){
        removeDownloadHistory(downloadItem);
      });  
    }

    /** 履歴・キャッシュの削除 */
    removeBrowsingData(options);
  });

})();
