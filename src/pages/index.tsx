import Layout from "$/Layout/Layout";
import { singleEvents } from "##";
import EventItem from "@/components/eventsItem/EventItem";
import Link from "next/link";
type props = {
  event: singleEvents[];
};
function Home({ event }: props) {
  return (
    <Layout>
      <>
        <h1>Upcoming Events</h1>
        {event.length === 0 ? (
          <h3>No Events TO Show</h3>
        ) : (
          event.map((evt) => {
            const evet = {
              ...evt,
              image:
                evt.image.data === null
                  ? "/images/event-default.png"
                  : evt.image.data.attributes.url,
            };

            return <EventItem key={evt.id} event={evet} />;
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
  const response = await fetch(
    "http://localhost:1337/api/events?populate=*&sort=date:ASC&pagination[page]=1&pagination[pageSize]=4",
  );
  const { data } = await response.json();

  const event = data.map((eve: { [x: string]: any }) => {
    return {
      id: eve["id"],
      ...eve["attributes"],
    };
  });

  return {
    props: {
      event: event,
    },
    revalidate: 1,
  };
};
