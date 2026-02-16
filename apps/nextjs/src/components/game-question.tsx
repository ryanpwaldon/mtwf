import type { FunctionReturnType } from "convex/server";

import type { api } from "@acme/convex";
import { getCharacterByValue, CHARACTER_OPTIONS } from "@acme/convex";
import { RadioGroup } from "@acme/ui/radio-group";

import { Choice } from "~/components/choice";
import { PlayerGroup } from "~/components/player-group";
import { QuestionStatusTrack } from "~/components/question-status-track";
import { TimeRemainingBar } from "~/components/time-remaining-bar";

type Game = NonNullable<FunctionReturnType<typeof api.games.getByCode>>;

interface GameQuestionProps {
  game: Game;
}

export function GameQuestion({ game: _game }: GameQuestionProps) {
  return (
    <>
      <header className="flex h-16 items-center justify-between border-b">
        <div className="flex h-full w-20 items-center justify-center">
          <div className="bg-primary/10 text-muted-foreground flex size-7 items-center justify-center rounded-full text-center text-sm font-medium">
            Q1
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <QuestionStatusTrack
            className="w-full"
            steps={[
              "correct",
              "incorrect",
              "incomplete",
              "incomplete",
              "incomplete",
              "incomplete",
              "incomplete",
              "incomplete",
              "incomplete",
              "incomplete",
            ]}
          />
          <TimeRemainingBar value={2 / 3} />
        </div>
        <div className="flex h-full w-20 items-center justify-center">
          <div className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-full text-center text-sm font-medium">
            60
          </div>
        </div>
      </header>
      <main className="px-4">
        <h2 className="text-muted-foreground mt-8 text-center text-base font-medium">
          Question 1 of 10
        </h2>
        <h1 className="mt-4 text-center text-2xl font-extrabold tracking-tight">
          In Pulp Fiction (1998) which car in the film was actually owned by
          Quentin Tarantino?
        </h1>
        <div className="mt-6 flex w-full items-center justify-center">
          <PlayerGroup
            avatarSize="default"
            maxVisible={5}
            characters={CHARACTER_OPTIONS.slice(0, 5)}
          />
        </div>
        <div className="mt-8">
          <RadioGroup>
            <Choice
              disabled={false}
              id="choice-a"
              value="A"
              description="The 1980 Honda Civic"
              showResults={true}
              isCorrectAnswer={true}
              votePercent={30}
              voters={[
                getCharacterByValue("lime"),
                getCharacterByValue("amber"),
                getCharacterByValue("blue"),
                getCharacterByValue("pink"),
              ]}
            />
            <Choice
              disabled={false}
              id="choice-b"
              value="B"
              description="The 1964 Chevy Malibu"
              showResults={true}
              isCorrectAnswer={false}
              votePercent={30}
              voters={[getCharacterByValue("orange"), getCharacterByValue("teal")]}
            />
            <Choice
              disabled={false}
              id="choice-c"
              value="C"
              description="The 1974 Chevy Nova"
              showResults={true}
              isCorrectAnswer={false}
              votePercent={30}
              voters={[
                getCharacterByValue("rose"),
                getCharacterByValue("violet"),
                getCharacterByValue("green"),
                getCharacterByValue("sky"),
                getCharacterByValue("cyan"),
              ]}
            />
            <Choice
              disabled={false}
              id="choice-d"
              value="D"
              description="Both A and B"
              showResults={true}
              isCorrectAnswer={false}
              votePercent={30}
              voters={[]}
            />
          </RadioGroup>
        </div>
      </main>
    </>
  );
}
