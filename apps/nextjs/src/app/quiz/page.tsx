import { getCharacterByValue } from "@acme/convex";

import { QuizPageContent } from "~/components/quiz-page-content";

export default function QuizPage() {
  const limeCharacter = getCharacterByValue("lime");
  const inviteCode = "LIME12";
  return <QuizPageContent inviteCode={inviteCode} character={limeCharacter} />;
}
