# Red Thread Consulting To-Do List

- [x] Setup monaco editor to support shiki for syntax highlighting for it's mdx support.
- [x] Setup editor with solid theme provided by shiki that aligns with rest of app.
- [x] Handle saving of mdx to database with keymap.
  - [x] Show indicator to admin indicating that content was saved.
- [x] Add 'view full page' option to table of results. This can be the same link that will be sendable to others.
- [x] Implement side-by-side image grid component in mdx similar to layout used previously once image storage solutions are figured out.
- [x] Handle form submission
- [x] Finish implementing new font for body text.
  - [x] Try re-installing with cdn to get to work and make sure this is the correct font, because currently it looks fucking horrendous.
  - [x] Document that along with 'compares to' column.
- [ ] Document 'desc' property on text inputs.
- [ ] Create notification that indicates a form is being submitted. The state already exists.
- [x] Document `Title` component
- [x] Finish view response methods for:
  - [x] `SelectInput`
  - [x] `DateInput`
- [x] Handle ordering of form inputs according to newly added field.
- [x] Add loading state to form submission to avoid dual submissions.
- [x] Document form submit button
- [x] Fix issue with form input order on review page.
- [x] Handle response page
- [x] Add delete confirmation to form response when in selected state.
  - [x] Build a component for each `InputId` and create a switch component that renders each item according to it's `inputId` field.
- [ ] Move zod state being passed to meta to using the 'output' state and a conditional statement in the `useInitialFormValue` hook or create a new hook to conditionally parse the props based on the page or some context state. Give up on trying to pass around the input state before parsing it as it's creating some massively over-complex types.

- [ ] Add these components:
  - [x] Hr html element
  - [x] Date Picker with the following formats:
    - [x] `date`
    - [x] `dateAndTime` (default)
    - [x] `time`
    - [x] `calendar` (Show calendar and leave it visible, don't hide like a popover.)
  - [ ] Radio Group
  - [ ] Slider
  - [ ] Tabs
- [ ] Render solid preview in same mdx form container that will be used elsewhere throughout the app.
- [x] Fix response preview page to accomodate form of unknown format.

## Admin Improvements

- [ ] Handle authentication fail page and setup authentication page to redirect to our auth page. Currently it's redirecting to the default next-auth pages and they're hideous.
- [ ] per-form page that renders a table of each form field name as a column with all responses.
