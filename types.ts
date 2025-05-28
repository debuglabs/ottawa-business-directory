
export interface Business {
  id: string;
  rank?: number; // Made optional
  name: string;
  industry?: string; // Made optional
  location?: string; // Made optional
  phoneNumber?: string; // Made optional
  localEmployees?: number; // Made optional
  totalEmployees?: number; // Already optional
  yearFounded?: number | string; // Changed to number | string, made optional
  topLocalExecutive?: string; // Already optional
  website?: string; // Made optional
  description?: string; // Made optional
  logoUrl?: string; // Made optional
  categories?: string[]; // Added optional
  pageNumber?: number; // Added optional
  svgUrl?: string; // Added optional
  bestAward?: boolean;
}

export enum SortOption {
  NONE = '',
  RANK_ASC = 'rank_asc',
  RANK_DESC = 'rank_desc',
  EMPLOYEES_ASC = 'employees_asc',
  EMPLOYEES_DESC = 'employees_desc',
  YEAR_FOUNDED_ASC = 'yearFounded_asc', // Oldest first
  YEAR_FOUNDED_DESC = 'yearFounded_desc', // Newest first
  NAME_ASC = 'name_asc',
  NAME_DESC = 'name_desc',
}
