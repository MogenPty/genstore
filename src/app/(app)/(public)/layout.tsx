import { Footer } from "@/modules/home/ui/components/footer";
import { Navbar } from "@/modules/home/ui/components/navbar";

interface Props {
  children: React.ReactNode;
}

export default async function Layout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>
      <Footer />
    </div>
  );
}

// export const metadata = {
//   title: "GenStore",
//   description: "A modern store for your Next.js applications",
// };

// export const dynamic = "force-dynamic"; // Ensures the layout is dynamic
// export const revalidate = 0; // Disable static generation caching
// export const fetchCache = "force-no-store"; // Disable fetch caching
// export const runtime = "edge"; // Use edge runtime for better performance
// export const preferredRegion = "auto"; // Automatically select the best region for deployment
// export const tags = ["nextjs", "store", "ecommerce", "modern"];
// export const viewport = {
//   width: "device-width",
//   initialScale: 1,
//   maximumScale: 1,
//   userScalable: false,
// }; // Set viewport for mobile responsiveness
// export const icons = {
//   icon: "/favicon.ico", // Path to your favicon
//   apple: "/apple-touch-icon.png", // Path to your Apple touch icon
//   shortcut: "/shortcut-icon.png", // Path to your shortcut icon
// }; // Define icons for the application
// export const manifest = "/manifest.json"; // Path to your web app manifest
// export const appleWebApp = {
//   capable: true, // Enable Apple web app capabilities
//   title: "GenStore", // Title for the Apple web app
//   statusBarStyle: "black-translucent", // Status bar style for the Apple web app
// }; // Define Apple web app settings
// export const themeColor = "#ffffff"; // Set the theme color for the application
// export const colorScheme = "light dark"; // Define the color schemes supported by the application
// export const robots = {
//   index: true, // Allow indexing by search engines
//   follow: true, // Allow following links
//   noarchive: false, // Do not prevent archiving
//   nosnippet: false, // Allow snippets in search results
// }; // Define robots meta tags for SEO
// export const openGraph = {
//   title: "GenStore",
//   description: "A modern store for your Next.js applications",
//   url: "https://genstore.example.com", // Replace with your actual URL
//   siteName: "GenStore",
//   images: [
//     {
//       url: "/og-image.png", // Path to your Open Graph image
//       width: 1200,
//       height: 630,
//       alt: "GenStore Open Graph Image",
//     },
//   ],
// }; // Define Open Graph metadata for social sharing
// export const twitter = {
//   card: "summary_large_image", // Twitter card type
//   title: "GenStore",
//   description: "A modern store for your Next.js applications",
//   site: "@genstore", // Replace with your Twitter handle
//   creator: "@genstore", // Replace with your Twitter handle
//   images: ["/twitter-image.png"], // Path to your Twitter image
// }; // Define Twitter metadata for social sharing
// export const viewportMeta = {
//   name: "viewport",
//   content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
// }; // Set viewport meta tag for mobile responsiveness
// export const appleTouchIcon = {
//   rel: "apple-touch-icon",
//   href: "/apple-touch-icon.png", // Path to your Apple touch icon
//   sizes: "180x180", // Size of the Apple touch icon
// }; // Define Apple touch icon for iOS devices
// export const favicon = {
//   rel: "icon",
//   href: "/favicon.ico", // Path to your favicon
//   type: "image/x-icon", // Type of the favicon
// }; // Define favicon for the application
// export const manifestLink = {
//   rel: "manifest",
//   href: "/manifest.json", // Path to your web app manifest
// }; // Define link to the web app manifest
// export const themeColorMeta = {
//   name: "theme-color",
//   content: "#ffffff", // Set the theme color for the application
// }; // Define theme color meta tag for the application
// export const appleWebAppMeta = {
//   name: "apple-mobile-web-app-capable",
//   content: "yes", // Enable Apple web app capabilities
// }; // Define Apple web app meta tag for iOS devices
// export const appleWebAppTitleMeta = {
//   name: "apple-mobile-web-app-title",
//   content: "GenStore", // Title for the Apple web app
// }; // Define Apple web app title meta tag for iOS devices
// export const appleWebAppStatusBarStyleMeta = {
//   name: "apple-mobile-web-app-status-bar-style",
//   content: "black-translucent", // Status bar style for the Apple web app
// }; // Define Apple web app status bar style meta tag for iOS devices
// export const colorSchemeMeta = {
//   name: "color-scheme",
//   content: "light dark", // Define the color schemes supported by the application
// }; // Define color scheme meta tag for the application
// export const robotsMeta = {
//   name: "robots",
//   content: "index, follow, noarchive, nosnippet", // Define robots meta tags for SEO
// }; // Define robots meta tag for the application
// export const openGraphMeta = {
//   property: "og:title",
//   content: "GenStore", // Open Graph title
// }; // Define Open Graph title meta tag for social sharing
// export const twitterMeta = {
//   name: "twitter:title",
//   content: "GenStore", // Twitter title
// }; // Define Twitter title meta tag for social sharing
// export const openGraphDescriptionMeta = {
//   property: "og:description",
//   content: "A modern store for your Next.js applications", // Open Graph description
// }; // Define Open Graph description meta tag for social sharing
// export const twitterDescriptionMeta = {
//   name: "twitter:description",
//   content: "A modern store for your Next.js applications", // Twitter description
// }; // Define Twitter description meta tag for social sharing
// export const openGraphUrlMeta = {
//   property: "og:url",
//   content: "https://genstore.example.com", // Replace with your actual URL
// }; // Define Open Graph URL meta tag for social sharing
// export const twitterUrlMeta = {
//   name: "twitter:url",
//   content: "https://genstore.example.com", // Replace with your actual URL
// }; // Define Twitter URL meta tag for social sharing
// export const openGraphSiteNameMeta = {
//   property: "og:site_name",
//   content: "GenStore", // Open Graph site name
// }; // Define Open Graph site name meta tag for social sharing
// export const twitterSiteMeta = {
//   name: "twitter:site",
//   content: "@genstore", // Replace with your Twitter handle
// }; // Define Twitter site meta tag for social sharing
// export const openGraphImagesMeta = {
//   property: "og:image",
//   content: "/og-image.png", // Path to your Open Graph image
// }; // Define Open Graph image meta tag for social sharing
// export const twitterImagesMeta = {
//   name: "twitter:image",
//   content: "/twitter-image.png", // Path to your Twitter image
// }; // Define Twitter image meta tag for social sharing
// export const openGraphImageWidthMeta = {
//   property: "og:image:width",
//   content: "1200", // Width of the Open Graph image
// }; // Define Open Graph image width meta tag for social sharing
// export const openGraphImageHeightMeta = {
//   property: "og:image:height",
//   content: "630", // Height of the Open Graph image
// }; // Define Open Graph image height meta tag for social sharing
// export const twitterCardMeta = {
//   name: "twitter:card",
//   content: "summary_large_image", // Twitter card type
// }; // Define Twitter card meta tag for social sharing
// export const twitterCreatorMeta = {
//   name: "twitter:creator",
//   content: "@genstore", // Replace with your Twitter handle
// }; // Define Twitter creator meta tag for social sharing
// export const twitterImageMeta = {
//   name: "twitter:image",
//   content: "/twitter-image.png", // Path to your Twitter image
// }; // Define Twitter image meta tag for social sharing
// export const viewportMetaTag = {
//   name: "viewport",
//   content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
// }; // Set viewport meta tag for mobile responsiveness
// export const appleTouchIconLink = {
//   rel: "apple-touch-icon",
//   href: "/apple-touch-icon.png", // Path to your Apple touch icon
//   sizes: "180x180", // Size of the Apple touch icon
// }; // Define Apple touch icon link for iOS devices
