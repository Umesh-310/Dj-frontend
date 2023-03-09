import React from "react";
import style from "./model.module.css";
import { FaTimes } from "react-icons/fa";
type ModelProps = {
  onClose: () => void;
  children: React.ReactNode;
  title: string;
};
const Model = ({ onClose, children, title }: ModelProps) => {
  const handleClose = () => {
    onClose();
  };
  return (
    <div className={style.container}>
      <div className={style.model}>
        <div className={style.header}>
          <b onClick={handleClose}>
            <FaTimes />
          </b>
        </div>
        <div>{title}</div>
        <div className={style.body}> {children}</div>
      </div>
    </div>
  );
};

export default Model;
