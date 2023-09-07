import React from 'react';
import { ChakraProvider, Box, Center } from '@chakra-ui/react';
import CleaningQuoteForm from './CalculatorForm';

const App = () => {
  return (
    <ChakraProvider>
      <Center>
        <Box p={4} shadow="md" rounded="lg" bg="white" maxW="800px" w="100%">
          <CleaningQuoteForm />
        </Box>
      </Center>
    </ChakraProvider>
  );
};

export default App;
