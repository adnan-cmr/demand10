"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { getCompanyBadgesForFrontend } from "@/services/api";

export default function CompanyBadges({ companyId, inline = false }) {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBadges = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getCompanyBadgesForFrontend(companyId);

      if (response.status === 200 && Array.isArray(response.data.data)) {
        setBadges(response.data.data);
      } else {
        setBadges([]);
        setError("No badges found");
      }
    } catch (err) {
      setError("Failed to load company badges");
    } finally {
      setLoading(false);
    }
  }, [companyId]);

  useEffect(() => {
    if (companyId) fetchBadges();
  }, [companyId, fetchBadges]);

  // If inline prop is true, render badges inline without margin
  if (inline) {
    if (loading) {
      return (
        <div className="flex gap-1">
          {[1, 2].map((i) => (
            <div key={i} className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
          ))}
        </div>
      );
    }

    if (error || badges.length === 0) return null;

    return (
      <div className="flex gap-2 items-center">
        {badges.map(({ badge, rankPosition }) => (
          <div key={badge._id} className="relative group">
            <Image
              width={32}
              height={32}
              src={badge.image}
              alt={`${badge.name} Badge`}
              className="w-20 h-20 object-contain transition-transform group-hover:scale-105"
              title={`${badge.name}${rankPosition ? ` - Rank #${rankPosition}` : ""}`}
            />
          </div>
        ))}
      </div>
    );
  }

  // Default block layout
  if (loading) {
    return (
      <div className="flex gap-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-16 h-16 bg-gray-200 rounded-full animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-sm">Error: {error}</div>;
  }

  if (badges.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-3 items-center">
        {badges.map(({ badge, rankPosition }) => (
          <div key={badge._id} className="relative group">
            <Image
              width={100}
              height={100}
              src={badge.image}
              alt={`${badge.name} Badge`}
              className="w-30 h-30 object-contain transition-transform group-hover:scale-105"
              title={`${badge.name}${rankPosition ? ` - Rank #${rankPosition}` : ""}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}