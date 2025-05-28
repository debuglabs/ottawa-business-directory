import React, { useState, useEffect, useCallback } from "react";
import { Business, SortOption } from "./types";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import FilterDropdown from "./components/FilterDropdown";
import BusinessList from "./components/BusinessList";
import LoadingSpinner from "./components/LoadingSpinner";

// List of BOBs Award Winners based on page 60/61 of the provided image
// Includes main awardees and some "Deal of the Year" entities if they are listed as businesses.
const BOB_AWARD_WINNER_NAMES_LIST: string[] = [
  "Calian Group",
  "Roger Neilson Children's Hospice",
  "Pluvo (formerly Rain Technologies)",
  "BioTalentCanada", // Source image says BioTalent Canada, JSON might just be BioTalentCanada
  "Brookstreet Hotel",
  "Giatec Scientific", // Covers general mention
  "GIATESCIENTIFICINC.", // Specific JSON entry name
  "Branch Audiovisual",
  "CanadaWheels",
  "CFT Group",
  "Warner Brothers Discovery",
  "Fidus", // KNBA Company of the Year
  "Telesat", // Deal of the Year: Finance, also a general entry
  "Bloks", // #NEXTBIGTHING
  "Enurgen", // #NEXTBIGTHING
  "Sparrow Bio", // #NEXTBIGTHING
  "Carlingwood Shopping Centre", // Deal of the Year: Retail
  "Live Nation Canada", // Deal of the Year: Real Estate
  "Air Canada", // Deal of the Year: Tourism
];

