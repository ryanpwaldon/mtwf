import { Button } from "@acme/ui/button";

export default function HomePage() {
  return (
    <main className="px-4 pt-16">
      <h1 className="text-5xl font-extrabold tracking-tight">
        Movie
        <br />
        Trivia
        <br />
        With
        <br />
        Friends
      </h1>
      <h2 className="text-muted-foreground mt-4">
        Test your knowledge<br></br>
        with up to ten freinds online.
      </h2>
      <div className="mt-16 flex gap-4">
        <Button className="" size="lg" variant="default">
          Create a quiz
        </Button>
        <Button className="" size="lg" variant="outline">
          Join a quiz
        </Button>
      </div>
    </main>
  );
}
