function sortItems() {
  var select = document.getElementById("sort");
  var sortValue = select.options[select.selectedIndex].value;

  var items = document.querySelectorAll(".item");
  var sortedItems = Array.prototype.slice.call(items, 0);

  sortedItems.sort(function(a, b) {
    var aVal = a.getAttribute("data-" + sortValue);
    var bVal = b.getAttribute("data-" + sortValue);

    if (sortValue === "price") {
      aVal = parseFloat(aVal);
      bVal = parseFloat(bVal);
    }

    if (aVal < bVal) {
      return -1;
    } else if (aVal > bVal) {
      return 1;
    } else {
      return 0;
    }
  });

  var row = document.getElementById("row");

  for (var i = 0; i < sortedItems.length; i++) {
    row.appendChild(sortedItems[i]);
  }
}