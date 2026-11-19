import type { Listing, Meta } from "../types";
import { type PaginatedListingsResponse } from "../hooks/getPaginatedAllListings";
// import { renderPosts } from "../pages/homepage.ts";

const prevBtn = document.getElementById("prev-btn") as HTMLButtonElement;
const nextBtn = document.getElementById("next-btn") as HTMLButtonElement;

let fetchPage: (current: number, per: number) => Promise<PaginatedListingsResponse | void>;
let renderFunction: (listings: Listing[]) => void;
let currentPage: number;
let postsPerPage: number;

export function addPagination(
  fetchData: (current: number, per: number) => Promise<PaginatedListingsResponse| void>,
  renderCards: (listings: Listing[]) => void,
  current: number,
  perPage: number,
): void {
  // TODO: add buttons in ts
  fetchPage = fetchData;
  renderFunction = renderCards;
  currentPage = current;
  postsPerPage = perPage;
}

function updatePaginationBtns(meta: Meta) {
  prevBtn.disabled = !meta.previousPage;
  nextBtn.disabled = !meta.nextPage;
}

export function resetPagination(meta: Meta) {
currentPage = 1
updatePaginationBtns(meta)
}

prevBtn?.addEventListener("click", async () => {
  if (!prevBtn.disabled) {
    const response = await fetchPage(currentPage - 1, postsPerPage);
    if (response) {
      currentPage--;
      renderFunction(response.data);
      updatePaginationBtns(response.meta);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
});

nextBtn?.addEventListener("click", async () => {
  if (!nextBtn.disabled) {
    const response = await fetchPage(currentPage + 1, postsPerPage);
    if (response) {
      currentPage++;
      renderFunction(response.data);
      updatePaginationBtns(response.meta);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }





});
