import Layout from "@/components/Layout/Layout";
import { singleEvents } from "##";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import SlugModel from "@/components/slugModel/slugModel";
import { parseCookies } from "@/halper";
type props = { dataProps: singleEvents; jwt: string };
const EventPage = ({ dataProps, jwt }: props) => {
  const router = useRouter();

  const deleteEvent = async () => {
    if (confirm("Are you sure?")) {
      const res = await fetch(
        `http://localhost:1337/api/events/${dataProps.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
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
        <SlugModel data={dataProps} deleteEvent={deleteEvent} />
      </>
    </Layout>
  );
};

export default EventPage;

export const getServerSideProps = async (
  context: { query: { slug: string } },
  req: any,
) => {
  const { slug } = context.query;
  const { token } = parseCookies(req);
  const { jwt } = token ? JSON.parse(token) : { jwt: null };

  const response = await fetch(
    `http://localhost:1337/api/events?populate=*&filters[$and][0][slug][$eq]=${slug}`,
  );
  const fullData = await response.json();
  const data = { ...fullData.data[0].attributes, id: fullData.data[0].id };

  return {
    props: {
      dataProps: data,
      jwt: jwt,
    },
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
