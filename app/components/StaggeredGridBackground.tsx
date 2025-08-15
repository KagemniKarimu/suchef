"use client";

import * as motion from "motion/react-client";
import { useEffect, useRef, useState } from "react";
import "../styles/components.css";

export default function StaggeredGridBackground() {
  const gridSize = 15; // Increased for better coverage
  const totalCells = gridSize * gridSize;
  const grid = useRef<HTMLDivElement>(null);
  const [originIndex, setOriginIndex] = useState<number | null>(null);
  const [calculatedDelay, setCalculatedDelay] = useState<number[]>([]);

  useEffect(() => {
    const originIndex = Math.floor(Math.random() * totalCells);
    const cells = grid.current?.querySelectorAll(".grid-cell");

    if (!cells) return;

    const originCell = cells[originIndex];
    const originPoint = getCenter(originCell as HTMLElement);
    const delays: number[] = [];

    for (let i = 0; i < totalCells; i++) {
      const cell = cells[i];
      const cellPoint = getCenter(cell as HTMLElement);
      const distance = Math.sqrt(
        (cellPoint.x - originPoint.x) ** 2 + (cellPoint.y - originPoint.y) ** 2,
      );
      const delay = distance * 0.002 + Math.random() * 0.1;
      delays.push(delay);
    }

    setCalculatedDelay(delays);
    setOriginIndex(originIndex);
  }, [totalCells]);

  const cells = Array.from({ length: totalCells }, (_, index) => (
    <motion.div
      className={`grid-cell ${index === originIndex ? "origin-cell" : ""}`}
      variants={variants}
      transition={{
        type: "spring",
        stiffness: 600,
        damping: 20,
        delay: index === originIndex ? 0 : calculatedDelay[index],
      }}
      key={index}
    />
  ));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <motion.div
        ref={grid}
        className="absolute inset-0 grid grid-cols-[repeat(15,1fr)] gap-3 p-8"
        initial="hidden"
        animate={originIndex !== null ? "visible" : "hidden"}
        style={{
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 70%)",
        }}
      >
        {cells}
      </motion.div>
    </div>
  );
}

const variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 0.15, scale: 1 },
};

function getCenter(element: HTMLElement) {
  const { x, y, width, height } = element.getBoundingClientRect();
  return { x: x + width / 2, y: y + height / 2 };
}
