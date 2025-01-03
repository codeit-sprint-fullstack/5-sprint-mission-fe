const test = async () => {
  const a = fetch("learn.codeit.kr/api/color-surveys");
  const b = await a.json();
  console.log(a);
  return b;
};

console.log(await test);
