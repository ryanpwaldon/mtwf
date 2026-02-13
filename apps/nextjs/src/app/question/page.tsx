import { IDENTITY_OPTIONS } from "@acme/convex";

export default function QuestionPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col p-4">
      <div className="bg-background flex-1">
        <div>
          <header className="flex p-4">
            <div className="w-20">
              <span className="font-mono text-sm font-bold">Q1/10</span>
            </div>
            <div className="flex w-full items-center">
              <div className="bg-muted h-2 w-full rounded-full">
                <div className="bg-primary h-full w-2/3 rounded-full"></div>
              </div>
            </div>
            <div className="w-20 text-right">
              <span className="font-mono text-sm font-bold">60s</span>
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
        </main>
      </div>
    </div>
  );
}
