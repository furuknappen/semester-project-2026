import type { Listing } from "../types";

const CAMERA_FALLBACK = "./public/noImageFound.jpg";

export function renderPhotoGallery(listing: Listing) {
  const gallerySection = document.getElementById(
    "gallery-section",
  ) as HTMLElement;
  console.log("rendering...", listing.media[1]);
  const media = listing.media;

  const openDialogBtn = document.getElementById("gallery-open");
  const dialog = document.getElementById("gallery-dialog");
  const fullImg = document.getElementById("gallery-full");
  const closeDialogBtn = document.getElementById("gallery-close");
  const counter = document.getElementById("gallery-counter");
  const dialogCounter = document.getElementById("gallery-dialog-counter");
  const nextImgBtn = document.getElementById("next-image-btn");
  const prevImgBtn = document.getElementById("prev-image-btn");
  const nextDialogBtn = document.getElementById("next-dialog-btn");
  const prevDialogBtn = document.getElementById("prev-dialog-btn");
  const mainImage = document.getElementById("gallery-main-image");
  const imageRow = document.getElementById("gallery-thumbs");

  if (
    !(mainImage instanceof HTMLImageElement) ||
    !(openDialogBtn instanceof HTMLButtonElement) ||
    !(dialog instanceof HTMLDialogElement) ||
    !(fullImg instanceof HTMLImageElement) ||
    !(closeDialogBtn instanceof HTMLButtonElement) ||
    !(counter instanceof HTMLParagraphElement) ||
    !(dialogCounter instanceof HTMLParagraphElement) ||
    !(imageRow instanceof HTMLUListElement)
  ) {
    gallerySection.textContent = "Gallery elements missing";
    return;
  }

  if (media.length === 0) return;

  mainImage.onerror = () => {
    mainImage.onerror = null;
    mainImage.src = CAMERA_FALLBACK;
  };

  let index = 0;
  const thumbsbuttons: HTMLButtonElement[] = [];
  // -------------

  const showImage = (newIndex: number): void => {
    index = newIndex;
    const item = media[index];
    const alt = item.alt || "No alt text provided";

    mainImage.src = item.url;
    mainImage.alt = alt;
    fullImg.src = item.url;
    fullImg.alt = alt;
    openDialogBtn.setAttribute("aria-label", `view full size: ${alt}`);

    const label = `${index + 1} of ${media.length}`;
    counter.textContent = label;
    dialogCounter.textContent = label;
    thumbsbuttons.forEach((btn, i) => {
      if (i === index) btn.setAttribute("aria-current", "true");
      else btn.removeAttribute("aria-current");
    });
  };

  imageRow.replaceChildren();

  media.forEach((item, i) => {
    const li = document.createElement("li");

    const imageBtn = document.createElement("button");
    imageBtn.type = "button";
    imageBtn.setAttribute(
      "aria-label",
      `Show image ${index + 1} of ${media.length}`,
    );
    imageBtn.classList.add("w-24");
    imageBtn.addEventListener("click", () => showImage(i));

    const image = document.createElement("img");
    image.src = item.url;
    image.alt = "";
    image.classList.add("object-cover", "aspect-9/6", "w-full", "rounded-2xl");

    imageBtn.append(image);
    li.append(imageBtn);
    imageRow?.append(li);
    thumbsbuttons.push(imageBtn);
  });

  const scrollByOne = (direction: 1 | -1): void => {
    showImage((index + direction + media.length) % media.length);
  };

  prevImgBtn?.addEventListener("click", () => {
    scrollByOne(-1);
  });

  nextImgBtn?.addEventListener("click", () => {
    scrollByOne(1);
  });

  prevDialogBtn?.addEventListener("click", () => {
    scrollByOne(-1);
  });

  nextDialogBtn?.addEventListener("click", () => {
    scrollByOne(1);
  });

  openDialogBtn.addEventListener("click", () => {
    dialog.showModal();
  });
  closeDialogBtn.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  showImage(0);

  const prevCarouselBtn = document.getElementById("carousel-prev-btn");
  const nextCarouselBtn = document.getElementById("carousel-next-btn");
  const scroller = document.getElementById("thumbs-scroller");

  if (
    scroller instanceof HTMLDivElement &&
    prevCarouselBtn instanceof HTMLButtonElement &&
    nextCarouselBtn instanceof HTMLButtonElement
  ) {
    const scrollByOne = (direction: 1 | -1): void => {
      const thumb = scroller.querySelector("li");
      const step = thumb ? thumb.offsetWidth + 16 : scroller.clientWidth;
      scroller.scrollBy({ left: direction * step, behavior: "smooth" });
    };

    prevCarouselBtn.addEventListener("click", () => scrollByOne(-1));
    nextCarouselBtn.addEventListener("click", () => scrollByOne(1));
  }

  mainImage.src = listing.media[0]?.url ?? null;
  mainImage.alt = listing.media[0]?.alt ?? "No alt-text provided";
}
