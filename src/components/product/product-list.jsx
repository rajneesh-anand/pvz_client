import Link from "@components/ui/link";

const ProductList = ({ data }) => {
  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
            {data.length > 0 && (
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                      Image
                    </th>
                    <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                      Name
                    </th>
                    <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                      Description
                    </th>
                    <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                      Coin Value
                    </th>
                    <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                      Status
                    </th>

                    <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white">
                  {data.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center">
                            <div className="text-sm font-medium leading-5 text-gray-900">
                              <img
                                className="rounded-sm object-fill"
                                src={
                                  item.image ?? "/images/placeholder/avatar.svg"
                                }
                                width={128}
                                height={128}
                                alt={item.name}
                              />
                            </div>
                          </div>
                        </td>

                        <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center">
                            <div className="text-sm font-medium leading-5 text-gray-900">
                              {item.name}
                            </div>
                          </div>
                        </td>

                        <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center">
                            <div className="text-sm font-medium leading-5 text-gray-900 ">
                              {item.description}
                            </div>
                          </div>
                        </td>

                        <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center">
                            <div className="text-sm font-medium leading-5 text-gray-900">
                              {item.coinValue}
                            </div>
                          </div>
                        </td>

                        <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center">
                            <div
                              className={
                                JSON.parse(item.status).value === "Active"
                                  ? "rounded-full text-sm font-semibold leading-5 py-[2px] px-4 bg-green-700 text-white"
                                  : "rounded-full text-sm font-semibold leading-5 py-[2px] px-4 bg-rose-700 text-white"
                              }
                            >
                              {JSON.parse(item.status).value}
                            </div>
                          </div>
                        </td>

                        <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                          <div className="flex items-center">
                            <Link
                              href={`/products/edit/${item.id}`}
                              className="px-8 py-1.5 bg-yellow text-white hover:bg-orange"
                            >
                              Edit
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
    </>
  );
};

export default ProductList;
