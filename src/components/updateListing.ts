import {
  putUpdateListing,
  type UpdateRequest,
} from "../hooks/putUpdateListing";
import type { Listing } from "../types";
import { getMediaFormForm } from "../utils/getMediaFromForm";
import { createPhotoEntry } from "./renderCreateListingmodal";
//accessibility checked 
export function renderUpdateListingModal(listing: Listing) {
  const updateListingDialog = document.createElement("dialog");
  updateListingDialog.classList.add(
    "content-container",
    "flex",
    "flex-col",
    "p-8",
    "rounded-lg",
    "m-4",
    "w-full",
    "md:mx-auto",
    "md:my-auto",
    "md:w-120",
  );

  updateListingDialog.setAttribute("aria-labelledby", "update-listing-title");

  const dialogTitle = document.createElement("h1");
  dialogTitle.classList.add("text-3xl");
  dialogTitle.id = "update-listing-title";
  dialogTitle.textContent = "Update listing";
  const newListingForm = document.createElement("form");
  newListingForm.classList.add("flex", "flex-col", "gap-2");

  const labelTitle = document.createElement("label");
  labelTitle.classList.add("pt-8", "ml-2", "font-semibold");
  labelTitle.setAttribute("for", "listing-title");
  labelTitle.textContent = "Title";

  const listingTitle = document.createElement("input");
  listingTitle.required = true;
  listingTitle.classList.add("input-field");
  listingTitle.id = "listing-title";
  listingTitle.value = listing.title;

  const labelBody = document.createElement("label");
  labelBody.classList.add("pt-8", "ml-2", "font-semibold");
  labelBody.setAttribute("for", "listing-body");
  labelBody.textContent = "Description";
  const listingDescription = document.createElement("textarea");
  listingDescription.id = "listing-body";
  listingDescription.classList.add("input-field");
  listingDescription.value = listing.description;

  const labelTags = document.createElement("label");
  labelTags.classList.add("pt-8", "ml-2", "font-semibold");
  labelTags.setAttribute("for", "listing-tags");
  labelTags.textContent = "Tags";
  const listingTags = document.createElement("input");
  listingTags.id = "listing-tags";
  listingTags.classList.add("input-field");
  listingTags.value = listing.tags.join(" ");

  const photoSection = document.createElement("div");

  listing.media.forEach((media, i) => {
    const index = i + 1;

    const entry = document.createElement("div");
    entry.classList.add(
      "pt-8",
      "flex",
      "flex-col",
      "rounded-lg",
      "w-full",
      "md:mx-auto",
      "md:my-auto",
    );
    entry.dataset.photoIndex = String(index);

    const urlLabel = document.createElement("label");
    urlLabel.classList.add("ml-2", "font-semibold");
    urlLabel.htmlFor = `listing-image-${index}`;
    urlLabel.textContent = `Photo #${index} URL`;

    const inputDiv = document.createElement("div");
    inputDiv.classList.add("flex", "flex-row");

    const urlInput = document.createElement("input");
    urlInput.type = "url";
    urlInput.id = `listing-image-${index}`;
    urlInput.name = "images";
    urlInput.classList.add("input-field", "flex-1");
    urlInput.value = media.url ?? "";

    const altWrapper = document.createElement("div");
    altWrapper.classList.add(
      "alt-field",
      "flex",
      "flex-col",
      "rounded-lg",
      "w-full",
      "md:mx-auto",
      "md:my-auto",
    );

    altWrapper.style.display = media?.alt ? "flex" : "none";

    const altLabel = document.createElement("label");
    altLabel.classList.add("pt-2", "ml-2", "font-semibold");
    altLabel.htmlFor = `listing-alt-${index}`;
    altLabel.textContent = `Alt text for photo #${index}`;

    const altInput = document.createElement("input");
    altInput.type = "text";
    altInput.id = `listing-alt-${index}`;
    altInput.name = "alts";
    altInput.classList.add("input-field");
    altInput.value = media.alt || "";

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.classList.add("ml-2");
    removeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>`;
    removeBtn.setAttribute("aria-label", `Remove photo ${index}`);
    removeBtn.addEventListener("click", () => {
      const next = entry.nextElementSibling ?? entry.previousElementSibling;
      entry.remove();
      const nextButton = next?.querySelector<HTMLButtonElement>("button");

      if (nextButton) {
        nextButton.focus();
      } else {
        document.getElementById("add-photo-btn")?.focus();
      }
    });

    altWrapper.append(altLabel, altInput);
    inputDiv.append(urlInput, removeBtn);
    entry.append(urlLabel, inputDiv, altWrapper);
    photoSection.append(entry);
  });

  let photoCount = listing.media.length;

  const addPhotoEntry = () => {
    photoCount += 1;
    const entry = createPhotoEntry(photoCount);
    photoSection.append(entry);
    entry.querySelector<HTMLInputElement>("input")?.focus();
  };
  const addPhoto = document.createElement("button");
  addPhoto.type = "button";
  addPhoto.textContent = "Add another photo";

  const status = document.createElement("p");
  status.setAttribute("role", "status");
  status.classList.add("sr-only");

  addPhoto.addEventListener("click", () => {
    addPhotoEntry();
    status.textContent = `Photo ${photoCount} field added`;
  });

  const addAltBtn = document.createElement("button");
  addAltBtn.type = "button";
  addAltBtn.setAttribute("aria-label", "Show alt text fields for all photos");
  addAltBtn.innerHTML = `<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-accessible"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M10 16.5l2 -3l2 3m-2 -3v-2l3 -1m-6 0l3 1" /><path d="M11.5 7.5a.5 .5 0 1 0 1 0a.5 .5 0 1 0 -1 0" fill="currentColor" /></svg>`;

  addAltBtn.addEventListener("click", () => {
    photoSection
      .querySelectorAll<HTMLDivElement>(".alt-field")
      .forEach((wrapper) => {
        wrapper.style.display = "flex";
      });
    status.textContent = "alt text fields are now shown";
  });

  const infoP = document.createElement("p");
  infoP.setAttribute("role", "alert");

  infoP.classList.add("text-red-600");

  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add(
    "flex",
    "gap-16",
    "justify-center",
    "items-center",
    "mt-8",
  );

  const cancelBtn = document.createElement("button");
  cancelBtn.type = "button";
  cancelBtn.textContent = "Cancel";
  cancelBtn.classList.add("text-gray-700", "text-lg");
  cancelBtn.addEventListener("click", () => {
    updateListingDialog.close();
  });

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Save changes";
  submitBtn.classList.add(
    "text-lg",
    "px-4",
    "md:text-xl",
    "bg-primary",
    "text-light-text",
    "rounded-xl",
    "md:px-8",
    "py-2",
    "ml-8",
  );



  newListingForm.append(
    labelTitle,
    listingTitle,
    labelBody,
    listingDescription,
    labelTags,
    listingTags,
    photoSection,
    addPhoto,
    addAltBtn,
    infoP,
    buttonDiv,
    status,
  );

  updateListingDialog.append(dialogTitle, newListingForm);

  document.body.append(updateListingDialog);

  updateListingDialog.showModal();

  updateListingDialog.addEventListener("close", () => {
    updateListingDialog.remove();
  });

  newListingForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    infoP.textContent = "";

    const body: UpdateRequest = {
      title: listingTitle.value.trim(),
      description: listingDescription.value.trim(),
      tags: listingTags.value.split(/[\s,]+/).filter(Boolean),
      media: getMediaFormForm(photoSection),
    };

    const result = await putUpdateListing(listing.id, body);

    if (result.ok) {
      updateListingDialog.close();
      window.location.reload();
    } else {
      infoP.textContent = result.error.message;
    }
  });
}
