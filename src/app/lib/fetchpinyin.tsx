"use server";

export default async function fetchpinyin(word: string): Promise<any> {
  let data = await fetch(
    "https://pinyin-api.vercel.app/api/generate?wd=" + word
  );
  data = await data.json();
  console.log("pinyin", data);
  return data;
}
