// Route: / (Home Page)
"use client";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import TeamSearch from "@/components/TeamSearch";

export default function Home(): React.JSX.Element {
  const [homeTeam, setHomeTeam] = useState<string>("");
  const [awayTeam, setAwayTeam] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handlePredict = (): void => {
    if (homeTeam && awayTeam) {
      setIsLoading(true);
      router.push(
        `/results?home=${encodeURIComponent(
          homeTeam
        )}&away=${encodeURIComponent(awayTeam)}`
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto w-full">
      {/* Hero Section */}
      <div className="text-center mb-8 space-y-3">
        <h1 className="text-7xl font-black gold-text-gradient leading-tight drop-shadow-2xl">
          PredictX
        </h1>
        <p className="text-gray-300 text-lg font-medium tracking-wide">
          Advanced AI-Powered Match Outcome Predictions
        </p>
      </div>

      {/* Main Card */}
      <div className="luxury-card p-10">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold gold-text-gradient mb-1">
            Select Teams
          </h2>
          <p className="text-gray-400 text-sm">
            Choose two teams to generate your prediction
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Home Team */}
          <div className="space-y-3">
            <label className="text-gold-400 font-bold text-lg flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shadow-lg border border-gold-500/50">
                <svg
                  className="w-5 h-5 text-gold-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
              <span>Home Team</span>
            </label>
            <TeamSearch
              value={homeTeam}
              onChange={setHomeTeam}
              placeholder="Search home team..."
            />
          </div>

          {/* Away Team */}
          <div className="space-y-3">
            <label className="text-gold-400 font-bold text-lg flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shadow-lg border border-gold-500/50">
                <svg
                  className="w-5 h-5 text-gold-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </div>
              <span>Away Team</span>
            </label>
            <TeamSearch
              value={awayTeam}
              onChange={setAwayTeam}
              placeholder="Search away team..."
            />
          </div>
        </div>

        {/* Predict Button */}
        <button
          onClick={handlePredict}
          disabled={!homeTeam || !awayTeam || isLoading}
          className="luxury-button w-full text-lg py-4 relative overflow-hidden group"
        >
          <span className="relative z-10 flex items-center justify-center gap-3 font-bold">
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-3 border-black border-t-transparent rounded-full animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <span className="text-2xl group-hover:scale-110 transition-transform">
                  ⚡
                </span>
                <span>Generate Prediction</span>
              </>
            )}
          </span>
          <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>

        {/* Info Text */}
        {!homeTeam || !awayTeam ? (
          <p className="text-center text-gray-500 text-xs mt-4">
            Select both teams to continue
          </p>
        ) : null}
      </div>
    </div>
  );
}
