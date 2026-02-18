import type { Character } from "@acme/convex";
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

export interface LeaderboardEntry {
  character: Character;
  correctAnswers: number;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  totalQuestions: number;
  className?: string;
}

export function Leaderboard({
  entries,
  totalQuestions,
  className,
}: LeaderboardProps) {
  const minimumRows = 8;
  const emptyRowCount = Math.max(0, minimumRows - entries.length);

  return (
    <Table className={cn(className)}>
      <TableHeader>
        <TableRow>
          <TableHead>Player</TableHead>
          <TableHead className="text-right">Correct</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map((entry, i) => (
          <TableRow key={entry.character.value}>
            <TableCell>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground w-3.5 font-medium">
                  {i + 1}.
                </span>
                <Avatar size="sm" tooltip={entry.character.label}>
                  <AvatarFallback className={entry.character.color} />
                </Avatar>
                <span>{entry.character.label}</span>
              </div>
            </TableCell>
            <TableCell className="text-right">
              {entry.correctAnswers}/{totalQuestions}
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
