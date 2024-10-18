import React, { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import './Navabar.css';
import martini from './Pages/martini.jpg';

const Navbar = () => {

  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div 
        className={`max-w-screen-2x1 container mx-auto md:px-20 px-4 top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          sticky ? "sticky-navbar shadow-md bg-base-200" : ""
        }`}
        style={{ position: sticky ? 'sticky' : 'relative', top: '0' }}  // Ensure proper sticky behavior
      >
        <Box 
          w="100%" 
          h="85px" 
          bgColor="rgba(0, 128, 0, 0.5)"  // translucent green background
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Box
            w="50%"
            p="3"
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
          >
            <img src={martini} alt="martini" />
          </Box>
          <Box
            w="50%"
            mt="1"
            p="5"
            display="flex"
            flexDirection="row"
            justifyContent="flex-end"
          >
            <Button colorScheme='gray'>Get Started</Button>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Navbar;