// Normalization function for robust name matching
const normalizeName = (name: string | undefined): string => {
  if (!name) return "";
  return name
    .toUpperCase()
    .replace(/\(FORMERLY.*?\)/g, "") // Remove "(formerly...)"
    .replace(
      /(\b(INC|LLP|LTD|LIMITED|CORP|CORPORATION|GROUP|COMPANY|CANADA|SYSTEMS)\b\.?)/g,
      ""
    ) // Remove common suffixes
    .replace(/THE\s+/g, "") // Remove "THE " prefix
    .replace(/[.,'&]/g, "") // Remove punctuation like .,'&
    .replace(/\s+/g, " ") // Normalize multiple spaces to single space
    .trim();
};

const normalizedBobAwardWinnerNames = new Set(
  BOB_AWARD_WINNER_NAMES_LIST.map(normalizeName)
);

const App: React.FC = () => {
  const [allBusinesses, setAllBusinesses] = useState<Business[]>([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>(SortOption.NONE);

  const [uniqueIndustries, setUniqueIndustries] = useState<
    { value: string; label: string }[]
  >([]);
  const [uniqueLocations, setUniqueLocations] = useState<
    { value: string; label: string }[]
  >([]);

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: SortOption.NONE, label: "Default" },
    { value: SortOption.RANK_ASC, label: "Rank (Low to High)" },
    { value: SortOption.RANK_DESC, label: "Rank (High to Low)" },
    { value: SortOption.EMPLOYEES_ASC, label: "Employees (Low to High)" },
    { value: SortOption.EMPLOYEES_DESC, label: "Employees (High to Low)" },
    { value: SortOption.YEAR_FOUNDED_ASC, label: "Founded (Oldest First)" },
    { value: SortOption.YEAR_FOUNDED_DESC, label: "Founded (Newest First)" },
    { value: SortOption.NAME_ASC, label: "Name (A-Z)" },
    { value: SortOption.NAME_DESC, label: "Name (Z-A)" },
  ];

  const generatePlaceholderLogo = (name: string): string => {
    const initials =
      name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase() || "??";
    return `https://via.placeholder.com/64/E0E7FF/4338CA?text=${initials}`;
  };

  useEffect(() => {
    const fetchBusinesses = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("./data/businesses.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const rawData: any[] = await response.json();

        const processedData = rawData.map((item, index) => {
          const businessName = item.name || "Unknown Business";
          const normalizedBusinessName = normalizeName(businessName);
          const isBestOfOttawaAwardWinner = normalizedBobAwardWinnerNames.has(
            normalizedBusinessName
          );
          return {
            id: item.id || `gen-${index}`,
            rank: typeof item.rank === "number" ? item.rank : undefined,
            name: businessName,
            industry:
              item.industry ||
              (item.categories && item.categories[0]) ||
              "Unknown Industry",
            location: item.location || "Unknown Location",
            phoneNumber: item.phoneNumber || undefined,
            localEmployees:
              typeof item.localEmployees === "number"
                ? item.localEmployees
                : undefined,
            totalEmployees:
              typeof item.totalEmployees === "number"
                ? item.totalEmployees
                : undefined,
            yearFounded: item.founded, // Keep as number | string | undefined
            topLocalExecutive: item.topLocalExecutive || undefined,
            website: item.website || "#",
            description: item.description || "No description available.",
            logoUrl: item.logoUrl || item.svgUrl || undefined, // Prioritize logoUrl, then svgUrl for the Business type
            categories: item.categories || [],
            pageNumber:
              typeof item.pageNumber === "number" ? item.pageNumber : undefined,
            svgUrl: item.svgUrl || undefined, // Specifically store svgUrl
            bestAward: isBestOfOttawaAwardWinner,
          };
        });

        setAllBusinesses(processedData);
        setFilteredBusinesses(processedData);

        const industries = Array.from(
          new Set(processedData.map((b) => b.industry))
        )
          .filter(Boolean)
          .sort();
        setUniqueIndustries(
          industries.map((ind) => ({ value: ind, label: ind }))
        );

        const locations = Array.from(
          new Set(processedData.map((b) => b.location))
        )
          .filter(Boolean)
          .sort();
        setUniqueLocations(
          locations.map((loc) => ({ value: loc, label: loc }))
        );
      } catch (e) {
        console.error("Failed to fetch businesses:", e);
        setError(
          e instanceof Error
            ? e.message
            : "An unknown error occurred while fetching data."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  const parseYearFounded = (
    yearFoundedValue: number | string | undefined
  ): number => {
    const currentYear = new Date().getFullYear();
    if (typeof yearFoundedValue === "number") {
      return yearFoundedValue;
    }
    if (typeof yearFoundedValue === "string") {
      const yearMatch = yearFoundedValue.match(/\b(\d{4})\b/);
      if (yearMatch) return parseInt(yearMatch[1], 10);

      const forYearsMatch = yearFoundedValue.match(/For (\d+) years/i);
      if (forYearsMatch) return currentYear - parseInt(forYearsMatch[1], 10);

      const overYearsMatch = yearFoundedValue.match(/over (\d+)\+? years/i);
      if (overYearsMatch) return currentYear - parseInt(overYearsMatch[1], 10);

      const estYearsAgoMatch = yearFoundedValue.match(
        /Est\. (\d+)\+ years ago/i
      );
      if (estYearsAgoMatch)
        return currentYear - parseInt(estYearsAgoMatch[1], 10);

      if (!isNaN(parseInt(yearFoundedValue)))
        return parseInt(yearFoundedValue, 10);
    }
    return Number.MAX_SAFE_INTEGER; // Sort unparseable/undefined to the end for ASC
  };

  const applyFiltersAndSorting = useCallback(() => {
    let processedBusinesses = [...allBusinesses];

    // Apply search term
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      processedBusinesses = processedBusinesses.filter(
        (business) =>
          business.name.toLowerCase().includes(lowerSearchTerm) ||
          (business.description &&
            business.description.toLowerCase().includes(lowerSearchTerm)) ||
          (business.categories &&
            business.categories
              .join(" ")
              .toLowerCase()
              .includes(lowerSearchTerm))
      );
    }

    // Apply industry filter
    if (selectedIndustry) {
      processedBusinesses = processedBusinesses.filter(
        (business) => business.industry === selectedIndustry
      );
    }

    // Apply location filter
    if (selectedLocation) {
      processedBusinesses = processedBusinesses.filter(
        (business) => business.location === selectedLocation
      );
    }

    // Apply sorting
    switch (sortBy) {
      case SortOption.RANK_ASC:
        processedBusinesses.sort(
          (a, b) =>
            (a.rank ?? Number.MAX_SAFE_INTEGER) -
            (b.rank ?? Number.MAX_SAFE_INTEGER)
        );
        break;
      case SortOption.RANK_DESC:
        processedBusinesses.sort(
          (a, b) =>
            (b.rank ?? Number.MIN_SAFE_INTEGER) -
            (a.rank ?? Number.MIN_SAFE_INTEGER)
        );
        break;
      case SortOption.EMPLOYEES_ASC:
        processedBusinesses.sort(
          (a, b) =>
            (a.localEmployees ?? Number.MAX_SAFE_INTEGER) -
            (b.localEmployees ?? Number.MAX_SAFE_INTEGER)
        );
        break;
      case SortOption.EMPLOYEES_DESC:
        processedBusinesses.sort(
          (a, b) =>
            (b.localEmployees ?? Number.MIN_SAFE_INTEGER) -
            (a.localEmployees ?? Number.MIN_SAFE_INTEGER)
        );
        break;
      case SortOption.YEAR_FOUNDED_ASC: // Oldest first
        processedBusinesses.sort(
          (a, b) =>
            parseYearFounded(a.yearFounded) - parseYearFounded(b.yearFounded)
        );
        break;
      case SortOption.YEAR_FOUNDED_DESC: // Newest first
        processedBusinesses.sort(
          (a, b) =>
            parseYearFounded(b.yearFounded) - parseYearFounded(a.yearFounded)
        );
        break;
      case SortOption.NAME_ASC:
        processedBusinesses.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case SortOption.NAME_DESC:
        processedBusinesses.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // No specific sort, or maintain rank as default if SortOption.NONE
        if (
          sortBy === SortOption.NONE &&
          processedBusinesses.some((b) => b.rank !== undefined)
        ) {
          processedBusinesses.sort(
            (a, b) =>
              (a.rank ?? Number.MAX_SAFE_INTEGER) -
              (b.rank ?? Number.MAX_SAFE_INTEGER)
          );
        }
        break;
    }

    setFilteredBusinesses(processedBusinesses);
  }, [allBusinesses, searchTerm, selectedIndustry, selectedLocation, sortBy]);

  useEffect(() => {
    applyFiltersAndSorting();
  }, [applyFiltersAndSorting]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedIndustry("");
    setSelectedLocation("");
    setSortBy(SortOption.NONE);
  };

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-red-50 text-red-700">
        <Header />
        <main className="container mx-auto p-6 flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Oops! Something went wrong.
            </h2>
            <p>{error}</p>
            <p className="mt-2">
              Please ensure `data/businesses.json` exists, is valid JSON and is
              accessible.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8 flex-grow">
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8 sticky top-0 z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
            <div className="md:col-span-2 lg:col-span-4">
              <SearchBar
                searchTerm={searchTerm}
                onSearchTermChange={setSearchTerm}
              />
            </div>
            <FilterDropdown
              label="Industry"
              options={uniqueIndustries}
              selectedValue={selectedIndustry}
              onValueChange={setSelectedIndustry}
              defaultOptionLabel="All Industries"
            />
            <FilterDropdown
              label="Location"
              options={uniqueLocations}
              selectedValue={selectedLocation}
              onValueChange={setSelectedLocation}
              defaultOptionLabel="All Locations"
            />
            <FilterDropdown
              label="Sort By"
              options={sortOptions}
              selectedValue={sortBy}
              onValueChange={(val) => setSortBy(val as SortOption)}
              defaultOptionLabel="Default Order"
            />
            <button
              onClick={clearFilters}
              className="w-full bg-slate-600 hover:bg-slate-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <BusinessList businesses={filteredBusinesses} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
