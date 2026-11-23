import type { LoginResponse } from "../api/authService";
import { createModal } from "../components/modal";
import { renderBidHistory } from "../components/renderBidHistory";
import { renderListingDetails } from "../components/renderListingDetails";
import { renderPhotoGallery } from "../components/renderPhotoGallery";
import { renderUpdateListingModal } from "../components/updateListing";
import { deleteListing } from "../hooks/deleteListing";
import { getListingDetails } from "../hooks/getListingDetails";
import { localStorageUtil } from "../utils/storageUtils";

const urlParams = new URLSearchParams(window.location.search);
const listingId = urlParams.get("id");

// const postId = (postIdRaw);
// const postParent = document.getElementById("post-parent") as HTMLElement;

// const invalidNumber = Number.isNaN(postId);
// if (!postIdRaw || invalidNumber) {
// postParent.textContent = `Could not find post with ID ${postIdRaw}`;
// }

async function renderDetailsPage() {
  if (listingId) {
    const result = await getListingDetails(listingId);

    if (result.ok) {
      const data = result.value.data;
      renderPhotoGallery(data);
      renderListingDetails(data);
      renderBidHistory(data);

      const user = localStorageUtil.load<LoginResponse>("user")?.data.name;

      if (data.seller?.name === user) {
        const parentdiv = document.getElementById("right-side") as HTMLDivElement
        const adminSection = document.createElement("section");
        adminSection.classList.add("content-container", "p-4", "flex", "justify-around")

        const openUpdateListingModal = document.createElement("button");
        openUpdateListingModal.type = "button";
        openUpdateListingModal.classList.add("flex", "gap-1", "items-center")
        openUpdateListingModal.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415" /><path d="M16 5l3 3" /></svg>` + "Update Listing";



        const openDeleteListingModal = document.createElement("button");
        openDeleteListingModal.type = "button";
        openDeleteListingModal.classList.add("flex", "gap-1", "items-center")
        openDeleteListingModal.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>` + "Delete Listing";



        adminSection.append(openUpdateListingModal, openDeleteListingModal);
        parentdiv.prepend(adminSection);

        openUpdateListingModal?.addEventListener("click", (e) => {
          e.preventDefault();
          renderUpdateListingModal(data);
        });

        openDeleteListingModal?.addEventListener("click", (e) => {



          e.preventDefault();
          const heading = "Delete?";
        const message = `Do you want to delete this post? This is a permanent action`;
        const actionBtn = "Delete";
        createModal(heading, message, actionBtn, () => deleteListing(listingId), () => {
          window.location.href = "/js2-camilla-furuknappen-larsen/";
        });
        });



      }
    } else {
      // postParent.textContent = result.error.message;
    }
  }
}

renderDetailsPage();
