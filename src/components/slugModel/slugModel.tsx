import Link from "next/link";
import React from "react";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Style from "../../pages/events/Event.module.css";
import Image from "next/image";
import { singleEvents } from "../Types/Types";
type props = {
  data: singleEvents;
  deleteEvent: () => void;
};
const SlugModel = ({ data, deleteEvent }: props) => {
  return (
    <div className={Style.event}>
      <div className={Style.controls}>
        <Link href={`/events/edit/${data.id}`}>
          <FaPencilAlt />
          Edit Event
        </Link>
        <Link href={"#"} onClick={deleteEvent} className={Style.delete}>
          <FaTimes /> Delete Event
        </Link>
      </div>
      <span>
        {new Date(data.date).toLocaleDateString("en-US")} at {data.time}
      </span>
      <h1>{data.name}</h1>
      {data.image && (
        <div className={Style.image}>
          {
            <Image
              priority
              src={
                data.image.data === null
                  ? "/images/event-default.png"
                  : data.image.data.attributes.url
              }
              width='960'
              height='600'
              alt=''
            />
          }
        </div>
      )}
      <h3>Performers</h3>
      <p>{data.performers}</p>
      <h3>Description</h3>
      <p>{data.description}</p>
      <h3>Venue : {data.venue}</h3>
      <p>{data.address}</p>

      <Link href={"/events"}>{"<<"}Back</Link>
    </div>
  );
};

export default SlugModel;
