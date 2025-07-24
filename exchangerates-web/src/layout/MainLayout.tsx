 import { Container, Box } from '@mui/material';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <Container
      maxWidth="md"
      dir="rtl"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'right', 
      }}
    >
      <Box width="100%">
        {children}
      </Box>
    </Container>
  );
};

export default MainLayout;
