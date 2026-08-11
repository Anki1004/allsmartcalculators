import type { CalcInlineContent } from './types';

// Per-university articles. Deliberately hand-written rather than generated from
// a template: the whole reason these pages can rank is that each university's
// rule, confusion and paperwork differ. A shared template with the numbers
// swapped would be the "low value content" pattern that got the site rejected.

export const educationCgpaContent: Record<string, CalcInlineContent> = {
  'vtu-cgpa-to-percentage': {
    article: `VTU converts CGPA to percentage by subtracting 0.75 and multiplying by 10. A CGPA of 8.5 becomes (8.5 − 0.75) × 10 = 77.5%.

The deduction surprises people, and it is worth understanding why it exists. VTU's grade points are assigned in bands — a mark anywhere from 80 to 89 earns the same A+ and the same 9 points. Averaging grade points therefore loses the detail of where inside the band you actually sat. The 0.75 deduction is VTU's blanket correction for that band effect, applied uniformly so every student is treated the same way.

## The VTU CBCS grade table

| Grade | Points | Marks |
|---|---|---|
| O (Outstanding) | 10 | 90–100 |
| A+ | 9 | 80–89 |
| A | 8 | 70–79 |
| B+ | 7 | 60–69 |
| B | 6 | 55–59 |
| C | 5 | 50–54 |
| P (Pass) | 4 | 40–49 |
| F (Fail) | 0 | Below 40 |

Your SGPA for a semester is the credit-weighted average of these points; your CGPA is the credit-weighted average across all semesters.

VTU states the conversion formula on its own site: [vtu.ac.in/en/cgpa-standard-formula](https://vtu.ac.in/en/cgpa-standard-formula/).

## Where you will be asked for this

Almost every campus placement form, every PSU application, and every foreign university application asks for a percentage, not a CGPA. So does the "aggregate marks" field on most Indian job portals. If you enter your CGPA into a percentage field — 8.5 where 77.5 was expected — you will be screened out by an automated filter before a human ever reads the application.

The safest practice is to write the percentage and add the CGPA in brackets: **77.5% (CGPA 8.5, VTU scale)**. Recruiters familiar with VTU will recognise it instantly, and it removes any suggestion that you inflated a number.

## Which scheme applies to you

VTU publishes this formula for the **2015, 2017 and 2018 schemes**, and says so explicitly on its own page. Later schemes are not covered by that page. If your marks card is from a 2021 or later scheme, check what it prints alongside your CGPA rather than assuming the 0.75 deduction carried over — VTU has not published the same statement for those years.

Diploma and lateral-entry students should note that their CGPA is computed only over the semesters they actually studied at VTU. The conversion rule is unchanged.

## What the calculator does not decide

The class or division shown here uses the conventional Indian cut-offs — distinction at 75%, first class at 60%, second class at 50%. VTU prints the class awarded on your final marks card, and where the two differ, the marks card is authoritative. Use this as a working figure while filling forms, and quote the marks card when the number is going into a legal declaration.`,
    faqs: [
      {
        question: 'What is the official VTU CGPA to percentage formula?',
        answer:
          'Percentage = (CGPA − 0.75) × 10. A CGPA of 8.5 converts to 77.5%, a 9.0 to 82.5%, and a 7.2 to 64.5%. VTU publishes this on its own site as the standard formula for the 2015, 2017 and 2018 schemes. It is the figure to quote when an application asks for percentage rather than CGPA.',
      },
      {
        question: 'Why does VTU subtract 0.75 from the CGPA?',
        answer:
          'Because grade points are awarded in bands. Any mark from 80 to 89 earns the same A+ grade and the same 9 points, so averaging grade points loses information about where inside the band you scored. The 0.75 deduction is VTU’s uniform correction for that rounding effect. It is applied identically to every student, so it does not disadvantage anyone relative to their peers.',
      },
      {
        question: 'Should I write my CGPA or my percentage on a job application?',
        answer:
          'Write the percentage where a percentage is asked for, and add the CGPA in brackets: "77.5% (CGPA 8.5, VTU scale)". Many application portals run automated screening on the percentage field, and entering 8.5 into a field expecting a number out of 100 will fail the filter before a human sees it. Showing both makes the conversion transparent and removes any appearance of inflating the figure.',
      },
      {
        question: 'Does the 0.75 deduction apply to all VTU schemes?',
        answer:
          'VTU states this formula for the 2015, 2017 and 2018 schemes specifically, and does not extend it to later schemes on the same page. If your marks card is from a 2021 or later scheme, check what it prints alongside your CGPA rather than assuming the deduction carried over. If you hold a much older non-CBCS marks card that already states a percentage, no conversion is needed — use the printed figure.',
      },
      {
        question: 'How do I convert a single semester SGPA to percentage at VTU?',
        answer:
          'The same rule works: (SGPA − 0.75) × 10. In practice, though, employers and universities almost always want the cumulative figure across all semesters, not a single one. Compute your CGPA first — credit-weighted across every semester — and convert that. Our CGPA calculator handles the weighting if you have your semester SGPAs and credits.',
      },
      {
        question: 'Is 77.5% from VTU considered a first class?',
        answer:
          'Yes. Under the conventional Indian cut-offs used here, 60% and above is first class and 75% and above is first class with distinction, so a CGPA of 8.5 (77.5%) falls in the distinction range. Your VTU marks card prints the class actually awarded, and if the two ever disagree, the marks card is the authoritative document for any formal declaration.',
      },
    ],
  },

  'aktu-cgpa-to-percentage': {
    article: `AKTU — the university most people still call UPTU — converts CGPA to percentage as (CGPA − 0.75) × 10. A CGPA of 7.8 becomes 70.5%.

AKTU is one of the largest technical universities in the country by enrolment, with several hundred affiliated colleges across Uttar Pradesh. That scale is exactly why the conversion question comes up so often: students from the same university, holding marks cards from very different colleges, all need to state a single comparable number on a placement form.

## The carry-over problem

AKTU's CGPA is computed across all the papers you have cleared, and back papers change the picture in a way students often miss. A carry-over paper cleared in a later attempt contributes its grade points at the point it is passed, so a semester you initially failed will keep depressing your CGPA even after you clear it — the credits count, and the grade earned on the successful attempt is what enters the average.

The practical consequence: check your final consolidated marks card rather than adding up semester SGPAs yourself. Students with back papers routinely calculate a CGPA that is half a point higher than the one AKTU actually issues.

## Where the number gets used

For campus placements at AKTU colleges, most companies set a percentage floor — commonly 60% or 65% with no active backlogs. Under the 0.75 rule those thresholds correspond to a CGPA of 6.75 and 7.25 respectively. Knowing the CGPA equivalent of the cut-off is more useful than knowing the percentage, because your marks card reports CGPA.

For higher study abroad, most credential evaluators (WES among them) will do their own conversion from your transcript rather than accepting a self-calculated percentage. Send the transcript; do not send a computed number.

## GATE, GPSC and government forms

Government application forms almost universally ask for percentage of marks. Where the form provides a "CGPA to percentage conversion as per university norms" field, enter the value from this formula and be prepared to produce the marks card or a conversion certificate from your college. AKTU-affiliated colleges will issue such a certificate on request, and having one avoids arguments at document verification.`,
    faqs: [
      {
        question: 'What is the AKTU CGPA to percentage formula?',
        answer:
          'Percentage = (CGPA − 0.75) × 10. A CGPA of 7.8 gives 70.5%, an 8.5 gives 77.5%, and a 6.75 gives exactly 60%. AKTU, formerly UPTU, applies the same 0.75 deduction used by VTU and the JNTU campuses.',
      },
      {
        question: 'What CGPA do I need for a 60% or 65% placement cut-off at AKTU?',
        answer:
          'A 60% cut-off corresponds to a CGPA of 6.75, and a 65% cut-off to 7.25. Because your marks card reports CGPA rather than percentage, it is worth knowing the CGPA equivalent of the thresholds companies quote. Most AKTU campus recruiters pair the percentage floor with a "no active backlogs" condition, which is checked separately.',
      },
      {
        question: 'How do back papers affect my AKTU CGPA?',
        answer:
          'A carry-over paper contributes the grade points earned when you finally clear it, and those credits count in the cumulative average. So a semester you initially failed continues to weigh on your CGPA even after the back paper is cleared. This is why students with backlogs often compute a CGPA noticeably higher than the one AKTU issues — always work from the consolidated marks card rather than adding semester SGPAs yourself.',
      },
      {
        question: 'Will WES or a foreign university accept my calculated percentage?',
        answer:
          'Generally no — credential evaluators such as WES perform their own conversion directly from your official transcript and do not rely on a self-calculated figure. Send the transcript and let them convert. The formula here is for Indian job applications and government forms, where a percentage field must be filled in and the university’s own rule is what applies.',
      },
      {
        question: 'Can I get an official CGPA to percentage conversion certificate from AKTU?',
        answer:
          'AKTU-affiliated colleges will issue a conversion certificate on request, stating the university formula and your resulting percentage. It is worth obtaining one before document verification for a government post or a PSU, because verification officers frequently query self-converted figures. Approach your college examination cell rather than the university directly.',
      },
      {
        question: 'Is AKTU the same as UPTU for conversion purposes?',
        answer:
          'Yes. UPTU was renamed GBTU and then Dr. A.P.J. Abdul Kalam Technical University; it is the same institution and the same conversion rule. If your marks card carries the older UPTU or GBTU name, the 0.75 deduction still applies. Quote the university name exactly as printed on your marks card when filling forms.',
      },
    ],
  },

  'jntu-cgpa-to-percentage': {
    article: `All three JNTU campuses — Hyderabad, Kakinada and Anantapur — convert CGPA to percentage as (CGPA − 0.75) × 10. A CGPA of 8.2 becomes 74.5%.

The three universities were originally one, split in 2008, and they have kept the conversion rule in common even as their regulations diverged. Whether your marks card says JNTUH, JNTUK or JNTUA, and whether you studied under R16, R18, R19 or R20, the deduction is the same.

## Do not borrow a formula from another Telangana university

Osmania University, in the same state, has **not approved any official conversion formula** — the three rules in circulation for it (× 10, × 10 − 7.5 and × 9.5) disagree by up to 25 percentage points. Whatever number a friend at OU is quoting, it did not come from a university notification, and it does not apply to your JNTU marks card.

Check which university issued your marks card, not which city you studied in.

## Regulation changes and what stayed constant

JNTU has revised its regulations several times. R16 through R20 changed credit loads, the number of mid-term examinations, mandatory non-credit courses and the treatment of open electives. None of those revisions altered the CGPA-to-percentage conversion. If you are unsure which regulation you fall under, it is stated on your hall ticket and on the front of your consolidated marks memo — but for this calculation it does not matter.

## The aggregate percentage for PSU and GATE applications

PSU recruitment through GATE almost always asks for aggregate percentage of all semesters. For JNTU students this means the converted CGPA figure, covering every semester of the programme — not the final year alone and not the best of the semesters. Lateral entry students compute over the semesters actually studied, typically six rather than eight.

If a form asks separately for "percentage as per university conversion formula" and "CGPA", fill both. Leaving the CGPA field blank when you have one invites a query at verification.`,
    faqs: [
      {
        question: 'What is the JNTU CGPA to percentage formula?',
        answer:
          'Percentage = (CGPA − 0.75) × 10, and it is the same for JNTU Hyderabad, JNTU Kakinada and JNTU Anantapur. A CGPA of 8.2 converts to 74.5%, an 8.5 to 77.5% and a 7.0 to 62.5%. The rule holds across the R16, R18, R19 and R20 regulations.',
      },
      {
        question: 'Can I use another Telangana university’s formula?',
        answer:
          'No. Osmania University, the other large Telangana institution, has not approved any official conversion formula at all — the three rules in circulation for it disagree by up to 25 percentage points, and none comes from a university notification. Use the rule of the university that actually issued your marks card, not one a friend at another college is quoting.',
      },
      {
        question: 'Does the conversion differ between JNTUH, JNTUK and JNTUA?',
        answer:
          'No. The three universities were a single institution until the 2008 trifurcation and have retained the same conversion rule, even though their regulations, question paper patterns and academic calendars have diverged since. Whichever campus issued your marks card, subtract 0.75 and multiply by 10.',
      },
      {
        question: 'Does my regulation (R18, R19, R20) change the conversion?',
        answer:
          'It does not. Successive JNTU regulations changed credit loads, mid-term examination structure, mandatory non-credit courses and elective rules, but the CGPA-to-percentage conversion was left untouched. Your regulation is printed on your hall ticket and consolidated marks memo if you need it for other purposes.',
      },
      {
        question: 'What percentage should a lateral entry student report?',
        answer:
          'Compute the CGPA over the semesters actually studied at JNTU — normally six rather than eight for a lateral entry B.Tech — and convert that with the same 0.75 rule. Do not average in your diploma marks; those are reported separately where the form asks for them. Your JNTU consolidated marks memo already reflects only the semesters you completed there.',
      },
      {
        question: 'What CGPA do I need for 60% for a PSU application?',
        answer:
          'A CGPA of 6.75 converts to exactly 60.0% under the JNTU rule, so 6.75 is the threshold. Most PSU recruitment through GATE sets the floor at 60% for general category candidates and 55% for reserved categories, which corresponds to a CGPA of 6.75 and 6.25 respectively. Verify the exact cut-off in the notification, as it varies by organisation.',
      },
    ],
  },

  'anna-university-cgpa-to-percentage': {
    article: `Anna University multiplies CGPA by 10 with no deduction. A CGPA of 8.5 is 85%.

This is the single most important thing to know about the Anna University conversion, because several neighbouring technical universities deduct something first. VTU takes off 0.75. JNTU takes off 0.75. GTU takes off 0.5. Anna University takes off nothing.

## Why students get this wrong in both directions

Tamil Nadu students applying to companies that recruit across South India routinely encounter recruiters who assume a deduction applies and quietly reduce the stated percentage. Conversely, students who have read a generic "CGPA to percentage" article online sometimes apply the 0.75 rule to their own Anna University marks card and understate themselves by 7.5 percentage points — enough to fall below a 60% cut-off with a CGPA that comfortably clears it.

A CGPA of 6.5 is 65% at Anna University. Under the VTU rule the same CGPA would read 57.5%. That is the difference between clearing a placement filter and being screened out.

## What to write on a form

Write the percentage plainly and name the university: **85% (CGPA 8.5, Anna University — conversion CGPA × 10)**. Because the Anna University rule is the generous-looking one, stating the formula alongside the number pre-empts the assumption that you have inflated it. Recruiters who handle Anna University applications regularly know the rule; those who do not will appreciate the note.

## Regulation 2017 and 2021

Anna University's Regulation 2017 and Regulation 2021 changed credit structures, the number of professional electives and the internal assessment weighting, and the university has moved between eight- and seven-semester patterns for some programmes. The straight ×10 conversion carried through unchanged.

Affiliated colleges — and there are hundreds across Tamil Nadu — issue marks cards under the university's regulations, so the same rule applies whether you studied at a government, aided or self-financing college.

## Class and division

The class shown here uses the conventional Indian thresholds. Anna University itself awards first class with distinction subject to conditions beyond the raw percentage, typically including passing every paper in the first attempt and completing the programme in the minimum duration. A student with an 80% aggregate who cleared a subject on a second attempt may receive first class rather than distinction. Your degree certificate states the class actually awarded, and that is the authoritative document.`,
    faqs: [
      {
        question: 'What is the Anna University CGPA to percentage formula?',
        answer:
          'Percentage = CGPA × 10, with no deduction, per the R2021 regulations. A CGPA of 8.5 is 85%, a 7.2 is 72% and a 6.0 is 60%. Anna University differs from VTU, AKTU and JNTU here — all of those subtract 0.75 before multiplying, and Anna University does not. The (CGPA − 0.5) × 10 rule often applied to Anna University is the Pondicherry/CENTAC default and does not belong here.',
      },
      {
        question: 'Do I need to subtract 0.75 from my Anna University CGPA?',
        answer:
          'No. The 0.75 deduction belongs to VTU, AKTU and the JNTU campuses. Applying it to an Anna University CGPA understates your percentage by 7.5 points — a CGPA of 6.5 would read 57.5% instead of the correct 65%, which is enough to fail a 60% placement filter you actually clear. Use the straight ×10.',
      },
      {
        question: 'Will recruiters believe a percentage that high?',
        answer:
          'State the formula alongside the figure: "85% (CGPA 8.5, Anna University — conversion CGPA × 10)". Recruiters who hire from Tamil Nadu regularly know the rule. Naming it removes any suggestion of inflation and costs you one line on the form. If a recruiter still applies a deduction, a conversion certificate from your college settles it.',
      },
      {
        question: 'Does Regulation 2017 or 2021 change the conversion?',
        answer:
          'No. Both regulations revised credit structures, elective counts and internal assessment weightings, and some programmes moved between seven- and eight-semester patterns, but the CGPA × 10 conversion was not affected. The same rule applies at every affiliated college, whether government, aided or self-financing.',
      },
      {
        question: 'Why does the class on my degree certificate not match this calculator?',
        answer:
          'Anna University attaches conditions to first class with distinction beyond the raw percentage — commonly passing every paper at the first attempt and finishing in the minimum duration. A student with 80% who cleared one subject on a second attempt may be awarded first class rather than distinction. This calculator applies the conventional percentage thresholds only; your degree certificate is authoritative.',
      },
      {
        question: 'How do I convert a single semester GPA at Anna University?',
        answer:
          'The same rule applies — multiply the semester GPA by 10. But nearly every application wants the cumulative figure across all semesters, so compute your CGPA first and convert that. A single strong semester is not what a percentage field is asking for, and quoting one where a cumulative figure was expected creates problems at verification.',
      },
    ],
  },

  'gtu-cgpa-to-percentage': {
    article: `GTU converts CGPA to percentage as (CGPA − 0.5) × 10. A CGPA of 7.5 becomes 70%.

GTU's terminology is its own source of confusion. The university reports **SPI** (Semester Performance Index) for a single semester, **CPI** (Cumulative Performance Index) across semesters, and **CGPA** on the final degree. For conversion purposes CPI and CGPA are used interchangeably — apply the same rule to either.

## SPI, CPI, CGPA — which one goes on the form

- **SPI** is one semester's weighted grade-point average. It is rarely what an application wants.
- **CPI** is the cumulative figure across all semesters completed so far. This is what you quote while still studying.
- **CGPA** is the final cumulative figure on the degree. This is what you quote after graduating.

If a form asks for "aggregate percentage" and you have graduated, convert the CGPA. If you are in your final year and the degree has not been issued, convert the CPI and label it as such.

## The Gujarat placement context

GTU affiliates a large number of engineering, pharmacy, management and architecture colleges across Gujarat. Campus recruiters operating in the state generally understand the CPI/CGPA vocabulary, but companies recruiting nationally often do not — a form asking for "percentage" from a recruiter in Bengaluru will not have a CPI field. Convert, and note the formula in brackets.

Pharmacy and architecture students should check their own marks card carefully, as programme structures and credit loads differ from engineering even under the same university.

## Diploma and degree are counted separately

GTU runs diploma programmes alongside degree programmes, and a diploma CPI does not roll into a degree CGPA. Lateral-entry students compute their degree CGPA over the semesters studied in the degree programme only. Where a form asks for both diploma and degree marks — as most government forms do — report them as two separate figures, each converted with the same rule.

## Confirm before a legal declaration

The 0.5 deduction is the rule in general circulation for GTU. Academic circulars are revised from time to time and can differ by programme, so for anything going onto a government form or an affidavit, confirm against your own marks card or ask your college for a conversion certificate. For ordinary job applications and planning, the figure above is what to use.`,
    faqs: [
      {
        question: 'What is the GTU CGPA to percentage formula?',
        answer:
          'Percentage = (CGPA − 0.5) × 10. A CGPA or CPI of 7.5 converts to 70%, an 8.0 to 75% and a 6.5 to 60%. GTU applies a 0.5 deduction rather than the 0.75 used by VTU, AKTU and the JNTU campuses.',
      },
      {
        question: 'What is the difference between SPI, CPI and CGPA at GTU?',
        answer:
          'SPI is the Semester Performance Index — one semester’s weighted grade-point average. CPI is the Cumulative Performance Index across all semesters completed so far. CGPA is the final cumulative figure printed on the degree. For conversion, CPI and CGPA are treated the same way. Quote the CPI while still studying and the CGPA once you have graduated.',
      },
      {
        question: 'Which figure should I put on a job application — SPI or CPI?',
        answer:
          'CPI, or CGPA if you have graduated. SPI covers a single semester and is almost never what an application means by "aggregate". If the form has only a percentage field, convert your CPI with the formula above and add the CPI in brackets so the conversion is visible.',
      },
      {
        question: 'Does my diploma CPI count towards my degree CGPA?',
        answer:
          'No. GTU computes a degree CGPA over the semesters studied in the degree programme only. Lateral-entry students therefore have a CGPA covering six semesters rather than eight, and their diploma result stays a separate figure. Government forms usually ask for both — report them separately, each converted with the same rule.',
      },
      {
        question: 'Does the same formula apply to pharmacy and architecture programmes?',
        answer:
          'The 0.5 deduction is the university-wide rule in general use, but credit structures and programme patterns differ between engineering, pharmacy, management and architecture. Check your own marks card, which states the scale used. If anything on it conflicts with this calculator, the marks card is authoritative.',
      },
      {
        question: 'What CPI do I need for a 60% placement cut-off?',
        answer:
          'A CPI of 6.5 converts to exactly 60.0% under the GTU rule. Most campus recruiters in Gujarat set the floor at 60% or 65%, corresponding to a CPI of 6.5 and 7.0 respectively, usually paired with a no-active-backlog condition checked separately.',
      },
    ],
  },

  'ipu-cgpa-to-percentage': {
    article: `GGSIPU has **two** conversion formulas, and which one applies to you depends on the year you were admitted.

- **Admitted before 2024:** Percentage = CGPA × 10
- **Admitted 2024 onwards:** Percentage = (CGPA − 0.75) × 10

Notification GGSIPU/COE/2024/11150124, dated 15.01.2024, introduced the deduction for students admitted from 2024. Earlier batches continue under Ordinance 11 with the straight × 10.

## The gap is 7.5 points

| CGPA | Admitted before 2024 | Admitted 2024 onwards |
|---|---|---|
| 6.75 | 67.5% | 60.0% |
| 8.00 | 80.0% | 72.5% |
| 9.00 | 90.0% | 82.5% |

Seven and a half percentage points is not a rounding difference. It straddles the 75% distinction threshold and, at the lower end, the 60% placement filter. Using the wrong one costs you a job screen or overstates your degree — both are bad in different ways.

Most guidance online, including most CGPA calculators, applies only one of the two. Check your admission year before trusting any of them, including this page.

## Which one is yours

Your admission year is on your enrolment number and your first-semester marksheet. If you were admitted in 2023 and graduated in 2027, you are a pre-2024 batch and use × 10 — the rule follows admission, not graduation.

## The Delhi University comparison

DU, in the same city and competing for the same jobs, also changed its rule — CBCS batches use × 9.5 and NEP/UGCF batches from 2022-23 use × 10.

So a CGPA of 8.0 in Delhi could legitimately be 80% (IPU pre-2024, or DU NEP), 76% (DU CBCS) or 72.5% (IPU 2024 onwards), depending entirely on which institution and which batch. Never apply a formula from a page about a different Delhi university, and never apply one from a different batch.

## Getting an official certificate

Request a percentage certificate through your affiliated college, which routes it to the university examination division. It states the conversion rule applied to your batch and your resulting percentage on university letterhead.

Given that IPU has two live formulas, this certificate is worth more than usual — it removes any argument at document verification about which rule applied to you.

## Confirm before a legal declaration

The two rules above are what we can establish from the notification references in circulation; we were not able to open the notification itself. Before entering a percentage on a government form, an affidavit or a visa application, confirm against your own marks sheet or the examination division.`,
    faqs: [
      { question: "What is the IPU (GGSIPU) CGPA to percentage formula?", answer: "It depends on your admission year. Students admitted before 2024 use Percentage = CGPA × 10 under Ordinance 11. Students admitted from 2024 onwards use (CGPA − 0.75) × 10, introduced by notification GGSIPU/COE/2024/11150124 dated 15.01.2024. At a CGPA of 8.0 that is 80% against 72.5% — a 7.5 point gap." },
      { question: "Which IPU formula applies to me?", answer: "The one for the year you were admitted, not the year you graduate. Your admission year appears on your enrolment number and your first-semester marksheet. Admitted in 2023 and graduating in 2027 means you are a pre-2024 batch and use the straight × 10. Most online calculators apply only one of the two formulas, so check before trusting any of them." },
      {
        question: 'How do I get an official percentage certificate from IPU?',
        answer:
          'Request it through your affiliated college, which routes it to the university examination division. The certificate states the conversion rule and your resulting percentage on university letterhead. It is the document to produce when an employer, a PSU verification officer or a foreign institution will not accept a self-calculated figure.',
      },
      {
        question: 'Does the same rule apply to BBA, LLB and B.Tech at IPU?',
        answer:
          'The cumulative CGPA is reported on the same 10-point scale across IPU programmes, and the 0.75 deduction is the rule in general use. Credit structures differ substantially between a B.Tech, a BBA and a five-year LLB, but that affects how the CGPA is computed, not how it converts. Check your own marks sheet if anything appears inconsistent.',
      },
      { question: "What CGPA do I need for 60% at IPU?", answer: "It depends on your batch. Admitted before 2024, a CGPA of 6.0 gives exactly 60%. Admitted from 2024 onwards, you need 6.75 for the same 60% because of the 0.75 deduction. Most government notifications and campus recruiters set 60% as the general-category floor, so this difference matters directly." },
      {
        question: 'Should I quote CGPA or percentage on a CAT or GATE form?',
        answer:
          'Quote whatever the form asks for, and fill both fields if both exist. Where only a percentage field is offered, use the converted figure and state the formula if there is space. IPU is well known to Delhi-NCR recruiters but less familiar elsewhere, so naming the university and its conversion rule prevents a query later at document verification.',
      },
    ],
  },

  'du-cgpa-to-percentage': {
    article: `Delhi University has **two** conversion rules, split by when you were admitted.

- **CBCS — admitted before 2022-23:** Percentage = CGPA × 9.5
- **NEP / UGCF — admitted 2022-23 onwards:** Percentage = CGPA × 10

The CBCS rule comes from DU notification Dean (Exams)/2017/9126 dated 20.12.2017, which states "Final Percentage of marks = C.G.P.A. based on all six semesters × 9.5", effective from the May/June 2018 examinations. Students entering under the NEP/UGCF framework from 2022-23 moved to the straight × 10.

## What the difference costs

| CGPA | CBCS (× 9.5) | NEP / UGCF (× 10) |
|---|---|---|
| 7.0 | 66.5% | 70.0% |
| 8.0 | 76.0% | 80.0% |
| 9.0 | 85.5% | 90.0% |

Half a point of CGPA is worth roughly five percentage points here, so applying the wrong rule is not a rounding error. Almost every "DU CGPA to percentage" page online gives only the × 9.5 figure, which has been wrong for every student admitted since 2022-23 — by now, most current undergraduates.

## Which rule is yours

It follows your **admission year**, not your graduation year. A student admitted in 2021 who graduated in 2024 is still CBCS and uses × 9.5. Check your first-semester marksheet or your admission letter; the framework is usually named on it.

If your marksheet says UGCF or NEP anywhere, you are on the × 10 rule.

## DU admission does not use this at all

Undergraduate admission to DU runs on CUET scores and actual subject marks, not on converted percentages. Postgraduate admission generally uses the CGPA as printed.

The conversion matters afterwards — campus placements, government application forms, and foreign university applications that insist on a percentage field.

## IPU is different again

GGSIPU, in the same city, also changed its rule: batches before 2024 use × 10 and those from 2024 onwards use (CGPA − 0.75) × 10.

Between the two universities and their two eras, a CGPA of 8.0 in Delhi can legitimately be 90%, 80%, 76% or 72.5%. There is no single "Delhi formula", and anyone quoting one has not checked.

## How to write it on a form

> **76% (CGPA 8.0, University of Delhi CBCS — conversion × 9.5)**

Naming both the framework and the multiplier costs one line and prevents the question. Recruiters who hire from DU regularly will recognise which era you are from.

## Before a formal declaration

Where the number goes onto a government form, an affidavit or a visa application, request a conversion certificate from your college. It states the rule applied to your batch on letterhead and removes any argument at document verification.`,
    faqs: [
      { question: "What is the DU CGPA to percentage formula?", answer: "There are two, split by admission year. CBCS batches admitted before 2022-23 use Percentage = CGPA × 9.5, per DU notification Dean (Exams)/2017/9126. Students admitted from 2022-23 under NEP/UGCF use CGPA × 10. At a CGPA of 8.0 that is 76% against 80%." },
      { question: "Which DU formula applies to me?", answer: "The one for your admission year, not your graduation year. A student admitted in 2021 who graduated in 2024 is still CBCS and uses × 9.5. Check your first-semester marksheet or admission letter — if it names UGCF or NEP anywhere, you are on the × 10 rule. Most DU conversion pages online give only the × 9.5 figure, which has been wrong for every student admitted since 2022-23." },
      { question: 'Does DU use CGPA or marks for admission?', answer: 'Undergraduate admission works on actual subject marks through the CUET-based process, not on converted percentages. Postgraduate admission generally uses the CGPA as printed. The conversion matters afterwards — for placements, government forms and foreign applications that require a percentage field.' },
      { question: 'Does the same formula apply to all DU courses?', answer: 'Yes. Credit structures differ across B.A., B.Com, B.Sc. and professional programmes under CBCS, but the × 9.5 multiplier applies to the cumulative CGPA printed on your marksheet regardless of programme. If your marksheet reports a percentage directly, use that figure and do not convert.' },
      { question: 'How do I get an official conversion certificate from DU?', answer: 'Request it through your college, which issues it on letterhead stating the university rule and your resulting percentage. It is worth obtaining before document verification for a government post or a visa application, because verification officers routinely query self-converted figures.' },
      { question: "Is there a single \"Delhi formula\" I can use?", answer: "No. DU has two rules depending on batch (× 9.5 for CBCS, × 10 for NEP/UGCF), and GGSIPU in the same city has two of its own (× 10 before 2024, (CGPA − 0.75) × 10 from 2024). A CGPA of 8.0 in Delhi can legitimately be 90%, 80%, 76% or 72.5%. Always use the rule for your own university and your own admission year." },
    ],
  },

  'ktu-cgpa-to-percentage': {
    article: `KTU converts CGPA to percentage by multiplying by 10, with no deduction. A CGPA of 8.0 is 80%.

This changed. KTU U.O. No. 1584/2023, dated 29.06.2023, replaced the older deduction-based rule with a straight × 10, and a subsequent circular applied the new formula back to the 2015 scheme so that every batch is treated the same way.

## If you have read an older guide, it was probably wrong

The obsolete KTU formula was (10 × CGPA) − 2.5. On a CGPA of 8.0 that gives 77.5% against the current 80% — two and a half points, at exactly the level where the 75% distinction threshold sits.

Plenty of third-party calculators still apply the old rule, and some apply a 0.5 deduction that was never KTU's formula at all. If a number you have been given does not match the straight × 10, check which rule produced it.

| CGPA | Current rule (× 10) | Obsolete rule (× 10 − 2.5) |
|---|---|---|
| 6.5 | 65.0% | 62.5% |
| 7.5 | 75.0% | 72.5% |
| 8.5 | 85.0% | 82.5% |
| 9.0 | 90.0% | 87.5% |

## Where the number gets used

**Campus placements.** Most recruiters at Kerala engineering colleges set a 60% floor, which under the current rule is a CGPA of exactly 6.0.

**PSU and government applications.** These ask for aggregate percentage across all semesters — the converted cumulative CGPA, not the final year alone. Lateral-entry students compute over the semesters actually studied at KTU, typically six rather than eight.

**Study abroad.** Credential evaluators perform their own conversion from the official transcript and will not accept a self-calculated percentage. Send the transcript.

## Supplementary papers

A cleared supplementary paper contributes the grade earned on the successful attempt, and its credits count in the cumulative average. A semester you initially failed therefore keeps weighing on your CGPA after you clear it.

Work from your consolidated grade card rather than adding semester GPAs yourself — students with supplementary papers routinely compute a CGPA higher than the one KTU issues.

## Confirm before a legal declaration

The 2023 University Order is the current rule as far as we can establish, but the order itself is a scanned PDF we could not read directly. Before entering a percentage on a government form, an affidavit or a visa application, confirm against your own grade card or ask your college for a conversion certificate.`,
    faqs: [
      { question: "What is the KTU CGPA to percentage formula?", answer: "Percentage = CGPA × 10, with no deduction. A CGPA of 8.0 is 80% and a 6.0 is exactly 60%. KTU U.O. No. 1584/2023 dated 29.06.2023 replaced the earlier deduction-based rule with this straight multiplier, and a later circular applied it back to the 2015 scheme so all batches match." },
      { question: "Why do some calculators give me a lower KTU percentage?", answer: "Because they are still applying the obsolete rule. KTU previously used (10 × CGPA) − 2.5, and some third-party tools apply a 0.5 deduction that was never KTU’s formula at all. On a CGPA of 8.0 the old rule gives 77.5% against the current 80% — two and a half points, right at the 75% distinction threshold. Use the straight × 10." },
      { question: "What CGPA do I need for a 60% placement cut-off?", answer: "A CGPA of exactly 6.0, under the current × 10 rule. Most recruiters at Kerala engineering colleges set 60% as the floor, usually paired with a no-active-backlog condition that is checked separately. Under the obsolete formula you would have needed 6.25, which is why older guidance quotes a higher number." },
      { question: 'How do supplementary papers affect my KTU CGPA?', answer: 'A cleared supplementary paper normally contributes the grade earned on the successful attempt, and its credits count in the cumulative average — so a semester you initially failed continues to weigh on your CGPA after you clear it. Work from the consolidated grade card rather than adding semester GPAs yourself; students with supplementary papers routinely compute a figure higher than the one KTU issues.' },
      { question: 'Will a foreign university accept my calculated percentage?', answer: 'Generally no. Credential evaluators perform their own conversion directly from your official transcript rather than accepting a self-calculated figure. Send the transcript. The formula here is for Indian job applications and government forms where a percentage field must be filled in.' },
      { question: 'What percentage should a lateral entry student report?', answer: 'Compute the CGPA over the semesters actually studied at KTU — normally six rather than eight — and convert that with the same 0.5 rule. Your diploma result stays a separate figure and is reported separately where the form asks for it. Your KTU consolidated grade card already reflects only the semesters completed there.' },
    ],
  },

  'bput-cgpa-to-percentage': {
    article: `BPUT converts CGPA to percentage as (CGPA − 0.5) × 10. A CGPA of 7.5 becomes 70%.

Biju Patnaik University of Technology affiliates most of the engineering, pharmacy and management colleges in Odisha, which makes this one conversion relevant to the majority of technical graduates in the state.

## The 0.5 deduction

BPUT uses a 0.5 deduction, the same as GTU, rather than the 0.75 that VTU, AKTU and JNTU apply. The distinction matters because the 0.75 rule dominates search results and gets applied to marksheets it does not belong to.

| CGPA | BPUT (−0.5) | If you wrongly used −0.75 |
|---|---|---|
| 6.5 | 60.0% | 57.5% |
| 7.5 | 70.0% | 67.5% |
| 8.5 | 80.0% | 77.5% |

Two and a half points, consistently, and at 6.5 it is the difference between clearing a 60% placement filter and failing it.

## Placement and government forms

Most campus recruiters in Odisha set a 60% floor with no active backlogs. Under the BPUT rule that is a CGPA of **6.5**. Since your grade card reports CGPA rather than percentage, knowing the CGPA equivalent of the threshold is more useful than knowing the percentage.

OPSC and other state government notifications ask for aggregate percentage across the full programme. Convert the cumulative CGPA, not the final year, and be prepared to produce a conversion certificate at document verification — affiliated colleges issue these on request.

## Back papers

BPUT counts the credits of every paper in the cumulative average, and a cleared back paper contributes the grade earned on the successful attempt. A semester you initially failed therefore continues to affect your CGPA after you clear it.

This is the most common reason a self-computed CGPA is higher than the issued one. Use the consolidated grade card.

## Across programmes

BPUT runs B.Tech alongside pharmacy, architecture, MCA and MBA programmes with different credit structures. The conversion rule applies to the cumulative CGPA regardless of programme, but check your own grade card — where it prints a percentage directly, use that figure rather than converting.

## Confirm before a legal declaration

The 0.5 deduction is the figure in general use for BPUT. Examination regulations are revised periodically. Before entering a percentage on a government form, an affidavit or a visa application, confirm against your grade card or request a conversion certificate from your college.`,
    faqs: [
      { question: 'What is the BPUT CGPA to percentage formula?', answer: 'Percentage = (CGPA − 0.5) × 10. A CGPA of 7.5 converts to 70%, an 8.5 to 80% and a 6.5 to exactly 60%. BPUT uses a 0.5 deduction, the same as GTU, rather than the 0.75 applied by VTU, AKTU and JNTU.' },
      { question: 'What CGPA do I need for 60% at BPUT?', answer: 'A CGPA of 6.5 converts to exactly 60.0%. Most campus recruiters in Odisha set 60% as the floor together with a no-active-backlog condition. Because your grade card reports CGPA rather than percentage, 6.5 is the more useful number to keep in mind.' },
      { question: 'Why do some sites tell me to subtract 0.75?', answer: 'Because the 0.75 rule belongs to VTU, AKTU and the JNTU campuses, which are much more widely written about. Applied to a BPUT grade card it understates you by 2.5 points consistently — 57.5% instead of 60.0% at a CGPA of 6.5, which is the difference between clearing a placement filter and failing it.' },
      { question: 'How do back papers affect my BPUT CGPA?', answer: 'The credits of every paper count in the cumulative average, and a cleared back paper contributes the grade earned on the successful attempt. A semester you initially failed therefore keeps affecting your CGPA after you clear it. This is the usual reason a self-computed CGPA comes out higher than the one BPUT issues — work from the consolidated grade card.' },
      { question: 'Does the rule apply to pharmacy, MCA and MBA at BPUT?', answer: 'The 0.5 deduction is the university-wide rule and applies to the cumulative CGPA regardless of programme, though credit structures differ between B.Tech, pharmacy, architecture, MCA and MBA. Check your own grade card — if it prints a percentage directly, use the printed figure rather than converting.' },
      { question: 'Do I need a conversion certificate for a government job?', answer: 'It is strongly advisable. OPSC and PSU document verification frequently query self-converted percentages. Affiliated colleges issue a conversion certificate stating the university formula and your resulting percentage — one page that settles the question. Obtain it before verification rather than during it.' },
    ],
  },

  'vit-cgpa-to-percentage': {
    article: `VIT converts CGPA to percentage with a straight multiplication by 10. A CGPA of 8.5 is 85%.

There is no deduction. This puts VIT in the same camp as Anna University and makes its conversion look markedly more generous than that of universities applying a 0.5 or 0.75 deduction — which it is, at the same CGPA.

## What this means when you compare with friends

| CGPA | VIT / Anna (×10) | GTU / BPUT (−0.5) | VTU / JNTU (−0.75) |
|---|---|---|---|
| 7.0 | 70.0% | 65.0% | 62.5% |
| 8.0 | 80.0% | 75.0% | 72.5% |
| 9.0 | 90.0% | 85.0% | 82.5% |

Seven and a half points between the extremes at the same CGPA. None of them is wrong — they are different universities with different rules, and a recruiter comparing two candidates on stated percentage is not comparing like with like.

## State the rule when you state the number

Because the ×10 conversion is the generous-looking one, it is worth naming the formula alongside the figure: **"85% (CGPA 8.5, VIT — conversion CGPA × 10)"**. Recruiters who hire from VIT regularly know the rule. Those who do not may otherwise assume you have inflated it, and one extra line on the form removes the question entirely.

If a recruiter still applies a deduction, a conversion certificate from the university settles it.

## FFCS and why credits matter here

VIT's fully flexible credit system lets students choose courses, slots and faculty, which means two students in the same batch can carry very different credit loads. Your CGPA is credit-weighted across everything you have taken, so a heavy semester of high-credit core courses moves it more than a light one of two-credit electives.

The practical consequence is the same as elsewhere: a poor grade in a four-credit core subject costs you far more than the same grade in a two-credit elective. Our [SGPA calculator](/education/sgpa-calculator) shows the weighting explicitly if you want to see how a particular semester lands.

## Before a formal declaration

The straight ×10 conversion is the rule in general use for VIT. Academic regulations are revised periodically and can differ between campuses and programmes. Before entering a percentage on a government form, an affidavit or a visa application, confirm against your own grade sheet or request a conversion certificate from the university. Use this calculator for planning and ordinary job applications.`,
    faqs: [
      { question: 'What is the VIT CGPA to percentage formula?', answer: 'Percentage = CGPA × 10, with no deduction. A CGPA of 8.5 is 85%, a 7.2 is 72% and a 6.0 is 60%. VIT applies a straight multiplication, like Anna University and unlike VTU, JNTU or GTU, all of which deduct something first.' },
      { question: 'Do I need to subtract anything from my VIT CGPA?', answer: 'No. Deductions of 0.5 or 0.75 belong to other universities. Applying a 0.75 deduction to a VIT CGPA of 8.0 would give 72.5% instead of the correct 80% — a 7.5 point understatement, enough to fail a 75% distinction threshold you actually clear.' },
      { question: 'Will recruiters believe a percentage that high?', answer: 'State the formula alongside the figure: "85% (CGPA 8.5, VIT — conversion CGPA × 10)". Recruiters who hire from VIT regularly know the rule, and naming it costs one line while removing any suggestion of inflation. If a recruiter still applies a deduction, a conversion certificate from the university settles the matter.' },
      { question: 'How does FFCS affect my CGPA?', answer: 'VIT’s fully flexible credit system means two students in the same batch can carry very different credit loads. Your CGPA is credit-weighted across everything you have taken, so a heavy semester of four-credit core courses moves it far more than a light one of two-credit electives — and a poor grade in a core subject costs correspondingly more.' },
      { question: 'Is the conversion the same at VIT Chennai, Bhopal and AP?', answer: 'The straight ×10 rule is the one in general use across VIT campuses, but academic regulations are revised periodically and can differ between campuses and programmes. Check the grade sheet issued by your own campus, and where it conflicts with this calculator, the grade sheet is authoritative.' },
      { question: 'Do I need an official conversion certificate?', answer: 'For ordinary job applications, stating the formula alongside the figure is usually enough. For anything going onto a government form, an affidavit or a visa application, request a conversion certificate from the university — it states the rule and your resulting percentage on letterhead and prevents a query at document verification.' },
    ],
  },

  'cbse-cgpa-to-percentage': {
    article: `CBSE converts CGPA to percentage by multiplying by 9.5. A CGPA of 9.2 becomes 87.4%.

The 9.5 multiplier is not arbitrary, and the story behind it is worth knowing. When CBSE introduced grade points, it looked at the actual marks obtained by students scoring each grade point across the previous five years and took the average. That average worked out to approximately 9.5 times the grade point — so the board adopted 9.5 as the official multiplier. It is an empirical figure, not a mathematical convenience.

## The A1 to E grade bands

CBSE assigns grade points from marks in fixed bands: A1 for 91–100 (10 points), A2 for 81–90 (9), B1 for 71–80 (8), B2 for 61–70 (7), C1 for 51–60 (6), C2 for 41–50 (5), D for 33–40 (4), and E below 33.

Your CGPA is the average of the grade points across your five main subjects. If you took a sixth subject, CBSE's best-five rule generally applies — the additional subject can replace a weaker main subject in the calculation. Check your marksheet, which states the subjects counted.

## Why your calculated percentage may not match your actual marks

Because grade points come in bands, the conversion is an approximation. A student who scored 91 in every subject and a student who scored 100 in every subject both have a CGPA of 10.0, and both convert to 95%. The first student is being flattered by the conversion and the second is being understated.

This is why the converted percentage and your actual mark total will rarely be identical. Where a form asks specifically for "percentage of marks obtained", and your marksheet shows subject-wise marks, add up the actual marks and compute the real percentage instead — it is the more accurate figure and the one an admissions officer would prefer.

## Where each figure is expected

- **College admissions in India** usually want best-of-four or best-of-five actual marks, not the CGPA conversion. Delhi University cut-offs, for instance, are computed on actual subject marks.
- **School transfer forms and general applications** typically accept the CGPA × 9.5 figure.
- **Foreign university applications** normally want the marksheet itself; let the institution convert.

## A note on which years used CGPA

CBSE has moved between reporting grades and reporting marks over the years for Class 10 in particular. If your marksheet shows subject-wise marks out of 100, you do not need this conversion at all — compute the percentage directly. Use the 9.5 multiplier only where the marksheet reports a CGPA and no aggregate marks.`,
    faqs: [
      {
        question: 'What is the CBSE CGPA to percentage formula?',
        answer:
          'Percentage = CGPA × 9.5. A CGPA of 9.2 gives 87.4%, a 10.0 gives 95% and an 8.0 gives 76%. The multiplier applies to the overall CGPA across your main subjects as reported on the CBSE marksheet.',
      },
      {
        question: 'Why does CBSE use 9.5 and not 10?',
        answer:
          'CBSE derived it empirically. The board examined the actual marks obtained by students at each grade point over the preceding five years and found the average worked out to roughly 9.5 times the grade point. Multiplying by 10 would systematically overstate results, so 9.5 was adopted as the official conversion and stated in the board’s result circular.',
      },
      {
        question: 'Why does my converted percentage not match my actual marks?',
        answer:
          'Because grade points come in ten-mark bands. A student scoring 91 in every subject and one scoring 100 in every subject both have a CGPA of 10.0 and both convert to 95% — the first is flattered, the second understated. The conversion is an approximation by design. If your marksheet shows subject-wise marks, computing the real percentage from those marks is more accurate.',
      },
      {
        question: 'Should I use the CGPA conversion for college admission?',
        answer:
          'Usually not. Most Indian college admissions, including Delhi University cut-offs, are computed on actual subject marks — best of four or best of five — rather than on the CGPA conversion. Use your subject-wise marks where the form allows. The 9.5 conversion is for forms that ask for an overall percentage and accept the CBSE formula.',
      },
      {
        question: 'How does the additional sixth subject affect my CGPA?',
        answer:
          'CBSE generally applies a best-five rule, so a strong sixth subject can replace a weaker main subject in the CGPA calculation. Your marksheet states which subjects were counted. Do not recompute the average yourself from all six subjects — the CGPA printed on the marksheet already reflects the board’s rule.',
      },
      {
        question: 'My CBSE marksheet shows marks, not CGPA. What do I do?',
        answer:
          'Then you do not need this conversion. CBSE has moved between reporting grades and reporting marks across years, particularly for Class 10. If your marksheet shows subject-wise marks out of 100, add them and compute the percentage directly — that is the exact figure. Use the 9.5 multiplier only when the marksheet reports a CGPA and gives no aggregate marks.',
      },
    ],
  },
};
