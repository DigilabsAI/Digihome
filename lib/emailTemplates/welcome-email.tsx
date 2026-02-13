import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { emailTailwindConfig } from "@/email-tailwind.config";

interface DigilabsWelcomeEmailProps {
  userFirstname: string;
}

export const DigilabsWelcomeEmail = ({
  userFirstname,
}: DigilabsWelcomeEmailProps) => (
  <Html>
    <Head />
    <Tailwind config={emailTailwindConfig}>
      <Body className="bg-background text-foreground font-sans">
        <Preview>
          Welcome to Digilabs — let’s start building something great.
        </Preview>

        <Container className="mx-auto max-w-[480px] py-10 px-6 bg-card rounded-md shadow-sm">
          <Img
            src={`https://phxxpovjltygyxmctbfy.supabase.co/storage/v1/object/public/assets/logo.jpg`}
            width="150"
            height="150"
            alt="Koala"
            className="mx-auto mb-8"
          />

          <Text className="text-[16px] leading-7 mb-4">
            Hi {userFirstname},
          </Text>

          <Text className="text-[16px] leading-7 mb-6">
            Welcome to Digilabs. We’re a team of designers and developers ready
            to help you turn ideas into real, working solutions.
          </Text>

          <Section className="text-center my-8">
            <Button
              href="https://digilabsolutions.vercel.app/profile/update"
              className="bg-primary text-white text-[15px] px-6 py-3 rounded-md no-underline"
            >
              Start by creating your profile
            </Button>
          </Section>

          <Text className="text-[16px] leading-7 mb-6">
            We’re excited to collaborate and bring your project to life.
          </Text>

          <Text className="text-[16px] leading-7 mb-6">
            Best,
            <br />
            The Digilabs Team
          </Text>

          <Text className="text-[12px]">
            Remote team • Building solutions for startups, systems, and capstone
            projects
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

DigilabsWelcomeEmail.PreviewProps = {
  userFirstname: "Alan",
} as DigilabsWelcomeEmailProps;

export default DigilabsWelcomeEmail;
