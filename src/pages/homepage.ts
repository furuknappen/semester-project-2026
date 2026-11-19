import { createListing } from "../components/createListing.ts";
import { addPagination, resetPagination } from "../components/pagination.ts";
import { getAllListings } from "../hooks/getAllListings.ts";
import {
  getAllPaginatedListings,
  type PaginatedListingsResponse,
} from "../hooks/getPaginatedAllListings.ts";
import type { Listing } from "../types.ts";

let currentPage = 1;
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

// const result = await getAllPaginatedListings(currentPage, POSTS_PER_PAGE)

const cardsParentDiv = document.getElementById(
  "cards-parent",
) as HTMLUListElement;

async function applyFilter(): Promise<void> {
  const response = await fetchData(1, POSTS_PER_PAGE);
  if (!response) return;

  // updateTagPills(allListings);
  renderCards(response.data);
  resetPagination(response.meta);
}

// async function loadAllListings(): Promise<void> {
//   if (allLoaded) return

//   const result = await getAllListings()
//   if (!result.ok) return
// console.log(result.value)
//   allListings = result.value.data
//   allLoaded = true
// }

async function fetchData(
  currentPage: number,
  postsPerPage: number,
): Promise<PaginatedListingsResponse | void> {
  const result = await getAllPaginatedListings(currentPage, postsPerPage, {
    active: sortMode === "active",
    tag: tagFilter || undefined,
  });

  if (result.ok) return result.value;
  //  const visible = sortListings(filterListings(allListings))
  //  const totalPages = Math.max(1, Math.ceil(visible.length / postsPerPage))
  //  const start = ((currentPage - 1) * postsPerPage)

  // return{
  //   data:visible.slice(start, start + postsPerPage),
  //   meta: {
  //     previousPage: currentPage > 1 ? currentPage - 1 : null,
  //     nextPage: currentPage < totalPages ? currentPage + 1 : null
  //   }
  // } as PaginatedListingsResponse
}

// function getAllTags(listings: Listing[]): string[] {
//   const tags = listings.flatMap((listing) => listing.tags ?? []);
//   return [...new Set(tags)].sort((a, b) => a.localeCompare(b, "nb-NO"));
// }

// function updateTagPills(listings: Listing[]): void {
//   // tagSelect.replaceChildren();

//   const tags = ["", ...getAllTags(listings)];

//   for (const tag of tags) {
//    const isActive = tag === tagFilter

//     const pill = document.createElement("button");
//     pill.type = "button";
//     pill.dataset.tag = tag;
//     pill.setAttribute("aria-pressed", String(isActive));
//     pill.classList.add();

//     pill.addEventListener("click", () => {
//       tagFilter = tag;
//       applyFilter()
//     });
//     tagSelect.append(pill);
//   }
// }

// function filterListings(listings: Listing[]): Listing[] {
//   if (!tagFilter) return listings;
//   return listings.filter((listing) => listing.tags?.includes(tagFilter));
// }

// function sortListings(listings: Listing[]): Listing[] {
//   const now = Date.now();

//   if (sortMode === "active") {
//     return listings.filter((a) => new Date(a.endsAt).getTime() > now);
//   }

//   return listings;
// }

function renderCards(listings: Listing[]): void {
  addKnownTags(listings);
  cardsParentDiv.innerHTML = "";

  listings.forEach((listing) => {
    createListing(listing, cardsParentDiv);
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
  applyFilter();
});

tagClear.addEventListener("click", () => {
  console.log("click")
  tagInput.value = "";
  tagFilter = "";
  applyFilter();
});
