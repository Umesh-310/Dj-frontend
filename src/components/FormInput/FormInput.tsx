import React from "react";
import style from "../../pages/events/add.module.css";
type props = {
  values: {
    [key: string]: string;
  };
  setInput: (e: any) => void;
};
const FormInput = ({ values, setInput }: props) => {
  return (
    <>
      <div className={style.grid}>
        <div>
          <label htmlFor='name'>Event Name</label>
          <input
            type='text'
            name='name'
            value={values.name}
            onChange={setInput}
            placeholder='name'
          />
        </div>
        <div>
          <label htmlFor='name'>Event Venue</label>
          <input
            type='text'
            name='venue'
            value={values.venue}
            onChange={setInput}
            placeholder='venue'
          />
        </div>
        <div>
          <label htmlFor='name'>Event Address</label>
          <input
            type='text'
            name='address'
            value={values.address}
            onChange={setInput}
            placeholder='address'
          />
        </div>
        <div>
          <label htmlFor='name'>Event Performers</label>
          <input
            type='text'
            name='performers'
            value={values.performers}
            onChange={setInput}
            placeholder='performers'
          />
        </div>
        <div>
          <label htmlFor='name'>Event Date</label>
          <input
            type='date'
            name='date'
            value={values.date}
            onChange={setInput}
            placeholder='date'
          />
        </div>
        <div>
          <label htmlFor='name'>Event Time</label>
          <input
            type='text'
            name='time'
            value={values.time}
            onChange={setInput}
            placeholder='time'
          />
        </div>
      </div>
      <div>
        <label htmlFor='description'>Event Description</label>
        <textarea
          name='description'
          id='description'
          value={values.description}
          onChange={setInput}
          placeholder='description'
        ></textarea>
      </div>
    </>
  );
};

export default FormInput;
