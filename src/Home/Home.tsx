import PageWrapper from "../Components/PageWrapper/PageWrapper";
import About from "../Components/About";
import SectionCards from "../Components/SectionCards";
import MediaShowcase from "../Components/MediaShowcase";
import MailingList from "../Components/MailingList";
import ContactSection from "../Components/ContactSection";

export default function Home() {
  return (
    <PageWrapper>
      <About />
      <SectionCards />
      {false && <MediaShowcase />}
      <MailingList />
      <ContactSection />
    </PageWrapper>
  );
}
