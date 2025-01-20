import React, { useState } from "react";
import ArrowDown from "./img/ic_arrow_down.png";
import ArrowDownSort from "./img/ic_sort.png";

export function ProductDropdown({ orderBy, setOrderBy }) {
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    { value: "recent", label: "최신순" },
    { value: "favorite", label: "좋아요순" },
  ];

  const handleOptionClick = (orderBy) => {
    setOrderBy(orderBy);
    setIsOpen(false);
  };

  return (
    <div className="relative w-28 lg:w-24 max-md:w-10 max-md:absolute max-md:right-0 max-md:top-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-10 px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg flex justify-between items-center whitespace-nowrap hover:bg-gray-100 focus:outline-none max-md:px-2 max-md:text-[0px]"
      >
        {options.find((option) => option.value === orderBy)?.label || "최신순"}
        <span
          className={`w-4 h-4 bg-center bg-no-repeat bg-contain
          }`}
          style={{
            backgroundImage: `url(${
              window.innerWidth <= 768 ? ArrowDownSort : ArrowDown
            })`,
          }}
        ></span>
      </button>

      {isOpen && (
        <ul className="absolute top-full left-[-30px] max-md:left-[-85px] w-32 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className="px-4 py-3 text-gray-900 cursor-pointer whitespace-nowrap hover:bg-gray-100 md:px-3 md:text-xs"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// export function ProductDropdown({ orderBy, setOrderBy }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const options = [
//     { value: "recent", label: "최신순" },
//     { value: "favorite", label: "좋아요순" },
//   ];

//   const handleOptionClick = (orderBy) => {
//     console.log("Clicked option value:", orderBy);
//     setOrderBy(orderBy);
//     setIsOpen(false);
//   };

//   return (
//     <DropdownContainer>
//       <DropdownButton onClick={() => setIsOpen(!isOpen)}>
//         {options.find((option) => option.value === orderBy)?.label || "최신순"}
//         <DropdownArrow isOpen={isOpen} />
//       </DropdownButton>

//       {isOpen && (
//         <DropdownMenu>
//           {options.map((option) => (
//             <DropdownItem
//               key={option.value}
//               onClick={() => handleOptionClick(option.value)}
//             >
//               {option.label}
//             </DropdownItem>
//           ))}
//         </DropdownMenu>
//       )}
//     </DropdownContainer>
//   );
// }

// const DropdownContainer = styled.div`
//   position: relative;
//   width: 120px;
//   @media (min-width: 1024px) {
//     width: 100px;
//   }

//   @media (max-width: 767px) {
//     width: 42px;
//     position: absolute;
//     right: -180px;
//     bottom: -5px;
//   }
// `;

// const DropdownButton = styled.button`
//   width: 100%;
//   height: 42px;
//   padding: 12px 16px;
//   font-size: 16px;
//   font-weight: 400;
//   color: #111827;
//   background-color: #ffffff;
//   border: 1px solid #e5e7eb;
//   border-radius: 8px;
//   cursor: pointer;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   white-space: nowrap;
//   &:focus {
//     outline: none;
//   }

//   @media (min-width: 1024px) {
//     font-size: 14px;
//     padding: 10px 14px;
//   }

//   @media (max-width: 767px) {
//     font-size: 12px;
//     padding: 6px 6px;
//     font-size: 0;
//     line-height: 0;
//   }
// `;

// const DropdownArrow = styled.span`
//   width: 16px;
//   height: 16px;
//   background-image: url(${ArrowDown});
//   background-repeat: no-repeat;
//   background-position: center;
//   background-size: contain;

//   @media (min-width: 1024px) {
//     width: 14px;
//     height: 14px;
//   }

//   @media (max-width: 767px) {
//     background-image: url(${ArrowDownSort});
//     width: 42px;
//     height: 42px;
//   }
// `;

// const DropdownMenu = styled.ul`
//   position: absolute;
//   top: 100%;
//   left: -85px;
//   width: 130px;
//   margin: 4px 0 0;
//   padding: 0;
//   list-style: none;
//   background: #ffffff;
//   border: 1px solid #e5e7eb;
//   border-radius: 8px;
//   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
//   z-index: 10;
// `;

// const DropdownItem = styled.li`
//   padding: 12px 16px;
//   font-size: 16px;
//   color: #111827;
//   cursor: pointer;
//   white-space: nowrap;

//   &:hover {
//     background-color: #f3f4f6;
//   }

//   @media (min-width: 1024px) {
//     font-size: 14px;
//     padding: 10px 14px;
//   }

//   @media (max-width: 767px) {
//     font-size: 12px;
//     padding: 8px 12px;
//   }
//   }
// `;
