import { SurfaceCard } from "@/components/atoms/surface-card";
import { Link } from "@/i18n/navigation";
import type { Session } from "@/types/session";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

interface SessionBlockProps {
  session: Session;
  top: number;
  height: number;
}

export function SessionBlock({ session, top, height }: SessionBlockProps) {
  const t = useTranslations("SessionLevel");

  return (
    <Link href={`/sessions/${session.id}`}>
      <Box
        position="absolute"
        insetX="1"
        top={`${top}px`}
        height={`${height}px`}
      >
        <SurfaceCard>
          <Text fontWeight="medium" color="var(--text-primary)" truncate>
            {session.title}
          </Text>
          {/*
            The level sits in its own flexShrink="0" segment so it's the
            time/speaker text that gets truncated first, never the level —
            otherwise it silently disappears on most blocks (see #2 a11y
            audit): the whole point of this feature is to show the level.
          */}
          <Flex color="var(--text-muted)" minWidth="0" gap="1">
            <Text truncate minWidth="0">
              {session.startTime} · {session.speaker}
            </Text>
            <Text flexShrink="0"> · {t(session.level)}</Text>
          </Flex>
        </SurfaceCard>
      </Box>
    </Link>
  );
}
