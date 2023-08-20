import Layout from "@components/layout";
import axios from "axios";
import UserList from "@components/user/user-list";
import { getSession } from "next-auth/react";
import Seo from "@components/common/seo";

export default function HomePage({ users }) {
  return (
    <>
      <Seo title="Dashboard" description="Admin Dashboard" canonical="/" />
      <UserList data={users} />
    </>
  );
}

HomePage.Layout = Layout;

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  } else {
    const { page } = ctx.query;
    const pageNumber = page ? page : 1;
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_NODE_API_SERVER}/user/user-list?limit=50&page=${pageNumber}`
    );

    return {
      props: { users: data.users },
    };
  }
};
