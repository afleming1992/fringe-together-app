-- CreateTable
CREATE TABLE "User" (
    "uid" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "GroupMembership" (
    "group_id" INTEGER NOT NULL,
    "user_uid" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GroupMembership_pkey" PRIMARY KEY ("group_id","user_uid")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" INTEGER NOT NULL,
    "event_slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventShowing" (
    "id" INTEGER NOT NULL,
    "event_id" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventShowing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupEventInterest" (
    "id" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "GroupEventInterest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupConfirmedEvents" (
    "id" INTEGER NOT NULL,
    "event_showing_id" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "GroupConfirmedEvents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GroupEventInterestToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GroupConfirmedEventsToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_event_slug_key" ON "Event"("event_slug");

-- CreateIndex
CREATE UNIQUE INDEX "_GroupEventInterestToUser_AB_unique" ON "_GroupEventInterestToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupEventInterestToUser_B_index" ON "_GroupEventInterestToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GroupConfirmedEventsToUser_AB_unique" ON "_GroupConfirmedEventsToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupConfirmedEventsToUser_B_index" ON "_GroupConfirmedEventsToUser"("B");

-- AddForeignKey
ALTER TABLE "GroupMembership" ADD CONSTRAINT "GroupMembership_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupMembership" ADD CONSTRAINT "GroupMembership_user_uid_fkey" FOREIGN KEY ("user_uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventShowing" ADD CONSTRAINT "EventShowing_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupEventInterest" ADD CONSTRAINT "GroupEventInterest_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupEventInterest" ADD CONSTRAINT "GroupEventInterest_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupConfirmedEvents" ADD CONSTRAINT "GroupConfirmedEvents_event_showing_id_fkey" FOREIGN KEY ("event_showing_id") REFERENCES "EventShowing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupConfirmedEvents" ADD CONSTRAINT "GroupConfirmedEvents_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupEventInterestToUser" ADD CONSTRAINT "_GroupEventInterestToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "GroupEventInterest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupEventInterestToUser" ADD CONSTRAINT "_GroupEventInterestToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupConfirmedEventsToUser" ADD CONSTRAINT "_GroupConfirmedEventsToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "GroupConfirmedEvents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupConfirmedEventsToUser" ADD CONSTRAINT "_GroupConfirmedEventsToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
