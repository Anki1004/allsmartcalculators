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

## Where you will be asked for this

Almost every campus placement form, every PSU application, and every foreign university application asks for a percentage, not a CGPA. So does the "aggregate marks" field on most Indian job portals. If you enter your CGPA into a percentage field — 8.5 where 77.5 was expected — you will be screened out by an automated filter before a human ever reads the application.

The safest practice is to write the percentage and add the CGPA in brackets: **77.5% (CGPA 8.5, VTU scale)**. Recruiters familiar with VTU will recognise it instantly, and it removes any suggestion that you inflated a number.

## Which scheme applies to you

VTU has run several schemes — the 2015, 2017, 2018 and 2021 CBCS variants among them. The letter grades and credit distribution have shifted across them, but the 0.75 conversion has been the constant. If your marks card was issued by VTU under any CBCS scheme, the formula above is the one printed alongside your CGPA.

Diploma and lateral-entry students should note that their CGPA is computed only over the semesters they actually studied at VTU. The conversion rule is unchanged.

## What the calculator does not decide

The class or division shown here uses the conventional Indian cut-offs — distinction at 75%, first class at 60%, second class at 50%. VTU prints the class awarded on your final marks card, and where the two differ, the marks card is authoritative. Use this as a working figure while filling forms, and quote the marks card when the number is going into a legal declaration.`,
    faqs: [
      {
        question: 'What is the official VTU CGPA to percentage formula?',
        answer:
          'Percentage = (CGPA − 0.75) × 10. A CGPA of 8.5 converts to 77.5%, a 9.0 to 82.5%, and a 7.2 to 64.5%. This formula is printed on the VTU transcript itself and applies across the CBCS schemes. It is the figure VTU expects you to quote when an application asks for percentage rather than CGPA.',
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
          'It has been the constant across VTU’s CBCS schemes, including the 2015, 2017, 2018 and 2021 variants, even though the letter grades and credit distribution changed between them. If your marks card was issued under CBCS, the formula applies. If you hold a much older non-CBCS VTU marks card that already states percentage directly, no conversion is needed — use the printed figure.',
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

## Osmania is not the same, and people get this wrong

The most common error among Telangana students is applying the JNTU rule to an Osmania University marks card, or the reverse. Osmania deducts **0.5**, not 0.75. On a CGPA of 8.0 that is the difference between 75.0% and 72.5% — a 2.5 point gap that straddles the distinction cut-off.

Since both universities operate in the same state and students frequently compare notes, this mistake propagates quickly. Check which university issued your marks card, not which city you studied in.

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
        question: 'Is the JNTU formula the same as the Osmania University formula?',
        answer:
          'No, and confusing the two is the most common error among Telangana students. JNTU deducts 0.75; Osmania deducts 0.5. On a CGPA of 8.0 that is 72.5% under JNTU versus 75.0% under Osmania — a gap that crosses the distinction threshold. Use the rule of the university that issued your marks card, not the one your friends at another college use.',
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

This is the single most important thing to know about the Anna University conversion, because almost every neighbouring technical university deducts something. VTU takes off 0.75. JNTU takes off 0.75. Osmania takes off 0.5. Anna University takes off nothing.

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
          'Percentage = CGPA × 10, with no deduction. A CGPA of 8.5 is 85%, a 7.2 is 72% and a 6.0 is 60%. Anna University differs from VTU, JNTU and Osmania here — all of those subtract a fraction before multiplying, and Anna University does not.',
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

  'osmania-cgpa-to-percentage': {
    article: `Osmania University converts CGPA to percentage as (CGPA − 0.5) × 10. A CGPA of 8.0 becomes 75%.

Note the deduction: **0.5, not 0.75**. This is the detail that trips up Telangana students most often, because JNTU — operating in the same state, recruiting into the same companies — uses 0.75. On a CGPA of 8.0 the two rules differ by 2.5 percentage points, and 75% is precisely the distinction threshold, so the error can change the class you report.

## Which marks card is yours

Osmania University and its affiliated colleges cover a large share of Hyderabad's older institutions, while JNTUH covers most of the newer technical colleges. Students frequently do not know which university issued their degree until they look. The university name is printed at the top of the marks card and on the degree certificate — check there rather than assuming based on where the campus is.

