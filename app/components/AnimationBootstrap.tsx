"use client";

import { useEffect } from "react";

export default function AnimationBootstrap() {
  useEffect(() => {
    window.dispatchEvent(new Event("animations-initialized"));
  }, []);

  return null;
}
