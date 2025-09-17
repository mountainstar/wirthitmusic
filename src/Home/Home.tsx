import PageWrapper from '../Components/PageWrapper/PageWrapper';
import { Divider, Typography } from '@mui/material';
import About from '../About/About';
import ContactForm from '../Components/ContactForm';

function Home() {
  return (
    <>    
    <PageWrapper>
      <About />
      <ContactForm />
    </PageWrapper>
    </>
  );
}

export default Home;