import type { Listing } from "../types";
import { sortBids } from "../utils/sortBids";

export function renderBidHistory(listing: Listing) {
  const table = document.getElementById(
    "bid-history-table",
  ) as HTMLTableElement;
  if (!table || !listing.bids) return;

  const caption = document.createElement("caption");
  caption.textContent = "Bid History";
  caption.classList.add("sub-heading", "text-2xl", "text-left", "ml-4");


  const thead = document.createElement("thead");

  const headingsArray = ["Bidder", "Date", "Bid amount"];
  const headingRow = document.createElement("tr");

  headingsArray.forEach((heading) => {
    const tableHeading = document.createElement("th");
    tableHeading.textContent = heading;
    tableHeading.classList.add(
      "px-4",
      "py-2",
      "text-left",
      "font-semibold",
      "border-b-2",
      "border-gray-300",
    );
    headingRow.append(tableHeading);
  });
  thead.append(headingRow);
  const bids = listing.bids;

  const sortedBids = sortBids(bids, "amount")
  console.log(sortedBids)
  const tbody = document.createElement("tbody");

  sortedBids.forEach((bid) => {
    const infoRow = document.createElement("tr");
    infoRow.classList.add();

    const bidderInfo = document.createElement("td");
    bidderInfo.textContent = bid.bidder.name;

    const dateInfo = document.createElement("td");
    dateInfo.textContent = new Date(bid.created).toLocaleString();

    const amountInfo = document.createElement("td");
    amountInfo.textContent = String(bid.amount);
    amountInfo.classList.add("text-right");
    infoRow.append(bidderInfo, dateInfo, amountInfo);

    const cells= Array.from(infoRow.cells);
    cells.forEach((cell) => {
      cell.classList.add("px-4", "py-2")
    });
    thead.append(infoRow);
  });

  table.replaceChildren(caption, thead, tbody);
}
