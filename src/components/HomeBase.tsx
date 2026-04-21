'use client';

import React, { useState, useEffect } from 'react';
import { useSecurity } from "@/kernel/SecurityKernel";

export default function HomeBase({ translations, jurajData }: any) {
  const { isAuthorized } = useSecurity();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (!isAuthorized) return null;

  return (
    <div id="home-base-debug" className="min-h-screen bg-white flex items-center justify-center">
      <h1 className="text-beliansky-navy font-black text-4xl">
        BELIANSKY PLATFORM v8.0 STATUS: ACTIVE
      </h1>
    </div>
  );
}
