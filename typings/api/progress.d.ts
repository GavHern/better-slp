//! INCOMPLETE!!!!

interface SummitLearningProgressAPI {
  nonInstructionalPeriods: SummitLearningNonInstructionalPeriod[];
  schoolYears: SummitLearningSchoolYear[];
}

interface SummitLearningNonInstructionalPeriod {
  id: number;
  schoolYearId: number;
  startOn: SummitLearningISODateBasic;
  endOn: SummitLearningISODateBasic;
  description: string | null;
}

interface SummitLearningSchoolYear {
  id: number;
  siteId: number;
  academicYear: number;
  startDate: SummitLearningISODateBasic;
  endDate: SummitLearningISODateBasic;
  firstDayOfSchool: SummitLearningISODateBasic;
  lastDayOfSchool: SummitLearningISODateBasic;
}
