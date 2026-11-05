# Whaddo? — Functional Requirements

**Status:** Draft — Not yet validated with users  
**Version:** 0.1

## Activity Preferences

**FR-01 — Activity Type Selection**  
The system shall allow users to choose between recreational activities (hobbies) and productive activities (chores).

**FR-02 — Available Time**  
The system shall allow users to specify their available time in minutes.

**FR-03 — Location Input**  
The system shall allow users to specify their current location or environment.

**FR-04 — Available Equipment**  
The system shall allow users to specify available equipment and materials.

## Activity Recommendations

**FR-05 — Context-Based Recommendations**  
The system shall recommend activities based on the selected activity type, available time, and supported contextual constraints.

**FR-06 — Activity Details**  
The system shall display the estimated duration and required resources for each recommended activity.

**FR-07 — Activity Selection**  
The system shall allow users to select a recommended activity.

## Future Capabilities

**FR-08 — Save Activities**  
The system shall allow users to save interesting activities for later.

**FR-09 — Activity Discovery**  
The system shall allow users to discover activities beyond their personal collection.

**FR-10 — AI-Assisted Input Interpretation**  
The system shall support interpreting free-text contextual information using AI.

## Requirements Traceability

| User Need | Related Requirements |
|---|---|
| UN-01 — Find Suitable Activities | FR-01 to FR-07 |
| UN-02 — Discover New Activities | FR-09 |
| UN-03 — Make Decisions Efficiently | FR-05, FR-06, FR-07 |
| UN-04 — Remember Interesting Activities | FR-08 |

## Notes

These are candidate requirements based on the initial product concept. Their scope, priority, and acceptance criteria will be refined during further development.

AI functionality must not be a prerequisite for the core recommendation journey in the initial MVP.
