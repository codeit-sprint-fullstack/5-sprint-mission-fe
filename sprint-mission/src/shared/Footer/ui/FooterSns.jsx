export function FooterSns({ sns }) {
  const alt = `${sns.snsName} 링크`;

  return (
    <a href={sns.href} target="_blank" rel="noopener noreferrer">
      <img class="sns-icon" src={sns.src} alt={alt} />
    </a>
  );
}
