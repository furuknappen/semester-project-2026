import type { LoginResponse } from "../api/authService";
import { renderCreateListingmodal } from "../components/renderCreateListingmodal";
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

const openModal = document.getElementById("create-listing");
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
    bannerImg.classList.add("w-full", "md:h-72", "md:rounded-xl");
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
  }
}
openModal?.addEventListener("click", (e) => {
  e.preventDefault();
  renderCreateListingmodal();
});
