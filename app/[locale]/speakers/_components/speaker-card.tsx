import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Link } from "@/i18n/navigation";
import type { SpeakerSessions } from "@/utils/group-sessions-by-speaker";
import { Flex, Text } from "@chakra-ui/react";

interface SpeakerCardProps {
  speaker: SpeakerSessions;
}

export function SpeakerCard({ speaker }: SpeakerCardProps) {
  return (
    <Card height="full">
      <CardHeader>
        <CardTitle fontSize="md">{speaker.speaker}</CardTitle>
      </CardHeader>
      <CardContent>
        <Flex as="ul" direction="column" gap="3" listStyleType="none">
          {speaker.sessions.map((session) => (
            <Flex as="li" key={session.id} direction="column" gap="0.5">
              <Text fontSize="sm" color="var(--text-secondary)">
                {session.startTime}
              </Text>
              <Link href={`/sessions/${session.id}`}>
                <Text
                  fontSize="sm"
                  color="var(--text-primary)"
                  textDecoration="underline"
                  _hover={{ color: "var(--accent-hex)" }}
                >
                  {session.title}
                </Text>
              </Link>
            </Flex>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
