import { post } from "../api/apiClient";
import type { Listing } from "../types";
import type { Result } from "../utils/result";

export type newListingRequest = {
  title: string; 
  description?: string; 
  tags?: string[]; 
  media?: {
    url: string;
    alt: string;
  }[];
  endsAt:string

};



type PostResponse = {
  data: Listing;
  meta: object;
};

export async function postNewListing(
  body: newListingRequest,
): Promise<Result<PostResponse, Error>> {
  try {
    const response = await post<PostResponse>(`/auction/listings`, body);

    if (!response) {
      return {
        ok: false,
        error: new Error("No response was recieved"),
      };
    }

    return { ok: true, value: response };
  } catch (error: unknown) {
    return {
      ok: false,
      error: error as Error,
    };
  }
}
