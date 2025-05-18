import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
  } from '@react-email/components';
  import * as React from 'react';
  
  interface SubscriptionEmailProps {
    userEmail?: string;
  }
  
  export const SubscriptionEmail = ({
    userEmail,
  }: SubscriptionEmailProps) => {
    const previewText = `Welcome to TravelEase newsletters!`;
  
    return (
      <Html>
        <Head />
        <Preview>{previewText}</Preview>
        <Body style={main}>
          <Container style={container}>
            <Img
              src={`https://${process.env.NEXT_PUBLIC_APP_URL}/logo.png`}
              width="170"
              height="50"
              alt="TravelEase Logo"
              style={logo}
            />
            <Heading style={heading}>Welcome to TravelEase!</Heading>
            <Section style={section}>
              <Text style={text}>
                Thank you for subscribing to our newsletter! We&apos;re excited to share travel tips, destination guides, and exclusive deals with you.
              </Text>
              <Text style={text}>
                Your email address <span style={highlight}>{userEmail}</span> has been added to our mailing list.
              </Text>
              <Text style={text}>
                Get ready for inspiration for your next adventure!
              </Text>
            </Section>
            <Section style={ctaContainer}>
              <Link style={button} href="https://your-travel-site.com/destinations">
                Explore Destinations
              </Link>
            </Section>
            <Text style={footer}>
              If you didn&apos;t sign up for this newsletter, you can safely ignore this email or <Link style={unsubscribeLink} href="https://your-travel-site.com/unsubscribe">unsubscribe here</Link>.
            </Text>
          </Container>
        </Body>
      </Html>
    );
  };
  
  // Styles
  const main = {
    backgroundColor: '#f5f8fa',
    fontFamily: 'Arial, sans-serif',
    padding: '30px 0',
  };
  
  const container = {
    backgroundColor: '#ffffff',
    border: '1px solid #e6ebf1',
    borderRadius: '5px',
    margin: '0 auto',
    maxWidth: '600px',
    padding: '30px',
  };
  
  const logo = {
    margin: '0 auto 20px',
    display: 'block',
  };
  
  const heading = {
    color: '#102C54', // Using your primary color
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '30px 0',
    padding: '0',
    textAlign: 'center' as const,
  };
  
  const section = {
    margin: '30px 0',
  };
  
  const text = {
    color: '#4a5568',
    fontSize: '16px',
    lineHeight: '24px',
    margin: '16px 0',
  };
  
  const highlight = {
    color: '#102C54',
    fontWeight: 'bold',
  };
  
  const ctaContainer = {
    margin: '30px 0',
    textAlign: 'center' as const,
  };
  
  const button = {
    backgroundColor: '#102C54',
    borderRadius: '4px',
    color: '#ffffff',
    display: 'inline-block',
    fontSize: '16px',
    fontWeight: 'bold',
    padding: '12px 24px',
    textDecoration: 'none',
  };
  
  const footer = {
    color: '#8898aa',
    fontSize: '12px',
    marginTop: '30px',
  };
  
  const unsubscribeLink = {
    color: '#8898aa',
    textDecoration: 'underline',
  };
  
  export default SubscriptionEmail;