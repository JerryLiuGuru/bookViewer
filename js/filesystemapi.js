/*
    FileSystem Api 建立 system filesystem 的一個 temporary space，無法存取現有資料
*/

// FileSystem Api =====
function errorHandler(e) {
  var msg = '';

  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
      msg = 'QUOTA_EXCEEDED_ERR';
      break;
    case FileError.NOT_FOUND_ERR:
      msg = 'NOT_FOUND_ERR';
      break;
    case FileError.SECURITY_ERR:
      msg = 'SECURITY_ERR';
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      msg = 'INVALID_MODIFICATION_ERR';
      break;
    case FileError.INVALID_STATE_ERR:
      msg = 'INVALID_STATE_ERR';
      break;
    default:
      msg = 'Unknown Error';
      break;
  };

  console.log('Error: ' + msg);
}

function toArray(list) {
  return Array.prototype.slice.call(list || [], 0);
}

function listResults(entries) {
  // Document fragments can improve performance since they're only appended
  // to the DOM once. Only one browser reflow occurs.
  var fragment = document.createDocumentFragment();

  entries.forEach(function(entry, i) {
    var img = entry.isDirectory ? '<img src="folder-icon.gif">' :
                                  '<img src="file-icon.gif">';
    var li = document.createElement('li');
    li.innerHTML = [img, '<span>', entry.name, '</span>'].join('');
    fragment.appendChild(li);
  });

  document.querySelector('#filelist').appendChild(fragment);
}

function onInitFs(fs) {
  var dirReader = fs.root.createReader();
  var entries = [];

  console.log('Opened file system: name=' + fs.name + ", root=" + fs.root);

  // Call the reader.readEntries() until no more results are returned.
  var readEntries = function() {
     debugger;
     dirReader.readEntries (function(results) {
      if (!results.length) {
        listResults(entries.sort());
      } else {
        entries = entries.concat(toArray(results));
        readEntries();
      }
    }, errorHandler);
  };

  readEntries(); // Start reading dirs.

}
// FileSystem API =============================================