export const exercises = [
    {
        id: 'head-turns',
        name: 'Head Turns',
        video: require('../../assets/videos/head-turns.mp4'),
        image: require('../../assets/images/Head Turn.jpg'),
        description:
            'Slowly turn your head from side to side to improve neck flexibility and mobility. This exercise helps relieve tension in the neck muscles and prepares them for physical activity.',
        intensity: {
            beginner: {
                recommendedRepetition: '10-15 reps',
                recommendedDuration: '15-20 seconds',
                duration: { min: 15, max: 20 },
                repetitions: { min: 10, max: 15 },
                restDuration: { min: 15, max: 20 },
            },
            intermediate: {
                recommendedRepetition: '12 reps',
                recommendedDuration: '20 seconds',
                duration: { min: 20, max: 25 },
                repetitions: { min: 12, max: 15 },
                restDuration: { min: 20, max: 25 },
            },
            advanced: {
                recommendedRepetition: '15 reps',
                recommendedDuration: '30 seconds',
                duration: { min: 25, max: 30 },
                repetitions: { min: 15, max: 20 },
                restDuration: { min: 25, max: 30 },
            },
        },
    },
    {
        id: 'overhead-stretch',
        name: 'Overhead Stretch',
        video: require('../../assets/videos/overhead-stretches.mp4'),
        image: require('../../assets/images/Overhead Stretch.jpg'),
        description:
            'Reach both arms overhead and stretch upward to elongate your spine and engage your core muscles. This stretch improves posture and helps relieve tension in your upper back and shoulders.',
        intensity: {
            beginner: {
                recommendedRepetition: '1 rep',
                recommendedDuration: '10 seconds',
                duration: { min: 10, max: 15 },
                repetitions: { min: 1, max: 2 },
                restDuration: { min: 15, max: 20 },
            },
            intermediate: {
                recommendedRepetition: '1-2 reps',
                recommendedDuration: '15 seconds',
                duration: { min: 15, max: 20 },
                repetitions: { min: 2, max: 3 },
                restDuration: { min: 20, max: 25 },
            },
            advanced: {
                recommendedRepetition: '2 reps',
                recommendedDuration: '20 seconds',
                duration: { min: 20, max: 25 },
                repetitions: { min: 3, max: 4 },
                restDuration: { min: 25, max: 30 },
            },
        },
    },
    {
        id: 'shoulder-rolls',
        name: 'Shoulder Rolls',
        video: require('../../assets/videos/shoulder-rolls.mp4'),
        image: require('../../assets/images/ShoulderRoll.jpg'),
        description:
            'Roll your shoulders in circular motions to loosen up the shoulder joints and improve range of motion. This exercise helps reduce stiffness and prepares your upper body for more intense movements.',
        intensity: {
            beginner: {
                recommendedRepetition: '5 reps',
                recommendedDuration: '15 seconds',
                duration: { min: 15, max: 20 },
                repetitions: { min: 5, max: 10 },
                restDuration: { min: 10, max: 15 },
            },
            intermediate: {
                recommendedRepetition: '8 reps',
                recommendedDuration: '20 seconds',
                duration: { min: 20, max: 25 },
                repetitions: { min: 8, max: 12 },
                restDuration: { min: 15, max: 20 },
            },
            advanced: {
                recommendedRepetition: '12 reps',
                recommendedDuration: '25 seconds',
                duration: { min: 25, max: 30 },
                repetitions: { min: 12, max: 15 },
                restDuration: { min: 20, max: 25 },
            },
        },
    },
    {
        id: 'arm-circles',
        name: 'Arm Circles',
        video: require('../../assets/videos/arm-circles.mp4'),
        image: require('../../assets/images/ArmCircles.jpg'),
        description:
            'Extend your arms and make controlled circular motions to warm up your shoulder joints and improve flexibility. This exercise increases blood flow to your arms and shoulders while enhancing coordination.',
        intensity: {
            beginner: {
                recommendedRepetition: '10 reps',
                recommendedDuration: '20 seconds',
                duration: { min: 20, max: 25 },
                repetitions: { min: 10, max: 12 },
                restDuration: { min: 15, max: 20 },
            },
            intermediate: {
                recommendedRepetition: '12 reps',
                recommendedDuration: '25 seconds',
                duration: { min: 25, max: 30 },
                repetitions: { min: 12, max: 15 },
                restDuration: { min: 20, max: 25 },
            },
            advanced: {
                recommendedRepetition: '15 reps',
                recommendedDuration: '30 seconds',
                duration: { min: 30, max: 35 },
                repetitions: { min: 15, max: 20 },
                restDuration: { min: 25, max: 30 },
            },
        },
    },
    {
        id: 'side-stretches',
        name: 'Side Stretches',
        video: require('../../assets/videos/side-stretches.mp4'),
        image: require('../../assets/images/Side Stretch.jpg'),
        description:
            'Gently lean from side to side to stretch your oblique muscles and improve lateral flexibility. This movement helps create balance in your core muscles and enhances overall torso mobility.',
        intensity: {
            beginner: {
                recommendedRepetition: '5 reps',
                recommendedDuration: '20 seconds',
                duration: { min: 20, max: 25 },
                repetitions: { min: 5, max: 7 },
                restDuration: { min: 15, max: 20 },
            },
            intermediate: {
                recommendedRepetition: '8 reps',
                recommendedDuration: '25 seconds',
                duration: { min: 25, max: 30 },
                repetitions: { min: 8, max: 10 },
                restDuration: { min: 20, max: 25 },
            },
            advanced: {
                recommendedRepetition: '10 reps',
                recommendedDuration: '30 seconds',
                duration: { min: 30, max: 35 },
                repetitions: { min: 10, max: 12 },
                restDuration: { min: 25, max: 30 },
            },
        },
    },
    {
        id: 'hip-rotation',
        name: 'Hip Rotation',
        video: require('../../assets/videos/hip-rotation.mp4'),
        image: require('../../assets/images/Hip Rotation.jpg'),
        description:
            'Rotate your hips in circular motions to increase mobility in your hip joints and loosen tight muscles. This exercise is excellent for warming up before lower body workouts or sports activities.',
        intensity: {
            beginner: {
                recommendedRepetition: '10 reps',
                recommendedDuration: '20 seconds',
                duration: { min: 20, max: 25 },
                repetitions: { min: 10, max: 12 },
                restDuration: { min: 15, max: 20 },
            },
            intermediate: {
                recommendedRepetition: '12 reps',
                recommendedDuration: '25 seconds',
                duration: { min: 25, max: 30 },
                repetitions: { min: 12, max: 15 },
                restDuration: { min: 20, max: 25 },
            },
            advanced: {
                recommendedRepetition: '15 reps',
                recommendedDuration: '30 seconds',
                duration: { min: 30, max: 35 },
                repetitions: { min: 15, max: 20 },
                restDuration: { min: 25, max: 30 },
            },
        },
    },
    {
        id: 'knee-hugs',
        name: 'Knee Hugs',
        video: require('../../assets/videos/knee-hugs.mp4'),
        image: require('../../assets/images/KneeHugs.jpg'),
        description:
            'Bring one knee at a time to your chest while standing to stretch your glutes and lower back muscles. This dynamic stretch improves hip mobility and helps prevent lower back stiffness.',
        intensity: {
            beginner: {
                recommendedRepetition: '10 reps',
                recommendedDuration: '20 seconds',
                duration: { min: 20, max: 25 },
                repetitions: { min: 10, max: 12 },
                restDuration: { min: 15, max: 20 },
            },
            intermediate: {
                recommendedRepetition: '12 reps',
                recommendedDuration: '25 seconds',
                duration: { min: 25, max: 30 },
                repetitions: { min: 12, max: 15 },
                restDuration: { min: 20, max: 25 },
            },
            advanced: {
                recommendedRepetition: '15 reps',
                recommendedDuration: '30 seconds',
                duration: { min: 30, max: 35 },
                repetitions: { min: 15, max: 20 },
                restDuration: { min: 25, max: 30 },
            },
        },
    },
    {
        id: 'butt-kicks',
        name: 'Butt Kicks',
        video: require('../../assets/videos/butt-kicks.mp4'),
        image: require('../../assets/images/ButtKick.jpg'),
        description:
            'Jog in place while kicking your heels up toward your glutes to warm up your hamstrings and activate your leg muscles. This cardio exercise also helps improve your running form and leg coordination.',
        intensity: {
            beginner: {
                recommendedRepetition: '15 reps',
                recommendedDuration: '25 seconds',
                duration: { min: 25, max: 30 },
                repetitions: { min: 15, max: 20 },
                restDuration: { min: 20, max: 25 },
            },
            intermediate: {
                recommendedRepetition: '20 reps',
                recommendedDuration: '30 seconds',
                duration: { min: 30, max: 35 },
                repetitions: { min: 20, max: 25 },
                restDuration: { min: 25, max: 30 },
            },
            advanced: {
                recommendedRepetition: '30 reps',
                recommendedDuration: '40 seconds',
                duration: { min: 35, max: 45 },
                repetitions: { min: 25, max: 30 },
                restDuration: { min: 30, max: 35 },
            },
        },
    },
    {
        id: 'walking-high-knees',
        name: 'Walking High Knees',
        video: require('../../assets/videos/walking-high-knees.mp4'),
        image: require('../../assets/images/WalkingHighKnees.jpg'),
        description:
            'Walk forward while lifting your knees high to engage your hip flexors and core muscles. This exercise improves balance, coordination, and prepares your body for more intense lower body movements.',
        intensity: {
            beginner: {
                recommendedRepetition: '10 reps',
                recommendedDuration: '20 seconds',
                duration: { min: 20, max: 25 },
                repetitions: { min: 10, max: 12 },
                restDuration: { min: 15, max: 20 },
            },
            intermediate: {
                recommendedRepetition: '12 reps',
                recommendedDuration: '25 seconds',
                duration: { min: 25, max: 30 },
                repetitions: { min: 12, max: 15 },
                restDuration: { min: 20, max: 25 },
            },
            advanced: {
                recommendedRepetition: '15 reps',
                recommendedDuration: '30 seconds',
                duration: { min: 30, max: 35 },
                repetitions: { min: 15, max: 20 },
                restDuration: { min: 25, max: 30 },
            },
        },
    },
    {
        id: 'jogging',
        name: 'Jogging',
        video: require('../../assets/videos/jogging.mp4'),
        image: require('../../assets/images/Jogging.jpg'),
        description:
            'Perform light jogging in place or around an area to elevate your heart rate and warm up your entire body. This cardiovascular exercise prepares your muscles and joints for more strenuous activity while improving circulation.',
        intensity: {
            beginner: {
                recommendedRepetition: '1 rep',
                recommendedDuration: '1 minute',
                duration: { min: 60, max: 90 },
                repetitions: { min: 1, max: 2 },
                restDuration: { min: 20, max: 30 },
            },
            intermediate: {
                recommendedRepetition: '1 rep',
                recommendedDuration: '2 minutes',
                duration: { min: 90, max: 120 },
                repetitions: { min: 1, max: 2 },
                restDuration: { min: 30, max: 40 },
            },
            advanced: {
                recommendedRepetition: '1 rep',
                recommendedDuration: '3 minutes',
                duration: { min: 120, max: 180 },
                repetitions: { min: 1, max: 1 },
                restDuration: { min: 40, max: 50 },
            },
        },
    },
    {
        id: 'lunges',
        name: 'Lunges',
        video: require('../../assets/videos/lunges.mp4'),
        image: require('../../assets/images/Lunges.jpg'),
        description:
            'Step forward and lower your hips until both knees are bent at about 90-degree angles to strengthen your legs and glutes. This compound exercise improves lower body strength, balance, and functional movement patterns.',
        intensity: {
            beginner: {
                recommendedRepetition: '10 reps',
                recommendedDuration: '30 seconds',
                duration: { min: 30, max: 35 },
                repetitions: { min: 10, max: 12 },
                restDuration: { min: 15, max: 20 },
            },
            intermediate: {
                recommendedRepetition: '12 reps',
                recommendedDuration: '35 seconds',
                duration: { min: 35, max: 40 },
                repetitions: { min: 12, max: 15 },
                restDuration: { min: 20, max: 25 },
            },
            advanced: {
                recommendedRepetition: '15 reps',
                recommendedDuration: '40 seconds',
                duration: { min: 40, max: 45 },
                repetitions: { min: 15, max: 18 },
                restDuration: { min: 25, max: 30 },
            },
        },
    },
    {
        id: 'squat',
        name: 'Squat',
        video: require('../../assets/videos/squat.mp4'),
        image: require('../../assets/images/Squat.jpg'),
        description:
            'Lower your body by bending your knees and pushing your hips back as if sitting in a chair, then return to standing position. This fundamental exercise builds leg strength, improves mobility, and engages your core muscles for stability.',
        intensity: {
            beginner: {
                recommendedRepetition: '10 reps',
                recommendedDuration: '30 seconds',
                duration: { min: 30, max: 35 },
                repetitions: { min: 10, max: 12 },
                restDuration: { min: 15, max: 20 },
            },
            intermediate: {
                recommendedRepetition: '12 reps',
                recommendedDuration: '35 seconds',
                duration: { min: 35, max: 40 },
                repetitions: { min: 12, max: 15 },
                restDuration: { min: 20, max: 25 },
            },
            advanced: {
                recommendedRepetition: '15 reps',
                recommendedDuration: '40 seconds',
                duration: { min: 40, max: 45 },
                repetitions: { min: 15, max: 18 },
                restDuration: { min: 25, max: 30 },
            },
        },
    },
    {
        id: 'toe-touches',
        name: 'Toe Touches',
        video: require('../../assets/videos/toe-touches.mp4'),
        image: require('../../assets/images/ToeTouch.jpg'),
        description:
            'Bend forward at the waist and reach toward your toes to stretch your hamstrings and lower back. This exercise improves flexibility in your posterior chain and helps prevent injuries.',
        intensity: {
            beginner: {
                recommendedRepetition: '10 reps',
                recommendedDuration: '20 seconds',
                duration: { min: 20, max: 25 },
                repetitions: { min: 10, max: 12 },
                restDuration: { min: 15, max: 20 },
            },
            intermediate: {
                recommendedRepetition: '12 reps',
                recommendedDuration: '25 seconds',
                duration: { min: 25, max: 30 },
                repetitions: { min: 12, max: 15 },
                restDuration: { min: 20, max: 25 },
            },
            advanced: {
                recommendedRepetition: '15 reps',
                recommendedDuration: '30 seconds',
                duration: { min: 30, max: 35 },
                repetitions: { min: 15, max: 20 },
                restDuration: { min: 25, max: 30 },
            },
        },
    },
    {
        id: 'jumping-jacks',
        name: 'Jumping Jacks',
        video: require('../../assets/videos/jumping-jacks.mp4'),
        image: require('../../assets/images/JumpingJacks.jpg'),
        description:
            'Jump while spreading your legs and raising your arms overhead, then return to starting position. This full-body exercise increases heart rate and improves coordination while warming up multiple muscle groups.',
        intensity: {
            beginner: {
                recommendedRepetition: '15 reps',
                recommendedDuration: '25 seconds',
                duration: { min: 25, max: 30 },
                repetitions: { min: 15, max: 20 },
                restDuration: { min: 20, max: 25 },
            },
            intermediate: {
                recommendedRepetition: '20 reps',
                recommendedDuration: '30 seconds',
                duration: { min: 30, max: 35 },
                repetitions: { min: 20, max: 25 },
                restDuration: { min: 25, max: 30 },
            },
            advanced: {
                recommendedRepetition: '30 reps',
                recommendedDuration: '40 seconds',
                duration: { min: 35, max: 45 },
                repetitions: { min: 25, max: 30 },
                restDuration: { min: 30, max: 35 },
            },
        },
    },
    {
        id: 'defensive-slides',
        name: 'Defensive Slides',
        video: require('../../assets/videos/defensive-slides.mp4'),
        image: require('../../assets/images/Defensive Slides.jpg'),
        description:
            'Move laterally in a defensive stance, keeping your knees bent and weight low. This basketball-inspired exercise improves lateral quickness, leg strength, and defensive movement patterns.',
        intensity: {
            beginner: {
                recommendedRepetition: '5 reps each side',
                recommendedDuration: '20 seconds',
                duration: { min: 20, max: 25 },
                repetitions: { min: 5, max: 8 },
                restDuration: { min: 15, max: 20 },
            },
            intermediate: {
                recommendedRepetition: '8 reps each side',
                recommendedDuration: '25 seconds',
                duration: { min: 25, max: 30 },
                repetitions: { min: 8, max: 10 },
                restDuration: { min: 20, max: 25 },
            },
            advanced: {
                recommendedRepetition: '10 reps each side',
                recommendedDuration: '30 seconds',
                duration: { min: 30, max: 35 },
                repetitions: { min: 10, max: 12 },
                restDuration: { min: 25, max: 30 },
            },
        },
    },
    {
        id: 'jump-squat',
        name: 'Jump Squat',
        video: require('../../assets/videos/jump-squat.mp4'),
        image: require('../../assets/images/Jump Squat.jpg'),
        description:
            'Perform a squat and then explosively jump upward, landing softly back into squat position. This plyometric exercise builds power in your lower body while improving cardiovascular endurance.',
        intensity: {
            beginner: {
                recommendedRepetition: '8 reps',
                recommendedDuration: '20 seconds',
                duration: { min: 20, max: 25 },
                repetitions: { min: 8, max: 10 },
                restDuration: { min: 20, max: 25 },
            },
            intermediate: {
                recommendedRepetition: '10 reps',
                recommendedDuration: '25 seconds',
                duration: { min: 25, max: 30 },
                repetitions: { min: 10, max: 12 },
                restDuration: { min: 25, max: 30 },
            },
            advanced: {
                recommendedRepetition: '12 reps',
                recommendedDuration: '30 seconds',
                duration: { min: 30, max: 35 },
                repetitions: { min: 12, max: 15 },
                restDuration: { min: 30, max: 35 },
            },
        },
    },
    {
        id: 'walking-lunges',
        name: 'Walking Lunges',
        video: require('../../assets/videos/walking-lunges.mp4'),
        image: require('../../assets/images/WalkingLunges.jpg'),
        description:
            'Step forward into a lunge, then bring your back leg forward to lunge with the opposite leg, walking forward continuously. This dynamic variation of lunges improves balance, coordination, and leg strength.',
        intensity: {
            beginner: {
                recommendedRepetition: '10 reps (5 each leg)',
                recommendedDuration: '30 seconds',
                duration: { min: 30, max: 35 },
                repetitions: { min: 10, max: 12 },
                restDuration: { min: 20, max: 25 },
            },
            intermediate: {
                recommendedRepetition: '12 reps (6 each leg)',
                recommendedDuration: '35 seconds',
                duration: { min: 35, max: 40 },
                repetitions: { min: 12, max: 15 },
                restDuration: { min: 25, max: 30 },
            },
            advanced: {
                recommendedRepetition: '16 reps (8 each leg)',
                recommendedDuration: '40 seconds',
                duration: { min: 40, max: 45 },
                repetitions: { min: 16, max: 20 },
                restDuration: { min: 30, max: 35 },
            },
        },
    },
    {
        id: 'carioca',
        name: 'Carioca',
        video: require('../../assets/videos/carioca.mp4'),
        image: require('../../assets/images/Carioca.jpg'),
        description:
            'Move laterally by crossing one foot in front and then behind the other in a grapevine pattern. This agility drill improves hip mobility, coordination, and lateral movement skills.',
        intensity: {
            beginner: {
                recommendedRepetition: '10 steps each direction',
                recommendedDuration: '20 seconds',
                duration: { min: 20, max: 25 },
                repetitions: { min: 10, max: 12 },
                restDuration: { min: 15, max: 20 },
            },
            intermediate: {
                recommendedRepetition: '15 steps each direction',
                recommendedDuration: '25 seconds',
                duration: { min: 25, max: 30 },
                repetitions: { min: 15, max: 18 },
                restDuration: { min: 20, max: 25 },
            },
            advanced: {
                recommendedRepetition: '20 steps each direction',
                recommendedDuration: '30 seconds',
                duration: { min: 30, max: 35 },
                repetitions: { min: 20, max: 25 },
                restDuration: { min: 25, max: 30 },
            },
        },
    },
];

export default exercises;
