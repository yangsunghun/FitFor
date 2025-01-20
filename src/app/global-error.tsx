"use client";
import ErrorScreen from "@/components/common/ErrorScreen";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body>
        <ErrorScreen error={error} reset={reset} />
      </body>
    </html>
  );
}
