import React from "react";
import { Business } from "../types";

interface BusinessCardProps {
  business: Business;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
  const currentYear = new Date().getFullYear();

  const displayYearFoundedInfo = (yearFounded?: number | string): string => {
    if (typeof yearFounded === "number") {
      if (yearFounded > 0 && yearFounded <= currentYear) {
        return `Founded in ${yearFounded} (${
          currentYear - yearFounded
        } years old)`;
      }
      return `Founded: ${yearFounded}`; // Or N/A if invalid year
    }
    if (typeof yearFounded === "string" && yearFounded.trim() !== "") {
      // Attempt to parse descriptive strings for age calculation if desired, or display as is
      const yearMatch = yearFounded.match(/\b(\d{4})\b/);
      if (yearMatch) {
        const year = parseInt(yearMatch[1], 10);
        if (year > 0 && year <= currentYear) {
          return `Founded in ${year} (${
            currentYear - year
          } years old) (Source: "${yearFounded}")`;
        }
      }
      const forYearsMatch = yearFounded.match(/For (\d+) years/i);
      if (forYearsMatch) {
        const years = parseInt(forYearsMatch[1], 10);
        return `Founded approx. ${currentYear - years} (${yearFounded})`;
      }
      const overYearsMatch = yearFounded.match(/over (\d+)\+? years/i);
      if (overYearsMatch) {
        const years = parseInt(overYearsMatch[1], 10);
        return `Founded over ${years} years ago (approx. ${
          currentYear - years
        })`;
      }
      const estYearsAgoMatch = yearFounded.match(/Est\. (\d+)\+ years ago/i);
      if (estYearsAgoMatch) {
        const years = parseInt(estYearsAgoMatch[1], 10);
        return `Established over ${years} years ago (approx. ${
          currentYear - years
        })`;
      }
      return `Founded: ${yearFounded}`;
    }
    return "Year Founded: N/A";
  };

  const getInitials = (name: string): string => {
    return (
      name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase() || "??"
    );
  };

