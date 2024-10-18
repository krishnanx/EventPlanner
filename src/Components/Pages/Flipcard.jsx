import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import './Flipcard.css';

const Flipcard = ({frontContent,backContent}) => {
    return ( 
        <Box className='flip-card' width='250px' height='200px' margin='10px' borderRadius='20px'>
            <Box className='flip-card-inner'>
                <Box className='flip-card-front' display='flex' alignItems='center' justifyContent='center'>
                    {frontContent}
                </Box>
                <Box className='flip-card-back' display='flex' justifyContent='center' alignItems='center'>
                    {backContent}
                </Box>
            </Box>
        </Box>
    );
};

function FlipCardApp(){
    return(
        <Box height="100vh" display="flex" flexDirection='column'  alignItems='center' justifyContent='flex-end'  >
            
                <Flex gap="60px" >;
                    <Flipcard 
                       frontContent={<h2>Front 1</h2>}
                       //backContent={<h2>Back 1</h2>}
                    />
                    <Flipcard
                       frontContent={<h2>Front 2</h2>}
                       //backContent={<h2>Back 2</h2>}
                    />
                    <Flipcard
                       frontContent={<h2>Front 3</h2>}
                       //backContent={<h2>Back 3</h2>}
                    />

                </Flex>
            
        </Box>
        
    )
}
 
export default FlipCardApp;