import type { CalcInlineContent } from './types';

export const dailyLifeUsContent: Record<string, CalcInlineContent> = {
  'time-card-calculator': {
    article: `A weekly time card is how most US hourly employees track the hours they actually worked so payroll can pay them correctly. Enter your clock-in time, clock-out time, and unpaid break for each day of the week, and the calculator totals everything for you — including overtime.

## How it's calculated

\`\`\`text
daily hours   = (clock out − clock in) − unpaid break
weekly total  = sum of daily hours
regular hours = min(weekly total, OT threshold)
overtime      = max(weekly total − OT threshold, 0)
gross pay     = regular × rate + overtime × rate × OT multiplier
\`\`\`

The overtime threshold and multiplier default to the federal Fair Labor Standards Act (FLSA) values — 40 hours and 1.5x — but both are adjustable so you can model state rules or contract terms. Under the FLSA, non-exempt employees must receive overtime pay of at least 1.5x their regular rate for all hours worked over 40 in a single workweek. The 40-hour threshold is weekly under federal law — there is no federal daily overtime — though some states go further (California, for example, adds daily overtime after 8 hours in a workday). The federal minimum wage floor is $7.25 per hour; many states and cities set higher minimums.

**hh:mm vs decimal hours.** A time card shows durations two ways. "7:30" means 7 hours and 30 minutes. Payroll systems multiply hours by a pay rate, so they need the decimal form: divide the minutes by 60, so 7:30 = 7.50 hours. The two formats describe the same duration — 7.5 hours at $20/hour is $150 either way. Mixing them up (reading 7:30 as 7.3 hours) shorts you 12 minutes of pay per shift, which adds up fast.

**Breaks.** Under federal rules, bona fide meal periods (typically 30 minutes or more, fully relieved of duty) can be unpaid, while short rest breaks of about 5–20 minutes are normally counted as paid work time. Only subtract genuinely unpaid breaks on your time card.

**Assumptions and limitations.** This tool applies the federal weekly overtime rule only; it does not model state daily-overtime rules, double-time, shift differentials, tips, or tax withholding. For take-home pay after federal tax and FICA, use the paycheck calculator.`,
    faqs: [
      {
        question: 'How is overtime calculated on a weekly time card?',
        answer: 'Under the FLSA, non-exempt employees earn at least 1.5x their regular hourly rate for every hour worked over 40 in a workweek. Hours up to 40 are paid at the regular rate; everything above is paid at time-and-a-half.',
      },
      {
        question: 'What is the difference between hh:mm and decimal hours?',
        answer: '"7:30" is 7 hours 30 minutes; in decimal that is 7.50 hours (minutes ÷ 60). Payroll multiplies decimal hours by your hourly rate, so always convert before computing pay — 7:30 is 7.5 hours, not 7.3.',
      },
      {
        question: 'Are lunch breaks paid or unpaid?',
        answer: 'Under federal rules, a bona fide meal break (usually 30+ minutes, fully relieved of duties) may be unpaid. Short breaks of roughly 5–20 minutes are normally paid work time and should not be deducted from your time card.',
      },
      {
        question: 'Does overtime apply per day or per week?',
        answer: 'Federal law (FLSA) only requires overtime after 40 hours in a workweek. A few states add daily overtime — California, for example, requires 1.5x after 8 hours in a workday — so check your state rules.',
      },
      {
        question: 'How do I convert minutes to decimal hours for payroll?',
        answer: 'Divide minutes by 60: 15 min = 0.25, 30 min = 0.50, 45 min = 0.75. So 38 hours 45 minutes is 38.75 decimal hours.',
      },
    ],
  },
  'square-footage-calculator': {
    article: `Square footage is the standard US measure of area for rooms, flooring, paint, lawns, and real estate listings. Measure your dimensions in feet, pick the shape, and the calculator returns the area in square feet (and square meters), multiplied by however many identical sections you have — plus a cost estimate if you enter a price per square foot.

## How it's calculated

\`\`\`text
Rectangle : L × W
Circle    : π × (D ÷ 2)²        (L is the diameter)
Triangle  : ½ × base × height
Border    : (L + 2b) × (W + 2b) − (L × W)
Total     : area × quantity
Metric    : 1 sq ft = 0.09290304 m²
Cost      : total sq ft × price per sq ft
\`\`\`

The **border shape** computes the area of a band of width b that wraps around an L × W inner area — think a sidewalk around a pool, a mulch ring around a garden bed, or a frame around a deck. It is the outer rectangle minus the inner one, so only the band itself is counted.

**Irregular rooms.** Most US homes aren't perfect rectangles. Split an L-shaped or odd room into rectangles and triangles, calculate each section, and add them up — the quantity slider helps when several sections are identical.

**Buying material.** Contractors typically add a waste factor on top of the measured area: about 5–10% for flooring and paint, and 10–15% for tile laid diagonally or patterned carpet. Boxed materials are sold in whole units, so round up to the next full box.

**Assumptions and limitations.** All inputs are interpreted in feet and results in square feet; the border-width slider only affects the border shape. The cost estimate is materials only — it excludes labor, underlayment, removal, and sales tax, which vary widely by region. For paint coverage by gallon or tile counts by box, use the dedicated paint and carpet/tile calculators.`,
    faqs: [
      {
        question: 'How do I calculate the square footage of a room?',
        answer: 'Measure the length and width in feet and multiply them: a 12 ft × 10 ft room is 120 sq ft. For L-shaped rooms, split the space into rectangles, calculate each, and add the results.',
      },
      {
        question: 'How many square feet are in a square meter?',
        answer: '1 square meter = 10.764 square feet, and 1 square foot = 0.0929 square meters. The calculator converts automatically.',
      },
      {
        question: 'How does the border / frame shape work?',
        answer: 'It calculates the area of a band of constant width around an inner L × W area — outer rectangle minus inner rectangle. A 3 ft border around a 12 × 10 ft area is (18 × 16) − 120 = 168 sq ft.',
      },
      {
        question: 'How much extra material should I buy for waste?',
        answer: 'Add roughly 5–10% for standard flooring and paint jobs, and 10–15% for diagonal tile layouts or patterned material that needs matching. Always round up to whole boxes or gallons.',
      },
      {
        question: 'Is square footage measured the same way for real estate?',
        answer: 'Listings usually report finished, heated living area measured from exterior walls, and rules vary by state and appraiser. This calculator measures plain geometric area, which is what you need for materials.',
      },
    ],
  },
  'love-calculator': {
    article: `The love calculator is a classic just-for-fun game: type in two names and get a "compatibility" percentage with a playful verdict. Let's be completely clear up front — **this is entertainment only**. No name-based formula can measure real romantic compatibility, and the score has no scientific, psychological, or astrological meaning whatsoever. It is a party trick, not relationship advice.

## How it's calculated

\`\`\`text
1. Combine both names into one string
2. Lowercase everything, strip anything that isn't a letter
3. Sum the character codes of every remaining letter
4. score = sum mod 101   (a number from 0 to 100)
\`\`\`

Because the score is a simple hash of the letters in both names, it is **deterministic**: the same two names always produce the same score, today, tomorrow, and on every device. There is no randomness and no hidden database — just arithmetic on letters. Swapping the order of the names doesn't change anything either, since adding the same character codes in a different order gives the same sum.

The verdict tiers are equally unserious: 90+ is "Written in the stars", 75–89 is "A power couple in the making", 60–74 means "Sparks are definitely flying", 40–59 is "Worth a coffee date", 20–39 says "Friendship looks strong", and below 20... well, opposites attract, supposedly.

**Why people love it anyway.** Name-compatibility games have been around since the paper-and-pencil "LOVES" game schoolkids played decades before the internet. They persist because they're a low-stakes excuse to put two names side by side and laugh about the result. Use it at parties, in group chats, or to settle absolutely nothing.

**Limitations** (obviously): the score ignores everything that actually matters in a relationship — communication, values, kindness, timing, and shared interests. If you scored 12 with your partner of ten years, congratulations on beating the odds the calculator invented. For numbers that do mean something, try the age calculator or count down to your anniversary instead.`,
    faqs: [
      {
        question: 'Is the love calculator scientifically accurate?',
        answer: 'No — it is purely for entertainment. The score is a simple math hash of the letters in two names and has no scientific, psychological, or predictive value at all.',
      },
      {
        question: 'Why do I always get the same score for the same two names?',
        answer: 'The score is deterministic: it sums the character codes of the letters in both names and takes the remainder mod 101. Same names in, same score out — every time, on every device.',
      },
      {
        question: 'Does the order of the names matter?',
        answer: 'No. The calculator adds up the letter codes from both names combined, and addition gives the same total in any order — "Alex + Jordan" scores exactly the same as "Jordan + Alex".',
      },
      {
        question: 'Do spaces, capitalization, or middle names change the score?',
        answer: 'Capitalization and spaces are ignored — only letters count. Adding a middle name or nickname does change the letters, so it will usually produce a different score.',
      },
      {
        question: 'What counts as a good score?',
        answer: 'Anything 60 or above earns a glowing verdict, and 90+ is "Written in the stars". But remember: it is a game. A low score with someone you love proves only that the game is a game.',
      },
    ],
  },
  'hours-calculator': {
    article: `The hours calculator answers a question everyone asks at some point: "how many hours is 9 to 5?" Set a start time, an end time, and any unpaid break, and you get the elapsed time three ways — as hh:mm (like 7:30), as decimal hours (7.50), and as total minutes (450).

## How it's calculated

\`\`\`text
minutes = (end − start) × 60
if end ≤ start: minutes += 1440      (overnight shift)
minutes = minutes − unpaid break     (floored at 0)
hh:mm   = minutes ÷ 60 hours, remainder minutes
decimal = minutes ÷ 60
\`\`\`

**Overnight shifts.** If the end time is earlier than (or equal to) the start time, the calculator assumes you crossed midnight and adds 24 hours. A 10:00 PM to 6:00 AM shift correctly computes as 8 hours, not −16.

**hh:mm vs decimal hours.** Both formats describe the same duration, but they are read differently. 7:30 means 7 hours 30 minutes; the decimal equivalent is 7.50 because 30 minutes is half an hour. Payroll systems, invoices, and timesheet software almost always want decimal hours, since pay = decimal hours × hourly rate. The classic mistake is treating 7:30 as 7.3 hours — that silently drops 12 minutes.

**Quarter-hour steps.** The time sliders move in 15-minute increments because quarter-hour rounding is the most common timesheet convention in US workplaces (the FLSA permits rounding to the nearest quarter hour as long as it doesn't systematically shortchange employees). The break slider moves in 5-minute steps up to 3 hours.

**Assumptions and limitations.** The calculation spans at most 24 hours — it measures one shift, not multiple days. It doesn't apply overtime rules, pay rates, or time zones, and it treats the break as fully unpaid. To total a full week of shifts with overtime at 1.5x over 40 hours, use the time card calculator; to turn the hours into take-home pay, use the paycheck calculator.`,
    faqs: [
      {
        question: 'How many hours is 9 to 5?',
        answer: '9:00 AM to 5:00 PM is 8 hours of elapsed time. With a typical 30-minute unpaid lunch, that is 7:30 — i.e. 7.5 paid hours or 450 minutes.',
      },
      {
        question: 'How does the calculator handle overnight shifts?',
        answer: 'If the end time is at or before the start time, it assumes you crossed midnight and adds 24 hours. So 10:00 PM to 6:00 AM computes as 8 hours.',
      },
      {
        question: 'How do I convert hh:mm to decimal hours?',
        answer: 'Divide the minutes by 60 and add them to the hours: 7:30 = 7 + 30/60 = 7.50 hours. Payroll systems multiply decimal hours by your hourly rate.',
      },
      {
        question: 'Why do the time sliders move in 15-minute steps?',
        answer: 'Quarter-hour rounding is the most common US timesheet convention, and the FLSA permits rounding to the nearest 15 minutes as long as it is neutral over time. It also keeps the math clean: each step is exactly 0.25 hours.',
      },
      {
        question: 'Is the break subtracted automatically?',
        answer: 'Yes — whatever you set on the unpaid break slider is removed from the elapsed time. If your break is paid, leave the slider at 0.',
      },
    ],
  },
  'date-calculator': {
    article: `The date calculator answers questions like "what is 30 days from June 15, 2026?" or "what date was 90 business days ago?". Set a base date, choose add or subtract, pick an amount and unit, and you instantly get the resulting calendar date, its day of the week, and how many actual days separate it from the base.

## How it's calculated

\`\`\`text
Days          : result = base ± N days
Weeks         : result = base ± (N × 7) days
Months/Years  : calendar shift; day clamped to the
                end of the target month if needed
Business days : step one calendar day at a time,
                skipping Saturdays and Sundays
\`\`\`

**Business-days mode.** With "skip weekends" on, each step lands only on Monday–Friday, which is how contract deadlines, shipping estimates, and payroll cutoffs are usually counted. Five business days from a Monday is the following Monday (7 calendar days). This mode applies to days and weeks only — months and years always shift the calendar directly — and it does not skip US federal holidays, so a deadline that crosses Thanksgiving or July 4 may land one business day earlier than your counterparty expects.

**Month-end clamping.** Adding 1 month to January 31 can't land on "February 31", so the calculator clamps to the last real day of the target month: February 28 (or February 29 in a leap year). The same rule applies when adding years to February 29.

**Leap years and DST.** All arithmetic uses real calendar dates, so leap years are handled exactly, and the "days from base" figure is rounded so daylight-saving transitions never skew it by an hour.

**Assumptions and limitations.** If the base day exceeds the month's length (e.g., day 31 in June), it is clamped to the month's last day before calculating. Business-day stepping is capped at 7,000 iterations, which comfortably covers the 1,000-week maximum. For the gap between two specific dates, use the date difference calculator instead.`,
    faqs: [
      {
        question: 'How does business-days mode work?',
        answer: 'It moves one calendar day at a time and only counts Monday through Friday, skipping Saturdays and Sundays. It applies to the days and weeks units only — months and years always shift the calendar directly.',
      },
      {
        question: 'Does the calculator skip US federal holidays?',
        answer: 'No — business-days mode skips weekends only. If your window crosses a federal holiday like July 4 or Thanksgiving, official business-day counts may differ by a day per holiday.',
      },
      {
        question: 'What happens when I add a month to January 31?',
        answer: 'The result is clamped to the last real day of the target month: February 28, or February 29 in a leap year. The same clamping applies when a base day like 31 lands in a 30-day month.',
      },
      {
        question: 'Does it handle leap years?',
        answer: 'Yes. All math uses real calendar dates, so February 29 exists in leap years (2028, 2032, ...) and date arithmetic across them is exact.',
      },
      {
        question: 'How do I find the number of days between two dates?',
        answer: 'That is the reverse problem — use the date difference calculator, which takes two dates and returns the gap in days, weeks, months, and years.',
      },
    ],
  },
  'gas-mileage-calculator': {
    article: `Gas mileage — miles per gallon, or MPG — is the single best number for understanding what your car actually costs to drive. Enter the miles you drove and the gallons you burned, and this calculator returns your real-world MPG, what each mile costs you at today's pump price, the total fuel bill for the trip, and the metric L/100km figure used everywhere outside the US.

## How it's calculated

\`\`\`text
MPG           = miles driven ÷ gallons used
Cost per mile = price per gallon ÷ MPG
Trip cost     = gallons used × price per gallon
L/100km       = 235.215 ÷ MPG
\`\`\`

**Measuring MPG accurately: the fill-to-fill method.** Fill your tank completely and reset the trip odometer (or note the mileage). Drive normally. At the next fill-up, fill completely again and divide the trip miles by the gallons shown on the pump. That gallons figure is exactly what you consumed since the last fill, so the math is honest. One tank gives a decent estimate; averaging three or four tanks smooths out pump shutoff variance.

**Why your MPG is below the window sticker.** EPA ratings come from standardized lab cycles. Real-world economy is typically lower because of cold starts, short city trips, air conditioning, underinflated tires, roof racks, aggressive acceleration, winter fuel blends, and sustained speeds above 70 mph. A 10–15% gap is normal; a sudden larger drop can signal a maintenance issue like a stuck brake caliper or a failing oxygen sensor.

**Cost per mile** is the most useful planning number: at 25 MPG and $3.50 per gallon, every mile costs 14 cents in fuel alone. Multiply by your annual mileage to budget fuel for the year, or compare two vehicles before buying.

**Assumptions and limitations.** Results assume US gallons (3.785 L) and statute miles. Fuel is only part of total driving cost — depreciation, insurance, and maintenance are excluded. Set the price slider to 0 if you only want the MPG and metric conversion.`,
    faqs: [
      {
        question: 'How do I measure my MPG accurately?',
        answer: 'Use the fill-to-fill method: fill the tank completely, reset the trip odometer, drive normally, then refill completely. Divide trip miles by the gallons from the second fill. Averaging several tanks gives the most reliable figure.',
      },
      {
        question: 'What is a good MPG?',
        answer: 'New US light vehicles average in the mid-to-high 20s overall. Roughly: under 20 MPG is thirsty (trucks, large SUVs), 25–35 MPG is solid for sedans and crossovers, and 40–55+ MPG is hybrid territory.',
      },
      {
        question: 'How do I convert MPG to L/100km?',
        answer: 'Divide 235.215 by the MPG value: 25 MPG = 9.4 L/100km, and 47 MPG = 5.0 L/100km. Note the scales run in opposite directions — higher MPG means lower L/100km.',
      },
      {
        question: 'Why is my real MPG lower than the EPA rating?',
        answer: 'EPA figures come from lab test cycles. Cold weather, short trips, AC use, low tire pressure, roof cargo, and high-speed driving all cut real-world economy — a 10–15% shortfall is common.',
      },
      {
        question: 'What does cost per mile tell me?',
        answer: 'It is your fuel price divided by MPG — the fuel cost of each mile driven. At 25 MPG and $3.50/gallon that is $0.14 per mile, so a 12,000-mile year costs about $1,680 in gas.',
      },
    ],
  },
};
