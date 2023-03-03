import Layout from "$/Layout/Layout";
import { events } from "##";
import EventItem from "@/components/eventsItem/EventItem";
import Link from "next/link";

function Home({ event }: events): JSX.Element {
  return (
    <Layout>
      <>
        <h1>Upcoming Events</h1>
        {event.length === 0 ? (
          <h3>No Events TO Show</h3>
        ) : (
          event.map((evt) => {
            return <EventItem key={evt.id} event={evt} />;
          })
        )}
        {event.length > 0 && (
          <Link className='btn-secondary' href={"/events"}>
            View All Events
          </Link>
        )}
      </>
    </Layout>
  );
}
export default Home;

export const getStaticProps = async () => {
  const response = await fetch("http://localhost:3000/api/events");
  const data = await response.json();
  return {
    props: {
      event: data["events"].slice(0, 3),
    },
    revalidate: 1,
  };
};
