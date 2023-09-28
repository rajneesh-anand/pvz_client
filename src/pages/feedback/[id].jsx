import Layout from "@components/layout";
import axios from "axios";
import FeedbackDetail from "@components/feedback/feedback-detail";
import Seo from "@components/common/seo";
import { getSession } from "next-auth/react";

export default function FeedbackDetailPage({ feedback }) {
  return (
    <>
      <Seo title="Feedback" description="Admin Dashboard" canonical="/" />
      <FeedbackDetail data={feedback} />
    </>
  );
}

FeedbackDetailPage.Layout = Layout;

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  const { id } = ctx.params;
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  } else {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_NODE_API_SERVER}/feedback/detail/${id}`
    );

    return {
      props: { feedback: data.data },
    };
  }
};
