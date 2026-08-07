import type { MetadataRoute } from "next";

const baseUrl = "https://thulasiphysio.in";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, lastModified: "2026-08-07" },
    { url: `${baseUrl}/privacy-policy`, lastModified: "2026-08-07" },
  ];
}
