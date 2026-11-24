import type { Listing } from "../types";
import { startCountdown } from "../utils/timeCountDown";

//accessibility checked
export function createListing(listing: Listing, parentDiv: HTMLUListElement): () => void {

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
  const listingDiv = document.createElement("article");
  listingDiv.classList.add("content-container", "md:max-w-80", "relative", "flex", "flex-col", "h-full" );

  const image = document.createElement("img");
  image.classList.add("object-cover", "aspect-9/6", "w-full", "rounded-t-xl");

  const cameraImg = "./public/noImageFound.jpg";
  const imageUrl = listing.media[0]?.url;
  image.src = imageUrl ? imageUrl : cameraImg
  image.alt = listing.media[0]?.alt ?? "";
  image.onerror = () => {
    image.onerror = null;
    image.src = cameraImg;
    image.alt = "No image available"
  };

  const textSection = document.createElement("div");
  textSection.classList.add("p-4", "flex", "flex-col", "flex-1");

  const title = document.createElement("h2");
    title.classList.add("sub-heading", "line-clamp-2", "break-words");

  const anchorTag = document.createElement("a");
  anchorTag.href = `./pages/listingDetailsPage.html?id=${listing.id}` 
   anchorTag.textContent = listing.title;
  anchorTag.classList.add(
    "after:absolute",
    "after:inset-0",
    "rounded-xl",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-offset-2",
  );

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
  const timeIcon = `<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-clock"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 7v5l3 3" /></svg>`;

  const timeLeft = document.createElement("div");
  timeLeft.classList.add("flex", "gap-1", "items-center");
  timeLeft.insertAdjacentHTML("afterbegin", timeIcon);

  const timeLabel = document.createElement("span");
  timeLabel.classList.add("sr-only")
  timeLabel.textContent = "Time left:"

  const timeText = document.createElement("span");
  timeLeft.append(timeText);

  const stopCountdown = startCountdown(timeText, listing.endsAt);

  const bottomSection = document.createElement("div");
  bottomSection.classList.add("flex", "justify-between", "mt-auto");

  const leftSide = document.createElement("div");
  leftSide.classList.add("flex", "flex-col", "justify-between");
  leftSide.append(bids, timeLeft);

  const rightSide = document.createElement("dl");
  rightSide.classList.add(
    "flex",
    "flex-col",
    "divide-y",
    "divide-line-light",
    "items-end",
  );

  const highestBidText = document.createElement("dt");
  highestBidText.classList.add("text-secondary-text-dark", "dark:text-secondary-text-light");
  highestBidText.textContent = "Highest bid";

  const highestBidNumber = document.createElement("dd");
  highestBidNumber.classList.add("text-2xl", "font-bold", "mr-2");

  if (listing.bids && listing.bids.length > 0) {
    const highest = Math.max(...listing.bids.map((bid) => bid.amount));
    highestBidNumber.textContent = `${new Intl.NumberFormat("nb-NO").format(highest)},-`;
  } else {
    highestBidNumber.textContent = "No bids yet";
  }

  rightSide.append(highestBidText, highestBidNumber);
  bottomSection.append(leftSide, rightSide);
  textSection.append(title, bottomSection);
  listingDiv.append(image, textSection);
  listingContainer.append(listingDiv);
  parentDiv.append(listingContainer);
  return stopCountdown
}
