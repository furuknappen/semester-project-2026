
type ListingMediaRequest = {
  url: string;
  alt: string;
}


export function getMediaFormForm(photoSection: HTMLDivElement): ListingMediaRequest[] {
  const media: ListingMediaRequest[] = [];

  photoSection
    .querySelectorAll<HTMLDivElement>("[data-photo-index]")
    .forEach((entry) => {
      const url = entry
        .querySelector<HTMLInputElement>("input[name=images]")
        ?.value.trim();
      if (!url) return;

      const alt =
        entry
          .querySelector<HTMLInputElement>("input[name=alts]")
          ?.value.trim() ?? "";
      media.push({ url, alt });
    });
  return media;
}
