import Layout from "@components/layout";
import { getSession } from "next-auth/react";
import Seo from "@components/common/seo";
import dynamic from "next/dynamic";

const AddProductForm = dynamic(() =>
  import("@components/product/create-product")
);

export default function ProductCreatePage() {
  return (
    <>
      <Seo
        title="Add Product"
        description="Add product"
        canonical="/product/create"
      />
      <AddProductForm />
    </>
  );
}

ProductCreatePage.Layout = Layout;

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
    return {
      props: {},
    };
  }
};
