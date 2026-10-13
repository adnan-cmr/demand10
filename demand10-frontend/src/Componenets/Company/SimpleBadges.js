"use client";

import { useState, useEffect, useCallback } from "react";
import { getCompanyBadgesForFrontend } from "@/services/api";
import Image from "next/image";

export default function SimpleBadges({ companyId }) {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCompanyBadges = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getCompanyBadgesForFrontend(companyId);
      
      if (response.status === 200) {
        setBadges(response.data.data);
      } else {
        setError("Failed to load company badges");
      }
    } catch (err) {
      setError("Failed to load company badges");
      console.error("Error loading badges:", err);
    } finally {
      setLoading(false);
    }
  }, [companyId]);

  useEffect(() => {
    if (companyId) {
      loadCompanyBadges();
    }
  }, [companyId, loadCompanyBadges]);

  if (loading) {
    // Don't show loading indicator in the corner
    return null;
  }

  if (error) {
    // Don't show error to users
    return null;
  }

  // If no badges, don't show anything
  if (badges.length === 0) {
    return null;
  }

  // Show only the first badge (assuming this is the main badge)
  const mainBadge = badges[0];

  return (
    <div className="absolute top-4 right-4 z-10" title={mainBadge.badge.name}>
      <div className="bg-white rounded-full p-1 shadow-lg border border-gray-200">
        <Image
          width={32}
          height={32}
          src={mainBadge.badge.image}
          alt={`${mainBadge.badge.name} Badge`}
          className="w-8 h-8 object-contain"
        />
      </div>
    </div>
  );
}