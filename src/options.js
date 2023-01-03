// Saves options to chrome.storage
function save_options() {
  let page = document.getElementById("page").value;
  const append = document.getElementById("append").value;

  chrome.storage.sync.set(
    {
      page: page === "today" ? "TODAY" : page,
      append: append,
    },
    function () {
      // Update status to let user know options were saved.
      const status = document.getElementById("save");
      status.textContent = "Options Saved";
      setTimeout(function () {
        status.textContent = "Save";
      }, 750);
    }
  );
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get(
    {
      page: "TODAY",
      append: "true",
    },
    function (items) {
      document.getElementById("page").value = items.page;
      document.getElementById("append").value = items.append;
    }
  );
}

document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
