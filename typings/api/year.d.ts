interface SummitLearningYearAPI {
  rubricDimensionScores: SummitLearningRubricDimensionScores[];
  courseAssignmentKnowDoPaces: SummitLearningCourseAssignmentKnowDoPaces[];
  courseFocusAreas: SummitLearningCourseFocusAreas[];
  courses: SummitLearningCourses[];
  focusAreaExemptions: any[]; // No data to strong type this key
  focusAreaMastery: SummitLearningFocusAreaMastery[];
  focusAreas: SummitLearningFocusAreas[];
  focusAreaTakes: SummitLearningFocusAreaTakes[];
  projectAssignmentAssetFeedbacks: SummitLearningProjectAssignmentAssetFeedbacks[];
  projectAssignmentAssets: SummitLearningProjectAssignmentAssets[];
  projectAssignmentsByProject: SummitLearningProjectAssignmentsByProject[];
  projectCheckpoints: SummitLearningProjectCheckpoints[];
  projectCourses: SummitLearningProjectCourses[];
  projects: SummitLearningProjects[];
  sites: SummitLearningSites[];
  subjects: SummitLearningSubjects[];
  nextCheckinsWithPrework: SummitLearningNextCheckinsWithPrework[];
}

// ---------------

type SummitLearningISODateBasic = `${number}-${number}-${number}`;

interface SummitLearningRubricDimensionScores {
  __global_id: string;
  id: number;
  project_assignment_asset_id: number;
  rubric_dimension_id: number;
  updated_at: string;
  score: string;
  draft_score: number | null;
  self_assessed_score: number | null;
  rubric_dimension_type: string;
}

interface SummitLearningCourseAssignmentKnowDoPaces {
  id: number;
  course_id: number;
  num_behind: number;
  expected_passed: number;
}

interface SummitLearningCourseFocusAreas {
  id: number;
  courseId: number;
  knowDoId: number;
  level: 1 | 2 | 3;
  sequence: number;
  assignmentState: number;
}

interface SummitLearningCourses {
  academicYear: number;
  clonedFromId: number | null;
  gradeLevel: number;
  hasCogSkillProjects: boolean;
  hasConceptProjects: boolean;
  id: number;
  knowDoIds: number[];
  name: string;
  ownedBySummit: boolean;
  ownerId: number;
  ownerType: string;
  projectIds: number[];
  seventyPcntScore: number;
  subjectId: number;
}

interface SummitLearningFocusAreaMastery {
  id: number;
  knowDoId: number;
  studentId: number;
  mastery: string;
  reason: string;
  updatedAt: string;
}

interface SummitLearningFocusAreas {
  id: number;
  name: string;
}

interface SummitLearningFocusAreaTakes {
  bestPct: number;
  bestNumCorrect: number;
  bestNumPossible: number;
  highestScoreTakeId: number;
  knowDoId: number;
  longestTakeSeconds: number;
  mostRecentTake: string;
  numTakes: number;
  shortestTakeSeconds: number;
}

interface SummitLearningProjectAssignmentAssetFeedbacks {
  id: number;
  studentId: number;
  projectId: number;
  projectAssetId: number;
  projectAssignmentAssetId: number;
  status: string;
  feedbackRequest: string;
  feedbackRequestDesc: string;
  shouldNotify: boolean;
  updatedAt: string;
}

interface SummitLearningProjectAssignmentAssets {
  id: number;
  project_asset_id: number;
  project_assignment_id: number;
  type: string;
  state: string | null;
}

interface SummitLearningProjectAssignmentsByProject {
  id: number;
  state: "submitted" | "working" | "scored";
  projectId: number;
  startDate: SummitLearningISODateBasic;
  dueOn: SummitLearningISODateBasic;
  studentId: number;
  overdue: boolean;
  submittedOn: SummitLearningISODateBasic | null;
  updatedAt: string;
}

interface SummitLearningProjectCheckpoints {
  project_id: number;
  day_num: number;
  id: number;
  type: string;
}

interface SummitLearningProjectCourses {
  id: number;
  sequence: number;
  courseId: number;
  projectId: number;
}

interface SummitLearningProjects {
  id: number;
  name: string;
  type: string;
  folderId: any; // Unsure
  knowDoIds: number[];
  rubricDimensionIds: number[];
}

interface SummitLearningSites_InstructionalDays {
  id: number;
  day: SummitLearningISODateBasic;
  dayNum: number;
}

interface SummitLearningSites {
  id: number;
  name: string;
  percentContentBufferEnd: number;
  percentContentBufferStart: number;
  percentThroughYear: number;
  schoolEnd: SummitLearningISODateBasic;
  schoolEndYear: number;
  schoolStart: SummitLearningISODateBasic;
  instructionalDays: SummitLearningSites_InstructionalDays[];
}

interface SummitLearningSubjects {
  __global_id: string;
  id: number;
  name: string;
  category: string;
}

interface SummitLearningNextCheckinsWithPrework {
  checkin: {
    id: number;
    student_id: number;
    teacher_id: number;
    checkin_date: string | null;
    started_by: string | null;
    started_at: string | null;
    completed_by: string | null;
    completed_at: string | null;
    mentor_checkin_agenda_id: any; // unsure
    expected_duration: any; // unsure
    created_by: number;
    updated_by: number;
    created_at: string;
    updated_at: string;
    teacher_collapsed: boolean;
    student_collapsed: boolean;
    teacher_urgency: string;
    student_step: any; // unsure
    teacher_previewing: boolean;
    skipped_at: any; // unsure
    agenda_type: string;
    academic_year: number;
    from_schedule: boolean;
    position: number;
    visibility: string;
  };
  prework: {
    id: number;
    mentor_checkin_id: number;
    urgency: any; // unsure
    created_at: string;
    updated_at: string;
    step: string;
    collapsed: boolean;
    proud_moment_answer: any; // unsure
    met_goals_reflection_answer: any; // unsure
    unmet_goals_reflection_answer: any; // unsure
    urgency_reason: any; // unsure
    met_goals_rubric_dimension_ids: number[];
    unmet_goals_rubric_dimension_ids: number[];
    adult_life_answer: any; // unsure
    changed_goals_answer: any; // unsure
    changed_passions_and_interest_answer: any; // unsure
    changed_values_answer: any; // unsure
    end_of_year_answer: any; // unsure
    last_year_outside_school_answer: any; // unsure
    last_year_school_answer: any; // unsure
    role_model_answer: any; // unsure
    school_experience_answer: any; // unsure
    gone_well_this_year_answer: any; // unsure
    progress_through_year_answer: any; // unsure
    going_as_planned_answer: any; // unsure
    learned_from_year_answer: any; // unsure
    changed_goals_through_year_answer: any; // unsure
    teacher_notified_urgent: any; // unsure
    last_school_year_answer: any; // unsure
    choose_one_question_answer: any; // unsure
    younger_role_model_answer: any; // unsure
    ideal_school_experience_answer: any; // unsure
    goals_this_year_answer: any; // unsure
    visibility: string;
  };
  teacher_name: string;
}
