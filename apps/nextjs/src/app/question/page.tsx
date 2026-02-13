import { getPersonaByValue, PERSONA_OPTIONS } from "@acme/convex";
import { RadioGroup } from "@acme/ui/radio-group";
import { Stepper } from "@acme/ui/stepper";

import { Choice } from "~/components/choice";

export default function QuestionPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col p-4">
      <div className="bg-background flex-1">
        <div>
          <header className="flex p-4">
            <div className="w-20">
              <span className="text-muted-foreground font-mono text-sm font-medium">
                Q1/10
              </span>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-2">
              <Stepper
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
              <div className="bg-muted h-2 w-full rounded-full">
                <div className="bg-primary h-full w-2/3 rounded-full" />
              </div>
            </div>
            <div className="w-20 text-right">
              <span className="text-muted-foreground font-mono text-sm font-medium">
                60s
              </span>
            </div>
          </header>
          <div className="mx-4 border-b" />
        </div>
        <main className="p-4 pt-16">
          <h1 className="text-center text-4xl font-extrabold tracking-tight">
            In Pulp Fiction (1998) which car in the film was actually owned by
            Quentin Tarantino?
          </h1>
          <div className="mt-8 flex w-full items-center justify-center">
            <div className="flex items-center -space-x-2">
              {PERSONA_OPTIONS.slice(0, 5).map((persona) => (
                <div
                  key={persona.value}
                  className={`size-8 rounded-full ${persona.color}`}
                />
              ))}
            </div>
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
                  getPersonaByValue("lime"),
                  getPersonaByValue("amber"),
                  getPersonaByValue("blue"),
                  getPersonaByValue("pink"),
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
                voters={[getPersonaByValue("orange"), getPersonaByValue("teal")]}
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
                  getPersonaByValue("rose"),
                  getPersonaByValue("violet"),
                  getPersonaByValue("green"),
                  getPersonaByValue("sky"),
                  getPersonaByValue("cyan"),
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
      </div>
    </div>
  );
}
