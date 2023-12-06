import Layout from "@components/layout";
import axios from "axios";
import ProductList from "@components/product/product-list";
import { getSession } from "next-auth/react";
import Seo from "@components/common/seo";

export default function ProductListPage({ productList }) {
  return (
    <>
      <Seo title="Products" description="Products List" canonical="products" />
      <ProductList data={productList} />
    </>
  );
}

ProductListPage.Layout = Layout;

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
      `${process.env.NEXT_PUBLIC_NODE_API_SERVER}/product/list?page=${pageNumber}`
    );

    return {
      props: { productList: data.data },
    };
  }
};
