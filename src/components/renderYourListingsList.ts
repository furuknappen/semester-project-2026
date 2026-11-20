import type { LoginResponse } from "../api/authService";
import { getAllListingsByProfile } from "../hooks/getAllListingsByProfile";
import { localStorageUtil } from "../utils/storageUtils";
import { startCountdown } from "../utils/timeCountDown";

export async function renderYourListingsList(userName: string) {
  const listingSection = document.getElementById(
    "listing-section",
  ) as HTMLElement;

  const h2 = document.createElement("h2");
  h2.classList.add("sub-heading", "mb-4");

  const result = await getAllListingsByProfile(userName);
  if (result.ok) {
    if (userName === localStorageUtil.load<LoginResponse>("user")?.data.name) {
      h2.textContent = `Listings you have bid on`;
    } else {
      h2.textContent = `Listings ${userName} have bid on`;
    }

    const ul = document.createElement("ul");
    ul.classList.add("divide-y", "divide-line-light");

    result.value.data.forEach((listing) => {
      const listElement = document.createElement("li");

      const listRow = document.createElement("a");
      listRow.classList.add("flex", "items-center", "my-1", "my-2");

      const imageDiv = document.createElement("article");
      imageDiv.classList.add("w-20", "h-full");
      const image = document.createElement("img");
      image.classList.add("object-cover", "aspect-9/6", "w-full", "rounded-md");

      const cameraImg = "./public/noImageFound.jpg";
      // console.log(listing.media[0]?.url)
      image.src = listing.media[0]?.url ?? null;
      image.alt = listing.media[0]?.alt ?? "No alt-text provided";
      image.onerror = () => {
        image.onerror = null;
        image.src = cameraImg;
      };
      imageDiv.append(image);

      const title = document.createElement("span");
      title.classList.add("line-clamp-2", "break-words", "flex-1", "m-2");
      title.textContent = listing.title;

      const timeLeft = document.createElement("span");
      startCountdown(timeLeft, listing.endsAt);

      const highestBid = document.createElement("span");
      highestBid.classList.add("w-28", "text-right");
      if (listing.bids && listing.bids.length > 0) {
        const highest = Math.max(...listing.bids.map((bid) => bid.amount));
        highestBid.textContent = `${highest},-`;
      } else {
        highestBid.textContent = "No bids yet";
      }

      listRow.append(imageDiv, title, timeLeft, highestBid);
      listElement.append(listRow);
      ul.append(listElement);
      listingSection?.append(h2, ul);
    });
  } else {
    listingSection.textContent = result.error.message;
  }
}
