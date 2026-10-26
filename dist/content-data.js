(function () {
  "use strict";

  // Kenny's Workshop content is designed for respectful, low-pressure play.
  // Submarine material stays at a public, historical, high-level engineering scope.
  window.KW_DATA = {
    version: "1.0.0",
    updated: "2026-10-25",
    contentGuidance: {
      tone: "Adult, capable, encouraging, and never childish.",
      quizInstruction: "Choose the answer that fits best. Take your time, use a hint, or skip any question.",
      reminiscenceInstruction: "There are no wrong answers here. Share as much or as little as you like.",
      safetyNote: "Submarine content is limited to public history and broad engineering concepts; it contains no combat or emergency procedures."
    },

    questions: [
      {
        id: "mechanics-01",
        category: "mechanics",
        topic: "Hand tools",
        question: "A stubborn hex-head bolt must be loosened without rounding its corners. Which tool gives the best grip?",
        choices: ["Open-end wrench", "Six-point socket", "Adjustable pliers", "Flat screwdriver"],
        answer: "Six-point socket",
        answerIndex: 1,
        hint: "Look for the tool that contacts all six flat sides of the bolt head.",
        explanation: "A correctly sized six-point socket spreads force across the flats and is less likely to round the corners than an open-end wrench or pliers.",
        difficulty: "easy"
      },
      {
        id: "mechanics-02",
        category: "mechanics",
        topic: "Torque",
        question: "A two-foot breaker bar is held at a right angle to a bolt. About how much force at the handle produces 60 pound-feet of torque?",
        choices: ["15 pounds", "30 pounds", "60 pounds", "120 pounds"],
        answer: "30 pounds",
        answerIndex: 1,
        hint: "Torque equals force multiplied by the lever-arm length.",
        explanation: "Sixty pound-feet divided by a two-foot lever arm equals 30 pounds of force, assuming the force is applied at 90 degrees.",
        difficulty: "medium"
      },
      {
        id: "mechanics-03",
        category: "mechanics",
        topic: "Gear ratios",
        question: "A 12-tooth driving gear turns at 900 RPM and drives a 36-tooth gear. Ignoring losses, how fast does the larger gear turn?",
        choices: ["300 RPM", "600 RPM", "900 RPM", "2,700 RPM"],
        answer: "300 RPM",
        answerIndex: 0,
        hint: "The driven gear has three times as many teeth as the driving gear.",
        explanation: "The 36-tooth gear turns at one-third the speed of the 12-tooth gear: 900 times 12 divided by 36 equals 300 RPM.",
        difficulty: "medium"
      },
      {
        id: "mechanics-04",
        category: "mechanics",
        topic: "Bearings",
        question: "A rolling-element bearing begins running hotter just after its housing was packed completely full of grease. Load and alignment are unchanged. What is the likeliest cause?",
        choices: ["The shaft became lighter", "Excess grease is churning", "The bearing needs water cooling", "The motor is turning too slowly"],
        answer: "Excess grease is churning",
        answerIndex: 1,
        hint: "More lubricant is not always better when moving parts need room to shed it.",
        explanation: "An overfilled housing can make the rolling elements churn through grease, increasing drag and heat.",
        difficulty: "medium"
      },
      {
        id: "mechanics-05",
        category: "mechanics",
        topic: "Hydraulics",
        question: "A hydraulic input piston has an area of 2 square inches and the output piston has an area of 10 square inches. An ideal 40-pound input produces what output force?",
        choices: ["8 pounds", "40 pounds", "200 pounds", "400 pounds"],
        answer: "200 pounds",
        answerIndex: 2,
        hint: "The output piston has five times the area of the input piston.",
        explanation: "Pressure is shared through the fluid. A five-to-one area ratio multiplies 40 pounds into an ideal 200-pound output.",
        difficulty: "medium"
      },
      {
        id: "mechanics-06",
        category: "mechanics",
        topic: "Precision measurement",
        question: "Which tool is best for checking a small clearance between a rocker arm and valve stem?",
        choices: ["Feeler gauge", "Tape measure", "Pipe wrench", "Center punch"],
        answer: "Feeler gauge",
        answerIndex: 0,
        hint: "The tool uses thin leaves of known thickness.",
        explanation: "A feeler gauge measures narrow gaps by inserting a precisely marked leaf until the correct light drag is felt.",
        difficulty: "easy"
      },
      {
        id: "mechanics-07",
        category: "mechanics",
        topic: "Precision measurement",
        question: "A shaft must be checked to the nearest one-thousandth of an inch. Which common shop instrument is most suitable?",
        choices: ["Framing square", "Outside micrometer", "Steel rule", "Spirit level"],
        answer: "Outside micrometer",
        answerIndex: 1,
        hint: "Choose the instrument made to measure outside diameters very precisely.",
        explanation: "An outside micrometer is designed for precise diameter and thickness measurements, commonly to 0.001 inch or finer.",
        difficulty: "easy"
      },
      {
        id: "mechanics-08",
        category: "mechanics",
        topic: "Four-stroke engines",
        question: "What is the normal order of events in a four-stroke engine cylinder?",
        choices: ["Power, exhaust, intake, compression", "Intake, compression, power, exhaust", "Compression, intake, exhaust, power", "Intake, power, compression, exhaust"],
        answer: "Intake, compression, power, exhaust",
        answerIndex: 1,
        hint: "The fresh charge enters first and spent gas leaves last.",
        explanation: "The piston draws in the charge, compresses it, receives the power stroke after ignition, and then pushes out the exhaust.",
        difficulty: "easy"
      },
      {
        id: "mechanics-09",
        category: "mechanics",
        topic: "Belt drives",
        question: "A V-belt squeals mainly when a driven machine starts, and inspection shows the belt is glazed and loose. What best explains the symptom?",
        choices: ["The belt is slipping under high starting load", "The pulleys are turning too slowly to make noise", "The belt has gained too much traction", "The driven shaft is perfectly aligned"],
        answer: "The belt is slipping under high starting load",
        answerIndex: 0,
        hint: "Starting usually requires more torque than steady running.",
        explanation: "A loose, glazed belt has reduced grip, so the high torque needed at startup makes it slip and squeal.",
        difficulty: "medium"
      },
      {
        id: "mechanics-10",
        category: "mechanics",
        topic: "Electrical basics",
        question: "A 12-volt source is connected across a 6-ohm test resistor. What current should flow in the ideal circuit?",
        choices: ["0.5 amp", "2 amps", "6 amps", "72 amps"],
        answer: "2 amps",
        answerIndex: 1,
        hint: "Use Ohm's law: current equals voltage divided by resistance.",
        explanation: "Twelve volts divided by 6 ohms equals 2 amperes.",
        difficulty: "medium"
      },
      {
        id: "mechanics-11",
        category: "mechanics",
        topic: "Fasteners",
        question: "Why are critical fasteners commonly tightened in stages and in a crossing pattern?",
        choices: ["To distribute clamping force more evenly", "To make every bolt a different length", "To reduce the number of threads", "To magnetize the fasteners"],
        answer: "To distribute clamping force more evenly",
        answerIndex: 0,
        hint: "Think about keeping a cover or flange flat as it seats.",
        explanation: "Gradual tightening in a crossing pattern helps seat the part evenly and reduces distortion from uneven clamping force.",
        difficulty: "medium"
      },
      {
        id: "mechanics-12",
        category: "mechanics",
        topic: "Troubleshooting",
        question: "A machine's vibration rises at exactly one times shaft speed after a replacement coupling is installed. Which condition is most worth checking first?",
        choices: ["Shaft alignment", "Paint color", "Nameplate spelling", "Room lighting"],
        answer: "Shaft alignment",
        answerIndex: 0,
        hint: "The symptom began after two rotating shafts were reconnected.",
        explanation: "Coupling misalignment commonly produces strong vibration related to shaft speed, so alignment is a sensible first diagnostic check.",
        difficulty: "challenge"
      },

      {
        id: "submarine-01",
        category: "submarines",
        topic: "Public history",
        question: "Which U.S. submarine became the world's first operational nuclear-powered submarine?",
        choices: ["USS Nautilus", "USS Constitution", "USS Monitor", "USS Arizona"],
        answer: "USS Nautilus",
        answerIndex: 0,
        hint: "Its name honors both an earlier submarine and the vessel in Jules Verne's fiction.",
        explanation: "USS Nautilus, SSN-571, was commissioned in 1954 and first got underway on nuclear power in January 1955.",
        difficulty: "easy"
      },
      {
        id: "submarine-02",
        category: "submarines",
        topic: "Public history",
        question: "What historic Arctic achievement did USS Nautilus complete in 1958?",
        choices: ["The first submerged voyage beneath the North Pole", "The first trip through the Panama Canal", "The first landing on an ice shelf", "The first solar-powered crossing"],
        answer: "The first submerged voyage beneath the North Pole",
        answerIndex: 0,
        hint: "The journey demonstrated the endurance and range of nuclear propulsion under polar ice.",
        explanation: "In August 1958, Nautilus completed the first submerged transit beneath the geographic North Pole.",
        difficulty: "medium"
      },
      {
        id: "submarine-03",
        category: "submarines",
        topic: "Energy conversion",
        question: "At a high level, what does heat from a naval nuclear reactor ultimately help produce for propulsion?",
        choices: ["Steam", "Gasoline", "Compressed coal", "Sail pressure"],
        answer: "Steam",
        answerIndex: 0,
        hint: "The heat is used in a controlled power cycle similar in broad principle to other steam plants.",
        explanation: "Reactor heat supports steam production, and the steam drives machinery that provides propulsion and electrical power. This is a broad public description, not an operating procedure.",
        difficulty: "easy"
      },
      {
        id: "submarine-04",
        category: "submarines",
        topic: "Buoyancy",
        question: "Which statement best describes the broad purpose of main ballast tanks on a submarine?",
        choices: ["They change the vessel's overall buoyancy", "They tune radio stations", "They store engine tools only", "They measure shaft speed"],
        answer: "They change the vessel's overall buoyancy",
        answerIndex: 0,
        hint: "Their job is connected with whether the boat is more or less buoyant.",
        explanation: "At a high level, ballast tanks help change overall buoyancy by managing water and air. Detailed operating steps are intentionally outside this game.",
        difficulty: "easy"
      },
      {
        id: "submarine-05",
        category: "submarines",
        topic: "Structures",
        question: "What is the primary job of a submarine's pressure hull?",
        choices: ["Maintain a habitable internal space against sea pressure", "Act as a decorative outer cover", "Amplify music in the crew's mess", "Hold the vessel's paint"],
        answer: "Maintain a habitable internal space against sea pressure",
        answerIndex: 0,
        hint: "Its name points to the load it must withstand.",
        explanation: "The pressure hull is the strong watertight structure that resists surrounding sea pressure and protects the occupied interior.",
        difficulty: "easy"
      },
      {
        id: "submarine-06",
        category: "submarines",
        topic: "Sonar concepts",
        question: "A passive sonar system primarily does what?",
        choices: ["Listens for sound already in the water", "Shines a bright beam through the water", "Measures only air temperature", "Changes the boat's paint color"],
        answer: "Listens for sound already in the water",
        answerIndex: 0,
        hint: "Passive equipment receives rather than transmits.",
        explanation: "Passive sonar uses underwater sound sensors to receive acoustic energy without sending out a pulse.",
        difficulty: "medium"
      },
      {
        id: "submarine-07",
        category: "submarines",
        topic: "Sound-powered communications",
        question: "Why were sound-powered telephones valued aboard ships and submarines?",
        choices: ["They can carry voice without an external electrical supply", "They automatically translate every language", "They work only outdoors", "They make machinery run faster"],
        answer: "They can carry voice without an external electrical supply",
        answerIndex: 0,
        hint: "The speaker's voice helps create the small signal.",
        explanation: "Sound-powered phone sets convert voice energy into an electrical signal and back, allowing basic communication without a separate powered amplifier.",
        difficulty: "medium"
      },
      {
        id: "submarine-08",
        category: "submarines",
        topic: "Engineering watchstanding",
        question: "Why is a careful machinery log useful during an engineering watch?",
        choices: ["It reveals trends that a single reading may miss", "It makes gauges unnecessary", "It guarantees that parts never wear", "It replaces all inspections"],
        answer: "It reveals trends that a single reading may miss",
        answerIndex: 0,
        hint: "Several ordinary readings can tell a story when compared over time.",
        explanation: "Consistent logs let an engineer compare temperatures, pressures, vibration, and other readings to notice gradual changes before they become obvious.",
        difficulty: "medium"
      },
      {
        id: "submarine-09",
        category: "submarines",
        topic: "Human factors",
        question: "What is the main engineering value of a formal watch turnover between two qualified crew members?",
        choices: ["Preserve shared situational awareness", "Avoid writing anything down", "Shorten every maintenance job", "Change the vessel's buoyancy"],
        answer: "Preserve shared situational awareness",
        answerIndex: 0,
        hint: "The oncoming watch needs to understand equipment status and recent trends.",
        explanation: "A structured turnover transfers current status, noteworthy changes, and ongoing work so the next watch begins with an accurate picture.",
        difficulty: "medium"
      },
      {
        id: "submarine-10",
        category: "submarines",
        topic: "Reliability engineering",
        question: "In engineering, what does redundancy mean?",
        choices: ["Providing another path or component for an important function", "Removing every backup", "Painting two labels on one switch", "Running all equipment at maximum speed"],
        answer: "Providing another path or component for an important function",
        answerIndex: 0,
        hint: "Think of a backup that reduces dependence on one single item.",
        explanation: "Redundancy uses alternate equipment or paths so one failure does not automatically remove an important function.",
        difficulty: "easy"
      },
      {
        id: "submarine-11",
        category: "submarines",
        topic: "Public history",
        question: "Which U.S. nuclear submarine completed the first submerged circumnavigation of the world in 1960?",
        choices: ["USS Triton", "USS Nautilus", "USS Holland", "USS Turtle"],
        answer: "USS Triton",
        answerIndex: 0,
        hint: "Its name comes from a figure of the sea in Greek mythology.",
        explanation: "USS Triton, SSRN-586, completed the first submerged voyage around the world in 1960.",
        difficulty: "challenge"
      },
      {
        id: "submarine-12",
        category: "submarines",
        topic: "Instrumentation",
        question: "Two independent temperature indicators disagree while the machinery sounds and loads remain steady. What is the strongest first engineering conclusion?",
        choices: ["The disagreement must be resolved before trusting either indication", "The higher reading is always correct", "The lower reading is always correct", "Both instruments should be ignored permanently"],
        answer: "The disagreement must be resolved before trusting either indication",
        answerIndex: 0,
        hint: "Conflicting instruments are evidence, but not yet a diagnosis.",
        explanation: "A careful engineer compares related indications and checks instrument health before deciding whether the machine or one sensing path has changed.",
        difficulty: "challenge"
      },

      {
        id: "racecars-01",
        category: "race-cars",
        topic: "Cornering",
        question: "On a typical racing line, what is the apex of a corner?",
        choices: ["The point where the car runs closest to the inside of the turn", "The highest part of the grandstand", "The final lap of the race", "The center of the pit lane"],
        answer: "The point where the car runs closest to the inside of the turn",
        answerIndex: 0,
        hint: "It is a geometric point on the path through a bend.",
        explanation: "The apex is the inside point of the chosen line through a corner. Its location affects entry, rotation, and exit.",
        difficulty: "easy"
      },
      {
        id: "racecars-02",
        category: "race-cars",
        topic: "Aerodynamics",
        question: "What is the main purpose of aerodynamic downforce on a race car?",
        choices: ["Increase tire grip without adding the same amount of vehicle mass", "Make the fuel colder", "Reduce the number of gears", "Keep the driver seat soft"],
        answer: "Increase tire grip without adding the same amount of vehicle mass",
        answerIndex: 0,
        hint: "Airflow can press the car toward the track.",
        explanation: "Downforce increases the vertical load on the tires as speed rises, which can improve cornering and braking grip, though it usually brings drag.",
        difficulty: "medium"
      },
      {
        id: "racecars-03",
        category: "race-cars",
        topic: "Drafting",
        question: "Why can a race car sometimes use less power to follow closely in another car's wake on a straight?",
        choices: ["The leading car has disturbed the air and reduced some drag behind it", "The following car becomes lighter", "The track becomes shorter", "The engine gains extra cylinders"],
        answer: "The leading car has disturbed the air and reduced some drag behind it",
        answerIndex: 0,
        hint: "The effect is often called drafting or slipstreaming.",
        explanation: "The wake behind the leading car can reduce aerodynamic resistance for the following car, though the effect depends on vehicle and track conditions.",
        difficulty: "medium"
      },
      {
        id: "racecars-04",
        category: "race-cars",
        topic: "Instruments",
        question: "What does a tachometer show a race driver?",
        choices: ["Engine speed in revolutions per minute", "Fuel color", "Tire diameter in inches", "Distance to the grandstand"],
        answer: "Engine speed in revolutions per minute",
        answerIndex: 0,
        hint: "Its usual scale is marked RPM.",
        explanation: "A tachometer reports engine speed, helping the driver judge the useful power range and choose shift points.",
        difficulty: "easy"
      },
      {
        id: "racecars-05",
        category: "race-cars",
        topic: "Differentials",
        question: "Why does a race car need a differential between its driven wheels?",
        choices: ["The inside and outside wheels travel different distances in a turn", "Both wheels must always rotate backward", "It replaces the brakes", "It increases tire diameter"],
        answer: "The inside and outside wheels travel different distances in a turn",
        answerIndex: 0,
        hint: "The outside wheel follows the longer arc.",
        explanation: "A differential allows left and right driven wheels to rotate at different speeds while still receiving torque.",
        difficulty: "medium"
      },
      {
        id: "racecars-06",
        category: "race-cars",
        topic: "Vehicle balance",
        question: "A car turns less than the driver requests and tends to run wide at the front. What is that behavior called?",
        choices: ["Understeer", "Oversteer", "Wheel hop", "Drafting"],
        answer: "Understeer",
        answerIndex: 0,
        hint: "The front tires have reached their useful grip before the rear tires.",
        explanation: "Understeer means the car follows a wider path than intended because the front tires have less cornering grip than required.",
        difficulty: "medium"
      },
      {
        id: "racecars-07",
        category: "race-cars",
        topic: "Vehicle balance",
        question: "A car's rear rotates outward more than the driver requests in a turn. What is that behavior called?",
        choices: ["Oversteer", "Understeer", "Hydroplaning only", "Compression braking"],
        answer: "Oversteer",
        answerIndex: 0,
        hint: "The rear tires have less cornering grip than the front tires.",
        explanation: "Oversteer is a condition in which the rear of the car rotates more than intended, tightening the vehicle's path.",
        difficulty: "medium"
      },
      {
        id: "racecars-08",
        category: "race-cars",
        topic: "Weight transfer",
        question: "During hard braking on level pavement, where does load generally transfer?",
        choices: ["Toward the front tires", "Toward the rear tires", "Equally upward from all tires", "Only to the left tires"],
        answer: "Toward the front tires",
        answerIndex: 0,
        hint: "Think about why the nose of a car tends to dip under braking.",
        explanation: "Deceleration transfers load forward, increasing front-tire loading and reducing rear-tire loading even though the car's total mass is unchanged.",
        difficulty: "easy"
      },
      {
        id: "racecars-09",
        category: "race-cars",
        topic: "Suspension",
        question: "Why do designers often try to reduce unsprung mass at each wheel?",
        choices: ["It helps the tire follow bumps with less inertia", "It makes the steering wheel larger", "It raises the roof", "It eliminates the need for springs"],
        answer: "It helps the tire follow bumps with less inertia",
        answerIndex: 0,
        hint: "Unsprung parts include much of the wheel, tire, hub, and brake assembly.",
        explanation: "Lower unsprung mass lets the suspension control wheel movement more readily, helping the tire maintain contact over uneven surfaces.",
        difficulty: "challenge"
      },
      {
        id: "racecars-10",
        category: "race-cars",
        topic: "Alignment",
        question: "What does negative camber mean when viewing a wheel from the front of the car?",
        choices: ["The top of the wheel leans inward", "The top of the wheel leans outward", "The wheel points straight ahead", "The axle rotates backward"],
        answer: "The top of the wheel leans inward",
        answerIndex: 0,
        hint: "Picture the two wheel tops moving slightly closer together.",
        explanation: "Negative camber means the top of the tire tilts toward the vehicle centerline. Race setups may use it to manage the contact patch in corners.",
        difficulty: "challenge"
      },
      {
        id: "racecars-11",
        category: "race-cars",
        topic: "Endurance racing",
        question: "The famous 24 Hours of Le Mans is best known as what kind of event?",
        choices: ["An endurance race", "A one-lap hill climb", "A motorcycle-only trial", "A drag race lasting ten seconds"],
        answer: "An endurance race",
        answerIndex: 0,
        hint: "Its name tells you the length of the contest.",
        explanation: "Le Mans tests speed, reliability, teamwork, and driver changes over a full 24-hour race.",
        difficulty: "easy"
      },
      {
        id: "racecars-12",
        category: "race-cars",
        topic: "Tire engineering",
        question: "A racing tire's pressure rises after several fast laps. What is the main physical reason?",
        choices: ["The tire and enclosed gas heat up", "The wheel creates new air", "The track adds metal to the rim", "The tire becomes hollow"],
        answer: "The tire and enclosed gas heat up",
        answerIndex: 0,
        hint: "Gas pressure changes with temperature when volume is constrained.",
        explanation: "Friction and repeated flexing warm the tire and its contained gas. As temperature rises, pressure generally rises as well.",
        difficulty: "medium"
      },

      {
        id: "motorcycles-01",
        category: "motorcycles",
        topic: "Controls",
        question: "On a conventional manual motorcycle, which control normally disconnects engine power for shifting?",
        choices: ["Clutch lever", "Horn button", "Turn-signal switch", "Trip odometer"],
        answer: "Clutch lever",
        answerIndex: 0,
        hint: "It is usually operated by the left hand.",
        explanation: "The clutch lever separates engine power from the transmission long enough to select a gear smoothly.",
        difficulty: "easy"
      },
      {
        id: "motorcycles-02",
        category: "motorcycles",
        topic: "Final drive",
        question: "Which motorcycle final-drive system typically needs periodic cleaning, lubrication, and slack checks?",
        choices: ["Chain drive", "Shaft drive", "Direct jet drive", "Flywheel-only drive"],
        answer: "Chain drive",
        answerIndex: 0,
        hint: "It runs around toothed sprockets.",
        explanation: "A chain final drive is exposed and articulates around sprockets, so condition, lubrication, and correct slack matter.",
        difficulty: "easy"
      },
      {
        id: "motorcycles-03",
        category: "motorcycles",
        topic: "Engine layouts",
        question: "What describes a boxer-twin motorcycle engine?",
        choices: ["Two cylinders oppose each other horizontally", "Two cylinders are stacked in one vertical bore", "It has no pistons", "Both cylinders are inside the rear wheel"],
        answer: "Two cylinders oppose each other horizontally",
        answerIndex: 0,
        hint: "The pistons move outward on opposite sides of the crankcase.",
        explanation: "In a boxer twin, two horizontal cylinders sit opposite each other, creating the familiar flat-twin layout.",
        difficulty: "medium"
      },
      {
        id: "motorcycles-04",
        category: "motorcycles",
        topic: "Cooling",
        question: "Why do many classic air-cooled motorcycle cylinders have prominent metal fins?",
        choices: ["To increase surface area for heat transfer", "To store extra fuel", "To change the gear ratio", "To amplify the horn"],
        answer: "To increase surface area for heat transfer",
        answerIndex: 0,
        hint: "More exposed metal can pass more heat to moving air.",
        explanation: "Cooling fins increase surface area, letting heat move from the cylinder and head into the surrounding airflow.",
        difficulty: "easy"
      },
      {
        id: "motorcycles-05",
        category: "motorcycles",
        topic: "Suspension",
        question: "What is the main job of a motorcycle's telescopic front fork?",
        choices: ["Guide the front wheel and absorb road movement", "Mix fuel in the carburetor", "Drive the rear wheel", "Measure engine oil"],
        answer: "Guide the front wheel and absorb road movement",
        answerIndex: 0,
        hint: "It connects the front wheel to the steering head while allowing controlled vertical movement.",
        explanation: "The fork steers and locates the front wheel while its spring and damping elements manage bumps and weight transfer.",
        difficulty: "easy"
      },
      {
        id: "motorcycles-06",
        category: "motorcycles",
        topic: "Countersteering",
        question: "Above walking speed, what brief steering input initiates a motorcycle lean to the right?",
        choices: ["A gentle forward pressure on the right handlebar", "A hard pull on both brake levers", "Turning the ignition key off", "Pressing the left footpeg only"],
        answer: "A gentle forward pressure on the right handlebar",
        answerIndex: 0,
        hint: "Riders often remember it as press right to go right.",
        explanation: "A brief right-bar input steers the front contact patch left relative to the mass, initiating a lean to the right. This is a physics question, not riding instruction; real riding requires qualified training.",
        difficulty: "challenge"
      },
      {
        id: "motorcycles-07",
        category: "motorcycles",
        topic: "Public history",
        question: "Which influential four-cylinder motorcycle did Honda introduce in 1969?",
        choices: ["CB750", "Super Cub C100", "Gold Wing GL1800", "NR750"],
        answer: "CB750",
        answerIndex: 0,
        hint: "Its model name includes its approximate engine capacity.",
        explanation: "The 1969 Honda CB750 helped popularize the transverse inline-four, front disc brake, and electric starting in a widely available large motorcycle.",
        difficulty: "medium"
      },
      {
        id: "motorcycles-08",
        category: "motorcycles",
        topic: "Brakes",
        question: "Compared with many drum brakes, what is a common advantage of a disc brake?",
        choices: ["Better heat shedding and wet-weather recovery", "It never wears", "It requires no friction", "It makes the wheel weightless"],
        answer: "Better heat shedding and wet-weather recovery",
        answerIndex: 0,
        hint: "The rotor is exposed to moving air.",
        explanation: "An exposed disc can release heat and water effectively, helping braking remain more consistent under repeated use and changing weather.",
        difficulty: "medium"
      },
      {
        id: "motorcycles-09",
        category: "motorcycles",
        topic: "Electrical systems",
        question: "What component keeps a motorcycle battery from being overcharged as engine speed changes?",
        choices: ["Voltage regulator", "Kickstand spring", "Throttle cable", "Wheel bearing"],
        answer: "Voltage regulator",
        answerIndex: 0,
        hint: "It controls the charging-system voltage.",
        explanation: "The regulator keeps charging voltage within a useful range despite changes in generator output and electrical load.",
        difficulty: "medium"
      },
      {
        id: "motorcycles-10",
        category: "motorcycles",
        topic: "Frames",
        question: "Why is torsional stiffness important in a motorcycle frame?",
        choices: ["It helps maintain predictable wheel alignment under load", "It makes gasoline more powerful", "It removes the need for tires", "It changes engine displacement"],
        answer: "It helps maintain predictable wheel alignment under load",
        answerIndex: 0,
        hint: "Consider how the steering head and swingarm relate when the chassis twists.",
        explanation: "Adequate torsional stiffness limits unwanted twisting between the steering head and rear suspension, supporting consistent handling.",
        difficulty: "challenge"
      },
      {
        id: "motorcycles-11",
        category: "motorcycles",
        topic: "Two-stroke engines",
        question: "Why can a two-stroke engine produce a power stroke more often than a four-stroke engine at the same crankshaft speed?",
        choices: ["It completes a cycle in one crankshaft revolution", "It has no moving parts", "Its piston never changes direction", "It always has twice as many cylinders"],
        answer: "It completes a cycle in one crankshaft revolution",
        answerIndex: 0,
        hint: "Compare one revolution with two revolutions per complete cycle.",
        explanation: "A two-stroke completes its cycle in one crankshaft revolution, while a four-stroke cylinder produces one power stroke every two revolutions.",
        difficulty: "medium"
      },
      {
        id: "motorcycles-12",
        category: "motorcycles",
        topic: "Tires",
        question: "Why is tire pressure normally checked when the motorcycle's tires are cold?",
        choices: ["Heat from riding temporarily raises pressure", "Cold rubber has no air", "A warm gauge reads tire tread depth", "The valve stem closes when warm"],
        answer: "Heat from riding temporarily raises pressure",
        answerIndex: 0,
        hint: "The air inside warms as the tire flexes and rolls.",
        explanation: "Tire pressure rises with operating temperature, so a cold reading gives a consistent baseline for comparison with the manufacturer's recommendation.",
        difficulty: "easy"
      },

      {
        id: "music-01",
        category: "music-culture",
        topic: "Record formats",
        question: "At what speed does a standard long-playing vinyl album usually rotate?",
        choices: ["16 RPM", "33 1/3 RPM", "45 RPM", "78 RPM"],
        answer: "33 1/3 RPM",
        answerIndex: 1,
        hint: "It turns more slowly than a typical seven-inch single.",
        explanation: "The LP format normally runs at 33 1/3 revolutions per minute, allowing a longer playing time per side.",
        difficulty: "easy"
      },
      {
        id: "music-02",
        category: "music-culture",
        topic: "Record formats",
        question: "What speed was most commonly associated with a seven-inch pop single in the 1960s and 1970s?",
        choices: ["33 1/3 RPM", "45 RPM", "60 RPM", "100 RPM"],
        answer: "45 RPM",
        answerIndex: 1,
        hint: "People often called the record by its speed.",
        explanation: "Seven-inch singles were commonly played at 45 RPM and often carried one featured song on each side.",
        difficulty: "easy"
      },
      {
        id: "music-03",
        category: "music-culture",
        topic: "American music history",
        question: "Which U.S. city is most closely associated with the rise of Motown Records?",
        choices: ["Detroit", "Seattle", "Boston", "Phoenix"],
        answer: "Detroit",
        answerIndex: 0,
        hint: "The label's nickname played on the city's automotive identity.",
        explanation: "Berry Gordy founded Motown in Detroit, where the label developed a highly influential soul and pop sound.",
        difficulty: "easy"
      },
      {
        id: "music-04",
        category: "music-culture",
        topic: "American music history",
        question: "Stax Records and its influential soul sound are most closely associated with which city?",
        choices: ["Memphis", "Denver", "Portland", "Miami"],
        answer: "Memphis",
        answerIndex: 0,
        hint: "The studio stood in Tennessee, not far from the Mississippi River.",
        explanation: "Stax Records grew in Memphis and became central to Southern soul through its artists, musicians, and distinctive studio sound.",
        difficulty: "medium"
      },
      {
        id: "music-05",
        category: "music-culture",
        topic: "Festivals",
        question: "In what year did the Woodstock music festival take place?",
        choices: ["1963", "1969", "1974", "1979"],
        answer: "1969",
        answerIndex: 1,
        hint: "It happened near the end of the 1960s.",
        explanation: "The Woodstock festival took place in August 1969 in Bethel, New York, and became a defining cultural image of the era.",
        difficulty: "easy"
      },
      {
        id: "music-06",
        category: "music-culture",
        topic: "Listening technology",
        question: "What made the eight-track cartridge popular in many 1960s and 1970s cars?",
        choices: ["It offered portable prerecorded music with continuous cartridge playback", "It broadcast television pictures", "It repaired the car radio", "It stored engine oil"],
        answer: "It offered portable prerecorded music with continuous cartridge playback",
        answerIndex: 0,
        hint: "The format used magnetic tape in a loop inside a plastic cartridge.",
        explanation: "Eight-track cartridges were sturdy, easy to insert, and well suited to automotive players, making albums portable before compact cassettes took over.",
        difficulty: "medium"
      },
      {
        id: "music-07",
        category: "music-culture",
        topic: "Radio",
        question: "Why did FM radio become especially attractive to many music listeners during the 1960s and 1970s?",
        choices: ["It could offer higher-fidelity sound and stereo broadcasting", "It required no antenna at all", "It played only news", "It could not receive music"],
        answer: "It could offer higher-fidelity sound and stereo broadcasting",
        answerIndex: 0,
        hint: "Think about sound quality and two-channel listening.",
        explanation: "FM broadcasting offered lower noise and supported stereo, helping album-oriented and other music programming grow.",
        difficulty: "medium"
      },
      {
        id: "music-08",
        category: "music-culture",
        topic: "Studio craft",
        question: "What does multitrack recording allow musicians and engineers to do?",
        choices: ["Record parts separately and balance them later", "Make every instrument play the same note", "Remove all microphones", "Press a vinyl record without recording audio"],
        answer: "Record parts separately and balance them later",
        answerIndex: 0,
        hint: "Each part can occupy its own recorded track.",
        explanation: "Multitrack equipment lets a studio capture voices and instruments on separate tracks, then adjust and combine them during mixing.",
        difficulty: "medium"
      },
      {
        id: "music-09",
        category: "music-culture",
        topic: "Electronic instruments",
        question: "Which instrument became increasingly prominent in 1970s rock, funk, disco, and electronic music?",
        choices: ["Synthesizer", "Telegraph key", "Slide rule", "Steam whistle only"],
        answer: "Synthesizer",
        answerIndex: 0,
        hint: "It creates and shapes electrical audio signals.",
        explanation: "As synthesizers became more practical and available, musicians used them for new textures, bass lines, leads, and atmospheric sounds.",
        difficulty: "easy"
      },
      {
        id: "music-10",
        category: "music-culture",
        topic: "Space-age culture",
        question: "Which major event occurred in July 1969 and strongly influenced popular culture?",
        choices: ["The Apollo 11 Moon landing", "The first transcontinental railroad", "The opening of the Panama Canal", "The invention of the telegraph"],
        answer: "The Apollo 11 Moon landing",
        answerIndex: 0,
        hint: "Television audiences watched people reach another world.",
        explanation: "Apollo 11 landed people on the Moon in July 1969, inspiring art, music, design, engineering, and public imagination.",
        difficulty: "easy"
      },
      {
        id: "music-11",
        category: "music-culture",
        topic: "Portable electronics",
        question: "Why was the transistor radio culturally important in the 1960s?",
        choices: ["It let listeners carry music and news with them", "It required a room-sized vacuum system", "It played vinyl records directly", "It worked only inside a car"],
        answer: "It let listeners carry music and news with them",
        answerIndex: 0,
        hint: "Small solid-state electronics made personal listening more mobile.",
        explanation: "Compact battery-powered transistor radios gave people, especially young listeners, new freedom to hear broadcasts away from a household console.",
        difficulty: "medium"
      },
      {
        id: "music-12",
        category: "music-culture",
        topic: "Audio engineering",
        question: "On a stereo recording, what does panning control?",
        choices: ["Where a sound appears between the left and right channels", "How fast a turntable spins", "The thickness of a guitar string", "The radio station's call letters"],
        answer: "Where a sound appears between the left and right channels",
        answerIndex: 0,
        hint: "Imagine placing an instrument within a left-to-right soundstage.",
        explanation: "Panning distributes a recorded signal between the left and right channels, helping create width and separation in a stereo mix.",
        difficulty: "challenge"
      }
    ],

    conversationPrompts: [
      {
        id: "conversation-01",
        category: "workshop",
        title: "The Sound of a Good Shop",
        prompt: "When you picture a workshop you enjoyed, what sounds or smells come to mind first?",
        gentleCue: "Maybe a ratchet clicking, a motor idling, cut metal, warm oil, coffee, or something entirely different.",
        optionalFollowUp: "Was there a time of day when the shop felt especially alive?"
      },
      {
        id: "conversation-02",
        category: "workshop",
        title: "A Trusted Tool",
        prompt: "Was there a particular tool you always liked to reach for?",
        gentleCue: "It might have been reliable, well balanced, inherited, or simply familiar in your hand.",
        optionalFollowUp: "What made that tool better than the others?"
      },
      {
        id: "conversation-03",
        category: "engineering",
        title: "Learning the Trade",
        prompt: "Who taught you a practical skill that stayed with you?",
        gentleCue: "You might remember a family member, instructor, shipmate, coworker, or something you worked out yourself.",
        optionalFollowUp: "What was the lesson, and how did you pass it along?"
      },
      {
        id: "conversation-04",
        category: "engineering",
        title: "A Satisfying Diagnosis",
        prompt: "Do you remember solving a mechanical problem that had everyone puzzled?",
        gentleCue: "It is fine to start with just one clue: a noise, a gauge reading, a vibration, or a hunch.",
        optionalFollowUp: "What clue finally pointed you in the right direction?"
      },
      {
        id: "conversation-05",
        category: "submarines",
        title: "Teamwork Underway",
        prompt: "What do you remember about the way a good technical crew worked together?",
        gentleCue: "You could talk about trust, watch routines, humor, teaching, or the value of careful communication.",
        optionalFollowUp: "What made someone a dependable shipmate?"
      },
      {
        id: "conversation-06",
        category: "submarines",
        title: "Everyday Life at Sea",
        prompt: "What ordinary part of life aboard stands out most clearly today?",
        gentleCue: "A meal, a bunk, a watch schedule, a favorite conversation, or a quiet moment all count.",
        optionalFollowUp: "What detail would surprise someone who had never been aboard?"
      },
      {
        id: "conversation-07",
        category: "race-cars",
        title: "A Car Worth Remembering",
        prompt: "Which car made the strongest impression on you, whether you owned it or only admired it?",
        gentleCue: "Think about its shape, engine note, dashboard, color, or the way it felt on the road.",
        optionalFollowUp: "What would you check first if that car rolled into your workshop today?"
      },
      {
        id: "conversation-08",
        category: "motorcycles",
        title: "Two Wheels and the Open Road",
        prompt: "Is there a motorcycle, rider, or road trip you especially remember?",
        gentleCue: "You can begin with the machine, the route, the weather, or the people who were there.",
        optionalFollowUp: "What made that moment feel memorable?"
      },
      {
        id: "conversation-09",
        category: "music-culture",
        title: "A Record You Wore Out",
        prompt: "Was there an album or performer you returned to again and again in the 1960s or 1970s?",
        gentleCue: "You do not need to remember a title; a voice, instrument, feeling, or place is enough.",
        optionalFollowUp: "Where did you usually listen to it?"
      },
      {
        id: "conversation-10",
        category: "music-culture",
        title: "Music in the Car",
        prompt: "What music belongs with a memorable drive from your younger years?",
        gentleCue: "Maybe it came from AM radio, FM stereo, an eight-track, a cassette, or someone singing along.",
        optionalFollowUp: "What did the road or the car look like?"
      },
      {
        id: "conversation-11",
        category: "life-wisdom",
        title: "Built to Last",
        prompt: "What separates a machine that merely works from one that is truly well made?",
        gentleCue: "You might consider materials, tolerances, serviceability, simplicity, or the care of the builder.",
        optionalFollowUp: "Can you name something you used that was built especially well?"
      },
      {
        id: "conversation-12",
        category: "life-wisdom",
        title: "Advice at the Workbench",
        prompt: "What advice would you give a young mechanic or engineer starting out today?",
        gentleCue: "It could be about tools, patience, safety, teamwork, curiosity, or checking one's assumptions.",
        optionalFollowUp: "Who first gave you advice like that?"
      }
    ],

    stories: [
      {
        id: "story-01",
        category: "workshop",
        title: "The Patient Bolt",
        narration: "Sam found one last bolt holding a weathered pump cover in place. Instead of forcing it, he cleaned the threads, chose a snug six-point socket, and gave the penetrating oil time to work. When the bolt finally turned, the quiet click felt more satisfying than any loud victory.",
        estimatedSeconds: 24
      },
      {
        id: "story-02",
        category: "engineering",
        title: "A Reading in the Log",
        narration: "During an ordinary watch, Elena noticed that a bearing temperature was still acceptable but had climbed a little on each round. She compared the older entries, asked another technician to check her reading, and found a lubrication issue before the machine complained. The logbook had turned several small numbers into one clear story.",
        estimatedSeconds: 26
      },
      {
        id: "story-03",
        category: "submarines",
        title: "The Midnight Mug",
        narration: "On a quiet night at sea, an engineer finished his rounds and warmed his hands around a sturdy mug. The machinery kept its steady rhythm while two shipmates traded harmless jokes in low voices. Far from daylight, that familiar sound and easy company made the compartment feel like its own small town.",
        estimatedSeconds: 25
      },
      {
        id: "story-04",
        category: "race-cars",
        title: "One Clean Lap",
        narration: "Mara spent the afternoon adjusting tire pressures by small amounts and writing down what the driver felt in each corner. Near sunset, the car flowed through the bends without fighting the steering wheel. The stopwatch showed an improvement, but the driver's grin had already delivered the news.",
        estimatedSeconds: 24
      },
      {
        id: "story-05",
        category: "motorcycles",
        title: "Sunday Morning Twin",
        narration: "Cal rolled the old twin out while the neighborhood was still quiet. After a careful check, the engine settled into an even pulse, and he followed a familiar road between fields just brightening in the sun. He returned with dust on his boots and the calm look of someone who had been exactly where he meant to be.",
        estimatedSeconds: 25
      },
      {
        id: "story-06",
        category: "music-culture",
        title: "The Record-Shop Recommendation",
        narration: "A record-shop clerk watched a customer study the shelves and asked what kind of mood he wanted, not what title he wanted. She placed a new soul album on the turntable, lowered the needle, and let the first warm notes fill the room. The customer left with music he had not known to ask for and played it all weekend.",
        estimatedSeconds: 26
      },
      {
        id: "story-07",
        category: "workshop",
        title: "The Apprentice's Mark",
        narration: "Before disassembling a complicated linkage, an apprentice made neat alignment marks and arranged each fastener in order. The older mechanic said nothing until the machine went back together smoothly. Then he nodded toward the careful row of parts and said that planning was a tool, too.",
        estimatedSeconds: 23
      },
      {
        id: "story-08",
        category: "music-culture",
        title: "Radio Across the Desert",
        narration: "Two friends drove west in an aging coupe with a dashboard radio that faded whenever the highway dipped. Each time the signal returned, the cabin filled again with brass, guitar, and the voice of a late-night announcer. Years later, they remembered the disappearing stations as clearly as the towns they passed.",
        estimatedSeconds: 24
      }
    ],

    exploreFacts: [
      {
        id: "fact-01",
        category: "mechanics",
        title: "Why a Differential Matters",
        fact: "In a turn, the outside wheel travels farther than the inside wheel. A differential lets driven wheels rotate at different speeds while both can still receive torque.",
        whyItMatters: "Without that difference in speed, tires would scrub and the driveline would bind."
      },
      {
        id: "fact-02",
        category: "mechanics",
        title: "The Micrometer's Gentle Touch",
        fact: "Many micrometers use a ratchet or friction thimble so the measuring force stays reasonably consistent from one reading to the next.",
        whyItMatters: "Too much hand force can distort a small part or change a precise measurement."
      },
      {
        id: "fact-03",
        category: "mechanics",
        title: "Torque and Angle",
        fact: "A wrench produces its greatest torque for a given force when the pull is perpendicular to the handle.",
        whyItMatters: "Pulling at a shallow angle shortens the effective lever arm."
      },
      {
        id: "fact-04",
        category: "submarines",
        title: "Underway on Nuclear Power",
        fact: "USS Nautilus transmitted the message 'UNDERWAY ON NUCLEAR POWER' on January 17, 1955, marking the start of a new era in naval propulsion.",
        whyItMatters: "Nuclear propulsion greatly extended how long a submarine could operate without surfacing for air to run diesel engines."
      },
      {
        id: "fact-05",
        category: "submarines",
        title: "Beneath the North Pole",
        fact: "USS Nautilus passed beneath the geographic North Pole in August 1958 during the first submerged polar transit.",
        whyItMatters: "The voyage demonstrated the range and endurance of nuclear-powered submarines."
      },
      {
        id: "fact-06",
        category: "submarines",
        title: "A Hull Within a Hull",
        fact: "Many submarines have a strong pressure hull inside an outer hydrodynamic form. The pressure hull protects the occupied interior from the surrounding sea pressure.",
        whyItMatters: "Separating structural and flow-shaping jobs gives designers more freedom to meet both needs."
      },
      {
        id: "fact-07",
        category: "race-cars",
        title: "Twenty-Four Hours of Teamwork",
        fact: "The 24 Hours of Le Mans has run since 1923 and combines speed with reliability, driver changes, pit work, and strategy.",
        whyItMatters: "Winning an endurance race depends on the whole system, not only one quick lap."
      },
      {
        id: "fact-08",
        category: "race-cars",
        title: "Downforce Has a Price",
        fact: "Wings and shaped bodywork can press a race car toward the road as speed rises, increasing available tire grip.",
        whyItMatters: "The same aerodynamic devices often add drag, so setup is a tradeoff between cornering grip and straight-line speed."
      },
      {
        id: "fact-09",
        category: "race-cars",
        title: "The Yard of Bricks",
        fact: "Indianapolis Motor Speedway was once paved with millions of bricks. A narrow strip of original bricks remains at the start-finish line.",
        whyItMatters: "The surviving bricks preserve a physical link to the speedway's early history."
      },
      {
        id: "fact-10",
        category: "motorcycles",
        title: "The 1969 CB750",
        fact: "Honda's CB750 brought a transverse inline-four engine, electric starting, and a front disc brake together in a widely produced motorcycle in 1969.",
        whyItMatters: "Its combination of performance, refinement, and accessibility influenced a generation of large motorcycles."
      },
      {
        id: "fact-11",
        category: "motorcycles",
        title: "Cooling by Surface Area",
        fact: "The fins on an air-cooled cylinder and head increase the metal surface exposed to moving air.",
        whyItMatters: "More surface area allows heat to leave the engine more effectively."
      },
      {
        id: "fact-12",
        category: "motorcycles",
        title: "Three Final-Drive Traditions",
        fact: "Production motorcycles commonly send power to the rear wheel by chain, toothed belt, or enclosed shaft drive.",
        whyItMatters: "Each approach balances weight, cleanliness, maintenance, efficiency, and cost differently."
      },
      {
        id: "fact-13",
        category: "music-culture",
        title: "Two Familiar Record Speeds",
        fact: "Long-playing albums commonly spin at 33 1/3 RPM, while many seven-inch singles use 45 RPM.",
        whyItMatters: "Those two formats shaped how listeners bought albums, singles, and jukebox selections."
      },
      {
        id: "fact-14",
        category: "music-culture",
        title: "Detroit and Memphis Soul",
        fact: "Motown in Detroit and Stax in Memphis developed distinct, highly influential approaches to soul music during the 1960s and 1970s.",
        whyItMatters: "Studios, house musicians, songwriters, and local traditions all helped give recorded music a recognizable sense of place."
      },
      {
        id: "fact-15",
        category: "music-culture",
        title: "Albums on the Road",
        fact: "Eight-track cartridges used a continuous loop of magnetic tape and became a popular way to carry prerecorded albums in cars.",
        whyItMatters: "They helped turn the automobile into a personal listening room before compact cassettes became dominant."
      }
    ]
  };
}());

