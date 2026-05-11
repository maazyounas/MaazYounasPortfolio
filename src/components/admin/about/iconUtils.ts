import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as DiIcons from "react-icons/di";
import * as TbIcons from "react-icons/tb";

export const AllIcons = {
  ...FaIcons,
  ...SiIcons,
  ...DiIcons,
  ...TbIcons,
};

export const getIconComponent = (iconName: string) => {
  return AllIcons[iconName as keyof typeof AllIcons];
};
