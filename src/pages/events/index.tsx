import Layout from "$/Layout/Layout";
import { events } from "##";
import EventItem from "@/components/eventsItem/EventItem";

function Events({ event }: events): JSX.Element {
  return (
    <Layout>
      <>
        <h1>Events</h1>
        {event.length === 0 ? (
          <h3>No Events TO Show</h3>
        ) : (
          event.map((evt) => {
            return <EventItem key={evt.id} event={evt} />;
          })
        )}
      </>
    </Layout>
  );
}
export default Events;

export const getStaticProps = async () => {
  const response = await fetch("http://localhost:3000/api/events");
  const data = await response.json();

  return {
    props: {
      event: data["events"],
    },
    revalidate: 1,
  };
};
