import Link from 'next/link'

export default function ReuseableTable({ columns, data, rowKey }) {
  return (
    <div className="h-[75vh] pb-[1px] overflow-y-auto scrollbar-hide bg-[#ffffff] shadow-lg rounded-[16px]">
      <table className="table-auto w-full relative">
        <thead className="sticky top-0 bg-[#9798F5]">
          <tr className="text-left font-semibold text-white">
            {columns.map((col, i) => (
              <th key={i} className="px-4 py-4">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, rowIndex) => (
            <tr key={row[rowKey] || rowIndex} className="even:bg-[#9799f53f]">
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="pl-4 pr-[80px] py-2 align-top ">
                  {col.render ? col.render(row) : row[col.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
