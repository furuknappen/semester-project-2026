import type { LoginResponse } from "../api/authService";
import { getAllBidsByProfile } from "../hooks/getAllBidsByProfile";
import { localStorageUtil } from "../utils/storageUtils";
import { startCountdown } from "../utils/timeCountDown";

export async function renderYourBidsList(userName: string) {
  const bidSection = document.getElementById("bid-section") as HTMLElement;

  const h2 = document.createElement("h2");
  h2.classList.add("sub-heading", "mb-2");

  const result = await getAllBidsByProfile(userName);
  if (result.ok) {
    if (userName === localStorageUtil.load<LoginResponse>("user")?.data.name) {
      h2.textContent = `Listings you have bid on`;
    } else {
      h2.textContent = `Listings ${userName} have bid on`;
    }

    const ul = document.createElement("ul");
    ul.classList.add("divide-y", "divide-line-light");

    result.value.data.forEach((bid) => {
      if (!bid.listing) return;
      const listElement = document.createElement("li");

      const listRow = document.createElement("a");
      listRow.classList.add("flex", "items-center", "justify-between", "my-1");

      const imageDiv = document.createElement("article");
      imageDiv.classList.add("w-20", "h-full");
      const image = document.createElement("img");
      image.classList.add("object-cover", "aspect-9/6", "w-full", "rounded-md");

      const cameraImg = "./public/noImageFound.jpg";
      image.src = bid.listing.media[0]?.url ?? null;
      image.alt = bid.listing.media[0]?.alt ?? "No alt-text provided";
      image.onerror = () => {
        image.onerror = null;
        image.src = cameraImg;
      };
      imageDiv.append(image);
      const title = document.createElement("span");
      title.classList.add("line-clamp-2", "break-words", "flex-1", "m-2");
      title.textContent = bid.listing.title;

      const timeLeft = document.createElement("span");
      startCountdown(timeLeft, bid.listing.endsAt);

      listRow.append(imageDiv, title, timeLeft);
      listElement.append(listRow);
      ul.append(listElement);
      bidSection?.append(h2, ul);
    });
  } else {
    bidSection.textContent = result.error.message;
  }
}
