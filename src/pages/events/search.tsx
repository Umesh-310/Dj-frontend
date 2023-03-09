import Layout from "$/Layout/Layout";
import { singleEvents } from "##";
import EventItem from "@/components/eventsItem/EventItem";
import { useRouter } from "next/router";
import Link from "next/link";

function SearchPage({ event }: { event: singleEvents[] }): JSX.Element {
  const router = useRouter();
  return (
    <Layout>
      <>
        <Link href='/events'>Go Back</Link>
        <h1>Search Result for {router.query.trem}</h1>
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
      </>
    </Layout>
  );
}
export default SearchPage;

export const getServerSideProps = async (context: {
  query: { term: string };
}) => {
  const { term } = context.query;
  const response = await fetch(
    `http://localhost:1337/api/events?populate=*&_q=${term}`,
  ); //
  const { data } = await response.json();

  const event = data.map((eve: { [x: string]: singleEvents }) => {
    return eve["attributes"];
  });

  return {
    props: {
      event: event,
    },
  };
};
