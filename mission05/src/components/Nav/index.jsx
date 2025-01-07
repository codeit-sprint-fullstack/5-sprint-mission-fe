const navItem = ["자유게시판, 중고마켓"];

export default function Nav() {
  return (
    <nav>
      <ul>
        {navItem.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </nav>
  );
}
