//Load the service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js");
  });
}

//Test for http 200 of file to confirm connectivity
function runFetch() {
  const not_connected = '<span class="red">No connectivity.</span>';

  fetch("fetch.php").then(function(response) {
    if (response.status !== 200) {
      document.getElementById("container").innerHTML = not_connected;
      return;
    }
  });
}
