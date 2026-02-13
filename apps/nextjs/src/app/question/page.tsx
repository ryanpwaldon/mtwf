import { IDENTITY_OPTIONS } from "@acme/convex";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@acme/ui/field";
import { RadioGroup, RadioGroupItem } from "@acme/ui/radio-group";
import { Stepper } from "@acme/ui/stepper";

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
              {IDENTITY_OPTIONS.slice(0, 5).map((identity) => (
                <div
                  key={identity.value}
                  className={`size-8 rounded-full ${identity.color}`}
                />
              ))}
            </div>
          </div>
          <div className="mt-8">
            <RadioGroup>
              <FieldLabel htmlFor="choice-a">
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>A</FieldTitle>
                    <FieldDescription>The 1980 Honda Civic</FieldDescription>
                  </FieldContent>
                  <RadioGroupItem value="a" id="choice-a" />
                </Field>
              </FieldLabel>
              <FieldLabel htmlFor="choice-b">
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>B</FieldTitle>
                    <FieldDescription>The 1964 Chevy Malibu</FieldDescription>
                  </FieldContent>
                  <RadioGroupItem value="b" id="choice-b" />
                </Field>
              </FieldLabel>
              <FieldLabel htmlFor="choice-c">
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>C</FieldTitle>
                    <FieldDescription>The 1974 Chevy Nova</FieldDescription>
                  </FieldContent>
                  <RadioGroupItem value="c" id="choice-c" />
                </Field>
              </FieldLabel>
              <FieldLabel htmlFor="choice-d">
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>D</FieldTitle>
                    <FieldDescription>Both A and B</FieldDescription>
                  </FieldContent>
                  <RadioGroupItem value="d" id="choice-d" />
                </Field>
              </FieldLabel>
            </RadioGroup>
          </div>
        </main>
      </div>
    </div>
  );
}