If your college is affiliated to Osmania, the 0.5 rule applies regardless of which department or programme you were in.

## Where the number matters

Telangana state government recruitment, TSPSC notifications and most PSU applications ask for aggregate percentage. Osmania students should convert with the 0.5 rule and be ready to show a conversion certificate at verification. The examination branch and affiliated colleges will issue one; it states the university formula explicitly, which is what a verification officer wants to see.

For private-sector campus placements the practical threshold is usually 60%, which under the Osmania rule corresponds to a CGPA of 6.5 — a slightly easier bar than the 6.75 a JNTU student needs for the same percentage.

## Postgraduate and professional programmes

Osmania runs a wide range of programmes beyond engineering — arts, science, commerce, law, medicine and management — and not all of them have historically used the same 10-point CGPA system. Older marks cards from some faculties report percentage directly, in which case no conversion is needed. If your marks card shows a percentage, use it as printed; converting a percentage that is already a percentage is a surprisingly common mistake on application forms.

## Verify before a formal declaration

The 0.5 rule is the figure in general use for Osmania, but examination regulations are revised periodically and can differ by faculty. Before entering a number on a legal declaration — a government form, an affidavit, a visa application — confirm against your own marks card or a conversion certificate from the examination branch. Use this calculator to plan and to fill in ordinary job applications.`,
    faqs: [
      {
        question: 'What is the Osmania University CGPA to percentage formula?',
        answer:
          'Percentage = (CGPA − 0.5) × 10. A CGPA of 8.0 gives 75%, an 8.5 gives 80% and a 6.5 gives exactly 60%. The deduction is 0.5 — half of what JNTU applies — which is the single most common source of error for students in Telangana.',
      },
      {
        question: 'Is the Osmania formula the same as JNTU?',
        answer:
          'No. Osmania deducts 0.5 and JNTU deducts 0.75. On a CGPA of 8.0 that is 75% versus 72.5%, which straddles the distinction cut-off. Both universities operate in Telangana and recruit into the same companies, so the two rules get mixed up constantly. Check which university is printed on your marks card.',
      },
      {
        question: 'What CGPA do I need for 60% at Osmania?',
        answer:
          'A CGPA of 6.5 converts to exactly 60.0% under the Osmania rule. That is a slightly lower bar than at JNTU, where 6.75 is needed for the same percentage. Most campus recruiters set the floor at 60% with no active backlogs, so 6.5 is the number to aim for.',
      },
      {
        question: 'Do I need a conversion certificate for a government job application?',
        answer:
          'It is strongly advisable. TSPSC and PSU document verification frequently query self-converted percentages. The Osmania examination branch and affiliated colleges issue a conversion certificate stating the university formula and your resulting percentage — one page that settles the question. Obtain it before verification rather than during it.',
      },
      {
        question: 'My Osmania marks card shows a percentage already. Do I still convert?',
        answer:
          'No. If your marks card reports percentage directly — as older marks cards from several Osmania faculties do — use the printed figure as-is. Converting a number that is already a percentage is a common and costly mistake on application forms. The conversion applies only where the marks card reports a CGPA on the 10-point scale.',
      },
      {
        question: 'Does the same rule apply to all Osmania faculties?',
        answer:
          'The 0.5 deduction is the figure in general use across the university, but Osmania runs arts, science, commerce, law, medicine and management alongside engineering, and examination regulations are revised periodically. Before entering a percentage on a legal declaration, confirm against your own marks card or a conversion certificate from the examination branch.',
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
    article: `GGSIPU — Guru Gobind Singh Indraprastha University, widely called IP University or IPU — converts CGPA to percentage as (CGPA − 0.75) × 10. A CGPA of 8.0 becomes 72.5%.

IPU affiliates colleges across Delhi covering engineering, management, law, medicine, journalism and education, so the same conversion question arrives from students on very different programmes.

## The Delhi cross-university problem

IPU students compete for the same jobs and postgraduate seats as students from Delhi University, and DU's conversion is different — DU has historically used a straight CGPA × 9.5 for its CBCS programmes. An IPU student with a CGPA of 8.0 reports 72.5%; a DU student with the same 8.0 reports 76%.

