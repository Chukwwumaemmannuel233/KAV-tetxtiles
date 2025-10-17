"use client";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageLoader from "./PageLoader";
import { usePageTransition } from "../context/PageTransitionContext";

interface Props {
  siteReady: boolean;
}

export default function RouteChangeLoader({ siteReady }: Props) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const { setAnimReady } = usePageTransition();

  useEffect(() => {
    if (!siteReady) return;

    if (initialLoad) {
      setInitialLoad(false);
      return;
    }

    setLoading(true);
    setAnimReady(false); // stop page animations

    const timeout = setTimeout(() => {
      setLoading(false);
      setAnimReady(true); // allow animations again
    }, 3000);

    return () => clearTimeout(timeout);
  }, [location.pathname, siteReady, setAnimReady]);

  return loading ? <PageLoader /> : null;
}
