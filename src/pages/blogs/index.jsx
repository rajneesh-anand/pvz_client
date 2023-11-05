import Layout from "@components/layout";
import axios from "axios";
// import ProductList from "@components/product/product-list";
import { getSession } from "next-auth/react";
import Seo from "@components/common/seo";
import Link from "@components/ui/link";

export default function BlogListPage({ blogList }) {
  return (
    <>
      <Seo title="Blogs" description="Blogs List" canonical="/blogs" />

      <div className="flex items-center justify-end mb-4">
        <Link
          href={`/blogs/create`}
          className="px-8 py-1.5 bg-indigo-700 text-white hover:bg-indigo-900"
        >
          Add Blog
        </Link>
      </div>

      {/* <ProductList data={productList} /> */}
    </>
  );
}

BlogListPage.Layout = Layout;

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
      `${process.env.NEXT_PUBLIC_NODE_API_SERVER}/blog/list?page=${pageNumber}`
    );
    console.log(data.blogs);
    return {
      props: { blogList: data.blogs },
    };
  }
};
