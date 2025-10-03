import React from 'react'

const Banner3 = ({ rows }) => {
  return (
    <div className=" bg-white border-2 border-[#CBCCFA] rounded-[16px] px-[16px]  py-[8px] shadow-lg w-[242px] flex flex-col justify-center items-center">
      <table className="w-full">
        <tbody>
          {rows.map((item, index) => (
            <tr key={index}>
              <td className="pb-[8px]">{item.label}</td>
              <td className="pb-[8px]">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Banner3
