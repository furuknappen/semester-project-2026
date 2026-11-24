import type { LoginResponse } from "../api/authService";
import { renderCreateListingmodal } from "../components/renderCreateListingmodal";
import { renderUpdateProfileModal } from "../components/renderUpdateProfileModal";
import { renderYourBidsList } from "../components/renderYourBidsList";
import { renderYourListingsList } from "../components/renderYourListingsList";
import { getOneProfile } from "../hooks/getOneProfile";
import { localStorageUtil } from "../utils/storageUtils";

const urlParams = new URLSearchParams(window.location.search).get("name");
const profileName =
  urlParams ?? localStorageUtil.load<LoginResponse>("user")?.data.name ?? null;

if (profileName) {
  renderProfilePage(profileName);
} else {
  window.location.href = "../index.html";
}



async function renderProfilePage(profileName: string) {
  renderYourBidsList(profileName);
  renderYourListingsList(profileName);

  const profileImgDiv = document.getElementById(
    "profile-img",
  ) as HTMLDivElement;

  const result = await getOneProfile(profileName);
  if (result.ok) {
    const profile = result.value.data;

    const bannerContainer = document.getElementById(
      "banner-container",
    ) as HTMLDivElement;


    const bannerImg = document.createElement("img") as HTMLImageElement;
    bannerImg.classList.add("w-full", "h-full", "block", "object-cover", "md:rounded-xl");
    if (profile.banner) {
      bannerImg.src = profile.banner.url;
      bannerImg.alt = profile.banner.alt ?? "";
    }

    bannerContainer.append(bannerImg);

    const userImage = document.createElement("img") as HTMLImageElement;
    userImage.classList.add(
      "w-20",
      "aspect-square",
      "object-cover",
      "border-5",
      "border-background-light",
      "dark:border-background-dark",
      "rounded-full",
      "lg:w-28",
      "content-container"
    );

    if (profile.avatar) {
      userImage.src = profile.avatar?.url;

      userImage.alt = profile.avatar?.alt ?? "No alt-text provided";
    }
    profileImgDiv.append(userImage);

    const profileNameElement = document.getElementById(
      "profile-name",
    ) as HTMLHeadingElement;
    profileNameElement.textContent = profile.name;

    const editProfileDiv = document.getElementById("edit-profile-div")
     
    const updateProfileBtn = document.createElement("button");
    updateProfileBtn.type = "button";
    updateProfileBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415" /><path d="M16 5l3 3" /></svg>` +"Edit Profile";
    updateProfileBtn.classList.add("btn", "mx-4", "flex", "gap-2", "items-center")


    editProfileDiv?.append(updateProfileBtn)

   const descriptionSection = document.getElementById("description-section",) as HTMLElement;
    descriptionSection.classList.add("divide-y", "divide-line-light", "dark:divide-line-dark",  )
   
    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = profile.bio;
    descriptionElement.classList.add("m-4")

 
    
  const openCreateListingModal = document.createElement("button");
   openCreateListingModal.type ="button"
   openCreateListingModal.classList.add("btn", "mx-4", "flex", "gap-1", "items-center")
   openCreateListingModal.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>` + "Create listing"

   descriptionSection.append(descriptionElement,openCreateListingModal);

 

    updateProfileBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      renderUpdateProfileModal(profile);
    });
    
  openCreateListingModal?.addEventListener("click", (e) => {
  e.preventDefault();
  renderCreateListingmodal();
});

  }
}

