import React from 'react';
import { ChakraProvider, Box, Center } from '@chakra-ui/react';
import CleaningQuoteForm from './CalculatorForm';

const App = () => {
  return (
    <ChakraProvider>
      <Center mb={10} mt={10}>
        <Box p={4} shadow="md" rounded="lg" bg="white" maxW="1000px" w="100%" >
          <CleaningQuoteForm />
        </Box>
      </Center>
    </ChakraProvider>
  );
};

export default App;
