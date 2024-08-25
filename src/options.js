const save_options = async () => {
  const page = document.getElementById("page").value;
  const append = document.getElementById("append").value;

  try {
    await chrome.storage.sync.set({ page, append });
    // Update status to let user know options were saved.
    const saveButton = document.getElementById("save");
    const originalText = saveButton.textContent;
    saveButton.textContent = "Options Saved!";
    saveButton.disabled = true;
    setTimeout(() => {
      saveButton.textContent = originalText;
      saveButton.disabled = false;
    }, 750);
  } catch (error) {
    console.error("Error saving options:", error);
  }
};

const restore_options = async () => {
  const defaultOptions = {
    page: "TODAY",
    append: "true",
  };

  try {
    const items = await chrome.storage.sync.get(defaultOptions);
    document.getElementById("page").value = items.page;
    document.getElementById("append").value = items.append;
  } catch (error) {
    console.error("Error restoring options:", error);
  }
};

document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
