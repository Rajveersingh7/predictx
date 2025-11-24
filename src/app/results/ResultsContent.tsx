// Component: Results Content (Client Component)
"use client";
import {useState, useEffect, useRef} from "react";
import {useSearchParams, useRouter} from "next/navigation";
import type {PredictionResponse} from "@/types";

export default function ResultsContent(): React.JSX.Element {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef<boolean>(false);

  const homeTeam = searchParams.get("home");
  const awayTeam = searchParams.get("away");

  useEffect(() => {
    if (!homeTeam || !awayTeam) {
      router.push("/");
      return;
    }

    // Prevent duplicate fetches
    if (hasFetched.current) {
      return;
    }

    const fetchPrediction = async (): Promise<void> => {
      try {
        hasFetched.current = true;
        setLoading(true);
        const response = await fetch("/api/predict", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({homeTeam, awayTeam})
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Prediction failed");
        }

        const data: PredictionResponse = await response.json();
        setPrediction(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        hasFetched.current = false; // Allow retry on error
      } finally {
        setLoading(false);
      }
    };

    fetchPrediction();
  }, [homeTeam, awayTeam, router]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="luxury-card p-8 sm:p-12 md:p-16 lg:p-20 text-center">
          <div className="relative inline-block mb-6 sm:mb-8">
            <div className="absolute inset-0 bg-gold-500/30 blur-2xl rounded-full animate-pulse" />
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-3 sm:border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold gold-text-gradient mb-3 sm:mb-4 animate-pulse px-4">
            Analyzing Match Data
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg px-4">
            Our AI is processing team statistics, recent form, and historical
            data...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="luxury-card p-8 sm:p-12 md:p-16 text-center">
          <div className="text-5xl sm:text-6xl md:text-7xl mb-4 sm:mb-6">
            ⚠️
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-400 mb-3 sm:mb-4 px-4">
            {error}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-8 px-4">
            Please try again with different teams
          </p>
          <button
            onClick={() => router.push("/")}
            className="luxury-button inline-flex items-center gap-2 text-sm sm:text-base"
          >
            <span>←</span>
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    );
  }

  if (!prediction) {
    return <></>;
  }

  const getMaxPercentage = (): number => {
    return Math.max(prediction.homeWin, prediction.draw, prediction.awayWin);
  };

  const maxPercentage = getMaxPercentage();

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8 px-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 gold-text-gradient">
          Match Prediction
        </h1>
        <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 flex-wrap">
          <div className="luxury-card px-3 sm:px-4 md:px-6 py-1.5 sm:py-2">
            <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white">
              {homeTeam}
            </span>
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-gold-500 to-gold-600 rounded-full flex items-center justify-center font-black text-xs sm:text-sm md:text-base text-black shadow-lg shadow-gold-500/50 border-2 border-gold-300">
            VS
          </div>
          <div className="luxury-card px-3 sm:px-4 md:px-6 py-1.5 sm:py-2">
            <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white">
              {awayTeam}
            </span>
          </div>
        </div>
      </div>

      {/* Prediction Card */}
      <div className="luxury-card p-4 sm:p-5 md:p-6">
        <div className="space-y-4 sm:space-y-5">
          {/* Home Win */}
          <div>
            <div className="flex justify-between items-center mb-2 gap-2">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-black rounded-lg flex items-center justify-center shadow-lg border border-gold-500/50 shrink-0">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-sm sm:text-base md:text-lg text-white truncate block">
                    {homeTeam} Win
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span
                  className={`font-black text-lg sm:text-xl md:text-2xl ${
                    prediction.homeWin === maxPercentage
                      ? "text-gold-400"
                      : "text-gray-400"
                  }`}
                >
                  {prediction.homeWin}%
                </span>
              </div>
            </div>
            <div className="progress-bar-luxury">
              <div
                className="progress-fill bg-linear-to-r from-green-600 via-green-500 to-green-400 text-white"
                style={{width: `${prediction.homeWin}%`}}
              >
                {prediction.homeWin > 15 && (
                  <span className="drop-shadow-lg">{prediction.homeWin}%</span>
                )}
              </div>
            </div>
          </div>

          {/* Draw */}
          <div>
            <div className="flex justify-between items-center mb-2 gap-2">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span className="text-xl sm:text-2xl shrink-0">🤝</span>
                <div className="min-w-0">
                  <span className="font-bold text-sm sm:text-base md:text-lg text-white">
                    Draw
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span
                  className={`font-black text-lg sm:text-xl md:text-2xl ${
                    prediction.draw === maxPercentage
                      ? "text-gold-400"
                      : "text-gray-400"
                  }`}
                >
                  {prediction.draw}%
                </span>
              </div>
            </div>
            <div className="progress-bar-luxury">
              <div
                className="progress-fill bg-linear-to-r from-gray-600 via-gray-500 to-gray-400 text-white"
                style={{width: `${prediction.draw}%`}}
              >
                {prediction.draw > 15 && (
                  <span className="drop-shadow-lg">{prediction.draw}%</span>
                )}
              </div>
            </div>
          </div>

          {/* Away Win */}
          <div>
            <div className="flex justify-between items-center mb-2 gap-2">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-black rounded-lg flex items-center justify-center shadow-lg border border-gold-500/50 shrink-0">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <span className="font-bold text-sm sm:text-base md:text-lg text-white truncate block">
                    {awayTeam} Win
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span
                  className={`font-black text-lg sm:text-xl md:text-2xl ${
                    prediction.awayWin === maxPercentage
                      ? "text-gold-400"
                      : "text-gray-400"
                  }`}
                >
                  {prediction.awayWin}%
                </span>
              </div>
            </div>
            <div className="progress-bar-luxury">
              <div
                className="progress-fill bg-linear-to-r from-red-600 via-red-500 to-red-400 text-white"
                style={{width: `${prediction.awayWin}%`}}
              >
                {prediction.awayWin > 15 && (
                  <span className="drop-shadow-lg">{prediction.awayWin}%</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-5 sm:mt-6">
          <button
            onClick={() => router.push("/")}
            className="luxury-button w-full text-sm sm:text-base group"
          >
            <span className="flex items-center justify-center gap-2">
              <span>New Prediction</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
