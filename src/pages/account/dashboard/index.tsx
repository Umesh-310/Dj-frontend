import Layout from "@/components/Layout/Layout";
import { parseCookies } from "../../../halper";
import React from "react";

const Dashboard = ({ events }: any) => {
  console.log(events);

  return (
    <Layout>
      <div>Dashboard</div>
    </Layout>
  );
};

export default Dashboard;
export const getServerSideProps = async ({ req }: any) => {
  const { token } = parseCookies(req);
  const { id } = JSON.parse(token);
  console.log(id);

  const response = await fetch(`http://localhost:1337/api/events?populate=*?&filters[$and][0][user][id][$eq]=${id}`, {
    method: "GET",
  });
  const events = await response.json();
  // const fullData = await response.json();
  // const data = { ...fullData.data[0].attributes, id: fullData.data[0].id };

  return {
    props: {
      events,
    },
  };
};
