(() => {
  "use strict";

  function choice(id, level, category, title, instruction, choices, answer, softHint, directHint, response, explanation, readout = []) {
    return { id, kind: "choice", level, category, title, instruction, choices, answer, softHint, directHint, response, explanation, readout };
  }

  function memory(id, level, title, briefing, question, choices, answer, softHint, directHint, response, explanation) {
    return {
      id,
      kind: "memory",
      level,
      category: "Memory Briefing",
      title,
      instruction: "Study this technical briefing. When you are ready, continue to the question.",
      briefing,
      question,
      choices,
      answer,
      softHint,
      directHint,
      response,
      explanation
    };
  }

  window.KW_CONTENT = [
    choice(
      "e-series-divider", 2, "Electrical Systems", "Series Voltage Division",
      "An isolated 12-volt bench supply feeds 100-ohm and 220-ohm resistors in series. What voltage appears across the 220-ohm resistor?",
      ["3.75 volts", "8.25 volts", "12 volts", "26.4 volts"], "8.25 volts",
      "Series voltage divides in proportion to resistance.",
      "Total resistance is 320 ohms. Find the current, then multiply it by 220 ohms.",
      "The calculated drop is 8.25 volts.",
      "Current is 12 divided by 320, or 0.0375 amp. Multiplying by 220 ohms gives 8.25 volts.",
      [{ label: "Supply", value: "12 V" }, { label: "Series resistors", value: "100 Ω + 220 Ω" }]
    ),
    choice(
      "e-parallel-current", 2, "Electrical Systems", "Parallel Branch Current",
      "A 24-volt battery simulator feeds 120-ohm and 240-ohm branches in parallel. What total current leaves the simulator?",
      ["0.10 amp", "0.20 amp", "0.30 amp", "0.40 amp"], "0.30 amp",
      "Each branch receives all 24 volts. Add the two branch currents.",
      "The branches draw 24 divided by 120 and 24 divided by 240 amperes.",
      "Total current is 0.30 amp.",
      "The branches draw 0.20 amp and 0.10 amp. Together they draw 0.30 amp.",
      [{ label: "Supply", value: "24 V" }, { label: "Parallel branches", value: "120 Ω and 240 Ω" }]
    ),
    choice(
      "e-ohms-diagnosis", 2, "Electrical Systems", "Ohm's Law Diagnosis",
      "A 10-volt indicator channel normally draws 50 milliamps. It now draws 25 milliamps with the voltage unchanged. What is its new resistance?",
      ["100 ohms", "200 ohms", "400 ohms", "800 ohms"], "400 ohms",
      "At unchanged voltage, half the current means twice the resistance.",
      "Convert 25 milliamps to 0.025 amp, then divide 10 volts by that current.",
      "The new resistance is 400 ohms.",
      "Using R equals V divided by I, 10 divided by 0.025 equals 400 ohms.",
      [{ label: "Voltage", value: "10 V" }, { label: "Measured current", value: "25 mA" }]
    ),
    choice(
      "e-power-margin", 3, "Electrical Systems", "Choose the Power Rating",
      "A 60-ohm dummy load is connected to an isolated 12-volt source. Design rules require a rating at least 50 percent above calculated power. What is the smallest acceptable listed rating?",
      ["1 watt", "2 watts", "3 watts", "5 watts"], "5 watts",
      "Calculate the actual power first, then add the design margin.",
      "Actual power is 12 squared divided by 60, or 2.4 watts. Multiply that by 1.5.",
      "A 5-watt part is the smallest listed safe choice.",
      "The required rating is at least 3.6 watts. The next listed rating is 5 watts.",
      [{ label: "Load", value: "60 Ω" }, { label: "Source", value: "12 V" }, { label: "Required margin", value: "50%" }]
    ),
    choice(
      "e-relay-contact", 3, "Electrical Systems", "Relay Contact Fault",
      "On a 12-volt relay trainer, the coil receives rated voltage and clicks. With the contact side isolated, COM-to-NO remains above one megohm while energized. Which fault fits?",
      ["Open coil winding", "Missing control voltage", "Failed normally-open contacts", "Shorted training load"], "Failed normally-open contacts",
      "Separate the relay's coil operation from its contact operation.",
      "The click proves the coil moved the armature, but the normally-open path never closed.",
      "The evidence isolates the fault to the contact assembly.",
      "The coil and armature operate, yet the normally-open contact remains electrically open.",
      [{ label: "Coil", value: "12 V and audible click" }, { label: "COM-to-NO", value: "> 1 MΩ energized" }]
    ),
    choice(
      "e-switch-logic", 2, "Electrical Systems", "Read the Control Logic",
      "Normally-open pushbuttons S1 and S2 are in parallel. That pair is in series with normally-closed S3 and lamp L. A pressed button is TRUE. When is L on?",
      ["(S1 OR S2) AND NOT S3", "S1 AND S2 AND S3", "(S1 AND S2) OR S3", "NOT (S1 OR S2 OR S3)"], "(S1 OR S2) AND NOT S3",
      "Parallel paths act like OR. Series conditions act like AND.",
      "Either S1 or S2 can complete the first section, but pressing S3 opens the final path.",
      "The correct expression is S1 or S2, and not S3.",
      "The lamp is on when either parallel START path is closed and the normally-closed STOP path remains closed."
    ),
    choice(
      "e-open-divider", 3, "Electrical Systems", "Locate the Open Circuit",
      "A 9-volt divider has two 100-ohm resistors with test point X between them. X should read 4.5 volts. It now reads nearly 9 volts and source current is almost zero. Which resistor opened?",
      ["Upper resistor R1", "Lower resistor R2", "R1 became a short", "Neither; this is normal"], "Lower resistor R2",
      "With no current, an intact resistor has almost no voltage drop.",
      "If R2 opens, X stays connected to positive through R1 but loses its return path.",
      "R2 is open.",
      "No current means almost no drop across R1, so X rises to nearly the full 9 volts."
    ),
    choice(
      "e-short-divider", 3, "Electrical Systems", "Locate the Short Circuit",
      "A 12-volt divider has two 100-ohm resistors with X between them. X should read 6 volts. It now reads nearly zero while source current is 120 milliamps. Which fault fits both readings?",
      ["R1 opened", "R2 opened", "R1 was bypassed", "R2 was bypassed"], "R2 was bypassed",
      "Use both readings. An open can pull a node low, but it cannot also create high current.",
      "A short across R2 ties X to return and leaves only R1 across the source.",
      "R2 has been bypassed by a short.",
      "With R2 shorted, X is at return potential and current is 12 divided by 100, or 120 milliamps."
    ),
    choice(
      "e-meter-loading", 3, "Electrical Systems", "Account for Meter Loading",
      "A 10-volt divider uses two 1-megohm resistors. A voltmeter with 1-megohm input resistance is connected from midpoint X to return. Approximately what will it read?",
      ["2.50 volts", "3.33 volts", "5.00 volts", "6.67 volts"], "3.33 volts",
      "At high circuit resistance, the meter becomes part of the divider.",
      "The meter is parallel with the lower resistor, making that leg 0.5 megohm.",
      "The loaded reading is about 3.33 volts.",
      "The divider becomes 1 megohm over 0.5 megohm, so X is 10 times 0.5 divided by 1.5."
    ),
    choice(
      "e-branching-divider", 2, "Electrical Systems", "Reduce the Branching Network",
      "A 12-volt source feeds a 100-ohm resistor, then test point X. From X, two 200-ohm resistors return in parallel. What is the voltage at X?",
      ["3 volts", "4 volts", "6 volts", "8 volts"], "6 volts",
      "Replace the parallel pair with its equivalent resistance.",
      "Two equal 200-ohm resistors in parallel equal 100 ohms.",
      "X is at 6 volts.",
      "The network reduces to 100 ohms in series with 100 ohms, so the 12 volts divide equally."
    ),
    choice(
      "e-flyback-diode", 2, "Electrical Systems", "Orient the Suppression Diode",
      "A diode is placed across a 12-volt DC relay coil and must be reverse-biased during normal operation. Which orientation is correct?",
      ["Cathode band to positive; anode to switched return", "Anode to positive; cathode band to return", "Both leads to positive", "Orientation makes no difference"], "Cathode band to positive; anode to switched return",
      "The diode should not conduct while normal power is applied.",
      "The band marks the cathode, which belongs at the more positive coil terminal.",
      "The cathode band goes to the positive side.",
      "That orientation blocks normal current but carries the coil's inductive current when the switch opens."
    ),
    choice(
      "e-kelvin-drop", 3, "Electrical Systems", "Measure the Sense Resistor",
      "A 0.10-ohm sense resistor carries exactly 2 amps. Each outer supply lead adds 0.03 ohm, but voltmeter probes touch the resistor's own terminals. What should the meter read?",
      ["0.14 volt", "0.20 volt", "0.26 volt", "0.32 volt"], "0.20 volt",
      "Probe placement excludes voltage drops outside the component terminals.",
      "Use only the sense resistance: 2 amps times 0.10 ohm.",
      "The resistor drop is 0.20 volt.",
      "The outer lead drops are beyond the voltage probe points and do not enter the reading."
    ),
    choice(
      "e-seal-in", 3, "Electrical Systems", "Analyze the Seal-In Circuit",
      "A normally-closed STOP feeds parallel START and K1 auxiliary contacts, then the K1 coil. Starting with K1 off, what happens when START is pressed and released, then STOP is pressed?",
      ["K1 runs only while START is held", "K1 holds through its contact; STOP releases it", "K1 never starts", "STOP latches K1 permanently"], "K1 holds through its contact; STOP releases it",
      "Follow how K1's auxiliary contact changes after the coil first energizes.",
      "START supplies the first path. K1's contact then supplies the holding path until STOP opens it.",
      "K1 seals in, then STOP releases it.",
      "The auxiliary contact closes with K1 and bypasses START. STOP remains in series with both paths."
    ),
    choice(
      "e-two-way-switch", 2, "Electrical Systems", "Trace the Two-Switch Circuit",
      "Two SPDT switches are linked by matching traveler A and B wires. The first common receives 12 volts and the second common feeds a lamp. When is the lamp on?",
      ["Only when both choose A", "Only when both choose B", "Whenever both choose the same traveler", "Whenever they choose different travelers"], "Whenever both choose the same traveler",
      "Trace one uninterrupted path through the two switches.",
      "A-to-A and B-to-B both complete a route. Mixed selections do not.",
      "The lamp is on whenever the switch selections match.",
      "Matching travelers join source to lamp, while different travelers interrupt the route."
    ),
    choice(
      "e-rc-timing", 3, "Electrical Systems", "Calculate the RC Timing",
      "A 12-volt step is applied through 100 kilohms to a discharged 47-microfarad capacitor. Which pair describes the capacitor after one time constant?",
      ["0.47 second and about 12 volts", "4.7 seconds and about 4.4 volts", "4.7 seconds and about 7.6 volts", "47 seconds and about 7.6 volts"], "4.7 seconds and about 7.6 volts",
      "Time constant is resistance times capacitance. After one time constant, charge reaches about 63 percent.",
      "100,000 times 0.000047 is 4.7 seconds. Then find 63 percent of 12 volts.",
      "One time constant is 4.7 seconds and the voltage is about 7.6 volts.",
      "The time constant is 4.7 seconds, and 0.632 times 12 volts is approximately 7.6 volts."
    ),

    choice(
      "m-compound-gears", 3, "Mechanical Systems", "Solve the Compound Gear Train",
      "A 12-tooth gear turns clockwise at 900 RPM and drives a 36-tooth gear. On that shaft, a 15-tooth gear drives a 45-tooth output gear. What is the output?",
      ["Clockwise at 100 RPM", "Counterclockwise at 100 RPM", "Clockwise at 300 RPM", "Counterclockwise at 300 RPM"], "Clockwise at 100 RPM",
      "Each external mesh reverses direction. Multiply the two speed ratios.",
      "There are two reversals, and each stage reduces speed to one-third.",
      "The output is clockwise at 100 RPM.",
      "Two reversals restore clockwise rotation. Speed is 900 times 12 over 36 times 15 over 45, which equals 100 RPM."
    ),
    choice(
      "m-idler-gear", 2, "Mechanical Systems", "Reason Through the Idler Gear",
      "An 18-tooth gear turns clockwise at 720 RPM. It drives a 30-tooth idler, which drives a 54-tooth output gear. What is the output?",
      ["Clockwise at 240 RPM", "Counterclockwise at 240 RPM", "Clockwise at 400 RPM", "Counterclockwise at 720 RPM"], "Clockwise at 240 RPM",
      "The idler changes direction relationships but cancels from the overall speed ratio.",
      "Two contacts mean two reversals. Compare 18 teeth with 54 teeth for speed.",
      "The output is clockwise at 240 RPM.",
      "Two reversals restore clockwise rotation, and 720 times 18 over 54 equals 240 RPM."
    ),
    choice(
      "m-four-part-hoist", 3, "Mechanical Systems", "Calculate the Hoist",
      "A hoist has four rope sections supporting a 360-newton load and is 80 percent efficient. What force and rope travel lift the load half a meter?",
      ["90 N and 0.5 m", "112.5 N and 2 m", "144 N and 2 m", "112.5 N and 4 m"], "112.5 N and 2 m",
      "Four sections give a four-to-one distance ratio. Efficiency reduces the force advantage.",
      "Divide 360 by four times 0.80, then multiply lift distance by four.",
      "The hoist needs 112.5 newtons over 2 meters of rope travel.",
      "Actual mechanical advantage is 3.2, so force is 112.5 newtons. Four sections require 2 meters of rope travel."
    ),
    choice(
      "m-lever-friction", 3, "Mechanical Systems", "Calculate the Lever Output",
      "A one-meter bar has its fulcrum 0.20 meter from the load. A 150-newton effort acts at the opposite end. At 90 percent efficiency, what load can it move?",
      ["135 newtons", "540 newtons", "600 newtons", "675 newtons"], "540 newtons",
      "Compare the effort arm with the load arm, then apply efficiency.",
      "The arms are 0.80 and 0.20 meter, a four-to-one ratio.",
      "Usable output is 540 newtons.",
      "Ideal output is 150 times four, or 600 newtons. At 90 percent efficiency, that becomes 540 newtons."
    ),
    choice(
      "m-overgreased-bearing", 2, "Mechanical Systems", "Diagnose the Warm Bearing",
      "After routine greasing, a rolling bearing runs hotter. Load and alignment are unchanged, vibration is smooth, and the housing was packed completely full. What is most likely?",
      ["Excess grease is churning", "The shaft is too slow", "End clearance is too large", "Grease made the shaft lighter"], "Excess grease is churning",
      "More lubricant is not always better in a rolling bearing.",
      "A full housing leaves no room for grease to move away from the rolling elements.",
      "The bearing was over-greased.",
      "Excess grease churns between moving parts, increasing friction and heat."
    ),
    choice(
      "m-lost-prime", 2, "Boat Systems", "Restore Cooling-Pump Flow",
      "After a freshwater strainer is cleaned, the centrifugal pump turns normally but flow is low and unsteady. There is gurgling and an air pocket. What should be checked first?",
      ["Vent and prime the pump; check suction seals", "Increase motor speed", "Close the suction valve farther", "Grease the motor"], "Vent and prime the pump; check suction seals",
      "A centrifugal pump cannot move liquid well when its suction path contains air.",
      "The air pocket and gurgling point to lost prime or a suction-side air leak.",
      "The evidence points to lost prime or a suction leak.",
      "Opening the suction system during service can admit air. Restoring prime and checking resealed joints addresses it directly."
    ),
    choice(
      "m-pumps-series", 3, "Mechanical Systems", "Arrange the Two Pumps",
      "A test loop needs more pressure after a restrictive heat exchanger is added, while desired flow stays about the same. How should two identical centrifugal pumps be arranged?",
      ["In series", "In parallel", "One running backward", "Both connected only to the tank"], "In series",
      "Series adds pump head. Parallel mainly increases available flow.",
      "The requirement is greater pressure, not substantially greater flow.",
      "The pumps should operate in series.",
      "The second series pump adds head at approximately the same flow."
    ),
    choice(
      "m-filter-isolation", 2, "Mechanical Systems", "Plan the Filter Service",
      "A cooling-loop filter has isolation valves on both sides and a bypass. It must be cleaned while the rest of the loop stays in service. Which sequence is best?",
      ["Open bypass; isolate both sides; verify zero pressure; drain and open", "Remove the cover; then open bypass", "Isolate both sides; open filter; then open bypass", "Close bypass; loosen the cover"], "Open bypass; isolate both sides; verify zero pressure; drain and open",
      "Preserve the alternate flow path before isolation and confirm stored pressure is gone.",
      "Bypass first, isolate second, verify and drain third.",
      "That sequence maintains flow and controls stored pressure.",
      "The bypass maintains circulation while both filter sides are isolated and confirmed depressurized before service."
    ),
    choice(
      "m-restricted-strainer", 3, "Boat Systems", "Interpret the Cooling Readings",
      "Cooling supply stays at 18°C. Return rises from 23°C to 30°C, equipment rises from 65°C to 78°C, pump speed is unchanged, and suction vacuum is high. What fits?",
      ["Restricted suction strainer", "Colder supply water", "Low-reading equipment sensor", "Substantially greater flow"], "Restricted suction strainer",
      "Lower flow absorbs more heat per unit of water, while suction restriction raises inlet vacuum.",
      "Combine the larger temperature rise with the unusually high suction vacuum.",
      "A restricted suction strainer fits every reading.",
      "Reduced mass flow warms more, cools equipment less effectively, and increases pump inlet vacuum."
    ),
    choice(
      "m-relief-leak", 3, "Mechanical Systems", "Diagnose the Hydraulic Loss",
      "A hydraulic trainer reaches normal pressure without load. Under load, pressure falls, oil heats, and flow appears in the relief return below its set pressure. What is most likely?",
      ["Relief valve leaking or stuck partly open", "Pressure gauge reading too high", "Cooler removing too much heat", "Too much empty reservoir space"], "Relief valve leaking or stuck partly open",
      "Flow bypassing to tank wastes power as heat and leaves less pressure for useful work.",
      "The relief return should not carry steady flow below the opening pressure.",
      "The relief path is leaking.",
      "Internal bypass flow reduces loaded pressure and converts hydraulic energy into heat."
    ),
    choice(
      "m-bearing-sequence", 2, "Mechanical Systems", "Choose the Bearing Procedure",
      "Which is the best overall sequence after deciding to replace a pump bearing?",
      ["Isolate; record alignment; replace; align; lubricate; hand-turn; guard; monitored test", "Remove guard; start pump; grease; align", "Add maximum grease; replace; align only if vibration appears", "Loosen coupling; run slowly; remove while turning"], "Isolate; record alignment; replace; align; lubricate; hand-turn; guard; monitored test",
      "A sound sequence controls energy, preserves measurements, and checks free movement before powered testing.",
      "Isolation comes first. The guard and monitored run come last.",
      "That is the complete controlled maintenance sequence.",
      "It protects people and equipment while preserving alignment information and verifying the repair before full operation."
    ),
    choice(
      "m-pressure-creep", 3, "Mechanical Systems", "Explain the Pressure Creep",
      "Downstream pressure is correct while water flows. When all outlets close, the downstream gauge slowly climbs toward upstream pressure. What fault is most likely?",
      ["Leakage across the reducing-valve seat", "A much-too-weak spring", "An oversized downstream pipe", "A gauge with an empty battery"], "Leakage across the reducing-valve seat",
      "Rising downstream pressure at zero flow means fluid is slipping past a closed control point.",
      "Dirt or wear at the reducing-valve seat can cause pressure creep.",
      "The reducing-valve seat is leaking.",
      "A small seat leak continually admits upstream water when demand is zero, gradually raising downstream pressure."
    ),
    choice(
      "m-short-cycling", 2, "Boat Systems", "Diagnose Pump Short-Cycling",
      "A freshwater pump starts and stops after only a small amount of water use. There are no leaks, pump flow is normal, and pressure changes very quickly. What should be inspected?",
      ["Accumulator air charge", "Pump-housing color", "Drain strainer", "Motor paint"], "Accumulator air charge",
      "The accumulator stores pressurized water and prevents response to every small demand.",
      "A waterlogged accumulator has little compressible air volume.",
      "Inspect the accumulator's air charge.",
      "Without an air cushion, system pressure changes rapidly and the pump cycles for every small use."
    ),
    choice(
      "m-belt-slip", 2, "Mechanical Systems", "Diagnose the Slow Fan",
      "A ventilation fan delivers less air. Its motor remains at normal speed, but the fan turns slowly. The belt is loose, shiny, and glazed. What is the best diagnosis?",
      ["Belt slip", "Excess fan speed", "Reversed pressure gauge", "Too much duct airflow"], "Belt slip",
      "If the driver stays at speed but the driven machine slows, inspect their connection.",
      "A loose glazed belt cannot transmit full torque to the fan pulley.",
      "The drive belt is slipping.",
      "The motor pulley slides against the belt rather than pulling it cleanly, reducing fan speed."
    ),
    choice(
      "m-three-way-valve", 3, "Boat Systems", "Trace the Cooling Bypass",
      "A machinery loop should hold 74°C but reaches 84°C. Secondary water is normal, the bypass is very hot, and cooler flow is low. What is the best diagnosis?",
      ["Three-way valve stuck toward bypass", "Too much flow through the cooler", "Setpoint already too low", "Secondary water removing too much heat"], "Three-way valve stuck toward bypass",
      "Follow the observed flow path and compare it with the path the controller should select.",
      "Hot bypass flow plus low cooler flow means the valve is routing the wrong way.",
      "The three-way valve is stuck toward bypass.",
      "At high temperature the valve should divert more flow through the cooler, not around it."
    ),
    choice(
      "m-hydraulic-force", 2, "Mechanical Systems", "Calculate Hydraulic Force",
      "A training cylinder has a piston area of 2 square inches and receives 100 PSI. Ignoring losses, what output force is available?",
      ["50 pounds-force", "100 pounds-force", "200 pounds-force", "400 pounds-force"], "200 pounds-force",
      "Force equals pressure multiplied by piston area.",
      "Multiply 100 pounds per square inch by 2 square inches.",
      "The cylinder produces 200 pounds-force.",
      "The area units cancel the square inches in PSI, leaving 200 pounds of force."
    ),
    choice(
      "m-pulley-speed", 2, "Mechanical Systems", "Find the Driven Pulley Speed",
      "A 2-inch motor pulley turns at 900 RPM and drives a 6-inch pulley with no slip. How fast does the driven pulley turn?",
      ["150 RPM", "300 RPM", "900 RPM", "2,700 RPM"], "300 RPM",
      "Pulley speed is inversely proportional to diameter.",
      "Multiply 900 by 2 divided by 6.",
      "The driven pulley turns at 300 RPM.",
      "The driven pulley is three times the diameter, so it turns at one-third the speed."
    ),

    memory(
      "r-service-pump", 2, "Service Pump Briefing",
      ["The service pump runs on 24 volts.", "A 10-amp fuse protects its wiring.", "A green lamp means the disconnect is closed."],
      "What size fuse protects the service pump?",
      ["5 amps", "10 amps", "20 amps"], "10 amps",
      "Recall the number attached to the protective device, not the supply voltage.",
      "The briefing specified a 10-amp fuse.",
      "The service-pump fuse is 10 amps.",
      "The pump uses 24 volts, while its protective fuse is rated at 10 amps."
    ),
    memory(
      "r-flange-pattern", 2, "Flange-Bolt Briefing",
      ["The flange has bolts A, B, C, and D.", "The tightening order is A, C, B, D.", "Final torque is 20 newton-meters."],
      "Which bolt comes immediately after bolt A?",
      ["Bolt B", "Bolt C", "Bolt D"], "Bolt C",
      "The pattern crosses the flange before moving to the next bolt.",
      "The sequence begins A, then C.",
      "Bolt C comes immediately after A.",
      "The stated sequence is A, C, B, D."
    ),
    memory(
      "r-battery-arrangement", 2, "Battery Arrangement Briefing",
      ["Two 12-volt batteries in series provide 24 volts.", "In parallel, they remain at 12 volts but offer more reserve time.", "The training pump requires 24 volts."],
      "How should the batteries be connected for the training pump?",
      ["In series", "In parallel", "Use only one"], "In series",
      "The pump needs twice the voltage of one battery.",
      "Two 12-volt batteries in series supply 24 volts.",
      "The batteries should be connected in series.",
      "A series connection adds the two battery voltages to meet the 24-volt requirement."
    ),
    memory(
      "r-reduction-gears", 2, "Reduction-Gear Briefing",
      ["A 12-tooth driving gear turns a 36-tooth driven gear.", "The driven gear makes one turn for every three driving turns.", "The driving shaft makes six turns."],
      "How many turns does the driven gear make?",
      ["2 turns", "3 turns", "18 turns"], "2 turns",
      "Divide the six driving turns into groups of three.",
      "Six divided by three equals two.",
      "The driven gear makes two turns.",
      "The three-to-one reduction converts six driving turns into two output turns."
    ),
    memory(
      "r-cooling-limits", 2, "Cooling-Limit Briefing",
      ["The cooling fan starts at 85°C.", "A warning light comes on at 95°C.", "The gauge currently reads 90°C."],
      "What should be happening at 90°C?",
      ["Fan running; no warning light", "Warning on; fan off", "Both are off"], "Fan running; no warning light",
      "Ninety is above one setting and below the other.",
      "The fan threshold is 85°C; the warning threshold is 95°C.",
      "The fan should be running without the warning light.",
      "At 90°C, the fan threshold has been crossed but the warning threshold has not."
    ),
    memory(
      "r-hydraulic-diagnosis", 3, "Hydraulic Diagnostic Briefing",
      ["Low fluid with falling pressure suggests an external leak.", "Normal fluid with low pressure suggests a worn pump.", "A restricted return filter causes sluggish return flow."],
      "The reservoir is full, but system pressure is low. What is the most likely cause?",
      ["A worn pump", "An external leak", "Too much fluid"], "A worn pump",
      "The fluid level rules out the condition associated with an external leak.",
      "Normal fluid and low pressure match the worn-pump condition.",
      "A worn pump best fits the evidence.",
      "The briefing links normal fluid level plus weak pressure to pump wear."
    ),
    memory(
      "r-relay-troubleshooting", 3, "Relay Diagnostic Briefing",
      ["Pressing START energizes a relay coil.", "A click means the coil moved the contacts.", "Healthy contacts then send voltage to the motor.", "The relay clicks, but no voltage reaches the motor."],
      "Which part should be inspected first?",
      ["Relay contacts", "START button", "Relay coil"], "Relay contacts",
      "The click shows that the button and coil already did their jobs.",
      "The contacts moved but did not pass voltage onward.",
      "Inspect the relay contacts first.",
      "The coil operates, but the power path does not close, pointing to the contacts."
    ),
    memory(
      "r-trim-balance", 2, "Trim-Balance Briefing",
      ["Adding weight forward lowers the bow.", "Adding weight aft lowers the stern.", "Adding equal weight to both ends lowers the training model level."],
      "The model's bow is riding too high. Where should a small weight be added?",
      ["Forward", "Aft", "Equally at both ends"], "Forward",
      "Choose the end that needs to settle lower.",
      "Add the small weight at the bow.",
      "The small weight belongs forward.",
      "Adding weight at the high end lowers that end and corrects the trim."
    ),
    memory(
      "r-filter-procedure", 3, "Filter-Service Briefing",
      ["First, isolate electrical power.", "Second, close the supply.", "Third, position the catch tray.", "Fourth, loosen the filter."],
      "What is the third step?",
      ["Position the catch tray", "Loosen the filter", "Close the supply"], "Position the catch tray",
      "It comes after closing the supply and before loosening anything.",
      "The third step is positioning the catch tray.",
      "Position the catch tray third.",
      "The tray is made ready before the filter is loosened."
    ),
    memory(
      "r-thermal-expansion", 3, "Thermal-Expansion Briefing",
      ["A steel rod is one meter long.", "It expands 0.012 millimeter for each 1°C rise.", "Its temperature rises by 50°C."],
      "Approximately how much longer does the rod become?",
      ["0.6 millimeter", "6 millimeters", "60 millimeters"], "0.6 millimeter",
      "Multiply 0.012 by 50.",
      "Twelve thousandths times fifty equals six tenths.",
      "The rod grows about 0.6 millimeter.",
      "Multiplying the expansion rate by the 50-degree change gives 0.6 millimeter."
    ),
    memory(
      "r-series-resistance", 3, "Series-Circuit Briefing",
      ["Two 6-ohm resistors are connected in series.", "Their total resistance is 12 ohms.", "The supply is 12 volts.", "Current equals voltage divided by resistance."],
      "How much current flows?",
      ["1 amp", "2 amps", "12 amps"], "1 amp",
      "Divide 12 volts by 12 ohms.",
      "Twelve divided by twelve equals one.",
      "The circuit current is 1 amp.",
      "Using I equals V divided by R, 12 volts divided by 12 ohms equals 1 amp."
    ),
    memory(
      "r-breaker-trip", 3, "Breaker-Trip Briefing",
      ["An immediate startup trip can indicate a short circuit.", "A trip after operating under load can indicate a bind or overload.", "A running motor with a stationary output can indicate a failed coupling."],
      "A pump starts normally, works for four minutes, and then trips. What best matches the evidence?",
      ["Mechanical bind or overload", "Startup short circuit", "Failed coupling"], "Mechanical bind or overload",
      "The important detail is that the pump operates for several minutes first.",
      "A delayed trip under load matches a bind or overload.",
      "A mechanical bind or overload best fits.",
      "The delayed trip does not match an immediate short, and a failed coupling would leave the motor running."
    )
  ];
})();

