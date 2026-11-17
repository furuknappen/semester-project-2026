import { post } from "../api/apiClient";
import type { Listing } from "../types";

import type { Result } from "../utils/result";

type BidRequest = {
  amount: number;
};

type BidResponse = {
  data: Listing;
  meta: object;
};

export async function postBid(
  bidNumber: number,
  listingId: string,
): Promise<Result<BidResponse, Error>> {
  try {
    const request: BidRequest = {
      amount: bidNumber
    };

    const response = await post<BidResponse>(
      `/auction/listings/${listingId}/bids`,
      request,
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
