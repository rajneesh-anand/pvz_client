import Layout from "@components/layout";
import AddProductForm from "@components/product/create-product";
import { getSession } from "next-auth/react";
import Seo from "@components/common/seo";

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
