import card from "@/components/Card.module.css";

export default function Card({
  url,
  title,
  children,
}: {
  url: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className={card.card}>
      <img src={url} alt={title} />
      <h2>{title}</h2>
      {children}
    </div>
  );
}
