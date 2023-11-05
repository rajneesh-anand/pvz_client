import Layout from "@components/layout";
import axios from "axios";
import Seo from "@components/common/seo";
import dynamic from "next/dynamic";

const EditItemForm = dynamic(() => import("@components/item/edit-item"));

export default function ItemEditPage({ product }) {
  return (
    <>
      <Seo
        title="Product Edit"
        description="Product Edit"
        canonical="/product/edit"
      />
      <EditItemForm data={product} />
    </>
  );
}

ItemEditPage.Layout = Layout;

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params;

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_NODE_API_SERVER}/item/edit/${id}`
  );

  return {
    props: { product: data.data },
  };
};
