"use client"

import { Cursor } from "motion-plus/react"

export default function DefaultCursor() {
    return (
        <Cursor
            style={cursor}
            variants={{ text: { backgroundColor: "#ff0088" } }}
        />
    )
}

const cursor: React.CSSProperties = {
    backgroundColor: "#f5f5f5",
}