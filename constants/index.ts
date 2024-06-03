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
  // title: "",
  // description: '',
  // location: '',
  // imageUrl: '',
  // startDateTime: new Date(),
  // endDateTime: new Date(),
  // categoryId: "",
  surfingLevel: "",
  budget: "",
  waterTemp: "",
  monthToTravel: "",
  // price: '',
  // isFree: false,
  // url: '',
};

export const SURFING_LEVEL_LABEL = "Surfing Level";
export const BUDGET_LABEL = "Budget";
export const WATER_TEMP_LABEL = "Water Temperature";
export const MONTH_LABEL = "Month To Travel";

const optionKeys = [ "surfingLevel", "budget", "waterTemp", "monthToTravel"] as const;
export type OptionKeys = typeof optionKeys[number];