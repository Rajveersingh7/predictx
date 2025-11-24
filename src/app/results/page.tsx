// Route: /results (Results Page)
import React, {Suspense} from "react";
import ResultsContent from "./ResultsContent";

export default function Results(): React.JSX.Element {
  return (
    <Suspense
      fallback={
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-20 w-20 border-t-4 border-amber-500"></div>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
