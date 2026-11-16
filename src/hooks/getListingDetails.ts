import { get } from "../api/apiClient";
import type { Listing } from "../types";
import type { Result } from "../utils/result";


export type SingleListingResponse = {
  data: Listing;
  meta: object;
};

export async function getListingDetails(
  id: string,
): Promise<Result<SingleListingResponse, Error>> {
  try {
    const response = await get<SingleListingResponse>(
      `/auction/listings/${id}?_bids=true&seller=true&_active=true`,
    );

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