const Menu = () => {
  const menuItems = [
    { id: 1, title: "자유게시판", href: "/board" },
    { id: 2, title: "중고마켓", href: "/market" },
  ];

  return (
    <div className="ml-6 flex space-x-4">
      {menuItems.map((item) => (
        <a
          key={item.id}
          href={item.href}
          className="text-gray-600 font-bold hover:text-gray-900 px-3 py-2"
        >
          {item.title}
        </a>
      ))}
    </div>
  );
};

export default Menu;
