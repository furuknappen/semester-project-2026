import {
  putUpdateProfile,
  type UpdateProfileRequest,
} from "../hooks/putupdateProfile";
import type { Profile } from "../types";

export async function renderUpdateProfileModal(profile: Profile) {
  const updateProfileDialog = document.createElement("dialog");
  updateProfileDialog.classList.add(
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

  updateProfileDialog.setAttribute("aria-labelledby", "update-profile-title");

  const dialogTitle = document.createElement("h1");
  dialogTitle.classList.add("text-3xl");
  dialogTitle.id = "update-profile-title";
  dialogTitle.textContent = "Update profile";
  const newListingForm = document.createElement("form");
  newListingForm.classList.add("flex", "flex-col", "gap-2");

  const labelBio = document.createElement("label");
  labelBio.classList.add("pt-8", "ml-2", "font-semibold");
  labelBio.setAttribute("for", "profile-bio");
  labelBio.textContent = "Bio";
  const profileBio = document.createElement("textarea");
  profileBio.id = "profil-bio";
  profileBio.classList.add("input-field");
  profileBio.value = profile.bio;

  // imgage and alt section
  const urlLabel = document.createElement("label");
  urlLabel.classList.add("ml-2", "font-semibold");
  urlLabel.htmlFor = `profile-img`;
  urlLabel.textContent = `Profile picture`;

  // const inputDiv = document.createElement("div");
  // inputDiv.classList.add("flex", "flex-row");

  const urlInput = document.createElement("input");
  urlInput.type = "url";
  urlInput.id = `profile-img`;
  urlInput.name = "images";
  urlInput.classList.add("input-field", "flex-1");
  urlInput.value = profile.avatar.url ?? "";

  const altLabel = document.createElement("label");
  altLabel.classList.add("pt-2", "ml-2", "font-semibold");
  altLabel.htmlFor = `profile-img-alt`;
  altLabel.textContent = `Alt text for profile picture`;

  const altInput = document.createElement("input");
  altInput.type = "text";
  altInput.id = `profile-img-alt`;
  altInput.name = "alts";
  altInput.classList.add("input-field");
  altInput.value = profile.avatar.alt ?? "";

  // banner section
  const urlBannerLabel = document.createElement("label");
  urlBannerLabel.classList.add("ml-2", "font-semibold");
  urlBannerLabel.htmlFor = `profile-img`;
  urlBannerLabel.textContent = `Banner picture`;

  // const inputDiv = document.createElement("div");
  // inputDiv.classList.add("flex", "flex-row");

  const urlBannerInput = document.createElement("input");
  urlBannerInput.type = "url";
  urlBannerInput.id = `profile-img`;
  urlBannerInput.name = "images";
  urlBannerInput.classList.add("input-field", "flex-1");
  urlBannerInput.value = profile.banner.url ?? "";

  const altBannerLabel = document.createElement("label");
  altBannerLabel.classList.add("pt-2", "ml-2", "font-semibold");
  altBannerLabel.htmlFor = `profile-img-alt`;
  altBannerLabel.textContent = `Alt text for profile picture`;

  const altBannerInput = document.createElement("input");
  altBannerInput.type = "text";
  altBannerInput.id = `profile-img-alt`;
  altBannerInput.name = "alts";
  altBannerInput.classList.add("input-field");
  altBannerInput.value = profile.banner.alt ?? "";

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
    updateProfileDialog.close();
  });

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Save changes";
  submitBtn.classList.add(
  "btn"
  );

  buttonDiv.append(cancelBtn, submitBtn);

  newListingForm.append(
    labelBio,
    profileBio,
    urlLabel,
    urlInput,
    altLabel,
    altInput,

    urlBannerLabel,
    urlBannerInput,
    altBannerLabel,
    altBannerInput,
    infoP,
    buttonDiv,
  );

  updateProfileDialog.append(dialogTitle, newListingForm);
  document.body.append(updateProfileDialog);

  updateProfileDialog.showModal();

  updateProfileDialog.addEventListener("close", () => {
    updateProfileDialog.remove();
  });

  newListingForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    infoP.textContent = "";

    const body: UpdateProfileRequest = {
      bio: profileBio.value.trim(),
      avatar: {
        url: urlInput.value.trim(),
        alt: altInput.value.trim(),
      },
      banner: {
        url: urlBannerInput.value.trim(),
        alt: altBannerInput.value.trim(),
      },
    };

    const result = await putUpdateProfile(profile.name, body);

    if (result.ok) {
      updateProfileDialog.close();
      window.location.reload();
    } else {
      infoP.textContent = result.error.message;
    }
  });
}
