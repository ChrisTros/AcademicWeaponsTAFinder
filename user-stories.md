# E1:  Room & Schedule Discovery 

Students can find, view, and filter TA office hours and schedule details. 

## US1: Filter Course Schedule 
As a student, I want to view scheduled TA office hours filters specifically for the courses I am enrolled in so that I can easily find relevant help without sorting through unrelated classes.\
FR: FR1, FR7\
Priority: Must\
MVP: Yes

[ ] The system displays only courses associated with the logged-in student’s university enrollment profile. 

[ ] Selecting a specific course narrows the schedule view to show only that course’s assigned TAs and their respective office hours. 

## US2: View TA Details 
As a student, I want to view a specific TA’s contact information, meeting location, and virtual link when selected so that I know where or how to attend their session.\
FR: FR10\
Priority: Should\
MVP: Yes

[ ] Clicking on a TA’s office hour slot opens a detailed view showing office location or virtual meeting URL. 

[ ] TA email or preferred contact details are displayed if provided. 

## US3: Authenticate Student 
As a student, I want to securely log into the system using my university credentials so that my course enrollments and attendance intents are automatically synced.\
FR: FR2\
Priority: Must\
MVP: Yes

[ ] The login page provides a university authentication button. 

[ ] Upon successful authentication, the user is redirected to their personalized dashboard showing their enrolled courses. 

# E2: Office Hour Interaction & Management 

Students can manager their attendance intentions, and TAs can manage their schedules and cancellations. 

## US4: Mark Attendance Intent 
As a student, I want to mark my intention to attend a specific TA office hour session so that TAs have a sense of student demand.\
FR: FR3, FR9\
Priority: Must\
MVP: Yes

[ ] An “Intent to Attend” button is available on active office hour slots. 

[ ] Selecting the button logs the student’s sign-up in the central database and update the attendance counter for that session. 

## US5: Remove Attendance Intent 
As a student, I want to remove or cancel my previously marked intention to attend an office hour session so that TAs know if I no longer plan to attend.\
FR: FR4\
Priority: Should\
MVP: Yes

[ ] A previously marked attendance slot displays an option to remove intent. 

[ ] Confirming removal updates the attendance counter and clears the sign-up record from the system. 

## US6: Modify Office Hours 
As a teaching assistant, I want to create, edit, or update my scheduled office hours and physical/virtual locations so that students always have accurate information regarding my availability.\
FR: FR5, FR9\
Priority: Must\
MVP: Yes

[ ] TAs can access an editing interface to change time blocks or room/link details. 

[ ] Changes are immediately saved and reflected on student schedule views. 

## US7: Cancel Office Hours 
As a teaching assistant, I want to cancel an upcoming office hour session so that students do not show up when I am unavailable.\
FR: FR6\
Priority: Must\
MVP: Yes

[ ] TAs can select an active office hour slot and click a “Cancel Office Hours” option. 

[ ] The system updates the session status to canceled in the schedule view. 

## US8: Enforce TA Authorization 
As a teaching assistant, I want restricted office hour modification rights so that TAs can only edit or cancel their own scheduled hours so that unauthorized users cannot alter course schedules.\
FR: FR8\
Priority: Must\
MVP: Yes

[ ] Regular students attempting to access TA editing tools are blocked or denied permissions. 

[ ] TAs are restricted to modifying only the course hours assigned directly to their profile. 

## US9: Notify Schedule Changes 
As a student, I want to receive notifications when a TA cancels or reschedules an office hour session so that I don’t waste time traveling to an unstaffed session.\
FR: FR11\
Priority: Could\
MVP: No

[ ] When a TA cancels a session, an automated notification is triggered to enrolled students. 

[ ] Notifications display the specific sessions date and time that was updated. 

## US10: Log Student Activity 
As a course instructor, I want to log student attendance sign-ups to view usage metrics so that I can track office hour utilization across the semester.\
FR: FR12\
Priority: Could\
MVP: No

[ ] System records student sign-up frequencies tied to course metrics. 

[ ] Instructors can view aggregated usage reports through an administrative view. 