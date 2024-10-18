import React, { useEffect, useState,useRef } from 'react'
import axios from 'axios';
import { db } from './Firebase/Firestore';

import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';

import {
    Box, 
    Button, 
    ButtonGroup,
    useDisclosure, 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Text
} from '@chakra-ui/react'
import {
    collection,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    getDocs,
    addDoc
  } from 'firebase/firestore';
  import { v4 as uuidv4 } from 'uuid';
//import { map } from './Maps';
import { toLonLat, fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';


const MyEvents = () => {
  
    const [Events, setEvents] = useState([]);
    const [Name,setName] = useState(null);
    const [Date,setDate] = useState(null);
    const [coordinates, setCoordinates] = useState(null);
    //const [error, setError] = useState(null);
    const [secondModal,setSecondModal] = useState(false)
    const mapRef = useRef(null); // Create a ref to store the map instance
    const { isOpen: isFirstModalOpen, onOpen: onOpenFirstModal, onClose: onCloseFirstModal } = useDisclosure();
    const { isOpen: isSecondModalOpen, onOpen: onOpenSecondModal, onClose: onCloseSecondModal } = useDisclosure();
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    console.log(isSecondModalOpen)
    const HandleAddEvents = () => {
      onOpenFirstModal();
    }
    console.log(Events)
    console.log(coordinates)
      // Initialize the map once
    // Dynamically set the map target to the DOM element after the component mounts
    useEffect(() => {
      // Initialize the map only once when the component mounts
      const keralaCoordinates = fromLonLat([76.2711, 10.8505]);
      const map = new Map({
        view: new View({
          center: keralaCoordinates,
          zoom: 5,
        }),
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        target: null, // Dynamically set later
      });
      mapRef.current = map;
      // Create a layer for markers
      const markerSource = new VectorSource();
      const markerLayer = new VectorLayer({
        source: markerSource,
        style: new Style({
          image: new Icon({
            src: 'https://openlayers.org/en/v6.5.0/examples/data/icon.png',
            anchor: [0.5, 1],
          }),
        }),
      });
      map.addLayer(markerLayer);
    
      // Handle map clicks for adding markers
      map.on('dblclick', (event) => {
        const coordinates = event.coordinate;
        const lonLat = toLonLat(coordinates);
        console.log('Coordinates:', lonLat);
        setCoordinates(lonLat); // Update the state with the new coordinates
    
        const marker = new Feature(new Point(coordinates));
        markerSource.clear(); // Remove previous markers
        markerSource.addFeature(marker);
      });
    
      // Clean up the map on component unmount
      return () => {
        map.setTarget(null); // Removes the map on unmount
      };
    }, []);
    
    useEffect(() => {
      if (isSecondModalOpen) {
        // When the modal opens, set the map target
        setTimeout(() => {
          const mapElement = document.getElementById('map');
          if (mapElement && mapRef.current) {
            mapRef.current.setTarget('map');
          }
        }, 0); // Ensure the modal content is rendered before setting the target
      } else if (mapRef.current) {
        // When the modal closes, remove the map target
        mapRef.current.setTarget(null);
      }
    }, [isSecondModalOpen]);
      
 
    

    const HandleModalSubmit=()=>{

        //setEvents(value);
        onCloseFirstModal()
        const date = Date.slice(0, 10);  
        console.log(date);
        const time = Date.slice(11,16);
        console.log(time);
        setEvents((prevTexts) => [
            ...prevTexts,
            {
              id:   Events.length + 1,
              Name: Name,
              Date: date,
              Time: time ,
             
            },
          ]);
          //createMap()
          
        
        const docRef = collection(db,'Database',`abhishekkrishnan2006@gmail.com`,`${Name}`)
        try {
            addDoc(docRef,{
                Date:date,
                Time:time,
                Latitude:coordinates[0],
                Longitude:coordinates[1],
            })

          } catch (error) {
            console.log(error)
          }
        
        setName(null);
        setDate(null);
        
    }
   
  return (
    <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        
    >
        <Box
          w="100%"
          display="flex"
          flexDirection="colmn"
          alignItems="center"
          h="650px"

          
        >
         
        </Box>
        <Box
            w="100%"
            display="flex"
            flexDirection="colmn"
            alignItems="center"
            justifyContent="flex-end"
            p="10px"
            pr = "20px" 
        >
         
        
          <Button 
              colorScheme='teal' 
              size='md'
              onClick = {HandleAddEvents}

          >
              Add Events
          </Button>
          <Modal
              
              isOpen={isFirstModalOpen}
              onClose={ onCloseFirstModal}
          >
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Create your Event</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <FormControl>
                <FormLabel>Event Name</FormLabel>
                <Input ref={initialRef} placeholder='First name' onChange={(e)=>setName(e.target.value)}/>
                </FormControl>

                <FormControl mt={4}>
                <FormLabel>Date & Time</FormLabel>
                <Input placeholder='Select Date and Time' size='md' type='datetime-local' onChange={(e)=>{setDate(e.target.value)}}/>
                </FormControl>
                <FormControl mt={4}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box
                    w="300px"
                    h="100px"
                    display="flex"
                    flexDirection="column"
                    
                    justifyContent="flex-start"

                  >
                    <Text
                      w='100%'
                      mb={4}
                      mt={4}
                    >
                      Latitude:{coordinates?.[0]}
                    </Text>
                    <Text
                       w='100%'
                    >
                      Longitude:{coordinates?.[1]}
                    </Text>
                  </Box>
                  <Button 
                    colorScheme='teal' 
                    variant='outline'
                    onClick={()=>{
                      
                      //handleMap()
                      setSecondModal(true)
                      onOpenSecondModal()
                    }}
                  >
                    Add Location
                  </Button>
                </Box>
                
                </FormControl>
            </ModalBody>

            <ModalFooter>
                <Button 
                    colorScheme='blue' 
                    mr={3}
                    onClick={()=>{
                      HandleModalSubmit()
                      setStatus(false)
                    }}
                >

                Save
                </Button>
                <Button onClick={ onCloseFirstModal}>Cancel</Button>
            </ModalFooter>
            </ModalContent>
          </Modal>
            
          <Modal
              isOpen={isSecondModalOpen}
              onClose={ onCloseSecondModal}
              
            >
            <ModalOverlay />
            <ModalContent
              w="600px"
            >
              <ModalHeader>Location</ModalHeader>
              <ModalCloseButton />
              <ModalBody
                pb={6}
                >
                 <Box
                  h="450px"
                  w="100%"
                >
                  <Box 
                    id = "map"
                    w="100%"
                    h="450px"
                  >
                      
                  </Box>
                </Box>
              </ModalBody>

              <ModalFooter
                
              >
                <Button 
                colorScheme='blue' 
                mr={3}
                onClick={ ()=>{
                  onCloseSecondModal()
                  
                }}
                >
                  Save
                </Button>
                <Button onClick={ onCloseSecondModal}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
       
    </Box>
  )
}

export default MyEvents