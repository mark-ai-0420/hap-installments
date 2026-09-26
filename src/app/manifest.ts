import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HAP Installments",
    short_name: "HAP",
    description: "Short-term monthly installment plans for tuition and travel without hidden fees.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAFA",
    theme_color: "#1F6F94",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
