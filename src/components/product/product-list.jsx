import Link from "next/link";
import EditIcon from "@assets/icons/edit-icon";

const ProductList = ({ data }) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full overflow-hidden align-middle ">
              {data.length > 0 && (
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50 uppercase text-blue-600 ">
                      <th className="px-3 py-3 text-left text-xs font-medium leading-4 tracking-wider ">
                        Image
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium leading-4 tracking-wider ">
                        Name
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium leading-4 tracking-wider ">
                        Description
                      </th>
                      <th className="w-[136px] px-3 py-3 text-left text-xs font-medium leading-4 tracking-wider ">
                        Coin Value
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium leading-4 tracking-wider ">
                        Status
                      </th>

                      <th className="px-3 py-3 text-left text-xs font-medium leading-4 tracking-wider ">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white">
                    {data.map((item, index) => {
                      return (
                        <tr key={index} className="border-b border-gray-200">
                          <td className="whitespace-no-wrap px-3 py-4 ">
                            <div className="flex items-center">
                              <div className="text-sm font-medium leading-5 text-gray-900">
                                <img
                                  className="rounded-sm object-fill"
                                  src={
                                    item.image ??
                                    "/images/placeholder/avatar.svg"
                                  }
                                  width={128}
                                  height={128}
                                  alt={item.name}
                                />
                              </div>
                            </div>
                          </td>

                          <td className="whitespace-no-wrap px-3 py-4 ">
                            <div className="flex items-center">
                              <div className="text-sm font-medium leading-5 text-gray-900">
                                {item.name}
                              </div>
                            </div>
                          </td>

                          <td className="whitespace-no-wrap px-3 py-4 ">
                            <div className="flex items-center">
                              <div className="text-sm font-medium leading-5 text-gray-900 ">
                                {item.description}
                              </div>
                            </div>
                          </td>

                          <td className="whitespace-no-wrap px-3 py-4 ">
                            <div className="flex items-center">
                              <div className="text-sm font-medium leading-5 text-gray-900">
                                {item.coinValue}
                              </div>
                            </div>
                          </td>

                          <td className="whitespace-no-wrap px-3 py-4 ">
                            <div className="flex items-center">
                              <div
                                className={
                                  JSON.parse(item.status).value === "Active"
                                    ? "rounded-full bg-green-700 px-4 py-[2px] text-sm font-semibold leading-5 text-white"
                                    : "rounded-full bg-rose-700 px-4 py-[2px] text-sm font-semibold leading-5 text-white"
                                }
                              >
                                {JSON.parse(item.status).value}
                              </div>
                            </div>
                          </td>

                          <td className="whitespace-no-wrap px-3 py-4 ">
                            <div className="flex items-center">
                              <Link href={`/products/edit/${item.id}`}>
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
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-screen items-center justify-center">
          <p className="bg-rose-700 px-8  py-2 font-semibold text-white">
            No Products
          </p>
        </div>
      )}
    </>
  );
};

export default ProductList;
