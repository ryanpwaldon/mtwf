import type { Character } from "@acme/convex";
import { getCharacterByValue } from "@acme/convex";
import { cn } from "@acme/ui";
import { Avatar, AvatarFallback } from "@acme/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@acme/ui/table";

interface LeaderboardEntry {
  id: string;
  place: number;
  character: Character;
  correctAnswers: number;
  totalQuestions: number;
}

const mockLeaderboardData: LeaderboardEntry[] = [
  {
    id: "1",
    place: 1,
    character: getCharacterByValue("lime"),
    correctAnswers: 10,
    totalQuestions: 10,
  },
  {
    id: "2",
    place: 2,
    character: getCharacterByValue("amber"),
    correctAnswers: 9,
    totalQuestions: 10,
  },
  {
    id: "3",
    place: 3,
    character: getCharacterByValue("blue"),
    correctAnswers: 8,
    totalQuestions: 10,
  },
  {
    id: "4",
    place: 4,
    character: getCharacterByValue("pink"),
    correctAnswers: 6,
    totalQuestions: 10,
  },
  {
    id: "5",
    place: 5,
    character: getCharacterByValue("teal"),
    correctAnswers: 4,
    totalQuestions: 10,
  },
];

export function Leaderboard({ className }: { className?: string }) {
  const minimumRows = 8;
  const emptyRowCount = Math.max(0, minimumRows - mockLeaderboardData.length);

  return (
    <Table className={cn(className)}>
      <TableHeader>
        <TableRow>
          <TableHead>Player</TableHead>
          <TableHead className="text-right">Correct</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockLeaderboardData.map((entry) => (
          <TableRow key={entry.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground w-3.5 font-medium">
                  {entry.place}.
                </span>
                <Avatar size="sm" tooltip={entry.character.label}>
                  <AvatarFallback className={entry.character.color} />
                </Avatar>
                <span>{entry.character.label}</span>
              </div>
            </TableCell>
            <TableCell className="text-right">
              {entry.correctAnswers}/{entry.totalQuestions}
            </TableCell>
          </TableRow>
        ))}
        {Array.from({ length: emptyRowCount }, (_, index) => (
          <TableRow key={`empty-${index}`} className="select-none">
            <TableCell>&nbsp;</TableCell>
            <TableCell>&nbsp;</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
