import { useNewKahootContext } from '@/hooks/Contexts'
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from '@chakra-ui/react'
import React, { useMemo, useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'

const options = [
  { label: '10s', value: 10 },
  { label: '20s', value: 20 },
  { label: '30s', value: 30 },
]

const SettingsSection = ({
  flex,
}: {
  flex: string
}) => {
  const { updateSlide, deleteSlide, activeSlide, slides } = useNewKahootContext()
  
  const activeSlideSeconds = useMemo(()=>{
    const currSlideSeconds = slides.find((slide)=>slide['id'] === activeSlide)?.['seconds']
    return currSlideSeconds ? currSlideSeconds+'s' : '10s'
  },[slides, activeSlide])

  const handleTimeClick = (seconds: number) => {
    updateSlide({ seconds })
  }

  const handleDelete = () => {
    if(slides.length < 2) return
    if(confirm('Are you sure?'))deleteSlide()
  }

  return (
    <VStack flex={flex} px='10px'>
      <Flex justifyContent='center' alignItems='center' w='full' py='10px'>
        <Text flex='1' textAlign='right' pr='10px'>
          Time:
        </Text>
        <Menu>
          <MenuButton
            flex='2'
            w='full'
            as={Button}
            rightIcon={<BsChevronDown />}
          >
            {activeSlideSeconds}
          </MenuButton>
          <MenuList w='full'>
            {options.map((option, i: number) => (
              <MenuItem
                onClick={() => handleTimeClick(option.value)}
                value={option.value}
                key={i}
              >
                {option.label}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Flex>
      <Box w='full'>
        <Button
          isDisabled={slides.length < 2}
          onClick={handleDelete}
          w='full'
          colorScheme='red'
        >
          Delete
        </Button>
      </Box>
    </VStack>
  )
}

export default SettingsSection
