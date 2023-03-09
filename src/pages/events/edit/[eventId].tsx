import React, { FormEvent, useState } from "react";

// outer lib import
// icons
import { FaImage } from "react-icons/fa";
// toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// style css import
import style from "../add.module.css";

// next import
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

// TypeScript type import
import { singleEvents } from "##";

// user create Components import
import Layout from "@/components/Layout/Layout";
import Model from "@/components/Model/Model";
import ImageUplod from "@/components/Model/ImageUplod";
import FormInput from "@/components/FormInput/FormInput";

const EidtEvent = (props: singleEvents) => {
  // Hooks section
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    props.image.data === null
      ? "/images/event-default.png"
      : props.image.data.attributes.url,
  );
  const [values, setvalues] = useState({
    id: `${props.id}`,
    name: props.name,
    slug: props.slug,
    venue: props.venue,
    address: props.address,
    performers: props.performers,
    date: new Date(props.date).toLocaleDateString("fr-CA"),
    time: props.time,
    description: props.description,
  });

  // from function section
  const onSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();

    // checking that all fileds is not empty
    const check = Object.values(values).every((w) => {
      if (typeof w === "object") {
        return true;
      }
      return w.length > 0;
    });
    // showing toast message about empty filed
    if (!check) {
      toast.error("Pleace fill all fileds!", {
        position: "top-center",
        theme: "colored",
      });
    } else {
      // updating data from the strapi
      const res = await fetch(`http://localhost:1337/api/events/${props.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: values }),
      });
      // if there is somting problem showing error message with toast
      if (!res.ok) {
        toast.error("Something went Worng!", {
          position: "top-center",
          theme: "colored",
        });
      } else {
        // if there is no problem push to the slug page
        const data = await res.json();
        router.push(`/events/${values.slug}`);
      }
    }
  };
  // seting input filed to the in state variable
  const setInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    // in if we are creating a slug with name and set to the state
    if (event.target.name === "name") {
      setvalues({
        ...values,
        slug: event.target.value
          .trim()
          .replaceAll(" ", "-")
          .toLocaleLowerCase(),
        [event.target.name]: event.target.value,
      });
      // here normaly seting input  to the state
    } else {
      setvalues({ ...values, [event.target.name]: event.target.value });
    }
  };
  // after image upload successfully this will run
  const imageuploaded = (e: any) => {
    setShowModal(false);
    setImageUrl(e[0].url);
  };
  return (
    <Layout>
      <>
        <Link href={"/events"}>Go Back</Link>
        <h1>Eidt Events</h1>
        <ToastContainer
          position='top-center'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='colored'
        />
        <form className={style.form} onSubmit={onSubmitHandler}>
          <FormInput values={values} setInput={setInput} />
          <input type='submit' value='Update Events' className='btn' />
        </form>
        <h2>Event Image</h2>
        <Image priority src={imageUrl} width='280' height='180' alt='' />
        <div>
          <button
            onClick={() => setShowModal(!showModal)}
            className='btn-secondary'
          >
            <FaImage /> save Image
          </button>
        </div>
        {showModal && (
          <Model title='Image Upload' onClose={() => setShowModal(false)}>
            <ImageUplod evtId={props.id} imageUploaded={imageuploaded} />
          </Model>
        )}
      </>
    </Layout>
  );
};

export default EidtEvent;

export const getServerSideProps = async (context: {
  query: { eventId: string };
}) => {
  const { eventId } = context.query;

  const response = await fetch(
    `http://localhost:1337/api/events?populate=*&filters[$and][0][id][$eq]=${eventId}`,
  );

  const fullData = await response.json();

  const data = { ...fullData.data[0].attributes, id: fullData.data[0].id };

  return {
    props: data,
  };
};
