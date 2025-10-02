import React from "react";
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

type ContactFormEmailProps = {
  message: string;
  senderEmail: string;
};

export default function ContactFormEmail({
  message,
  senderEmail,
}: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New message from your portfolio site</Preview>
      <Tailwind>
        <Body className="bg-gray-100 text-black">
          <Container className="py-6 px-4">
            <Section className="bg-white border border-black/10 my-6 px-6 py-4 rounded-md">
              <Heading className="text-lg font-semibold leading-tight mb-2">
                You received the following message from the contact form
              </Heading>
              <Text className="whitespace-pre-wrap mb-4">{message}</Text>
              <Hr className="border-black/10 my-4" />
              <Text className="text-sm text-gray-700">The sender's email is: {senderEmail}</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}