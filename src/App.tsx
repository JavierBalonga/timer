import { useRef, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import PlusIcon from "./components/icons/PlusIcon";
import MinusIcon from "./components/icons/MinusIcon";
import Button from "./components/Button";
import { twMerge } from "tailwind-merge";

const MINUTE = 60;

interface Store {
  timeToWait: number;
  increaseTimeToWait: () => void;
  decreseTimeToWait: () => void;
}

const useStore = create(
  persist<Store>(
    (set) => ({
      timeToWait: 10 * MINUTE,
      increaseTimeToWait: () => {
        set((state) => ({
          timeToWait: state.timeToWait + MINUTE,
        }));
      },
      decreseTimeToWait: () => {
        set((state) => ({
          timeToWait: Math.max(state.timeToWait - MINUTE, 0),
        }));
      },
    }),
    { name: "timer" }
  )
);

enum Status {
  STARTED,
  PAUSED,
  STOPPED,
  FINISHED,
}

export default function App() {
  const { timeToWait, increaseTimeToWait, decreseTimeToWait } = useStore();

  const [status, setStatus] = useState<Status>(Status.STOPPED);
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  const interval = useRef<number>(null);
  const startInterval = () => {
    stopInterval();
    const newInterval = setInterval(() => {
      setSecondsElapsed((prev) => {
        const newSconds = prev + 1;
        if (newSconds >= timeToWait) {
          setStatus(Status.FINISHED);
          stopInterval();
        }
        return newSconds;
      });
    }, 1000);
    Object.assign(interval, { current: newInterval });
  };
  const stopInterval = () => {
    if (interval.current) {
      clearInterval(interval.current);
      Object.assign(interval, { current: null });
    }
  };

  const handleStart = () => {
    setStatus(Status.STARTED);
    startInterval();
  };

  const handlePause = () => {
    setStatus(Status.PAUSED);
    stopInterval();
  };

  const handleResume = () => {
    setStatus(Status.STARTED);
    startInterval();
  };

  const handleStop = () => {
    setStatus(Status.STOPPED);
    stopInterval();
    setSecondsElapsed(0);
  };

  const value = Math.max(0, timeToWait - secondsElapsed);
  const minutes = Math.floor(value / MINUTE);
  const seconds = value % MINUTE;

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-900 text-teal-100">
      <h1 className="sr-only">timer</h1>
      <div className="flex flex-col sm:flex-row items-center gap-8">
        <div className="flex flex-row sm:flex-col items-stretch gap-4 min-w-[125px]">
          {status === Status.STOPPED && (
            <Button
              variant="filled"
              title="Start the timer"
              onClick={handleStart}
            >
              start
            </Button>
          )}
          {status === Status.STARTED && (
            <Button
              title="Freezes the timer and can be resumed"
              onClick={handlePause}
            >
              pause
            </Button>
          )}
          {status === Status.PAUSED && (
            <Button title="Resume timer" onClick={handleResume}>
              resume
            </Button>
          )}
          {(status === Status.STARTED || status === Status.PAUSED) && (
            <Button
              title="Stops the timer and resets it to the original value"
              onClick={handleStop}
            >
              stop
            </Button>
          )}
          {status === Status.FINISHED && (
            <Button
              title="Resets it to the original value"
              onClick={handleStop}
              variant="filled"
            >
              reset
            </Button>
          )}
        </div>
        <div className="relative flex flex-col gap-2">
          <p
            className={`text-7xl sm:text-9xl font-bold font-mono ${
              status === Status.FINISHED ? "fade-five-times" : ""
            }`}
          >
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </p>
          <div
            className={twMerge(
              "absolute left-0 bottom-0 translate-y-full w-full flex flex-row gap-2 justify-between"
            )}
          >
            <span className="text-lg">Minutes</span>
            <span className="text-lg">Seconds</span>
          </div>
        </div>
        <div className="flex flex-row sm:flex-col items-stretch gap-4 min-w-[125px]">
          <Button title="Plus 1 minute" onClick={increaseTimeToWait}>
            <PlusIcon />
          </Button>
          <Button title="Minus 1 minute" onClick={decreseTimeToWait}>
            <MinusIcon />
          </Button>
        </div>
      </div>
    </main>
  );
}
