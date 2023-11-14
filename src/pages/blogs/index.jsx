import React, { useState } from "react";
import Layout from "@components/layout";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import ErrorMessage from "@components/common/error";
import Spinner from "@components/ui/spinner";
import { getSession } from "next-auth/react";
import Seo from "@components/common/seo";
import Link from "@components/ui/link";
import { useBlogQuery } from "@framework/blog-query";
import useAxiosAuth from "@framework/useAxiosAuth";
import { useQuery } from "react-query";
import { mapPaginatorData } from "@framework/data-mapper";

const BlogList = dynamic(() => import("@components/blog/blog-list"), {
  ssr: false,
});

export default function BlogListPage() {
  const http = useAxiosAuth();
  const [page, setPage] = useState(1);
  const { query } = useRouter();

  const fetchBlogs = async ({ queryKey }) => {
    const [_key, _params] = queryKey;
    const { page, limit } = _params;

    const {
      data: { blogs, ...rest },
    } = await http.get(`/blog/list?limit=${limit}&page=${page}`);

    return {
      blogs: { blogs, paginatorInfo: mapPaginatorData({ ...rest }) },
    };
  };

  const {
    data,
    isLoading: loading,
    error,
  } = useQuery(
    [
      ,
      {
        limit: 12,
        page,
        ...query,
      },
    ],
    fetchBlogs,
    {
      keepPreviousData: true,
    }
  );

  console.log(data);

  function handlePagination(current) {
    setPage(current);
  }
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
      {loading && <Spinner text="Loading" />}
      {error && <ErrorMessage message={error.message} />}
      {data && <BlogList data={data?.blogs} onPagination={handlePagination} />}
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
    return {
      props: {},
    };
  }
};
