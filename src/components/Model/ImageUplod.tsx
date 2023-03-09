import React, { useState } from "react";
import style from "./ImageUplod.module.css";
import styles from "../../pages/events/add.module.css";
type imgProps = {
  evtId: string;
  imageUploaded: (data : any) => void;
};
const ImageUplod = ({ evtId, imageUploaded }: imgProps) => {
  const [image, setImage] = useState<null | any>(null);

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const formData = new FormData();
    // // console.log(image);
    // formData.append("files", image);
    // formData.append("ref", "api/events");
    // formData.append("refId", evtId);
    // formData.append("field", "image");
    // console.log(formData);

    const res = await fetch(`http://localhost:1337/api/upload`, {
      method: "POST",
      body: new FormData(e.currentTarget),
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      imageUploaded(data);
    }
  };
  const handelFileChange = (e: any) => {
    setImage(e.target);
  };
  return (
    <div className={styles.form}>
      <h1>Image Uploaded</h1>
      <form onSubmit={handelSubmit}>
        <div className={styles.file}>
          <input type='file' name='files' onChange={handelFileChange} />
          <input hidden type='text' name='ref' value='api::event.event' />
          <input hidden type='text' name='refId' value={evtId} />
          <input hidden type='text' name='field' value='image' />
        </div>
        <input type='submit' value='Upload' className='btn' />
      </form>
    </div>
  );
};

export default ImageUplod;
