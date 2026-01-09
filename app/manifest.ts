import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Waqas Riaz - Software Developer & Product Builder",
    short_name: "Waqas Riaz",
    description:
      "Software Developer & Product Builder. Creator of Houzez and Homey WordPress themes.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#5b21b6",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
