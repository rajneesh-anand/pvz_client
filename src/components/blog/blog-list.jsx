import React from "react";
import Pagination from "@components/ui/pagination";
import Link from "@components/ui/link";
import dayjs from "dayjs";
import EditIcon from "@assets/icons/edit-icon";

const BlogList = ({ data, onPagination }) => {
  const { blogs, paginatorInfo } = data ?? {};

  return (
    <>
      {blogs.length > 0 ? (
        <>
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full overflow-hidden align-middle ">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50 text-blue-600 uppercase ">
                      <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left ">
                        Photo
                      </th>
                      <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left ">
                        Title
                      </th>
                      <th className="w-[132px] px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left ">
                        Description
                      </th>

                      <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left ">
                        Date
                      </th>
                      <th className="w-[148px] px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left ">
                        Status
                      </th>

                      <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left ">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white">
                    {blogs.map((item, index) => {
                      return (
                        <tr key={index} className="border-b border-gray-200">
                          <td className="px-3 py-4 whitespace-no-wrap ">
                            <div className="flex items-center">
                              <div className="text-sm font-medium leading-5 text-gray-900">
                                <img
                                  className="rounded-md"
                                  src={
                                    item.image ??
                                    "/images/placeholder/avatar.svg"
                                  }
                                  width="64"
                                  height="64"
                                  alt={item.title}
                                />
                              </div>
                            </div>
                          </td>

                          <td className="px-3 py-4 whitespace-no-wrap ">
                            <div className="flex items-center">
                              <div className="text-sm leading-5 ">
                                {item.title}
                              </div>
                            </div>
                          </td>

                          <td className="px-3 py-4 whitespace-no-wrap ">
                            <div className="flex items-center">
                              <div className="text-sm leading-5 ">
                                {item.description}
                              </div>
                            </div>
                          </td>

                          <td className="px-3 py-4 whitespace-no-wrap ">
                            <div className="flex items-center">
                              <div className="text-sm leading-5 ">
                                {dayjs(item.createdAt).format("DD/MM/YYYY")}
                              </div>
                            </div>
                          </td>

                          <td className="px-3 py-4 whitespace-no-wrap ">
                            <div className="flex items-center">
                              <div
                                className={
                                  item.status === "Published"
                                    ? "rounded-full text-sm font-semibold leading-5 py-[2px] px-4 bg-green-700 text-white"
                                    : "rounded-full text-sm font-semibold leading-5 py-[2px] px-4 bg-rose-700 text-white"
                                }
                              >
                                {item.status}
                              </div>
                            </div>
                          </td>

                          <td className="px-3 py-4 whitespace-no-wrap ">
                            <div className="flex items-center">
                              <Link href={`/blogs/edit/${item.id}/`}>
                                <EditIcon
                                  className="text-xl lg:text-2xl"
                                  color="#000000"
                                />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {!!paginatorInfo.total && (
            <div className="flex justify-center items-center  py-4 my-2">
              <Pagination
                total={paginatorInfo.total}
                current={paginatorInfo.currentPage}
                pageSize={paginatorInfo.perPage}
                onChange={onPagination}
                showLessItems
              />
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <p className="bg-rose-700 font-semibold  py-2 px-8 text-white">
            No Blogs
          </p>
        </div>
      )}
    </>
  );
};

export default BlogList;
