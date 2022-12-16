import React from "react";
import DiscoverContainer from "../components/discover/DiscoverContainer";

/**
 * TODO: This should probably be SSG + ISR
 * https://tanstack.com/query/v4/docs/guides/ssr
 * @returns
 */
export default function Discover() {
  return <DiscoverContainer />;
}
