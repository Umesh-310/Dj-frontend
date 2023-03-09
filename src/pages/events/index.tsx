import Layout from "$/Layout/Layout";
import { singleEvents } from "##";
import EventItem from "@/components/eventsItem/EventItem";
import Link from "next/link";
type props = {
  page: number;
  event: singleEvents[];
};
function Events({ event, page }: props): JSX.Element {

  return (
    <Layout>
      <>
        <h1>Events</h1>
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
        <div className={'eventPagenation'}>
          {page > 1 && (
            <Link href={`events?page=${page - 1}`}>{"<< Prev"}</Link>
          )}
          <Link href={`events?page=${page + 1}`}>{"next >>"}</Link>
        </div>
      </>
    </Layout>
  );
}
export default Events;

export const getServerSideProps = async ({ query: { page = 1 } }) => {
  const pageNoumber = +page;
  const response = await fetch(
    `http://localhost:1337/api/events?populate=*&pagination[page]=${pageNoumber}&pagination[pageSize]=2`,
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
      page: pageNoumber,
    },
  };
};
