import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://recruit.0-i.co.jp";
  const pages = [
    "",
    "/philosophy",
    "/business",
    "/projects",
    "/environment",
    "/compensation",
    "/members",
    "/recruit",
  ];
  return pages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: page === "" ? 1 : 0.8,
  }));
}
