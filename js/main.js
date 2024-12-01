var siteNameInput = document.getElementById("bookmarkName");
var siteUrlInput = document.getElementById("siteUrl");

var bookmarksList = [];

if (localStorage.getItem("bookmarks_key") === null) {
  bookmarksList = [];
} else {
  bookmarksList = JSON.parse(localStorage.getItem("bookmarks_key"));
  displayBookmarks(bookmarksList);
}



function submit() {
  var bookmarkName = siteNameInput.value;
  var siteUrl = siteUrlInput.value;

  if (
    !bookmarkName ||
    !siteUrl ||
    (!siteUrl.startsWith("http://") && !siteUrl.startsWith("https://"))
  ) {
    alert(`Site Name or Url is not valid, Please follow the rules below :
      
      -Site name must contain at least 3 characters.
      -Site URL must be a valid one starting with http:// or https://. `);
    return;
  }


  for (var i = 0; i < bookmarksList.length; i++) {
    if (bookmarksList[i].bookmarkName === bookmarkName) {
      alert('This name already exists. Please enter a different name for the bookmark.');
      return;
    }
  }

  var bookmarks = {
    bookmarkName: bookmarkName,
    siteUrl: siteUrl,
  };

  bookmarksList.push(bookmarks);

  localStorage.setItem("bookmarks_key", JSON.stringify(bookmarksList));
  displayBookmarks(bookmarksList);
  clearInputs();
}

function displayBookmarks(bookmark) {
  var bookmarksContainer = ``;
  for (var i = 0; i < bookmark.length; i++) {
    bookmarksContainer += ` 
         
                    <tr>
                      <td class="pt-3">${i + 1}</td>
                      <td class="pt-3">${bookmark[i].bookmarkName}</td>              
                      <td>
                        <button onclick="visitSite(${i})" class="btn btn-visit" data-index="0">
                          <i class="fa-solid fa-eye pe-2"></i>Visit
                        </button>
                      </td>
                      <td>
                        <button onclick="deleteBookmark(${i})" class="btn btn-delete pe-2" data-index="0">
                          <i class="fa-solid fa-trash-can"></i>
                          Delete
                        </button>
                      </td>
                  </tr>
              
              `;
  }

  document.getElementById("tableContent").innerHTML = bookmarksContainer;
}

function deleteBookmark(index) {
  bookmarksList.splice(index, 1);

  localStorage.setItem("bookmarks_key", JSON.stringify(bookmarksList));
  displayBookmarks(bookmarksList);
}

function visitSite(index) {
  var siteUrl = bookmarksList[index].siteUrl;

  window.open(siteUrl, "_blank");


}

function clearInputs() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
}

function valedate(elm) {
  var regex = {
    bookmarkName: /^[A-Za-z]{3,}$/,
    siteUrl: /^(https?:\/\/|www\.)[A-Za-z0-9.-]+\.com$/i,
  };

  var matched = regex[elm.id].test(elm.value);

  if (matched) {
    elm.classList.remove("is-invalid");
    elm.classList.add("is-valid");
  } else {
    elm.classList.remove("is-valid");
    elm.classList.add("is-invalid");
  }
}
