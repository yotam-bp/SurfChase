export const headerLinks = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Search",
    route: "/events/create",
  },
  {
    label: "My Profile",
    route: "/profile",
  },
];

export const eventDefaultValues = {
  title: "",
  // description: '',
  // location: '',
  // imageUrl: '',
  // startDateTime: new Date(),
  // endDateTime: new Date(),
  categoryId: "",
  surfingLevel: "",
  budget: "",
  waterTemp: "",
  // price: '',
  // isFree: false,
  // url: '',
};

export const SURFING_LEVEL_LABEL = "Surfing Level";
export const BUDGET_LABEL = "Budget";
export const WATER_TEMP_LABEL = "Water Temperature";

const optionKeys = [ "surfingLevel", "budget", "waterTemp"] as const;
export type OptionKeys = typeof optionKeys[number];