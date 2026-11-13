import { createListing } from "../components/createListing.ts"
import { addPagination } from "../components/pagination.ts";
import {getAllPaginatedListings, type PaginatedListingsResponse} from "../hooks/getPaginatedAllListings.ts"
import type { Listing } from "../types.ts"


let currentPage = 1;
const POSTS_PER_PAGE = 30;


// const result = await getAllPaginatedListings(currentPage, POSTS_PER_PAGE)

const cardsParentDiv = document.getElementById("cards-parent") as HTMLUListElement

async function fetchData(currentPage: number, postsPerPage: number): Promise<PaginatedListingsResponse|void> {
  const result = await getAllPaginatedListings(currentPage, postsPerPage)
if(result.ok){
    console.log(result.value
    );
 return result.value
}
}

function renderCards(listings: Listing[]):void {
  cardsParentDiv.innerHTML= "";
  listings.forEach((listing: Listing) => {
    createListing(listing, cardsParentDiv)
  })
}

const response = await fetchData(currentPage, POSTS_PER_PAGE)
if(response){
  renderCards(response.data)
  console.log(response.data[1].title, response.data[1].media[0].url )
}


addPagination(fetchData, renderCards, currentPage, POSTS_PER_PAGE);