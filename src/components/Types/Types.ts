import { ReactElement } from "react";

export type LayoutProps = {
  children: ReactElement;
  title: string;
  description: string;
  keywords: string;
};
type OptionsFlags<image> = {
  [Property in keyof image]: string;
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
    image: {data :{attributes : {url : string}}};
}

export type eventProps = {
    event : OptionsFlags<singleEvents>;
}
