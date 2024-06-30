import moment, { Moment } from "moment";

export interface Events {
  Title: string;
  Publication_date: string;
  Description: string;
  Image: string[];
}

export interface EventItem {
    Title: string;
    Description: string;
    When: string;
    date_pub: moment.Moment; // or bigint
    photo: string[];
  }