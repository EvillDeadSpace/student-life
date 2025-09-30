import {
  AcademicCapIcon,
  HomeIcon,
  CurrencyDollarIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

export interface Category {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon: typeof AcademicCapIcon;
  color: string;
  hoverColor: string;
}

export const categories: Category[] = [
  {
    id: 1,
    title: "Fakultet",
    slug: "fakultet",
    description:
      "Informacije o fakultetima, upisima, studijskim programima i akademskim mogućnostima",
    icon: AcademicCapIcon,
    color: "from-blue-500 to-blue-600",
    hoverColor: "hover:from-blue-600 hover:to-blue-700",
  },
  {
    id: 2,
    title: "Studentski dom",
    slug: "studentski-dom",
    description:
      "Smještaj, uslovi života, prijave za dom i sve o studentskom stanovanju",
    icon: HomeIcon,
    color: "from-green-500 to-green-600",
    hoverColor: "hover:from-green-600 hover:to-green-700",
  },
  {
    id: 3,
    title: "Stipendije",
    slug: "stipendije",
    description:
      "Dostupne stipendije, uslovi za prijavu, rokovi i finansijska podrška",
    icon: CurrencyDollarIcon,
    color: "from-purple-500 to-purple-600",
    hoverColor: "hover:from-purple-600 hover:to-purple-700",
  },
  {
    id: 4,
    title: "Praksa i posao",
    slug: "praksa-i-posao",
    description:
      "Studentske prakse, part-time poslovi i mogućnosti za karijerni razvoj",
    icon: BriefcaseIcon,
    color: "from-orange-500 to-orange-600",
    hoverColor: "hover:from-orange-600 hover:to-orange-700",
  },
];
