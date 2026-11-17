import { renderBidHistory } from "../components/renderBidHistory";
import { renderListingDetails } from "../components/renderListingDetails";
import { renderPhotoGallery } from "../components/renderPhotoGallery";
import { getListingDetails } from "../hooks/getListingDetails";


const urlParams = new URLSearchParams(window.location.search);
const listingId = urlParams.get("id");

// const postId = (postIdRaw);
// const postParent = document.getElementById("post-parent") as HTMLElement;

// const invalidNumber = Number.isNaN(postId);
// if (!postIdRaw || invalidNumber) {
  // postParent.textContent = `Could not find post with ID ${postIdRaw}`;
// }

if (listingId ) {
  console.log("listing page")
  const result = await getListingDetails(listingId);

  if (result.ok) {
    console.log(result)
    renderPhotoGallery(result.value.data);
    renderListingDetails(result.value.data)
    renderBidHistory(result.value.data)
    

  } else {
    // postParent.textContent = result.error.message;
  }
}