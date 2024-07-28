"use client";

import Card from "@/components/Card";
import Link from "next/link";
import list from "@/app/lists/[listItem]/list.module.css";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface BestSellerBooksInfo {
  books: {
    author: string;
    book_image: string;
    title: string;
    amazon_product_url: string;
  }[];
}

async function getBestSellerList(listItem: string) {
  return await fetch(
    "https://books-api.nomadcoders.workers.dev/list?name={{bookList}}".replace(
      "{{bookList}}",
      listItem
    )
  )
    .then((res) => res.json())
    .then((data) => data.results);
}

export default function Page() {
  const [hydrate, setHydrate] = useState(false);
  const [listItem, setListItem] = useState<BestSellerBooksInfo>();
  const pathname = usePathname().split("/")[1];
  const serachParams = useSearchParams();
  useEffect(() => {
    if (false === hydrate) {
      setHydrate(true);
    }
  }, []);

  useEffect(() => {
    const listItemParams = serachParams.get("listItem");
    if (null === listItemParams) {
      return;
    }
    getBestSellerList(listItemParams).then((data) => {
      setListItem(data);
    });
  }, [serachParams]);

  if (false === hydrate || undefined === listItem) {
    return <>loading</>;
  }
  return (
    <div className={list.container}>
      <h1>{pathname}</h1>
      <div className={list.list}>
        {listItem.books.map((item) => (
          <Card
            title={item.title}
            url={item.book_image}
            key={item.title + "detail_list"}
          >
            <Link href={item.amazon_product_url}>Buy now</Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
