import Link from "next/link";
import box from "@/components/Box.module.css";

interface BookInfo {
  display_name: string;
  oldest_published_date: string;
  newest_published_date: string;
  list_name_encoded: string;
}

async function getBestSeller() {
  const response = await fetch(
    "https://books-api.nomadcoders.workers.dev/lists"
  );
  const data = await response.json();
  return data.results;
}

const headers = "the new york times best seller explorer";

export default async function Home() {
  const books: BookInfo[] = await getBestSeller();
  return (
    <>
      <div>
        <h1>{headers.toUpperCase()}</h1>
      </div>
      <div className={box.container}>
        {books.map(({ display_name, list_name_encoded }) => (
          <div className={box.box} key={display_name + "-books"}>
            <Link
              href={{
                pathname: `/lists/${list_name_encoded}`,
                query: { listItem: list_name_encoded },
              }}
            >
              {display_name}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
