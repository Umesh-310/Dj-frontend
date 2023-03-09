import Layout from "@/components/Layout/Layout";
import { parseCookies } from "../../../halper";
import style from "./Dashboard.module.css";
import React from "react";
import DashboardEvent from "@/components/Dashboard/DashboardEvent";
import { singleEvents } from "@/components/Types/Types";
type props = {
  events: {
    id: string;
    attributes: singleEvents;
  }[];
};
const Dashboard = ({ events }: props) => {
  console.log(events);

  const deleteEvent = (id: string) => {
    console.log(id);
  };

  return (
    <Layout>
      <div className={style.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>

        {events.map((evt) => {
          return (
            <DashboardEvent
              key={evt.id}
              event={{ ...evt.attributes, id: evt.id }}
              handelDeleteEvent={deleteEvent}
            />
          );
        })}
      </div>
    </Layout>
  );
};

export default Dashboard;
export const getServerSideProps = async ({ req }: any) => {
  const { token } = parseCookies(req);
  const { id } = JSON.parse(token);
  console.log(id);

  const response = await fetch(
    `http://localhost:1337/api/events?populate=*?&filters[$and][0][user][id][$eq]=${id}`, //?populate=*?&filters[$and][0][user][id][$eq]=${id}
    {
      method: "GET",
    },
  );
  const events = await response.json();
  // const fullData = await response.json();
  // const data = { ...fullData.data[0].attributes, id: fullData.data[0].id };
  console.log(events);
  
  return {
    props: {
      events: events.data,
    },
  };
};
