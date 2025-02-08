import { IconDefinition } from "@fortawesome/free-brands-svg-icons";

export interface ContactInfoItemProps {
  icon: IconDefinition;
  value: string;
  name: string;
}

export interface FooterBottomProps {
  year: number | null;
}

export interface FooterNavLinkItemProps {
  linkKey: string;
  active: boolean;
  linkText: string;
}
