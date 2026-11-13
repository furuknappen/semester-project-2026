import { get } from "../api/apiClient";
import type { Listing, Meta} from "../types";
import type { Result } from "../utils/result";

export type PaginatedListingsResponse = {
  data: Listing[];
  meta: Meta
};

export async function getAllPaginatedListings(page: number = 1,
  limit: number = 12,): Promise<Result<PaginatedListingsResponse, Error>> {
  try {
    const response = await get<PaginatedListingsResponse>(
      `/auction/listings?page=${page}&limit=${limit}&_bids=true`
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
