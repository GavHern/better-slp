interface SummitLearningAnnouncementsAPI {
  announcemens: SummitLearningAnnouncement[];
}

// ---------------

type SummitLearningISODate =
  `${number}-${number}-${number}T${number}:${number}:${number}\.${number}-${number}:${number}`;

interface SummitLearningAnnouncement {
  __global_id: string;
  callToActionText: string;
  callToActionUrl: string;
  contentBody: string;
  contentTitle: string;
  edited: boolean;
  id: number;
  name: string; // could be more narrow
  ownerId: number;
  ownerName: string;
  targetAudienceName: string;
  unseen: boolean;
  updatedAt: SummitLearningISODate;
}
