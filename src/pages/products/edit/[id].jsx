import Layout from "@components/layout";
import axios from "axios";
import EditProductForm from "@components/product/edit-product";
import Seo from "@components/common/seo";

export default function ProductEditPage({ product }) {
  return (
    <>
      <Seo
        title="Product Edit"
        description="Product Edit"
        canonical="/product/edit"
      />
      <EditProductForm data={product} />
    </>
  );
}

ProductEditPage.Layout = Layout;

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params;

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_NODE_API_SERVER}/product/edit/${id}`
  );

  return {
    props: { product: data.data },
  };
};
