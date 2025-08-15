"use client";

import { useEffect } from "react";

interface ConvaiWidgetProps {
  isActive: boolean;
}

export default function ConvaiWidget({ isActive }: ConvaiWidgetProps) {
  useEffect(() => {
    // Dynamically load the ElevenLabs script
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  if (!isActive) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* @ts-expect-error - ElevenLabs web component */}
      <elevenlabs-convai agent-id="agent_3601k2pwc16nfchtekwnmpfvq7vm" />
    </div>
  );
}
