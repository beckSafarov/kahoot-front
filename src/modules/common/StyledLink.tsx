
import { Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

const StyledLink = ({
  href,
  children,
  as:textType,
}: {
  href: string
  children: React.ReactNode
  as?:'span'|'p'
}) => {
  return (
    <Text
      as={textType}
      color='blue.400'
      _hover={{ color: 'blue.500', textDecoration: 'underline' }}
    >
      <Link href={href}>{children}</Link>
    </Text>
  )
}
StyledLink.defaultProps = {
  as: 'span'
}

export default StyledLink
