export const getData = async (url: string) => {
  const res = await fetch(url, {
    cache: "force-cache",
    // cache: "no-store",
    next: { tags: ["product"] },
  });

  // const res = await fetch("https://fakestoreapi.com/products", {
  //   cache: "no-store",
  // });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
