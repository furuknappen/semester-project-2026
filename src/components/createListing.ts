import type { Listing } from "../types";
import { sortBids } from "../utils/sortBids";
import { formatTimeLeft, startCountdown } from "../utils/timeCountDown";

export function createListing(listing: Listing, parentDiv: HTMLUListElement) {

  parentDiv.classList.add(
    "grid",
    "gap-6",
   "justify-center",
    "grid-cols-1",
    "md:grid-cols-2",
    "2xl:grid-cols-3",
    "lg:self-center",
    "mx-auto",
  );

  const listingContainer = document.createElement("li");
  listingContainer.classList.add();
  const listingDiv = document.createElement("article");
  listingDiv.classList.add("content-container", "md:max-w-80", "relative", "flex", "flex-col", "h-full" );

  const image = document.createElement("img");
  image.classList.add("object-cover", "aspect-9/6", "w-full", "rounded-t-xl");

  const cameraImg = "./public/noImageFound.jpg";
  // console.log(listing.media[0]?.url)
  image.src = listing.media[0]?.url ?? null;
  image.alt = listing.media[0]?.alt ?? "No alt-text provided";
  image.onerror = () => {
    image.onerror = null;
    image.src = cameraImg;
  };

  const textSection = document.createElement("div");
  textSection.classList.add("p-4", "flex", "flex-col", "flex-1");

  const title = document.createElement("h2");
  const anchorTag = document.createElement("a");
  //TODO: CREATE link
  anchorTag.href = "";
  anchorTag.classList.add(
    "after:absolute",
    "after:inset-0",
    "rounded-xl",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-offset-2",
  );
  title.classList.add("sub-heading", "line-clamp-2", "break-words", "pb-auto");
  title.textContent = listing.title;
  title.append(anchorTag);

  // Bids section
  const bidsIcon = `<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>`;

  const bidCount = listing._count.bids;

  const bids = document.createElement("div");
  bids.classList.add("flex", "gap-1", "items-center");
  bids.insertAdjacentHTML("afterbegin", bidsIcon);

  const bidsText = document.createElement("span");
  bidsText.textContent = `${bidCount} ${bidCount === 1 ? "bid" : "bids"}`;

  bids.append(bidsText);

  // time section
  const timeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-clock"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 7v5l3 3" /></svg>`;

  const timeLeft = document.createElement("div");
  timeLeft.classList.add("flex", "gap-1", "items-center");
  timeLeft.insertAdjacentHTML("afterbegin", timeIcon);

  const timeText = document.createElement("span");
  timeLeft.append(timeText);

  startCountdown(timeText, listing.endsAt);

  const bottomSection = document.createElement("div");
  bottomSection.classList.add("flex", "justify-between", "mt-auto");

  const leftSide = document.createElement("div");
  leftSide.classList.add("flex", "flex-col", "justify-between");
  leftSide.append(bids, timeLeft);

  const rightSide = document.createElement("div");
  rightSide.classList.add(
    "flex",
    "flex-col",
    "divide-y",
    "divide-line-light",
    "items-end",
  );

  const highestBidText = document.createElement("h3");
  highestBidText.classList.add("text-secondary-text");
  highestBidText.textContent = "Highest bid";

  const highestBidNumber = document.createElement("span");
  highestBidNumber.classList.add("text-2xl", "font-bold", "mr-2");

  if (listing.bids && listing.bids.length > 0) {
    const highest = Math.max(...listing.bids.map((bid) => bid.amount));
    highestBidNumber.textContent = `${highest},-`;
  } else {
    highestBidNumber.textContent = "No bids yet";
  }

  rightSide.append(highestBidText, highestBidNumber);
  bottomSection.append(leftSide, rightSide);
  textSection.append(title, bottomSection);
  listingDiv.append(image, textSection);
  listingContainer.append(listingDiv);
  parentDiv.append(listingContainer);
}
