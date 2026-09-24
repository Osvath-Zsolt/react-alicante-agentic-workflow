import { SpeakerCard } from "@/app/[locale]/speakers/_components/speaker-card";
import { PageHeading } from "@/components/atoms/page-heading";
import { fetchSessions } from "@/services/sessions";
import { groupSessionsBySpeaker } from "@/utils/group-sessions-by-speaker";
import { Box, Flex, Grid } from "@chakra-ui/react";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function SpeakersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Keeps this page static — see app/[locale]/layout.tsx.
  setRequestLocale(locale);

  const t = await getTranslations("SpeakersPage");
  const sessions = await fetchSessions();
  const speakers = groupSessionsBySpeaker(sessions);

  return (
    <Flex direction="column" gap="8" flex="1" width="full">
      <PageHeading title={t("title")}>{t("description")}</PageHeading>

      <Grid
        as="ul"
        gap="4"
        templateColumns={{ base: "1fr", sm: "repeat(3, 1fr)" }}
        listStyleType="none"
      >
        {speakers.map((speaker) => (
          <Box as="li" key={speaker.speaker}>
            <SpeakerCard speaker={speaker} />
          </Box>
        ))}
      </Grid>
    </Flex>
  );
}
