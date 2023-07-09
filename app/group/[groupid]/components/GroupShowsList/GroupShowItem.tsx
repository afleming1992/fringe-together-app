import { GroupInterest, GroupInterestVariant } from "@/app/components/GroupInterest"
import { GroupShow } from "@/lib/gql/types"
import { Box, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react"
import { faClock, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import GroupShowItemMenu from "./GroupShowItemMenu"
import { GroupMembership } from "@/lib/gql/group"
import { useAuth } from "@/app/components/AuthProvider"

interface GroupShowItemProps {
    show: GroupShow
    members: GroupMembership[]
}

const GroupShowItem = ({show, members}: GroupShowItemProps) => {
    let boxBg = useColorModeValue("white !important", "#111c44 !important");
    let secondaryBg = useColorModeValue("gray.50", "whiteAlpha.100");
    let mainText = useColorModeValue("gray.800", "white");

    const { profile } = useAuth();

    return (
            <Flex
              borderRadius='20px'
              bg={boxBg}
              direction='column'
              mb={2}>
              <Box p='20px'>
                <Flex w='100%' mb='10px'>
                  <Text fontWeight='600' color={mainText} w='100%' fontSize='2xl'>
                      { show.show.title }
                  </Text>
                  {
                      profile &&
                      <GroupShowItemMenu groupShow={show} currentUser={profile} />
                  }
                </Flex>
                <Box>
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
