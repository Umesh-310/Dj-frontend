import React, { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "@/components/Layout/Layout";
import style from "./add.module.css";
import Link from "next/link";
import FormInput from "@/components/FormInput/FormInput";
const formValue = {
  name: "",
  slug: "",
  venue: "",
  address: "",
  performers: "",
  date: "",
  time: "",
  description: "",
};
const Add = () => {
  const router = useRouter();
  const [values, setvalues] = useState(formValue);

  const onSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();

    const check = Object.values(values).every((w) => w.length > 0);
    if (!check) {
      toast.error("Pleace fill all fileds!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      const res = await fetch("http://localhost:1337/api/events/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: values }),
      });
      if (!res.ok) {
        toast.error("Something went Worng!", {
          position: "top-center",
          theme: "colored",
        });
      } else {
        const data = await res.json();
        setvalues(formValue);
        router.push(`/events/${values.slug}`);
      }
    }
  };
  const setInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (event.target.name === "name") {
      setvalues({
        ...values,
        slug: event.target.value
          .trim()
          .replaceAll(" ", "-")
          .toLocaleLowerCase(),
        [event.target.name]: event.target.value,
      });
    } else {
      setvalues({ ...values, [event.target.name]: event.target.value });
    }
  };

  return (
    <Layout>
      <>
        <Link href={"/events"}>Go Back</Link>
        <h1>Add Events</h1>
        <ToastContainer position='top-center' theme='colored' />
        <form className={style.form} onSubmit={onSubmitHandler}>
          <FormInput values={values} setInput={setInput} />
          <input type='submit' value='Add Events' className='btn' />
        </form>
      </>
    </Layout>
  );
};

export default Add;
