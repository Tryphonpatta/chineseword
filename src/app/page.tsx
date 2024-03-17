"use client";
import { useState } from "react";
import { NextUIProvider, Button, Spinner, Input } from "@nextui-org/react";
import fetchmean from "./lib/fetchmean";
import fetchpinyin from "./lib/fetchpinyin";
import { IoMdSearch } from "react-icons/io";

export default function Home() {
  const [word, setWord] = useState("");
  const [search, setSearch] = useState("");
  const [chinese, setChinese] = useState("");
  const [meaning, setMeaning] = useState<any>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [pinyinword, setPinyinword] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  const randomword = async () => {
    setIsLoading(true);
    setSearch("");
    let data = await fetch("https://random-word-api.herokuapp.com/word");
    let result = await data.json();
    setWord(result[0]);

    await fetchword(result[0]);
  };
  const searchword = async () => {
    setIsLoading(true);
    setWord(search);
    fetchword(search);
  };

  const fetchword = async (word: string) => {
    console.log(word);
    let datamean = await fetchmean({ word: word, lang: "th" });
    setMeaning(datamean);
    let ch = await fetchmean({ word: word, lang: "zh-cn" });
    setChinese(ch);
    let pin = await fetchpinyin(ch);
    setPinyinword(pin);
    setIsLoading(false);
  };

  return (
    <NextUIProvider>
      <div className="max-w-md w-full mx-auto max-h-screen h-screen overflow-hidden">
        <h1 className="text-4xl font-bold text-center mt-4">Chinese Word</h1>
        <div className="h-full flex flex-col justify-center">
          {!isPlaying ? (
            <Button
              color="primary"
              onPress={() => {
                setIsPlaying(!isPlaying);
                randomword();
              }}
            >
              Play
            </Button>
          ) : (
            <div className="w-full flex flex-col">
              <div className="flex item gap-2">
                <Input
                  isClearable
                  value={search}
                  onValueChange={setSearch}
                  radius="lg"
                  classNames={{
                    label: "text-black/50 dark:text-white/90",
                    input: [
                      "bg-transparent",
                      "text-black/90 dark:text-white/90",
                      "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                    ],
                  }}
                  placeholder="Type to search..."
                  startContent={<IoMdSearch color="black" />}
                ></Input>
                <Button className="h-full" onPress={searchword}>
                  Search
                </Button>
              </div>
              <div className=" border m-2 p-2 rounded-md h-[10rem]">
                {!isLoading ? (
                  <>
                    <div>
                      word : {!isLoading ? word : <Spinner size="sm" />}
                    </div>
                    <div>
                      meaning : {!isLoading ? meaning : <Spinner size="sm" />}
                    </div>
                    <div>
                      chinese : {!isLoading ? chinese : <Spinner size="sm" />}
                    </div>
                    <div>
                      pinyin :{" "}
                      {!isLoading ? (
                        pinyinword.join(" ")
                      ) : (
                        <Spinner size="sm" />
                      )}
                    </div>
                  </>
                ) : (
                  <div className="w-full flex justify-center h-full items-center">
                    <Spinner size="md" />
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-2">
                <Button color="success" onPress={() => randomword()}>
                  Next
                </Button>
                <Button
                  color="warning"
                  onPress={() => setIsPlaying(!isPlaying)}
                >
                  Quit
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </NextUIProvider>
  );
}
