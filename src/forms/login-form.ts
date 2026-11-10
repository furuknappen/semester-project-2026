import { loginUser, type LoginResponse } from "../api/authService.ts";

import { localStorageUtil } from "../utils/storageUtils.ts";

type LoginFormData = {
  email: string;
  password: string;
};

document
  .querySelector<HTMLFormElement>("#sign-in-form")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const target = e.currentTarget as HTMLFormElement;
    const formData = new FormData(target);
    const data = Object.fromEntries(formData) as unknown as LoginFormData;

    const result = await loginUser({
      email: data.email,
      password: data.password,
    });
    if (result.ok) {
      addUserInfoLocalStorage(result.value);
      window.location.href = "../index.html";
    } else {
      const errorP = document.getElementById(
        "form-error",
      ) as HTMLParagraphElement;
      errorP.classList.add("text-red-500",
    "px-2",
    "my-2",
   
    "justify-center",
    "bg-red-200",
    "rounded-xl",
    "font-sm",)
      errorP.textContent = result.error.message;
    }
  });

function addUserInfoLocalStorage(user: LoginResponse): void {
  const exsistingStorage = localStorageUtil.load<LoginResponse>("user") || {};

  const storage = { ...exsistingStorage, ...user };

  localStorageUtil.save("user", storage);
  localStorageUtil.save("accessToken", user.data.accessToken);
}


const passwordInput = document.getElementById("login-password")
const toggleButton = document.getElementById("toggle-password")

const eyeIcon = document.getElementById("eye-icon")
const ClosedEyeIcon = document.getElementById("eye-closed-icon")

if(passwordInput instanceof HTMLInputElement && toggleButton instanceof HTMLButtonElement) {
  toggleButton.addEventListener("click", () => {
    const isVisible = passwordInput.type === "text"
    passwordInput.type = isVisible ? "password" : "text";
    eyeIcon?.classList.toggle("hidden")   
    ClosedEyeIcon?.classList.toggle("hidden")

  })
}