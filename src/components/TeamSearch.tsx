// Component: Autocomplete Team Search
"use client";
import React, {useState, useEffect, useRef} from "react";
import type {TeamSearchProps, TeamName} from "@/types";
import teams from "@/data/teams.json";

export default function TeamSearch({
  value,
  onChange,
  placeholder
}: TeamSearchProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>(value);
  const [filteredTeams, setFilteredTeams] = useState<TeamName[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearch(value);
  }, [value]);

  useEffect(() => {
    if (search && !value) {
      // Only show dropdown when actively searching (not when a team is selected)
      const filtered = (teams as TeamName[]).filter((team: TeamName) =>
        team.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredTeams(filtered.slice(0, 8));
      setIsOpen(filtered.length > 0);
    } else {
      setFilteredTeams([]);
      setIsOpen(false);
    }
  }, [search, value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (team: TeamName): void => {
    setSearch(team);
    onChange(team);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.target.value;
    setSearch(newValue);
    // Clear the selected value when user types
    onChange("");
  };

  const handleClear = (): void => {
    setSearch("");
    onChange("");
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="luxury-input w-full pr-10"
          autoComplete="off"
        />
        {search && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gold-400 hover:text-gold-300 transition-colors"
            type="button"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
      {isOpen && filteredTeams.length > 0 && (
        <div className="luxury-dropdown">
          {filteredTeams.map((team: TeamName, index: number) => (
            <div
              key={index}
              onClick={() => handleSelect(team)}
              className="luxury-dropdown-item group"
            >
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                <span className="text-2xl sm:text-3xl md:text-4xl filter drop-shadow-lg group-hover:scale-125 transition-transform duration-200 shrink-0">
                  ⚽
                </span>
                <div className="flex-1 min-w-0">
                  <span className="font-semibold text-sm sm:text-base text-white group-hover:text-gold-300 transition-colors block truncate">
                    {team}
                  </span>
                </div>
                <span className="text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity text-lg sm:text-xl shrink-0">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
