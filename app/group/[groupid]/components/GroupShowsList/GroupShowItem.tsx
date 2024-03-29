import { GroupInterest, GroupInterestVariant } from "@/app/components/GroupInterest"
import { GroupShow, GroupShowInterestType } from "@/lib/gql/types"
import { Box, Flex, Icon, Text, useColorModeValue, useToast, Image } from "@chakra-ui/react"
import { faCalendar, faClock, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import GroupShowItemMenu from "./GroupShowItemMenu"
import { GroupMembership } from "@/lib/gql/group"
import { useAuth } from "@/app/components/AuthProvider"
import { useAddShow } from "../ShowProvider"
import { useEffect, useState } from "react"
import { Shadows_Into_Light_Two } from "next/font/google"

interface GroupShowItemProps {
    show: GroupShow
    members: GroupMembership[]
}

const GroupShowItem = ({show, members}: GroupShowItemProps) => {
    const toast = useToast();
    const { updateInterest, openModalForDate } = useAddShow();
    const { profile } = useAuth();
    const [ interestType, setInterestType ] = useState<GroupShowInterestType>(GroupShowInterestType.NOT_INTERESTED);
    const [ interestDate, setInterestDate ] = useState<Date | null | undefined>(null);

    useEffect(() => {
      if(profile) {
        const interest = show.interest.find((entry) => {
          return entry.user.uid === profile.uid
        });

        if(interest) {
          setInterestType(interest.type);
          setInterestDate(interest.date);
        } else {
          setInterestType(GroupShowInterestType.NOT_INTERESTED);
          setInterestDate(undefined);
        }
      }
    }, [show, profile])

    const submitInterestChange = (type: GroupShowInterestType) => {
      if(interestType !== type) {
        if(type === GroupShowInterestType.NOT_INTERESTED || !interestDate) {
          openModalForDate(type, show.show.uri);
        } else {
          setInterestType(type);
          updateInterest(show.show.uri, type);
        }
      } else {
        setInterestType(GroupShowInterestType.NOT_INTERESTED)
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
          <Flex>
            {
              show.show.imageUri &&
              <Box p={2}>
                <Image boxSize='75px' rounded={"lg"} src={show.show.imageUri} alt={`${show.show.title}'s Header Image`} />
              </Box>
            }
            <Flex p={2} mb='10px' w='100%'>
              <Box w='100%'>
                  <Text fontWeight={'600'} color={mainText} fontSize='xl'>{ show.show.title }</Text>
                  <Text fontSize='sm'><FontAwesomeIcon icon={faCalendar} />&nbsp;{ show.show.date } | <FontAwesomeIcon icon={faClock} />&nbsp; { show.show.time }</Text>
              </Box>
              {
                  profile &&
                  <GroupShowItemMenu groupShow={show} currentUser={profile} />
              }
            </Flex>
          </Flex>
          <Box>
            <GroupInterest showInfo={show.show} variant={GroupInterestVariant.OVERVIEW} interest={show.interest} currentInterestType={interestType} onInterestedClick={onInterestedClick} onGoingClick={onGoingClick} />
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
                { show.show.duration }
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
