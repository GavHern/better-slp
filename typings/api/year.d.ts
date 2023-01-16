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
