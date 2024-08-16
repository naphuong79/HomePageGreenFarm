

function ClientProductsYour() {
  return (
    <div className="border border-[#a0a0a0] p-5">
      <h1 className="text-xl pb-4">Đơn hàng của bạn</h1>
      <div>
        <table class="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Name
                </p>
              </th>
              <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Job
                </p>
              </th>
              <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Employed
                </p>
              </th>
              <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70"></p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="p-4">
                <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  John Michael
                </p>
              </td>
              <td class="p-4">
                <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">Manager</p>
              </td>
              <td class="p-4">
                <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  23/04/18
                </p>
              </td>
              <td class="p-4">
                <a href="#" class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                  Edit
                </a>
              </td>
            </tr>
            <tr>
              <td class="p-4">
                <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  John Michael
                </p>
              </td>
              <td class="p-4">
                <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">Manager</p>
              </td>
              <td class="p-4">
                <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  23/04/18
                </p>
              </td>
              <td class="p-4">
                <a href="#" class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                  Edit
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClientProductsYour;
