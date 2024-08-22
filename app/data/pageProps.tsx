export const dietJournalPageProps = {
  title: 'Diet Journal',
  description: [ 
    'Track your daily calorie intake and macronutrient distribution through an app like My Fitness Pal and log it here to display your progress over time.',
    'Adjust your target calories by following the tips in the Diet Tips page of this app and making use of the built-in BMR calculator.',
    ],
  links: [
    { href: 'https://www.myfitnesspal.com/', text: 'My Fitness Pal' },
    { href: '/knowledge/diet-tips', text: 'Diet Tips' },
    { href: '/tool/bmr', text: 'BMR Calculator' }
  ]
}
export const trainingJournalPageProps = {
  title: 'Training Journal',
  description: [
    'Use this page to log your training sessions and track your progress over time.  You should be training with progressive overload in mind, meaning you should be increasing the weight you lift over time.',
    'Everytime you target a certain muscle group with one of the workouts below, change the x mark to a check mark when you can handle the new weight by a certain rep range.',
  ],
  links: [
    { href: '/knowledge/training-tips', text: 'Training Tips' },
    { href: '/tool/workout-guides', text: 'Workout Guides' },
    { href: '/tool/workout-planner', text: 'Workout Planner' }
  ]
}