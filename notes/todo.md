# Red Thread Consulting To-Do List

- [x] Setup monaco editor to support shiki for syntax highlighting for it's mdx support.
- [x] Setup editor with solid theme provided by shiki that aligns with rest of app.
- [x] Handle saving of mdx to database with keymap.
  - [x] Show indicator to admin indicating that content was saved.
- [x] Add 'view full page' option to table of results. This can be the same link that will be sendable to others.
- [x] Implement side-by-side image grid component in mdx similar to layout used previously once image storage solutions are figured out.
- [ ] Handle form submission
- [ ] Document 'desc' property on text inputs.
- [ ] Add loading state to form submission to avoid dual submissions.
- [ ] Fix issue with mdx content being unable to delete by red button.
- [ ] Document form submit button
- [ ] Fix issue with form input order on review page.
- [ ] Handle response page
- [ ] Add delete confirmation to form response when in selected state.
  - [ ] Build a component for each `InputId` and create a switch component that renders each item according to it's `inputId` field.

- [ ] Add these components:
  - [ ] Hr html element
  - [ ] Date Picker with the following formats:
    - [ ] `date`
    - [ ] `dateAndTime` (default)
    - [ ] `time`
    - [ ] `calendar` (Show calendar and leave it visible, don't hide like a popover.)
  - [ ] Radio Group
  - [ ] Slider
  - [ ] Tabs
- [ ] Setup markdown remark image plugin for better default image sizing if `prose` doesn't catch it.
- [ ] Render solid preview in same mdx form container that will be used elsewhere throughout the app.
- [ ] Fix response preview page to accomodate form of unknown format.

## Admin Improvements

- [ ] Handle authentication fail page and setup authentication page to redirect to our auth page. Currently it's redirecting to the default next-auth pages and they're hideous.

---

## Bugs

- [ ] There is _massive_ overscroll on the editor page once the mardown renders if it is long enough. Fix this **immediately**.