  const avatarPlaceholder = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    business.name
  )}&background=random&color=fff&size=64`;
  const mainImagePlaceholder = `https://picsum.photos/seed/${business.id}/400/200`;

  return (
    <div className="bg-white rounded-xl shadow-lg  transform transition-all duration-300 hover:shadow-2xl hover:scale-105 flex flex-col h-full">
      <div className="relative">
        {/* <img
          className="w-full h-40 object-cover"
          src={business.svgUrl || business.logoUrl || mainImagePlaceholder}
          alt={`${business.name} background or logo`}
          onError={(e: { currentTarget: { src: string } }) =>
            (e.currentTarget.src = mainImagePlaceholder)
          }
        />
        <div
        className={`absolute bottom-0 left-0 p-3 ${
          business.logoUrl || business.svgUrl
          ? "bg-black bg-opacity-60"
          : "bg-gradient-to-t from-black to-transparent"
          } w-full flex items-center space-x-3`}
          >
          <img
          className="h-16 w-16 rounded-full border-2 border-white shadow-md object-contain bg-slate-200"
          src={business.logoUrl || avatarPlaceholder}
          alt={`${business.name} logo`}
          onError={(e: { currentTarget: { src: string } }) =>
          (e.currentTarget.src = avatarPlaceholder)
          }
          /> */}
        {business.rank !== undefined && business.rank !== null && (
          <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
            Rank #{business.rank}
          </div>
        )}
        {business.bestAward && (
          <div
            className="absolute top-2 left-2 bg-amber-500 text-white p-1.5 rounded-full shadow-lg flex items-center justify-center"
            title="Award Winner"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M15.28 3.22a.75.75 0 00-1.06 0L12 5.44l-2.22-2.22a.75.75 0 00-1.06 0L6.09 5.85C5.23 7.21 5 8.98 5 10.75c0 1.66.19 3.29.78 4.75a.75.75 0 001.44-.42A11.99 11.99 0 016.5 10.75c0-1.5.17-2.99.7-4.32l1.74 1.74a.75.75 0 001.06 0l2.22-2.22 2.22 2.22a.75.75 0 001.06 0l1.74-1.74c.53 1.33.7 2.81.7 4.32a11.99 11.99 0 01-.72 4.33.75.75 0 001.44.42c.59-1.46.78-3.09.78-4.75 0-1.77-.23-3.54-1.09-4.9l-2.63-2.63zM8.25 14a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0v-2.5a.75.75 0 01.75-.75zM11.75 14a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0v-2.5a.75.75 0 01.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}

        <h3
          className="text-xl font-bold text-center mt-1 p-6 text-gray-400 truncate"
          title={business.name}
        >
          {business.name}
        </h3>
        {/* </div> */}
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <p className="text-sm text-purple-600 font-semibold mb-1">
          {business.industry || "N/A"}
        </p>
        {business.categories && business.categories.length > 0 && (
          <p className="text-xs text-slate-500 mb-2">
            Categories: {business.categories.join(", ")}
          </p>
        )}
        <p className="text-slate-700 mt-1 text-sm leading-relaxed flex-grow">
          {business.description || "No description available."}
        </p>

        <div className="mt-4 space-y-2 text-sm text-slate-600">
          <div className="flex items-center" title="Location">
            <svg
              className="h-5 w-5 mr-2 text-slate-400 flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.145l.005-.002.001-.001L10 18.411l-.394.322a5.741 5.741 0 00.282.145l.005.002.001.001.006.003zM10 16.5c.09 0 .179.006.262.015C10.175 16.505 10.088 16.5 10 16.5z"
                clipRule="evenodd"
              />
              <path d="M4.084 13.089C5.585 14.542 7.58 15.5 10 15.5s4.415-.958 5.916-2.411A10.002 10.002 0 0010 3.5c-2.495 0-4.728.899-6.363 2.43A10.002 10.002 0 004.084 13.089zM10 5c2.038 0 3.86.728 5.257 1.921A8.501 8.501 0 0110 13.5c-1.55 0-2.982-.42-4.203-1.145A8.501 8.501 0 0110 5z" />
            </svg>
            <span className="truncate" title={business.location || "N/A"}>
              {business.location || "N/A"}
            </span>
          </div>
          {business.phoneNumber && (
            <div className="flex items-center" title="Phone Number">
              <svg
                className="h-5 w-5 mr-2 text-slate-400 flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M2 3.5A1.5 1.5 0 013.5 2h1.146a1.5 1.5 0 011.465 1.175l.716 3.578a1.5 1.5 0 01-1.052 1.767l-1.26.63A11.952 11.952 0 008.5 11.5c1.341 0 2.61-.306 3.723-.869l.63-1.26a1.5 1.5 0 011.767-1.052l3.578.716A1.5 1.5 0 0118 11.354V12.5A1.5 1.5 0 0116.5 14h-.428c-1.437 0-2.812.226-4.09.643A13.45 13.45 0 012.643 6.018C2.226 4.739 2 3.362 2 1.928V1.5A1.5 1.5 0 013.5 0h1.146C3.22 0 2 1.22 2 2.646V3.5zM1.5 6.924A13.498 13.498 0 007.076 12.5H8.5c.69 0 1.347-.055 1.98-.158l-.63 1.26a3 3 0 00-3.536 2.104L4.84 17.152a1.5 1.5 0 01-2.625-1.465l.716-3.578a1.5 1.5 0 00-1.052-1.767l-1.26-.63A1.5 1.5 0 011.5 6.924zM12.5 11.5a11.952 11.952 0 005.131-1.422l-.63-1.26a1.5 1.5 0 011.052-1.767l3.578-.716A1.5 1.5 0 0118 7.854V6.5A1.5 1.5 0 0016.5 5h-1.146c-1.428 0-2.646 1.22-2.646 2.646V11.5z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="truncate" title={business.phoneNumber}>
                {business.phoneNumber}
              </span>
            </div>
          )}
          <div className="flex items-center" title="Local Employees">
            <svg
              className="h-5 w-5 mr-2 text-slate-400 flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM1.396 16.71a8.01 8.01 0 0111.208 0 1.5 1.5 0 01-2.121 2.121 5.008 5.008 0 00-7.072-7.072 1.5 1.5 0 012.121-2.121zM12.293 15.293a1.5 1.5 0 012.121 0 8.011 8.011 0 010 11.208 1.5 1.5 0 01-2.12-2.121 5.008 5.008 0 000-7.072 1.5 1.5 0 010-2.12z" />
            </svg>
            {business.localEmployees ?? "N/A"} local employees{" "}
            {business.totalEmplpoyees && `(${business.totalEmployees} total)`}
          </div>
          <div className="flex items-center" title="Year Founded">
            <svg
              className="h-5 w-5 mr-2 text-slate-400 flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
                clipRule="evenodd"
              />
            </svg>
            {displayYearFoundedInfo(business.yearFounded)}
          </div>
          {business.topLocalExecutive && (
            <div className="flex items-center" title="Top Local Executive">
              <svg
                className="h-5 w-5 mr-2 text-slate-400 flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="truncate" title={business.topLocalExecutive}>
                {business.topLocalExecutive || "N/A"}
              </span>
            </div>
          )}
          {business.pageNumber !== undefined &&
            business.pageNumber !== null && (
              <div className="flex items-center" title="Page Number">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2 text-slate-400 flex-shrink-0"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 4.25A2.25 2.25 0 0 1 4.25 2h11.5A2.25 2.25 0 0 1 18 4.25v11.5A2.25 2.25 0 0 1 15.75 18H4.25A2.25 2.25 0 0 1 2 15.75V4.25ZM4.5 5a.75.75 0 0 0 0 1.5h11a.75.75 0 0 0 0-1.5h-11ZM9 7.75A.75.75 0 0 1 9.75 7h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 9 7.75Zm0 3.5A.75.75 0 0 1 9.75 11h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75Zm0 3.5A.75.75 0 0 1 9.75 14.5h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75Zm2.5-7A.75.75 0 0 0 11.5 7h3a.75.75 0 0 0 0-1.5h-3A.75.75 0 0 0 11.5 7Zm0 3.5A.75.75 0 0 0 11.5 11h3a.75.75 0 0 0 0-1.5h-3A.75.75 0 0 0 11.5 11Zm0 3.5A.75.75 0 0 0 11.5 14.5h3a.75.75 0 0 0 0-1.5h-3a.75.75 0 0 0-.75.75Zm-5-3.5A.75.75 0 0 1 6.75 11h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75ZM6 7.75A.75.75 0 0 1 6.75 7h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 6 7.75Z"
                    clipRule="evenodd"
                  />
                </svg>
                Page: {business.pageNumber}
              </div>
            )}
        </div>
      </div>

      <div className="p-6 pt-0 mt-auto">
        {business.website && business.website !== "#" ? (
          <a
            href={business.website}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Visit Website
          </a>
        ) : (
          <div className="space-y-2">
            <button
              type="button"
              disabled
              className="block w-full text-center bg-slate-400 text-slate-700 font-semibold py-3 px-4 rounded-lg cursor-not-allowed"
            >
              Website N/A
            </button>
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(
                `${business.name} ottawa`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Search on Google
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessCard;
