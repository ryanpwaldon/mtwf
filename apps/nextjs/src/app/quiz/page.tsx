import { getPersonaByValue } from "@acme/convex";

import { QuizPageContent } from "~/components/quiz-page-content";

export default function QuizPage() {
  const limePersona = getPersonaByValue("lime");
  const inviteCode = "LIME12";
  return <QuizPageContent inviteCode={inviteCode} persona={limePersona} />;
}
