"use server";
import translate from "@iamtraction/google-translate";

export default async function fetchmean(word: string): Promise<string> {
  let data: any;
  data = translate(word, { to: "th" })
    .then((res) => {
      console.log(res.text);
      return res.text;
    })
    .catch((err) => {
      return err;
    });
  return data;
}