Neither is wrong. They are different universities with different rules, and the gap is a feature of the two systems rather than a judgement about the students. But it does mean you should never apply a formula you found on a page about a different Delhi university.

## What IPU's own paperwork says

Your IPU marks sheet reports the semester GPA and the cumulative CGPA. The conversion rule is applied when the university or your college issues a percentage certificate, which is the document to request when an employer or a foreign institution insists on a percentage rather than a CGPA.

Programmes at IPU differ substantially in credit structure — a B.Tech, a BBA and a five-year LLB have little in common — but the cumulative CGPA is reported on the same 10-point scale across them.

## For CAT, GATE and government forms

Management and government applications generally ask for "percentage of marks in graduation". Use the converted figure, and where the form offers a field for the university conversion formula, state it. IPU is well known to Delhi-NCR recruiters, less so elsewhere, so naming the university and the formula is worth the extra line.

## Verify before a formal declaration

The 0.75 deduction is the figure in general use for IPU. The university's examination division issues notifications that are revised periodically and can differ by programme. For anything going onto a government form, an affidavit or a visa application, confirm against your own marks sheet or request a percentage certificate from your college. Use this calculator for planning and ordinary applications.`,
    faqs: [
      {
        question: 'What is the IPU (GGSIPU) CGPA to percentage formula?',
        answer:
          'Percentage = (CGPA − 0.75) × 10. A CGPA of 8.0 converts to 72.5%, an 8.5 to 77.5% and a 6.75 to exactly 60%. GGSIPU applies the same 0.75 deduction used by VTU, AKTU and the JNTU campuses.',
      },
      {
        question: 'Why does a Delhi University student with the same CGPA get a higher percentage?',
        answer:
          'Because DU and IPU use different rules. DU has historically applied a straight CGPA × 9.5 for its CBCS programmes, while IPU deducts 0.75 first. A CGPA of 8.0 is 76% at DU and 72.5% at IPU. Neither figure is wrong — they are different universities. Never apply a formula from a page about a different Delhi university to your IPU marks sheet.',
      },
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
      {
        question: 'What CGPA do I need for 60% at IPU?',
        answer:
          'A CGPA of 6.75 converts to exactly 60.0%. Many campus recruiters and most government notifications set 60% as the floor for general category candidates, so 6.75 is the practical threshold. Reserved-category floors are commonly 55%, corresponding to a CGPA of 6.25.',
      },
      {
        question: 'Should I quote CGPA or percentage on a CAT or GATE form?',
        answer:
          'Quote whatever the form asks for, and fill both fields if both exist. Where only a percentage field is offered, use the converted figure and state the formula if there is space. IPU is well known to Delhi-NCR recruiters but less familiar elsewhere, so naming the university and its conversion rule prevents a query later at document verification.',
      },
    ],
  },

  'du-cgpa-to-percentage': {
    article: `Delhi University converts CGPA to percentage by multiplying by 9.5. A CGPA of 8.0 is 76%.

DU adopted the same 9.5 multiplier CBSE uses, which makes the conversion familiar to anyone who came through a CBSE school. It also makes DU's rule noticeably more generous than that of the other large Delhi university.

## DU and IPU are not the same, and the gap is real

GGSIPU — IP University, in the same city, competing for the same jobs — subtracts 0.75 before multiplying by 10.

| CGPA | Delhi University | GGSIPU |
|---|---|---|
| 7.0 | 66.5% | 62.5% |
| 8.0 | 76.0% | 72.5% |
| 9.0 | 85.5% | 82.5% |

Four percentage points at the same CGPA. Neither university is wrong; they simply use different rules. Applying an IPU formula to a DU marksheet, or the reverse, is the mistake to avoid — and it happens constantly because students at both compare notes.

## Where DU asks you for which figure

DU's own **admission** processes work on actual marks, not on converted percentages. Undergraduate cut-offs and the CUET-based admission system use subject marks; postgraduate admission generally uses the CGPA as printed.

The conversion matters for what comes after: campus placements, government application forms, and foreign university applications that insist on a percentage field. Write the converted figure and name the rule — "76% (CGPA 8.0, DU conversion × 9.5)" — so nobody has to guess.

## Across DU's faculties

DU runs the CBCS structure across a very wide range of programmes, from B.A. and B.Com to B.Sc. and professional courses, and credit structures differ between them. The conversion rule does not: the multiplier applies to the cumulative CGPA on your marksheet regardless of programme.

Students from the School of Open Learning and NCWEB should check their own marksheet, as reporting formats have varied across years — where a percentage is printed directly, use the printed figure rather than converting anything.

## Before a formal declaration

Where the number is going onto a government form, an affidavit or a visa application, request a conversion certificate from your college. It states the university rule and your resulting percentage on letterhead, and it removes any argument at document verification. Use this calculator for planning and ordinary applications.`,
    faqs: [
      { question: 'What is the DU CGPA to percentage formula?', answer: 'Percentage = CGPA × 9.5. A CGPA of 8.0 converts to 76%, a 9.0 to 85.5% and a 7.2 to 68.4%. Delhi University uses the same 9.5 multiplier CBSE applies to Class 10 and 12 results.' },
      { question: 'Why does an IPU student with my CGPA report a lower percentage?', answer: 'Because GGSIPU deducts 0.75 before multiplying by 10, while DU multiplies by 9.5 with no deduction. At a CGPA of 8.0 that is 76% at DU against 72.5% at IPU — four points apart at the same CGPA. Both are correct for their own university. Never apply one Delhi university’s formula to another’s marksheet.' },
      { question: 'Does DU use CGPA or marks for admission?', answer: 'Undergraduate admission works on actual subject marks through the CUET-based process, not on converted percentages. Postgraduate admission generally uses the CGPA as printed. The conversion matters afterwards — for placements, government forms and foreign applications that require a percentage field.' },
      { question: 'Does the same formula apply to all DU courses?', answer: 'Yes. Credit structures differ across B.A., B.Com, B.Sc. and professional programmes under CBCS, but the × 9.5 multiplier applies to the cumulative CGPA printed on your marksheet regardless of programme. If your marksheet reports a percentage directly, use that figure and do not convert.' },
      { question: 'How do I get an official conversion certificate from DU?', answer: 'Request it through your college, which issues it on letterhead stating the university rule and your resulting percentage. It is worth obtaining before document verification for a government post or a visa application, because verification officers routinely query self-converted figures.' },
      { question: 'Is 76% from DU a first class?', answer: 'Under the conventional Indian cut-offs used here, 60% and above is first class and 75% and above is first class with distinction, so a CGPA of 8.0 at 76% falls in the distinction range. Your degree certificate states the division DU actually awarded, and that document is authoritative for any formal declaration.' },
    ],
  },

  'ktu-cgpa-to-percentage': {
    article: `KTU converts CGPA to percentage as (CGPA − 0.5) × 10. A CGPA of 8.0 becomes 75%.

APJ Abdul Kalam Technological University affiliates the great majority of engineering colleges in Kerala, so nearly every B.Tech graduate in the state needs this conversion at some point — usually the week a placement form asks for a percentage and the marksheet only shows a CGPA.

## The deduction is 0.5, not 0.75

This is worth stating plainly because the 0.75 deduction is far more widely written about online, being the rule at VTU, AKTU and the JNTU campuses. On a CGPA of 8.0 the difference is 75% against 72.5% — and 75% is precisely the distinction threshold under the conventional cut-offs.

If you have read a generic "CGPA to percentage" article and applied 0.75 to a KTU marksheet, you have understated yourself by two and a half points at exactly the level where it changes the class you report.

## Where the number is used

**Campus placements.** Most recruiters at Kerala engineering colleges set a 60% floor, which under the KTU rule corresponds to a CGPA of 6.5.

**PSU and government applications.** These almost always ask for aggregate percentage across all semesters — the converted CGPA, not the final year alone. Lateral-entry students compute over the semesters actually studied at KTU, typically six rather than eight.

**Study abroad.** Credential evaluators generally perform their own conversion from the official transcript and will not accept a self-calculated figure. Send the transcript.

## Supplementary papers

KTU's regulations have been revised several times since the university was established, and the treatment of supplementary and improvement examinations has changed with them. A cleared supplementary paper normally contributes the grade earned on the successful attempt, with its credits counting in the cumulative average — so a semester you initially failed keeps weighing on the CGPA afterwards.

Work from your consolidated grade card rather than adding semester GPAs yourself. Students with supplementary papers routinely compute a CGPA higher than the one KTU issues.

## Confirm before a legal declaration

The 0.5 deduction is the figure in general use for KTU. Academic regulations are revised periodically and can differ by scheme and by programme. Before entering a percentage on a government form, an affidavit or a visa application, confirm against your own grade card or ask your college for a conversion certificate.`,
    faqs: [
      { question: 'What is the KTU CGPA to percentage formula?', answer: 'Percentage = (CGPA − 0.5) × 10. A CGPA of 8.0 gives 75%, an 8.5 gives 80% and a 6.5 gives exactly 60%. KTU deducts 0.5, not the 0.75 used by VTU, AKTU and JNTU.' },
      { question: 'Should I subtract 0.75 from my KTU CGPA?', answer: 'No. The 0.75 deduction belongs to VTU, AKTU and the JNTU campuses, and it is far more widely written about online, which is why the mistake is common. Applying it to a KTU marksheet understates you by 2.5 points — 72.5% instead of 75% at a CGPA of 8.0, which is exactly the distinction threshold.' },
      { question: 'What CGPA do I need for a 60% placement cut-off?', answer: 'A CGPA of 6.5 converts to exactly 60.0% under the KTU rule. Most recruiters at Kerala engineering colleges set 60% as the floor, usually paired with a no-active-backlog condition that is checked separately.' },
      { question: 'How do supplementary papers affect my KTU CGPA?', answer: 'A cleared supplementary paper normally contributes the grade earned on the successful attempt, and its credits count in the cumulative average — so a semester you initially failed continues to weigh on your CGPA after you clear it. Work from the consolidated grade card rather than adding semester GPAs yourself; students with supplementary papers routinely compute a figure higher than the one KTU issues.' },
      { question: 'Will a foreign university accept my calculated percentage?', answer: 'Generally no. Credential evaluators perform their own conversion directly from your official transcript rather than accepting a self-calculated figure. Send the transcript. The formula here is for Indian job applications and government forms where a percentage field must be filled in.' },
      { question: 'What percentage should a lateral entry student report?', answer: 'Compute the CGPA over the semesters actually studied at KTU — normally six rather than eight — and convert that with the same 0.5 rule. Your diploma result stays a separate figure and is reported separately where the form asks for it. Your KTU consolidated grade card already reflects only the semesters completed there.' },
    ],
  },

  'bput-cgpa-to-percentage': {
    article: `BPUT converts CGPA to percentage as (CGPA − 0.5) × 10. A CGPA of 7.5 becomes 70%.

Biju Patnaik University of Technology affiliates most of the engineering, pharmacy and management colleges in Odisha, which makes this one conversion relevant to the majority of technical graduates in the state.

## The 0.5 deduction

BPUT uses a 0.5 deduction, the same as GTU and Osmania, rather than the 0.75 that VTU, AKTU and JNTU apply. The distinction matters because the 0.75 rule dominates search results and gets applied to marksheets it does not belong to.

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
      { question: 'What is the BPUT CGPA to percentage formula?', answer: 'Percentage = (CGPA − 0.5) × 10. A CGPA of 7.5 converts to 70%, an 8.5 to 80% and a 6.5 to exactly 60%. BPUT uses a 0.5 deduction, the same as GTU and Osmania, rather than the 0.75 applied by VTU, AKTU and JNTU.' },
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

| CGPA | VIT / Anna (×10) | Osmania / GTU (−0.5) | VTU / JNTU (−0.75) |
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
      { question: 'What is the VIT CGPA to percentage formula?', answer: 'Percentage = CGPA × 10, with no deduction. A CGPA of 8.5 is 85%, a 7.2 is 72% and a 6.0 is 60%. VIT applies a straight multiplication, like Anna University and unlike VTU, JNTU, Osmania or GTU, all of which deduct something first.' },
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
