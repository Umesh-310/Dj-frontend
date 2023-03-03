import React from "react";
import Styles from "./EventItem.module.css";
import Image from "next/image";
import { eventProps } from "##";
import Link from "next/link";

const EventItem = ( { event } : eventProps) => {

    
  return (
    <div className={Styles.event}>
      <div className={Styles.img}>
        <Image
          src={event.image ? event.image : "/images/event-default.png"}
          width='170'
          height='100'
          alt=''
          priority
        />
      </div>
      <div className={Styles.info}>
        <span>
          {event.date} at {event.time}
        </span>
        <h3>{event.name}</h3>
      </div>
      <div className={Styles.link}>
        <Link className={"btn"} href={`/events/${event.slug}`}>
          Details
        </Link>
      </div>
    </div>
  );
};

export default EventItem;
