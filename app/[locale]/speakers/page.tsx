import { SpeakerCard } from "@/app/[locale]/speakers/_components/speaker-card";
import { PageHeading } from "@/components/atoms/page-heading";
import { fetchSessions } from "@/services/sessions";
import { groupSessionsBySpeaker } from "@/utils/group-sessions-by-speaker";
import { Flex, Grid } from "@chakra-ui/react";

export default async function SpeakersPage() {
  const sessions = await fetchSessions();
  const speakers = groupSessionsBySpeaker(sessions);

  return (
    <Flex direction="column" gap="8" flex="1" width="full">
      <PageHeading title="Speakers">
        Who is speaking at React Alicante, and when.
      </PageHeading>

      <Grid gap="4" templateColumns={{ base: "1fr", sm: "repeat(3, 1fr)" }}>
        {speakers.map((speaker) => (
          <SpeakerCard key={speaker.speaker} speaker={speaker} />
        ))}
      </Grid>
    </Flex>
  );
}
