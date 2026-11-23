import { put } from "../api/apiClient";
import type { Listing, Media } from "../types";
import type { Result } from "../utils/result";
// import type { PostsResponse } from "../getAllPosts";

export type UpdateRequest = {
  title: string;
  description: string;
  tags: string[];
  media?: Media[] | null;
};

type UpdateResponse = {
  data: Listing[];
  meta: object;
};

export async function putUpdateListing(
  id: string,
  updateRequest: UpdateRequest,
): Promise<Result<UpdateResponse, Error>> {
  try {
    const response = await put<UpdateResponse>(
      `/auction/listings/${id}`,
      updateRequest,
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
