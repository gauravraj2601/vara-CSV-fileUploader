import React, { useState } from "react";

const TableComponent = ({ columnKeys, values }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(id)) {
        return prevSelectedRows.filter((rowId) => rowId !== id);
      } else {
        return [...prevSelectedRows, id];
      }
    });
  };

  const isRowSelected = (id) => selectedRows.includes(id);

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-slate-200  dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {/* checkbox  head*/}
            {columnKeys.length > 0 && (
              <th scope="col" className="px-6 py-3">
                Select
              </th>
            )}
            {columnKeys?.map((col, index) => (
              <th
                scope="col"
                className="px-6 py-3"
                key={`product-${index + 1}`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {values?.map((valObj, i) => {
            const { id, data: val } = valObj;
            return (
              <tr
                className={`${
                  isRowSelected(id)
                    ? "bg-blue-100 dark:bg-blue-700"
                    : "bg-white dark:bg-gray-800"
                } border-b dark:border-gray-700`}
                key={`values-${i + 1}`}
              >
                {/* checkbox body */}
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <input
                    type="checkbox"
                    checked={isRowSelected(id)}
                    onChange={() => handleCheckboxChange(id)}
                  />
                </th>

                {val.map((el, ind) => {
                  return ind === 0 ? (
                    <th
                      key={`val${ind}`}
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {el}
                    </th>
                  ) : (
                    <td className="px-6 py-4" key={`val${ind}`}>
                      {el}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
