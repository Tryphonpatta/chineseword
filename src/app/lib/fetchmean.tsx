"use server";
import translate from "@iamtraction/google-translate";

export default async function fetchmean(i: {
  word: string;
  lang: string;
}): Promise<string> {
  let data: any;
  data = translate(i.word, { to: i.lang })
    .then((res) => {
      console.log(res.text, i.lang);
      return res.text;
    })
    .catch((err) => {
      return err;
    });
  return data;
}
