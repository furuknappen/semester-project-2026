import type { Listing } from "../types";
import { startCountdown } from "../utils/timeCountDown";

export function renderListingDetails(listing: Listing) {
  
  const ping = document.getElementById("ping")
  const countdown = document.getElementById(
    "countdown-timer",
  ) as HTMLSpanElement;
  startCountdown(countdown, listing.endsAt,
    () =>  {ping?.classList.add("hidden"); countdown.classList.add("text-red-700")}
  );


  const highestBidNumber = document.getElementById("highest-bid") as HTMLElement

  if (listing.bids && listing.bids.length > 0) {
    const highest = Math.max(...listing.bids.map((bid) => bid.amount));
    highestBidNumber.textContent = `${highest},-`;
  } else {
    highestBidNumber.textContent = "No bids yet";
  }

  const endsAtEL = document.getElementById("ends-at") as HTMLElement;
  endsAtEL.textContent = new Date(listing.endsAt).toLocaleString();


  const createdAtEL = document.getElementById("created-at") as HTMLElement;
  createdAtEL.textContent = new Date(listing.created).toLocaleString();

  const bidsAmount = document.getElementById("bids-amount") as HTMLElement;
  bidsAmount.textContent = String(listing._count.bids);

  const seller = document.getElementById("seller") as HTMLElement;
  if (listing.seller?.name) {
    seller.textContent = listing.seller?.name;
  }

  const id = document.getElementById("sale-id") as HTMLElement;
  id.textContent = listing.id;
  const description = document.getElementById("description") as HTMLElement;

  description.textContent = listing.description;

  const updated = document.getElementById("updated") as HTMLElement;

  updated.textContent = new Date(listing.updated).toLocaleString();
  const title = document.getElementById("title") as HTMLElement;
  title.textContent = listing.title;

  const contact = document.getElementById("contact") as HTMLElement;
   if (listing.seller?.email) {
    contact.textContent = listing.seller?.email
  }
 

}
