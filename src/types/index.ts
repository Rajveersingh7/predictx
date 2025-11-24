// Type definitions for the entire app

export interface PredictionRequest {
  homeTeam: string;
  awayTeam: string;
}

export interface PredictionResponse {
  homeWin: number;
  draw: number;
  awayWin: number;
  homeTeam: string;
  awayTeam: string;
}

export interface ErrorResponse {
  error: string;
}

export interface TeamSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export type TeamName = string;
