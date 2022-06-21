import React, { useEffect, useState } from 'react';
import { Box, Heading, AspectRatio, Image, Text, HStack, Stack, Spinner, FlatList, Button, StatusBar, Icon, IconButton, Badge, VStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { ImageBackground, StyleSheet } from 'react-native';
const Banner = require("../assets/I1.jpg")

const styles = StyleSheet.create({
    baseText: {
        marginLeft: 20,
        marginTop: 40,
        color: 'white',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 20,
        marginTop: 5,
        color: 'white',
    },
    sub: {
        fontWeight: 'bold',
        fontSize: 1,
        marginLeft: 20,
        marginTop: 5,
        color: 'white',
    },
});

export const Cards = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<any[]>([]);
    const [datos, setdatos] =  useState<any[]>([]);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        fetch('https://dummyjson.com/products', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(json => setData(json.products))
            .catch(error => console.error(error))
            .finally(() => setLoading(false));
    }, [])

    function addItem(id: any) {
        setCounter(counter + 1);
        const resultado = datos.indexOf(id);
        datos.push(id);
    }

    function deleteItem(id: any) {
        if (counter != 0) {
            setCounter(counter - 1);
        }
        const resultado = datos.indexOf(id);
        datos.splice(resultado, 1);
    }

    return <Box>
        <Box>
            <StatusBar barStyle="light-content" />
            <Box safeAreaTop bg="#6200ee" />
            <HStack bg={{
                linearGradient: {
                    colors: ["#25568D", "#833197"],
                    start: [0, 0],
                    end: [1, 0]
                }
            }} px="1" py="3" justifyContent="space-between" alignItems="center" w="100%">
                <HStack alignItems="center">
                    <IconButton icon={<Icon size="lg" as={MaterialIcons} name="menu" color="white" />} />
                </HStack>
                <Image source={require('../assets/territorium.png')} alt="image" style={{
                    resizeMode: 'cover',
                    width: '40%',
                    height: '42%'
                }} />
                <HStack>
                    <VStack>
                        {counter <= 0 ? undefined : <Badge
                            colorScheme="warning" rounded="full" mb={-6} mr={-6} zIndex={1} variant="solid" w='7' h='7' alignSelf="flex-start">
                            <Text fontSize='2xs'>{counter}</Text>
                        </Badge>}
                        <IconButton icon={<Icon as={MaterialIcons} name="shopping-cart" size="xl" color="white" />} />
                    </VStack>
                </HStack>
            </HStack>
        </Box >
        <AspectRatio w="100%" ratio={16 / 7}>
            <ImageBackground source={Banner}>
                <Text style={styles.baseText}>
                    NUEVOS CURSOS
                </Text>
                <Text style={styles.title}>
                    TÉCNICAS DE ILUSTRACIÓN PARA LIBROS INFANTILES
                </Text>
                <Text style={styles.sub}>
                    Ver más
                </Text>
            </ImageBackground >
        </AspectRatio>
        <Box alignItems="center">
            {isLoading ? (
                <Spinner style={{ marginTop: 10 }} />
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item }) => (
                        <Box maxW="80" style={{ marginTop: 10 }} rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                            borderColor: "coolGray.600",
                            backgroundColor: "gray.700"
                        }} _web={{
                            shadow: 2,
                            borderWidth: 0
                        }} _light={{
                            backgroundColor: "gray.50"
                        }}>
                            <Box>
                                <AspectRatio w="100%" ratio={16 / 7}>
                                    <Image source={{
                                        uri: item.images[0]
                                    }} alt="image" />
                                </AspectRatio>
                            </Box>
                            <Stack p="4" space={3}>
                                <Stack space={2}>
                                    <Heading size="sm" ml="-1">
                                        {item.title}
                                    </Heading>
                                </Stack>
                                <Text fontWeight="200">
                                    {item.description}
                                </Text>
                                <HStack alignItems="center" space={4} justifyContent="space-between">
                                    <HStack alignItems="left">
                                        {datos.indexOf(item.id + 'Add') == -1 ?
                                            <Button size="sm" variant="ghost" onPress={() => addItem(item.id + 'Add')}>
                                                + Add to cart
                                            </Button> :
                                            <Button size="sm" variant="ghost" colorScheme="secondary" onPress={() => deleteItem(item.id + 'Add')}>
                                                 Added to card
                                            </Button>}
                                    </HStack>
                                    <HStack alignItems="right">
                                        <Heading color="coolGray.600" _dark={{
                                            color: "warmGray.200"
                                        }} size="sm" ml="-1">
                                            <Text>
                                                ${item.price}
                                            </Text>
                                        </Heading>
                                    </HStack>
                                </HStack>
                            </Stack>
                        </Box>
                    )}
                />
            )}
        </Box>
    </Box>;
};

