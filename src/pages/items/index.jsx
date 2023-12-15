import Layout from "@components/layout";
import axios from "axios";
import ItemList from "@components/item/item-list";
import { getSession } from "next-auth/react";
import Seo from "@components/common/seo";
import ItemListTwo from "@components/item/item-list-two";

export default function ItemListPage({ itemList }) {
  return (
    <>
      <Seo title="Items" description="Items List" canonical="/items" />
      {/* <ItemList data={itemList} /> */}
      <ItemListTwo />
    </>
  );
}

ItemListPage.Layout = Layout;

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
      `${process.env.NEXT_PUBLIC_NODE_API_SERVER}/item/list?page=${pageNumber}`
    );

    return {
      props: { itemList: data.data },
    };
  }
};
