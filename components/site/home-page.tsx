"use client";

import { HomePageContent } from "@/components/site/home-page-content";
import { useSiteNavigation } from "@/components/site/chrome";

export default function HomePage() {
  const navigateTo = useSiteNavigation();
  return <HomePageContent navigateTo={navigateTo} />;
}
