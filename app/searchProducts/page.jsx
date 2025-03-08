// app/search-products/page.js
import { Suspense } from "react";
import SearchComponent from "@/components/SearchComponent";

export const dynamic = "force-dynamic"; // Force dynamic rendering

export default function SearchProductsPage() {
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <SearchComponent />
    </Suspense>
  );
}