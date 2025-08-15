"use client";

import { Cursor } from "motion-plus/react";

export default function DefaultCursor() {
  return (
    <Cursor
      style={cursor}
      variants={{ text: { backgroundColor: "#f97316" } }}
    />
  );
}

const cursor: React.CSSProperties = {
  backgroundColor: "#fb923c",
  mixBlendMode: "difference",
};
