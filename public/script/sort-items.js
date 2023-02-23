function sortItems() {
// Get the container element for the items
var row = document.getElementById("row");
// Get all the items as an array
var items = Array.from(row.querySelectorAll(".item"));

// Convert items NodeList to array for sorting
var itemsArr = [];
console.log (items);
for (var i = 0; i < items.length; i++) {
  itemsArr.push(items[i]);
}
// Set different sort options
var sortOption = document.getElementById("sort").value;
if (sortOption === "price") {
// Sort the items by price, lowest to highest
items.sort(function(a, b) {
  var aPrice = parseFloat(a.querySelector(".price").textContent.slice(1));
  var bPrice = parseFloat(b.querySelector(".price").textContent.slice(1));
  return aPrice - bPrice;
});

} else if (sortOption === "title") {
    items.sort(function(a, b) {
        var aTitle = a.querySelector("h2").textContent;
        var bTitle = b.querySelector("h2").textContent;
        return aTitle.localeCompare(bTitle);
      });
    }
     // Remove items from the row and add them back in sorted order
  for (i = 0; i < itemsArr.length; i++) {
    console.log("Moving item " + itemsArr[i].getElementsByTagName("img")[0].alt + " to position " + i);
    itemsArr[i].parentNode.removeChild(itemsArr[i]);
    row.appendChild(itemsArr[i]);
  }
}