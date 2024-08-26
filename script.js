const SRC = "documentation.html";
let isDrawerOpen = false;
let isExpanded = false;

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleDocBtn");
  const iframe = document.getElementById("docFrame");

  function toggleDrawer() {
    isDrawerOpen = !isDrawerOpen;
    iframe.style.width = isDrawerOpen ? (isExpanded ? "100%" : "384px") : "0";
    iframe.contentWindow.postMessage(
      { type: "toggleDrawer", isOpen: isDrawerOpen },
      "*"
    );
  }

  toggleBtn.addEventListener("click", toggleDrawer);

  window.addEventListener("message", (event) => {
    if (event.origin !== window.origin) return;

    const { type, isOpen } = event.data;
    if (type === "expandToggle") {
      isExpanded = isOpen;
      if (isDrawerOpen) {
        iframe.style.width = isExpanded ? "100%" : "384px";
      }
    }
  });
});
