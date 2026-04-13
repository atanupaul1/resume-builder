
# TestSprite AI Testing Report(MCP)

---

## 1️⃣ Document Metadata
- **Project Name:** frontend
- **Date:** 2026-04-02
- **Prepared by:** TestSprite AI Team

---

## 2️⃣ Requirement Validation Summary

#### Test TC001 Builder loads primary editor and preview
- **Test Code:** [TC001_Builder_loads_primary_editor_and_preview.py](./TC001_Builder_loads_primary_editor_and_preview.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f483042f-9362-4da5-b6b9-64b4771b8baf/636b9888-77c3-47a7-b303-7cbe6849aac9
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC002 End-to-end editing updates live preview
- **Test Code:** [TC002_End_to_end_editing_updates_live_preview.py](./TC002_End_to_end_editing_updates_live_preview.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f483042f-9362-4da5-b6b9-64b4771b8baf/c5beb1d0-01bb-46e2-b486-e422f4adc889
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC003 Validation errors shown for incomplete or invalid required fields and clear after correction
- **Test Code:** [TC003_Validation_errors_shown_for_incomplete_or_invalid_required_fields_and_clear_after_correction.py](./TC003_Validation_errors_shown_for_incomplete_or_invalid_required_fields_and_clear_after_correction.py)
- **Test Error:** Saving the resume did not trigger validation errors when required fields were left empty or contained invalid values. The save action appears to be broken because no error messages or inline validation were shown after multiple attempts.

Observations:
- The Personal Info section is open and the Full Name field (required) is empty.
- The Email field contains the value 'invalid-email'.
- The 'Save Progress' button is present and was clicked (two attempts) but produced no visible validation messages.
- No inline error messages, alerts, or blocking behavior appeared after clicking Save Progress.
- The page remained on the builder screen with no indication that the invalid inputs were rejected.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f483042f-9362-4da5-b6b9-64b4771b8baf/4c4b12f4-efd5-4cd8-8cfb-12d25f5a8545
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC006 Template gallery loads and shows thumbnails
- **Test Code:** [TC006_Template_gallery_loads_and_shows_thumbnails.py](./TC006_Template_gallery_loads_and_shows_thumbnails.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f483042f-9362-4da5-b6b9-64b4771b8baf/94c88187-df15-4bf6-94f5-c14f3e931b47
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC007 Select template from library and apply in builder
- **Test Code:** [TC007_Select_template_from_library_and_apply_in_builder.py](./TC007_Select_template_from_library_and_apply_in_builder.py)
- **Test Error:** Selecting a template from the templates library does not open the resume builder. The library's 'USE TEMPLATE' controls only mark a card as selected but do not navigate the user to the builder.

Observations:
- The 'USE TEMPLATE' button in the templates gallery was clicked 3 times and only produced a visual selection (green check) each time; no navigation occurred.
- The templates page was manually navigated to (/templates) multiple times to attempt selection.
- The resume builder page (/builder) is reachable via direct navigation, and shows the 'Glassmorphism' template when on the builder.
- There is no evidence that clicking 'USE TEMPLATE' in the library automatically redirects to the builder in the current app behavior.
- The live preview on the builder shows an empty canvas until sections are added, indicating the builder itself loads normally when navigated to directly.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f483042f-9362-4da5-b6b9-64b4771b8baf/08a0e025-47d6-4c07-8571-911ecab074ba
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC009 Import CV control is accessible from builder header
- **Test Code:** [TC009_Import_CV_control_is_accessible_from_builder_header.py](./TC009_Import_CV_control_is_accessible_from_builder_header.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f483042f-9362-4da5-b6b9-64b4771b8baf/bcf0961f-f037-46ba-8894-754a5090f266
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC010 Unsupported file type shows validation error
- **Test Code:** [TC010_Unsupported_file_type_shows_validation_error.py](./TC010_Unsupported_file_type_shows_validation_error.py)
- **Test Error:** Could not complete the verification because an unsupported file could not be provided to the importer in the test environment.

Observations:
- The builder page (/builder) is open and shows an Import CV control and a file input.
- The file input's accept attribute lists only .pdf, .docx, and .txt (these are the supported formats shown to the user).
- An attempt to use the unsupported filename 'unsupported_file.png' failed because the file path is not available in the test environment and returned an "Invalid filename format. Must be alphanumeric with supported extension." error.
- Because a .png file could not be uploaded, the UI validation/error message shown when selecting an unsupported file type could not be observed.

No further actions were possible without adding an unsupported file to the available test files.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f483042f-9362-4da5-b6b9-64b4771b8baf/2a1ebc95-18ab-4a7c-b179-59d0a4e812a3
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC011 Export page loads and export controls are available
- **Test Code:** [TC011_Export_page_loads_and_export_controls_are_available.py](./TC011_Export_page_loads_and_export_controls_are_available.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f483042f-9362-4da5-b6b9-64b4771b8baf/b513082a-1a55-4008-8d3b-15bca14a7cb2
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC012 Attempt PDF export and handle outcome without relying on download
- **Test Code:** [TC012_Attempt_PDF_export_and_handle_outcome_without_relying_on_download.py](./TC012_Attempt_PDF_export_and_handle_outcome_without_relying_on_download.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f483042f-9362-4da5-b6b9-64b4771b8baf/1abaabcd-6b2c-4493-8142-aa2e3b149587
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC013 Attempt Word export and handle outcome without relying on download
- **Test Code:** [TC013_Attempt_Word_export_and_handle_outcome_without_relying_on_download.py](./TC013_Attempt_Word_export_and_handle_outcome_without_relying_on_download.py)
- **Test Error:** No export-in-progress UI was observed when triggering the Word export; clicking the Word button did not produce visible feedback and the control remained active.

Observations:
- The page shows both PDF and Word export buttons in the header.
- Clicking the Word button (index 1202) multiple times did not display any text such as 'Exporting', 'Preparing download', or 'Generating'.
- No modal, overlay, or spinner appeared after clicking the export button.
- The Word button remained enabled with no visible disabled state or label change.
- A content check found no attribute or label changes for the PDF (index 1197) or Word (index 1202) buttons after clicks.

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f483042f-9362-4da5-b6b9-64b4771b8baf/cf92c29c-a3b2-40d9-b78c-92639b7579c8
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC014 PDF export failure shows an error state and no success confirmation
- **Test Code:** [TC014_PDF_export_failure_shows_an_error_state_and_no_success_confirmation.py](./TC014_PDF_export_failure_shows_an_error_state_and_no_success_confirmation.py)
- **Test Error:** PDF export did not display an error message nor a success confirmation when the export was triggered.

Observations:
- The PDF export button (top-right) was clicked, but no toast, modal, or inline message stating an export failure appeared.
- No success confirmation, download prompt, or saved-file notification was visible after attempting export.
- The resume builder page and canvas remain visible (canvas empty) and the sections list shows 0 of 6 sections complete.
- File import controls and other header buttons (Word, Save Progress, AI Suggestions) are present with no error indicators.
- No explicit "Exporting...", "Export failed", or "Export successful" message is present in the UI.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f483042f-9362-4da5-b6b9-64b4771b8baf/6f4d7a1f-99a9-4eba-8054-9371c27f3324
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC004 Add and remove an experience entry
- **Test Code:** [null](./null)
- **Test Error:** Test execution failed or timed out
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f483042f-9362-4da5-b6b9-64b4771b8baf/49bdab5c-72fe-44e4-af39-7088bb096ca8
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC005 Reordering sections changes order in preview
- **Test Code:** [TC005_Reordering_sections_changes_order_in_preview.py](./TC005_Reordering_sections_changes_order_in_preview.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f483042f-9362-4da5-b6b9-64b4771b8baf/26af1b29-fd8a-4083-a73a-28f12d297c35
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC015 Word export failure shows an error state and no success confirmation
- **Test Code:** [TC015_Word_export_failure_shows_an_error_state_and_no_success_confirmation.py](./TC015_Word_export_failure_shows_an_error_state_and_no_success_confirmation.py)
- **Test Error:** No error message was displayed when the Word export was triggered, so the expected failure behavior could not be verified.

Observations:
- The Word export button on the /builder page was clicked (two attempts), and the page was observed for ~5s after each click.
- No visible toast, alert, or on-page text containing 'error', 'failed', 'could not', or 'export failed' appeared after triggering export.
- No success confirmation or success toast was visible after the export attempts.
- The builder UI remained on the resume builder page (PDF and Word export buttons visible, empty canvas and sections list present).
- A search/scroll for the text 'error' did not reveal any persistent error message on the page.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f483042f-9362-4da5-b6b9-64b4771b8baf/dfb548b9-e5d8-4bf9-9d3a-aa90c75a6ace
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC016 Prevent duplicate PDF export submissions while export is in progress
- **Test Code:** [TC016_Prevent_duplicate_PDF_export_submissions_while_export_is_in_progress.py](./TC016_Prevent_duplicate_PDF_export_submissions_while_export_is_in_progress.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/f483042f-9362-4da5-b6b9-64b4771b8baf/cb605a8b-3ad9-4c8a-a304-3181f3695d9b
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---


## 3️⃣ Coverage & Matching Metrics

- **53.33** of tests passed

| Requirement        | Total Tests | ✅ Passed | ❌ Failed  |
|--------------------|-------------|-----------|------------|
| ...                | ...         | ...       | ...        |
---


## 4️⃣ Key Gaps / Risks
{AI_GNERATED_KET_GAPS_AND_RISKS}
---