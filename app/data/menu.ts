export type SelectedItem = {
  name: string;
  description: string;
  image: string;
};

export type MenuItem = {
  name: string;
  subtitle?: string;
  clickable?: boolean;
  description?: string;
  image?: string;
};

export type SkewerOption = 200 | 300 | 500 | 700 | 1000;

export type ExperienceItem = {
  name: "Classic" | "Premium" | "Signature";
  description: string;
  selectionDescription: string;
  approximateMix: string;
  includes: string[];
  mostPopular?: boolean;
  prices: Record<SkewerOption, string>;
};

export const skewerOptions: SkewerOption[] = [200, 300, 500, 700, 1000];

export const sharedExperienceIncludes = [
  "Live binchotan grilling",
  "Setup & breakdown",
  "Professional cleanup",
];

export const experiences: ExperienceItem[] = [
  {
    name: "Classic",
    description:
      "Perfect for birthdays, family gatherings, and casual celebrations.",
    selectionDescription:
      "A classic-forward selection with a touch of premium specialties.",
    approximateMix: "80% Classic Yakitori • 20% Premium Yakitori",
    includes: ["Mostly classic yakitori", "A touch of premium selections"],
    prices: {
      200: "$1,500",
      300: "$2,000",
      500: "$2,600",
      700: "$3,200",
      1000: "$4,200",
    },
  },
  {
    name: "Premium",
    description:
      "Our most requested experience, balancing signature favorites with premium selections.",
    selectionDescription:
      "Our signature blend of classic favorites and premium specialties.",
    approximateMix: "70% Classic Yakitori • 30% Premium Yakitori",
    includes: ["Balanced premium selection", "Best overall value"],
    mostPopular: true,
    prices: {
      200: "$1,700",
      300: "$2,200",
      500: "$2,900",
      700: "$3,600",
      1000: "$4,700",
    },
  },
  {
    name: "Signature",
    description:
      "Designed for weddings, luxury events, and unforgettable dining experiences.",
    selectionDescription: "Our largest selection of premium specialties.",
    approximateMix: "60% Classic Yakitori • 40% Premium Yakitori",
    includes: [
      "Highest selection of premium skewers",
      "Ideal for upscale celebrations",
    ],
    prices: {
      200: "$1,900",
      300: "$2,500",
      500: "$3,300",
      700: "$4,100",
      1000: "$5,300",
    },
  },
];

export const menuA: MenuItem[] = [
  {
    name: "Negima",
    subtitle: "Chicken Thigh & Japanese Scallion",
    clickable: true,
    description:
      "Juicy chicken thigh and Japanese scallion grilled over binchotan.",
    image: "/negima-updated.jpg",
  },
  {
    name: "Tsukune",
    subtitle: "Chicken Meatball",
    clickable: true,
    description:
      "Hand-formed chicken meatball glazed with tare and grilled over binchotan.",
    image: "/tsukune-updated.jpg",
  },
  {
    name: "Chicken Heart",
    subtitle: "Chicken Heart",
    clickable: true,
    description: "Tender chicken heart grilled over binchotan.",
    image: "/chicken-heart-updated.jpg",
  },
  {
    name: "Chicken Gizzard",
    subtitle: "Chicken Gizzard",
    clickable: true,
    description: "Tender chicken gizzard grilled over binchotan.",
    image: "/chicken-gizzard-updated.jpg",
  },
  {
    name: "Chicken Wing",
    subtitle: "Whole Chicken Wing",
    clickable: true,
    description: "Juicy chicken wing grilled over binchotan.",
    image: "/chicken-wing-updated.jpg",
  },
  {
    name: "Mushroom",
    subtitle: "Grilled Mushroom",
    clickable: true,
    description: "Fresh mushroom grilled over binchotan.",
    image: "/mushroomv2.jpg",
  },
  {
    name: "Corn",
    subtitle: "Sweet Corn",
    clickable: true,
    description: "Sweet corn grilled over binchotan.",
    image: "/corn-updated.jpg",
  },
  {
    name: "Cherry Tomatoes",
    subtitle: "Charred Cherry Tomatoes",
    clickable: true,
    description: "Juicy cherry tomatoes grilled over binchotan.",
    image: "/cherry-tomatoes-updated.jpg",
  },
  {
    name: "Shishito Peppers",
    subtitle: "Grilled Shishito",
    clickable: true,
    description: "Delicate shishito peppers grilled over binchotan.",
    image: "/shishito-peppers-updated.jpg",
  },
];

export const menuB: MenuItem[] = [
  {
    name: "Harami",
    subtitle: "Outside Skirt Steak",
    clickable: true,
    description: "Tender outside skirt steak grilled over binchotan.",
    image: "/outside-skirt-steak.jpg",
  },
  {
    name: "Pork Belly",
    subtitle: "Charcoal-Grilled Pork Belly",
    clickable: true,
    description: "Tender pork belly grilled over binchotan.",
    image: "/pork-belly-updated.jpg",
  },
  {
    name: "Chicken Skin",
    subtitle: "Crispy Chicken Skin Skewer",
    clickable: true,
    description: "Crispy chicken skin grilled over binchotan.",
    image: "/chicken-skin-updated.jpg",
  },
  {
    name: "Bacon-Wrapped Shishito",
    subtitle: "Shishito Wrapped in Bacon",
    clickable: true,
    description:
      "Delicate shishito peppers wrapped in bacon and grilled over binchotan.",
    image: "/bacon-wrapped-shishito-updated.jpg",
  },
];
