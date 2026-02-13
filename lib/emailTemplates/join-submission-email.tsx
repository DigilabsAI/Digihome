import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
  Hr,
} from "@react-email/components";
import { emailTailwindConfig } from "@/email-tailwind.config";

interface JoinFormSubmissionEmailProps {
  fullName: string;
  email: string;
  school: string;
  positions: string[];
  referrers?: string[];
  reason: string;
}

export const JoinFormSubmissionEmail = ({
  fullName,
  email,
  school,
  positions,
  referrers = [],
  reason,
}: JoinFormSubmissionEmailProps) => (
  <Html>
    <Head />
    <Tailwind config={emailTailwindConfig}>
      <Body className="bg-background text-foreground font-sans">
        <Preview>New organization join request from {fullName}</Preview>

        <Container className="mx-auto max-w-[520px] py-10 px-6 bg-card rounded-md shadow-sm ">
          <Text className="text-[18px] font-semibold mb-6">
            New Join Request
          </Text>

          <Section className="space-y-2">
            <Text><strong>Full Name:</strong> {fullName}</Text>
            <Text><strong>Email:</strong> {email}</Text>
            <Text><strong>School:</strong> {school}</Text>
            <Text><strong>Positions:</strong> {positions.join(", ")}</Text>

            {referrers.length > 0 && (
              <Text>
                <strong>Referrers:</strong> {referrers.join(", ")}
              </Text>
            )}
          </Section>

          <Hr className="border-border my-6" />

          <Text className="font-semibold mb-2">Reason</Text>
          <Text className="text-[14px] leading-6 whitespace-pre-line">
            {reason}
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default JoinFormSubmissionEmail;
