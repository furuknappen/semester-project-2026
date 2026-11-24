import { put } from "../api/apiClient";
import type { Media, Meta, Profile } from "../types";
import type { Result } from "../utils/result";

export type UpdateProfileRequest = {
 bio: string,
  avatar: Media,
  banner: Media
};

type UpdateResponse = {
  data: Profile;
  meta: Meta;
};

export async function putUpdateProfile(
  name: string,
  updateRequest: UpdateProfileRequest,
): Promise<Result<UpdateResponse, Error>> {
  try {
    const response = await put<UpdateResponse>(
      `/auction/profiles/${name}`,
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
