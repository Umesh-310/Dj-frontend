import { ReactElement } from "react";

export type LayoutProps = {
  children: ReactElement;
  title: string;
  description: string;
  keywords: string;
};
export type singleEvents = {
id: string;
    name: string;
    slug: string;
    venue: string;
    address: string;
    performers: string;
    date: string;
    time: string;
    description: string;
    image: string;
}
export type eventProps = {
    event : singleEvents;
}
export type events = {
  event: singleEvents[];
};