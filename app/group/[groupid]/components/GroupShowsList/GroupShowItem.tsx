import { GroupInterest, GroupInterestVariant } from "@/app/components/GroupInterest"
import { GroupShow, ShowInfo } from "@/lib/gql/types"
import { User } from "@/lib/gql/user"
import { Avatar, AvatarGroup, Box, Button, Card, CardBody, CardHeader, Flex, Heading, Icon, Image, Text, useColorModeValue } from "@chakra-ui/react"
import { faClock, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface GroupShowItemProps {
    show: GroupShow
    members: User[]
}

const GroupShowItem = ({show, members}: GroupShowItemProps) => {
    let boxBg = useColorModeValue("white !important", "#111c44 !important");
    let secondaryBg = useColorModeValue("gray.50", "whiteAlpha.100");
    let mainText = useColorModeValue("gray.800", "white");
    let iconBox = useColorModeValue("gray.100", "whiteAlpha.200");
    let iconColor = useColorModeValue("brand.200", "white");

    return (
            <Flex
              borderRadius='20px'
              bg={boxBg}
              direction='column'
              mb={2}>
              <Box p='20px'>
                <Flex w='100%' mb='10px'>
                  {/* <Image src='https://i.ibb.co/ZWxRPRq/Venus-Logo.png' me='auto' /> */}
                </Flex>
                <Box>
                  <Flex>
                    <Text fontWeight='600' color={mainText} w='100%' fontSize='2xl'>
                        { show.show.title }
                    </Text>
                  </Flex>
                  <GroupInterest variant={GroupInterestVariant.OVERVIEW} interest={show.interest} members={members} />
                </Box>
              </Box>
              <Flex
                bg={secondaryBg}
                w='100%'
                p='20px'
                borderBottomLeftRadius='inherit'
                borderBottomRightRadius='inherit'
                height='100%'
                direction='column'>
                <Flex>
                  <Flex me='25px'>
                    <Icon w='20px' h='20px' me='6px' color='green.400'>
                        <FontAwesomeIcon icon={faClock} />
                    </Icon>
                    <Text color={mainText} fontSize='sm' my='auto' fontWeight='500'>
                      {}
                    </Text>
                  </Flex>
                  <Flex>
                    <Icon
                      w='20px'
                      h='20px'
                      me='6px'
                      color='red.500'
                    >
                        <FontAwesomeIcon icon={faLocationDot} />
                    </Icon>
                    <Text color={mainText} fontSize='sm' my='auto' fontWeight='500'>
                      { show.show.location }
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
    )
}

export default GroupShowItem
