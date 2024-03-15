"use client";
import { useState } from "react";
import { NextUIProvider, Button, Spinner } from "@nextui-org/react";
import fetchmean from "./lib/fetchmean";
export default function Home() {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState<any>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchword = async () => {
    setIsLoading(true);
    let data = await fetch("https://random-word-api.herokuapp.com/word");
    let result = await data.json();
    setWord(result[0]);
    let datamean = await fetchmean(result[0]);
    setMeaning(datamean);
    setIsLoading(false);
  };

  return (
    <NextUIProvider>
      <div className="max-w-md w-full mx-auto max-h-screen h-screen overflow-hidden">
        <h1 className="text-4xl font-bold text-center">Chinese Word</h1>
        <div className="h-full flex flex-col justify-center">
          {!isPlaying ? (
            <Button
              color="primary"
              onPress={() => {
                setIsPlaying(!isPlaying);
                fetchword();
              }}
            >
              Play
            </Button>
          ) : (
            <div className="w-full flex flex-col">
              <div>
                <div>word : {!isLoading ? word : <Spinner size="sm" />}</div>
                <div>
                  meaning : {!isLoading ? meaning : <Spinner size="sm" />}
                </div>
              </div>
              <Button color="warning" onPress={() => setIsPlaying(!isPlaying)}>
                Quit
              </Button>
            </div>
          )}
        </div>
      </div>
    </NextUIProvider>
  );
}
