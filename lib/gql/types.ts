

export interface Show {
    id: string,
    uri: string,
    title: string,
    location: string,
    duration: string,
    showRun: string,
    description: string,
    availableShows: string[]
}

export interface GroupShow {
    show: ShowInfo
    interest: GroupShowInterest[]
}

export interface ShowInfo {
    uri: string
    title: string
    location: string
}

export interface GroupShowInterest {
    id: number
    type: GroupShowInterestType
    user: UserUid
    date?: Date | null
}

export interface UserUid {
    uid: string
}

export enum GroupShowInterestType {
    NOT_INTERESTED="NOT_INTERESTED",
    INTERESTED="INTERESTED",
    INTERESTED_IN_DATE="INTERESTED_IN_DATE",
    BOOKED="BOOKED",
}