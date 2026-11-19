import { get } from "../api/apiClient";
import type { Listing, Meta} from "../types";
import type { Result } from "../utils/result";

export type PaginatedListingsResponse = {
  data: Listing[];
  meta: Meta
};

export async function getAllPaginatedListings(page: number = 1,
  limit: number = 12, options: { active?: boolean; tag?:string} = {}): Promise<Result<PaginatedListingsResponse, Error>> {
  try {
    const params = new URLSearchParams({
      _seller: "true", 
      _bids: "true",
      page: String(page),
      limit: String(limit),
    })

  if(options.active) params.set("_active", "true")
  if(options.tag) params.set("_tag", options.tag)

    const response = await get<PaginatedListingsResponse>(
      `/auction/listings?${params.toString()}`
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
