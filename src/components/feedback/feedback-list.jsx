import Link from "@components/ui/link";
import dayjs from "dayjs";
import EditIcon from "@assets/icons/edit-icon";

function maskMobileNumber(number) {
  return (
    "+7" +
    " " +
    number.slice(0, 3) +
    " " +
    number.slice(3, 6) +
    "-" +
    number.slice(6, 10)
  );
}
const FeedbackList = ({ data }) => {
  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                    Photo
                  </th>
                  <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                    Name
                  </th>
                  <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                    Mobile
                  </th>
                  <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                    Message
                  </th>
                  <th className="px-3 py-3 text-xs font-medium leading-4 tracking-wider text-left text-blue-600 uppercase border-b border-gray-200 bg-gray-50">
                    Date
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
                              className="rounded-md"
                              src={
                                item["photo"].image ??
                                "/images/placeholder/avatar.svg"
                              }
                              width="64"
                              height="64"
                              alt={item.name}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="flex items-center">
                          <div className="text-sm leading-5 ">{item.name}</div>
                        </div>
                      </td>

                      <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="flex items-center">
                          <div className="text-sm  leading-5  ">
                            {maskMobileNumber(item.mobile)}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="flex items-center">
                          <div className="text-sm leading-5 ">
                            {item.message}
                          </div>
                        </div>
                      </td>

                      <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="flex items-center">
                          <div className="text-sm leading-5 ">
                            {dayjs(item.createdAt).format("DD/MM/YYYY")}
                          </div>
                        </div>
                      </td>

                      <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
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

                      <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div className="flex items-center">
                          <Link href={`/feedback/${item.id}/`}>
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
    </>
  );
};

export default FeedbackList;
