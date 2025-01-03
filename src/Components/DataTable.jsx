import React from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { Tooltip, Button } from 'antd';
import { FaArrowUp, FaArrowDown, FaSort } from 'react-icons/fa';

const DataTable = ({ columns, data, onEdit, onDelete }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // Updated: Use `page` instead of `rows` for paginated data
    prepareRow,
    canNextPage,
    canPreviousPage,
    nextPage,
    previousPage,
    setPageSize,
    pageCount,
    pageIndex,
    state: { pageSize },
  } = 
  useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
      manualPagination: false, // Ensure manualPagination is off for client-side pagination
    },
    useSortBy,
    usePagination
  );
  

  return (
    <div className="overflow-x-auto">
      <table {...getTableProps()} className="w-full table-auto bg-white shadow-md rounded-lg mt-6">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-300">
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-6 py-4 text-left text-[#000000] font-semibold max-w-[13rem]"
                >
                  <div className="flex items-center">
                    <Tooltip title={column.render('Header')} placement="topLeft" overlayStyle={{ maxWidth: '200px' }}>
                      <div className="truncate">{column.render('Header')}</div>
                    </Tooltip>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <FaArrowDown className="pl-2 text-gray-600" />
                      ) : (
                        <FaArrowUp className="pl-2 text-gray-600" />
                      )
                    ) : (
                      <FaSort className="pl-2 text-gray-600" />
                    )}
                  </div>
                </th>
              ))}
              <th className="px-6 py-4 text-left text-[#000000] font-semibold">Actions</th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="border-b">
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="px-6 py-4 max-w-[13rem]">
                    <Tooltip title={cell.value} placement="topLeft" overlayStyle={{ maxWidth: '200px' }}>
                      <div className="truncate max-w-[13rem]">{cell.render('Cell')}</div>
                    </Tooltip>
                  </td>
                ))}
                <td className="px-6 py-4 flex gap-2">
                  <Button
                    type="primary"
                    onClick={() => onEdit(row.original)}
                    style={{ backgroundColor: 'green', borderColor: 'green' }}
                  >
                    Edit
                  </Button>
                  <Button type="primary" danger onClick={() => onDelete(row.original.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex justify-between w-full mt-4">
        <div className="flex">
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="px-4 py-2 bg-white border rounded-md"
          >
            {[5, 10, 15].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center">
          <Button
            type="primary"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            style={{ backgroundColor: 'blue', borderColor: 'blue', color: 'white', fontWeight: 'bolder' }}
          >
            Previous
          </Button>
          <span className="px-4 py-2 text-[13px]">
            Page {pageIndex + 1} of {pageCount}
          </span>
          <Button
            type="primary"
            onClick={() => nextPage()}
            disabled={!canNextPage}
            style={{ backgroundColor: 'blue', borderColor: 'blue', color: 'white', fontWeight: 'bolder' }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
