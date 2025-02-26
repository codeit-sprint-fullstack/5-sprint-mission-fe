type MenuItem = {
  label: string;
  onClick: () => void;
};

interface MenuProps {
  menuItems: MenuItem[];
}

export default function menu({ menuItems }: MenuProps) {
  return (
    <ul className="absolute right-0 top-full mt-2 w-[130px] bg-white border border-gray-200 rounded-xl shadow-lg z-5">
      {menuItems.map((item) => (
        <li
          key={item.label}
          onClick={item.onClick}
          className="w-full h-[42px] py-2 font-normal text-black text-base cursor-pointer hover:bg-gray-100 hover:first:rounded-t-xl hover:last:rounded-b-xl text-center border-b border-gray-200 last:border-b-0"
        >
          {item.label}
        </li>
      ))}
    </ul>
  );
}
