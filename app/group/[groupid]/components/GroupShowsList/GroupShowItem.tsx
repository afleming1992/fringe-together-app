import { GroupInterest, GroupInterestVariant } from "@/app/components/GroupInterest"
import { GroupShow, GroupShowInterestType } from "@/lib/gql/types"
import { Box, Flex, Icon, Text, useColorModeValue, useToast } from "@chakra-ui/react"
import { faClock, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import GroupShowItemMenu from "./GroupShowItemMenu"
import { GroupMembership } from "@/lib/gql/group"
import { useAuth } from "@/app/components/AuthProvider"
import { useAddShow } from "../AddShowProvider"
import { useEffect, useState } from "react"

interface GroupShowItemProps {
    show: GroupShow
    members: GroupMembership[]
}

const GroupShowItem = ({show, members}: GroupShowItemProps) => {
    const toast = useToast();
    const { updateInterest } = useAddShow();
    const { profile } = useAuth();
    const [ interestType, setInterestType ] = useState<GroupShowInterestType>(GroupShowInterestType.NOT_INTERESTED);

    useEffect(() => {
      if(profile) {
        const interest = show.interest.find((entry) => {
          return entry.user.uid === profile.uid
        });

        if(interest) {
          setInterestType(interest.type);
        } else {
          setInterestType(GroupShowInterestType.NOT_INTERESTED);
        }
      }
    }, [show, profile])

    const submitInterestChange = (type: GroupShowInterestType) => {
      if(interestType !== type) {
        setInterestType(type);
        toast({
          title: `Registering as ${type}`,
          position: 'top',
          status: 'info',
          duration: 5000
        })
        updateInterest(show.show.uri, type);
      } else {
        setInterestType(GroupShowInterestType.NOT_INTERESTED)
        toast({
          title: 'Removing interest...',
          position: 'top',
          status: 'info',
          duration: 5000
        })
        updateInterest(show.show.uri, GroupShowInterestType.NOT_INTERESTED);
      }
    }

    const onInterestedClick = () => submitInterestChange(GroupShowInterestType.INTERESTED);
    const onGoingClick = () => submitInterestChange(GroupShowInterestType.BOOKED);
    
    let boxBg = useColorModeValue("white !important", "#111c44 !important");
    let secondaryBg = useColorModeValue("gray.50", "whiteAlpha.100");
    let mainText = useColorModeValue("gray.800", "white");    

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
            <GroupInterest variant={GroupInterestVariant.OVERVIEW} interest={show.interest} members={members} currentInterestType={interestType} onInterestedClick={onInterestedClick} onGoingClick={onGoingClick} />
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
