"use client";

import NyanyaWidget from "../widgets/NyanyaWidget";
import RecentActivityWidget from "../widgets/RecentActivityWidget";
import LeaderboardWidget from "../widgets/LeaderboardWidget";

export default function NyanyaMode() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <NyanyaWidget />
        <RecentActivityWidget />
      </div>
      <div className="lg:col-span-1">
        <LeaderboardWidget />
      </div>
    </div>
  );
}
