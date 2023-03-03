import Layout from "@/components/Layout/Layout";
import React from "react";
import { singleEvents } from "##";
import Style from "./Event.module.css";
import Link from "next/link";
import Image from "next/image";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
const EventPage = (props: singleEvents) => {
  const deleteEvent = () => {
    console.log("delete");
  };
  return (
    <Layout>
      <div className={Style.event}>
        <div className={Style.comtrols}>
          <Link href={`/events/edit/${props.id}`}>
            <FaPencilAlt />
          </Link>
          <Link href={"#"} onClick={deleteEvent} className={Style.delete}>
            <FaTimes /> Delete Event
          </Link>
        </div>
        <span>
          {props.date} at {props.time}
        </span>
        <h1>{props.name}</h1>
        {props.image && (
          <div className={Style.image}>
            <Image src={props.image} width='960' height='600' alt='' />
          </div>
        )}
        <h3>Performers</h3>
        <p>{props.performers}</p>
        <h3>Description</h3>
        <p>{props.description}</p>
        <h3>Venue : {props.venue}</h3>
        <p>{props.address}</p>

        <Link href={"/events"}>{"<<"}Back</Link>
      </div>
    </Layout>
  );
};

export default EventPage;

export const getServerSideProps = async (context: {
  query: { slug: string };
}) => {
  const { slug } = context.query;

  const response = await fetch(`http://localhost:3000/api/events/${slug}`);
  const data = await response.json();
  console.log(data[0]);

  return {
    props: data[0],
  };
};

// export const getStaticPaths = async () => {
//   const response = await fetch(`http://localhost:3000/api/events`);
//   const data = await response.json();
//   const paths = data["events"].map((evt: { slug: string }) => {
//     return {
//       params: { slug: evt.slug },
//     };
//   });
//   return {
//     paths,
//     fallback: false,
//   };
// };

// export const getStaticProps = async (context: { params: { slug: string } }) => {
//   const { slug } = context.params;
//   console.log(slug);

//   const response = await fetch(`http://localhost:3000/api/events/${slug}`);
//   const data = await response.json();
//   console.log(data[0]);

//   return {
//     props: data[0],
//   };
// };
