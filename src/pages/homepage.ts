import { createListing } from "../components/createListing.ts";
import { addPagination, resetPagination } from "../components/pagination.ts";

import {
  getAllPaginatedListings,
  type PaginatedListingsResponse,
} from "../hooks/getPaginatedAllListings.ts";
import { getSearchResult } from "../hooks/getSearchResult.ts";
import type { Listing } from "../types.ts";

const currentPage = 1;
const POSTS_PER_PAGE = 30;

type SortMode = "all" | "active" | "ended";

let sortMode: SortMode = "all";
let tagFilter = "";
const sortSelect = document.getElementById("sort-select") as HTMLSelectElement;

const tagOptions = document.getElementById(
  "tag-options",
) as HTMLDataListElement;
const knownTags = new Set<string>();


function addKnownTags(listings: Listing[]): void {
  listings.forEach((listing) => {
    listing.tags?.forEach((tag) => knownTags.add(tag));
  });

  const options = [...knownTags]
    .sort((a, b) => a.localeCompare(b, "nb-NO"))
    .map((tag) => {
      const option = document.createElement("option");
      option.value = tag;
      return option;
    });

  tagOptions.replaceChildren(...options);
}

const cardsParentDiv = document.getElementById(
  "cards-parent",
) as HTMLUListElement;

async function applyFilter(): Promise<void> {
  const response = await fetchData(1, POSTS_PER_PAGE);
  if (!response) return;
  renderCards(response.data);
  resetPagination(response.meta);
}


async function fetchData(
  currentPage: number,
  postsPerPage: number,
): Promise<PaginatedListingsResponse | void> {
  const result = await getAllPaginatedListings(currentPage, postsPerPage, {
    active: sortMode === "active",
    tag: tagFilter || undefined,
  });

  if (result.ok) return result.value;
  
}

let stopFunctions: (() => void)[] = []

function renderCards(listings: Listing[]): void {
  stopFunctions.forEach((stop) => stop());
  stopFunctions = []


  addKnownTags(listings);
  cardsParentDiv.replaceChildren()

  listings.forEach((listing) => {
    createListing(listing, cardsParentDiv);
    stopFunctions.push(stop)
  });
}

sortSelect.addEventListener("change", () => {
  sortMode = sortSelect.value as SortMode;
  applyFilter();
});

const response = await fetchData(currentPage, POSTS_PER_PAGE);
if (response) {
  renderCards(response.data);
}

await applyFilter();
addPagination(fetchData, renderCards, currentPage, POSTS_PER_PAGE);

const tagForm = document.getElementById("tag-form") as HTMLFormElement;
const tagInput = document.getElementById("tag-input") as HTMLInputElement;
const tagClear = document.getElementById("tag-clear") as HTMLButtonElement;

tagForm.addEventListener("submit", (e) => {
  e.preventDefault();
  tagFilter = tagInput.value.trim();
  
});

tagClear.addEventListener("click", () => {
  // console.log("click")
  tagInput.value = "";
  tagFilter = "";
  applyFilter();
});

const postSearchField = document.getElementById(
  "post-search-field",
) as HTMLInputElement;
const searchErrorDiv = document.getElementById(
      "search-error-div",
    ) as HTMLDivElement;

    postSearchField?.addEventListener("input", async () => {
  if (postSearchField.value === "") {
    return;
  }   
  searchErrorDiv.textContent=""

  const query = postSearchField.value.trim();

  const resultSearch = await getSearchResult(query);
  if (resultSearch.ok) {
    if (resultSearch.value.data.length === 0) {
      searchErrorDiv.textContent = "";
      searchErrorDiv.textContent = `Found no listings containing ${query}`;
      postSearchField.after(searchErrorDiv);

      if(postSearchField.value.length === 0 ){
      searchErrorDiv.textContent = ""
      }
    }

    renderCards(resultSearch.value.data);
  } else {
    const searchErrorDiv = document.getElementById(
      "search-error-div",
    ) as HTMLDivElement;
    searchErrorDiv.textContent = resultSearch.error.message;
  }
});
