import React from "react";
import style from "./DashboardEvent.module.css";
import { singleEvents } from "../Types/Types";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Link from "next/link";
type props = {
  event: singleEvents;
  handelDeleteEvent: (id: string) => void;
};
const DashboardEvent = ({ event, handelDeleteEvent }: props) => {
  return (
    <div className={style.event}>
      <h4>
        <Link href={`/events/${event.slug}`}>{event.name}</Link>
      </h4>
      <Link href={`/events/edit/${event.id}`} className={style.edit}>
        <FaPencilAlt /> <span>Edit Event</span>
      </Link>
      <Link
        href={`#`}
        onClick={() => handelDeleteEvent(event.id)}
        className={style.delete}
      >
        <FaTimes /> <span>Delete</span>
      </Link>
    </div>
  );
};

export default DashboardEvent;
