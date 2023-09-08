import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
    Box,
    Center,
    Stack,
    Flex,
    FormControl,
    FormLabel,
    Checkbox,
    Button,
    Heading,
    Text,
    Radio,
    Image,
    Input,
    Select,
    RadioGroup,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react';
import BathroomImg from './images/bathroom.jpeg'

const CleaningQuoteForm = () => {
    const [showBedrooms, setShowBedrooms] = useState(false);
    const [showBathrooms, setShowBathrooms] = useState(false);
    const [showKitchen, setShowKitchen] = useState(false);

    const [numBedrooms, setNumBedrooms] = useState(0);
    const [numBathrooms, setNumBathrooms] = useState(0);
    const [numKitchen, setNumKitchen] = useState(0);

    const [cleaningLevel, setCleaningLevel] = useState('basic'); // Default to Basic cleaning
    const [cleaningProduct, setCleaningProduct] = useState('standard'); // Default to Basic cleaning

    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        address: '',
        email: '',
        phoneNumber: '',
        postalCode: '',
        city: '',
        province: 'Ontario', // Default province
    });

    const [serviceFrequency, setServiceFrequency] = useState('onetime');
    const [selectedDateTime, setSelectedDateTime] = useState(null);

    const ratePerBedroom = 15;
    const ratePerBathroom = 15;
    const ratePerKitchen = 20;
    const baseService = 40;

    // Define multipliers for different cleaning levels
    const cleaningLevelMultipliers = {
        basic: 1,
        extra: 2,
        deep: 3,
    };

    // Define multipliers for different cleaning levels
    const cleaningProductMultipliers = {
        standard: 1,
        organic: 1.5,
        byo: 1,
    };

    const serviceFrequencyDiscounts = {
        onetime: 0,      // No discount for one-time service
        weekly: 0.2,     // 20% discount for weekly service
        biweekly: 0.15,  // 15% discount for biweekly service
        monthly: 0.1,    // 10% discount for monthly service
    };

    const handleInputChange = (name, value) => {
        switch (name) {
            case 'numBedrooms':
                setNumBedrooms(isNaN(parseInt(value)) ? 0 : parseInt(value, 10));
                break;
            case 'numBathrooms':
                setNumBathrooms(isNaN(parseInt(value)) ? 0 : parseInt(value, 10));
                break;
            case 'numKitchen':
                setNumKitchen(isNaN(parseInt(value)) ? 0 : parseInt(value, 10));
                break;
            case 'name':
            case 'address':
            case 'email':
            case 'phoneNumber':
            case 'postalCode':
            case 'city':
            case 'province':
                setCustomerInfo({ ...customerInfo, [name]: value });
                break;
            default:
                break;
        }
    };


    const handleCheckboxChange = (name) => {
        switch (name) {
            case 'showBedrooms':
                setShowBedrooms(!showBedrooms);
                if (!showBedrooms) {
                    setNumBedrooms(1);
                } else {
                    setNumBedrooms(0);
                }
                break;
            case 'showBathrooms':
                setShowBathrooms(!showBathrooms);
                if (!showBathrooms) {
                    setNumBathrooms(1);
                } else {
                    setNumBathrooms(0);
                }
                break;
            case 'showKitchen':
                setShowKitchen(!showKitchen);
                if (!showKitchen) {
                    setNumKitchen(1);
                } else {
                    setNumKitchen(0);
                }
                break;
            default:
                break;
        }
    };

    const handleCleaningLevelChange = (level) => {
        setCleaningLevel(level);
    };

    const handleCleaningProductsChange = (level) => {
        setCleaningProduct(level);
    };

    const handleServiceFrequencyChange = (frequency) => {
        setServiceFrequency(frequency);
    };

    const handleDateTimeChange = (date) => {
        setSelectedDateTime(date);
    };

    const resetInputs = () => {
        setNumBedrooms(0);
        setNumBathrooms(0);
        setNumKitchen(0);
        setShowKitchen(false);
        setShowBathrooms(false);
        setShowBedrooms(false);
        setCleaningLevel('basic');
        setCleaningProduct('standard');
        setServiceFrequency('onetime');
        setSelectedDateTime(null);
        setCustomerInfo({
            name: '',
            email: '',
            phoneNumber: '',
            address: '',
            postalCode: '',
            city: '',
            province: 'Ontario',
        });
    };

    const calculateQuote = () => {
        const totalCost =
            baseService +
            numBedrooms * ratePerBedroom +
            numBathrooms * ratePerBathroom +
            numKitchen * ratePerKitchen;
        const cleaningLevelMultiplier = cleaningLevelMultipliers[cleaningLevel];
        const cleaningProductMultiplier = cleaningProductMultipliers[cleaningProduct];
        const frequencyDiscount = serviceFrequencyDiscounts[serviceFrequency];

        const discountedTotalCost = totalCost * cleaningLevelMultiplier * cleaningProductMultiplier * (1 - frequencyDiscount);
        return discountedTotalCost;
    };

    return (
        <Box p={2}>
             <Center>
                <Heading as="h1" size="lg" mb={4} mt={4}>
                    Book your home cleaning service today!
                </Heading>
            </Center>
            <Image src={BathroomImg} alt="Cleaning Service" w="100%" mb={10} mt={10}/>
            <Flex>
                <Box flex="1">
                    <FormControl>
                        <FormLabel htmlFor="serviceFrequency">Frequency of Service</FormLabel>
                        <RadioGroup
                            value={serviceFrequency}
                            onChange={handleServiceFrequencyChange}
                        >
                            <Stack>
                                <Radio value="onetime">One-time</Radio>
                                <Radio value="weekly">Weekly (20% off)</Radio>
                                <Radio value="biweekly">Biweekly (15% off)</Radio>
                                <Radio value="monthly">Monthly (10% off)</Radio>
                            </Stack>
                        </RadioGroup>
                    </FormControl>
                    <Text fontSize="lg" mb={4} mt={4}>
                        What rooms would you like us to clean?
                    </Text>
                    <Stack spacing={4}>
                        {/* Checkbox controls for rooms */}
                        <FormControl>
                            <Flex align="center">
                                <Checkbox
                                    onChange={() => handleCheckboxChange('showBedrooms')}
                                    isChecked={showBedrooms}
                                >
                                    Bedrooms
                                </Checkbox>
                                {showBedrooms && (
                                    <>
                                        <FormLabel htmlFor="numBedrooms" ml={4}>
                                            X
                                        </FormLabel>
                                        <NumberInput
                                            id="numBedrooms"
                                            name="numBedrooms"
                                            value={numBedrooms}
                                            onChange={(value) =>
                                                handleInputChange('numBedrooms', value)
                                            }
                                            w="100px"
                                            defaultValue={1}
                                            min={1}
                                            max={6}
                                        >
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </>
                                )}
                            </Flex>
                        </FormControl>
                        <FormControl>
                            <Flex align="center">
                                <Checkbox
                                    onChange={() => handleCheckboxChange('showBathrooms')}
                                    isChecked={showBathrooms}
                                >
                                    Bathrooms
                                </Checkbox>
                                {showBathrooms && (
                                    <>
                                        <FormLabel htmlFor="numBathrooms" ml={4}>
                                            X
                                        </FormLabel>
                                        <NumberInput
                                            id="numBathrooms"
                                            name="numBathrooms"
                                            value={numBathrooms}
                                            onChange={(value) => handleInputChange('numBathrooms', value)}

                                            w="100px" defaultValue={1} min={1} max={6}>
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </>
                                )}
                            </Flex>
                        </FormControl>
                        <FormControl>
                            <Flex align="center">
                                <Checkbox
                                    onChange={() => handleCheckboxChange('showKitchen')}
                                    isChecked={showKitchen}
                                >
                                    Kitchens
                                </Checkbox>
                                {showKitchen && (
                                    <>
                                        <FormLabel htmlFor="numKitchen" ml={4}>
                                            X
                                        </FormLabel>
                                        <NumberInput
                                            id="numKitchen"
                                            name="numKitchen"
                                            value={numKitchen}
                                            onChange={(value) => handleInputChange('numKitchen', value)}

                                            w="100px" defaultValue={1} min={1} max={3}>
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>

                                    </>
                                )}
                            </Flex>
                        </FormControl>
                        <Text fontSize="lg" mb={2}>
                            Choose a cleaning level
                        </Text>
                        <RadioGroup
                            value={cleaningLevel}
                            onChange={handleCleaningLevelChange}
                        >
                            <Stack>
                                <Radio value="basic">Basic - includes floors, counter tops and primary fixtures (toilet, shower, sinks)</Radio>
                                <Radio value="extra">Extra - basic + all visible surfaces including walls, doors and windows </Radio>
                                <Radio value="deep">Deep - absolutely everything, includes moving furniture, to clean under and behind</Radio>
                            </Stack>
                        </RadioGroup>

                        <Text fontSize="lg" mb={2}>
                            Cleaning product preference
                        </Text>
                        <RadioGroup
                            value={cleaningProduct}
                            onChange={handleCleaningProductsChange}
                        >
                            <Stack>
                                <Radio value="standard">Standard - our standard range of cleaning product </Radio>
                                <Radio value="organic">Organic - Our all natural organic range of cleaning products </Radio>
                                <Radio value="byo">BYO - Supply your own, prefered cleaning products </Radio>
                            </Stack>
                        </RadioGroup>

                        <Text fontSize="lg" mb={2} mt={2}>
                            Your Home Address
                        </Text>
                        <FormControl>
                            <FormLabel htmlFor="name">Name</FormLabel>
                            <Input
                                id="name"
                                name="name"
                                value={customerInfo.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                value={customerInfo.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                value={customerInfo.phoneNumber}
                                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="address">Address</FormLabel>
                            <Input
                                id="address"
                                name="address"
                                value={customerInfo.address}
                                onChange={(e) => handleInputChange('address', e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="postalCode">Postal Code</FormLabel>
                            <Input
                                id="postalCode"
                                name="postalCode"
                                value={customerInfo.postalCode}
                                onChange={(e) => handleInputChange('postalCode', e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="city">City</FormLabel>
                            <Input
                                id="city"
                                name="city"
                                value={customerInfo.city}
                                onChange={(e) => handleInputChange('city', e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="province">Province</FormLabel>
                            <Select
                                id="province"
                                name="province"
                                value={customerInfo.province}
                                onChange={(e) => handleInputChange('province', e.target.value)}
                            >
                                <option value="Alberta">Alberta</option>
                                <option value="British Columbia">British Columbia</option>
                                <option value="Manitoba">Manitoba</option>
                                <option value="New Brunswick">New Brunswick</option>
                                <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                                <option value="Nova Scotia">Nova Scotia</option>
                                <option value="Ontario">Ontario</option>
                                <option value="Prince Edward Island">Prince Edward Island</option>
                                <option value="Quebec">Quebec</option>
                                <option value="Saskatchewan">Saskatchewan</option>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="selectedDateTime">Choose Date and Time</FormLabel>
                            <DatePicker
                                selected={selectedDateTime}
                                onChange={handleDateTimeChange}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="MMMM d, yyyy h:mm aa"
                                placeholderText="Select Date and Time Select Date and Time Select Date and Time"
                                minDate={new Date()}
                                style={{
                                    width: '800px',
                                }}
                            />
                        </FormControl>

                    </Stack>
                </Box>
                <Box w="200px" ml={4}>
                    <Flex direction="column" position="sticky" top="80px">
                        <Button colorScheme="blue" onClick={resetInputs} mb={2}>
                            Reset
                        </Button>
                        <Button colorScheme="teal">
                            Submit - ${calculateQuote()}
                        </Button>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
};

export default CleaningQuoteForm;
