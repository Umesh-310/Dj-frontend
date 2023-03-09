import Layout from "@/components/Layout/Layout";
import { singleEvents } from "##";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import SlugModel from "@/components/slugMModel.tsx/slugModel";

const EventPage = (props: singleEvents) => {
  const router = useRouter();

  const deleteEvent = async () => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`http://localhost:1337/api/events/${props.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        router.push(`/events`);
      } else {
        toast(data.error.message, {
          position: "top-center",
          autoClose: 5000,
          theme: "dark",
        });
      }
    }
  };
  return (
    <Layout>
      <>
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
        <SlugModel data={props} deleteEvent={deleteEvent} />
      </>
    </Layout>
  );
};

export default EventPage;

export const getServerSideProps = async (context: {
  query: { slug: string };
}) => {
  const { slug } = context.query;

  const response = await fetch(
    `http://localhost:1337/api/events?populate=*&filters[$and][0][slug][$eq]=${slug}`,
  );
  const fullData = await response.json();
  const data = { ...fullData.data[0].attributes, id: fullData.data[0].id };

  return {
    props: data,
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

//   const response = await fetch(`http://localhost:3000/api/events/${slug}`);
//   const data = await response.json();


//   return {
//     props: data[0],
//   };
// };
