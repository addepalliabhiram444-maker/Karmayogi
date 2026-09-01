import {
  UserProfile,
  CompetencyItem,
  RadarDataPoint,
  AssessmentQuestion,
  LearningPhase,
  Course,
  UploadedMaterial,
  GeneratedQuiz,
  TutorMessage,
  NotificationItem
} from '../types';

export const currentUser: UserProfile = {
  id: 'usr_sanjay_9482',
  name: 'Sanjay Gupta',
  email: 'sanjay.gupta@mospi.gov.in',
  employeeId: 'ISS-2018-8472',
  role: 'Statistical Officer',
  cadre: 'Indian Statistical Service (Subordinate / Gr. B)',
  department: 'Data & Methodology Wing',
  ministry: 'Ministry of Statistics & Programme Implementation (MoSPI)',
  joinedDate: 'November 2018',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  overallCompetency: 72,
  competencyChange: 4,
  completedModules: 18,
  totalModules: 28,
  avgQuizScore: 86,
  learningHours: 48.5,
  streakDays: 12,
  level: 'Level 4 Statistical Analyst',
  certificatesCount: 12,
  badges: [
    'Official Statistics Specialist',
    'Survey Methodology Master',
    'iGOT Certified - Level 3',
    'Python for Analytics Pioneer'
  ]
};

export const initialUserProfile = currentUser;

export const radarData: RadarDataPoint[] = [
  { subject: 'Statistical Methods', current: 85, target: 90, fullMark: 100 },
  { subject: 'Data Analysis', current: 80, target: 85, fullMark: 100 },
  { subject: 'Data Visualization', current: 67, target: 80, fullMark: 100 },
  { subject: 'Python / Programming', current: 42, target: 75, fullMark: 100 },
  { subject: 'Survey Methodology', current: 90, target: 95, fullMark: 100 },
  { subject: 'Official Statistics', current: 85, target: 90, fullMark: 100 },
];

export const competencyItems: CompetencyItem[] = [
  {
    id: 'comp_1',
    name: 'Python for Statistical Analysis',
    category: 'Programming & Data Computing',
    currentScore: 42,
    targetScore: 75,
    status: 'Action Needed',
    gap: 33,
    priority: 'High',
    description: 'Pandas, NumPy, automated data validation pipelines, and microdata processing.',
    recommendedModule: 'Python for Official Statistics: Level 1 (iGOT-MoSPI)'
  },
  {
    id: 'comp_2',
    name: 'Advanced Data Visualization',
    category: 'Analysis & Reporting',
    currentScore: 67,
    targetScore: 80,
    status: 'Developing',
    gap: 13,
    priority: 'Medium',
    description: 'Publishing-ready statistical charts, geospatial mapping of district microdata, and interactive dashboards.',
    recommendedModule: 'Storytelling with Official Data & Geospatial Visualizations'
  },
  {
    id: 'comp_3',
    name: 'Statistical Computing & Sampling',
    category: 'Methodology & Science',
    currentScore: 48,
    targetScore: 75,
    status: 'Action Needed',
    gap: 27,
    priority: 'High',
    description: 'Multi-stage stratified cluster sampling, survey weights calibration, and variance estimation.',
    recommendedModule: 'Survey Sampling & Weighting in Large National Surveys'
  },
  {
    id: 'comp_4',
    name: 'Official Statistics Framework',
    category: 'Governance & Norms',
    currentScore: 85,
    targetScore: 90,
    status: 'Strong',
    gap: 5,
    priority: 'Low',
    description: 'National Indicator Framework (NIF), Data Governance Quality Index (DGQI), UN-SDMX protocols.',
    recommendedModule: 'National Accounts & Sustainable Development Goals (SDGs)'
  },
  {
    id: 'comp_5',
    name: 'Survey Methodology & Fieldwork',
    category: 'Field Operations',
    currentScore: 90,
    targetScore: 95,
    status: 'Strong',
    gap: 5,
    priority: 'Low',
    description: 'NSSO survey schedule designing, CAPI (Computer-Assisted Personal Interviewing) protocols.',
    recommendedModule: 'Field Quality Audits & Modern CAPI Systems'
  }
];

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 1,
    topic: 'Survey Methodology',
    difficulty: 'Intermediate',
    question: 'Which sampling method is most appropriate when the target population is geographically dispersed and divided into distinct natural clusters (such as villages or urban blocks)?',
    options: [
      'Simple Random Sampling without Replacement (SRSWOR)',
      'Multi-Stage Stratified Cluster Sampling',
      'Systematic Sampling with Equal Probability',
      'Convenience Non-Probability Sampling'
    ],
    correctIndex: 1,
    explanation: 'Multi-Stage Stratified Cluster Sampling is the standard framework used by NSSO and large-scale national surveys in India because it minimizes field travel costs while maintaining statistical representativeness across urban and rural strata.',
    competencyArea: 'Survey Methodology'
  },
  {
    id: 2,
    topic: 'Python / Programming',
    difficulty: 'Intermediate',
    question: 'In the Pandas library, which function is used to convert categorical survey survey weights column into numeric format while safely coercing missing invalid entries to NaN?',
    options: [
      'pd.to_numeric(df["weights"], errors="coerce")',
      'df["weights"].astype(float, force=True)',
      'pd.convert_dtypes(df["weights"], replace_null=True)',
      'df["weights"].parse_numbers(ignore_errors=True)'
    ],
    correctIndex: 0,
    explanation: 'pd.to_numeric(..., errors="coerce") will automatically parse numeric values and turn non-parsable corrupted strings or whitespace into NaN (missing values), ideal for cleaning field survey raw files.',
    competencyArea: 'Python for Statistical Analysis'
  },
  {
    id: 3,
    topic: 'Official Statistics',
    difficulty: 'Beginner',
    question: 'What is the primary difference between the Consumer Price Index (CPI) and the Gross Domestic Product (GDP) Deflator?',
    options: [
      'CPI reflects the prices of all goods and services produced domestically, whereas GDP deflator reflects consumer basket only.',
      'CPI reflects prices of a fixed basket of goods bought by typical consumers (including imports), while GDP deflator reflects all domestically produced goods and services.',
      'CPI is compiled only on an annual basis, whereas GDP deflator is published weekly by MoSPI.',
      'CPI uses variable weight index (Paasche), whereas GDP deflator is strictly a fixed-base Laspeyres index.'
    ],
    correctIndex: 1,
    explanation: 'CPI measures price changes in a fixed representative consumer basket (including imported consumption items), whereas the GDP Deflator captures the prices of all newly produced final goods and services within the domestic economy.',
    competencyArea: 'Official Statistics Framework'
  },
  {
    id: 4,
    topic: 'Data Analysis & Estimation',
    difficulty: 'Advanced',
    question: 'In survey data analysis, what is the purpose of applying post-stratification or calibration weights to primary sample survey units?',
    options: [
      'To artificially reduce the overall sample size to meet budget limits.',
      'To adjust sample totals so that estimated population totals match known benchmark population totals (such as Census counts) across key demographic groups.',
      'To completely remove outliers from the continuous economic data.',
      'To randomize interview enumerator assignments during field data collection.'
    ],
    correctIndex: 1,
    explanation: 'Calibration / post-stratification weighting aligns survey estimates with known external population marginal totals (e.g. Census projections by age, sex, and state), reducing non-response and sampling variance.',
    competencyArea: 'Statistical Computing & Sampling'
  },
  {
    id: 5,
    topic: 'Data Visualization & Reporting',
    difficulty: 'Intermediate',
    question: 'When presenting time-series statistical trends with seasonal fluctuations (such as quarterly agricultural GVA), what is the best practice for official reporting?',
    options: [
      'Plot raw 3D pie charts for every quarter individually.',
      'Present seasonally adjusted series alongside Year-on-Year (YoY) growth rates with clear standard error confidence bands.',
      'Truncate the vertical axis arbitrarily to exaggerate minor quarterly fluctuations.',
      'Only show the maximum and minimum observed value in text format.'
    ],
    correctIndex: 1,
    explanation: 'Official statistical guidelines mandate presenting seasonally adjusted series alongside YoY growth rates with documented confidence intervals and transparent base-year metadata.',
    competencyArea: 'Advanced Data Visualization'
  }
];

export const learningPhases: LearningPhase[] = [
  {
    id: 'phase_1',
    phaseNumber: 1,
    title: 'Strengthen Foundations',
    subtitle: 'Core statistical systems, national accounts principles, and official data ethics.',
    status: 'Completed',
    progressPercentage: 100,
    courses: [
      {
        id: 'c101',
        title: 'Introduction to Official Statistics Framework & MoSPI Mandate',
        duration: '4 Hours',
        level: 'Beginner',
        status: 'Completed',
        certificateUrl: '#cert-101',
        skills: ['National Indicator Framework', 'Data Quality Protocols', 'SDMX']
      },
      {
        id: 'c102',
        title: 'National Accounts & Price Index Compilation (CPI / WPI)',
        duration: '6 Hours',
        level: 'Beginner',
        status: 'Completed',
        certificateUrl: '#cert-102',
        skills: ['Base Year Methodology', 'Index Numbers', 'Macro Indicators']
      }
    ]
  },
  {
    id: 'phase_2',
    phaseNumber: 2,
    title: 'Data Analysis & Interpretation',
    subtitle: 'Automated data pipelines, Python programming, and microdata manipulation.',
    status: 'In Progress',
    progressPercentage: 35,
    courses: [
      {
        id: 'c201',
        title: 'Python for Statistical Analysis: Level 1 (iGOT-MoSPI)',
        duration: '12 Hours',
        level: 'Intermediate',
        status: 'In Progress',
        skills: ['Pandas', 'NumPy', 'Data Cleaning', 'Automated Validation']
      },
      {
        id: 'c202',
        title: 'Advanced Excel & Power Query for Statistical Officers',
        duration: '8 Hours',
        level: 'Intermediate',
        status: 'Up Next',
        skills: ['ETL Automation', 'Pivot Modeling', 'Macro Scripts']
      },
      {
        id: 'c203',
        title: 'Introduction to R for Official Sample Surveys',
        duration: '10 Hours',
        level: 'Intermediate',
        status: 'Locked',
        skills: ['Survey Package', 'Weight Calibration', 'Variance Estimation']
      }
    ]
  },
  {
    id: 'phase_3',
    phaseNumber: 3,
    title: 'Advanced Skills & AI Integration',
    subtitle: 'Machine learning for statistical imputation, LLM data assistants, and geospatial intelligence.',
    status: 'Locked',
    progressPercentage: 0,
    courses: [
      {
        id: 'c301',
        title: 'Predictive Modeling & Statistical Machine Learning Basics',
        duration: '15 Hours',
        level: 'Advanced',
        status: 'Locked',
        skills: ['Regression Diagnostics', 'Imputation Models', 'Ensemble Trees']
      },
      {
        id: 'c302',
        title: 'Geospatial Analytics & District-level GIS for Census Planning',
        duration: '12 Hours',
        level: 'Advanced',
        status: 'Locked',
        skills: ['QGIS', 'Spatial Autocorrelation', 'Choropleth Mapping']
      }
    ]
  }
];

export const igotCourses: Course[] = [
  {
    id: 'igot_01',
    title: 'Python for Data Analysis & Statistical Visualization',
    provider: 'iGOT Karmayogi / NSO Academy',
    matchScore: 94,
    durationHours: 12,
    modulesCount: 8,
    level: 'Intermediate',
    competencyArea: 'Python / Programming',
    description: 'Comprehensive hands-on course designed for Statistical Officers to automate data cleaning, microdata aggregation, and tabular export.',
    enrolled: true,
    progress: 45,
    rating: 4.9,
    reviewsCount: 1420,
    instructors: 'Dr. A. K. Sharma (Senior DDG, MoSPI) & Data Science Cell',
    syllabus: [
      { title: 'Environment Setup & Pandas DataFrames Basics', duration: '1h 30m' },
      { title: 'Handling Missing Survey Data & Coercion Rules', duration: '2h 15m' },
      { title: 'Grouping, Aggregation & Multi-Index Survey Tables', duration: '2h 45m' },
      { title: 'Exporting Compliant MoSPI Formats & Excel Automation', duration: '1h 45m' }
    ],
    tags: ['Python', 'Pandas', 'Automated Pipelines', 'Data Quality']
  },
  {
    id: 'igot_02',
    title: 'Fundamentals of Official Statistics & National Indicator Framework',
    provider: 'iGOT Karmayogi / National Statistical Systems Training Academy (NSSTA)',
    matchScore: 88,
    durationHours: 8,
    modulesCount: 6,
    level: 'Beginner',
    competencyArea: 'Official Statistics',
    description: 'Deep dive into the core architecture of India’s National Statistical System, UN Fundamental Principles of Official Statistics, and SDG tracking.',
    enrolled: true,
    progress: 100,
    rating: 4.8,
    reviewsCount: 3100,
    instructors: 'NSSTA Faculty & International Statistical Experts',
    syllabus: [
      { title: 'Historical Evolution of India’s Statistical Architecture', duration: '1h 15m' },
      { title: 'UN Fundamental Principles & Legal Mandates', duration: '1h 45m' },
      { title: 'NIF & State Indicator Framework (SIF) Integration', duration: '2h 00m' }
    ],
    tags: ['Official Statistics', 'SDG', 'NSSTA', 'Policy']
  },
  {
    id: 'igot_03',
    title: 'Advanced Survey Sampling Methodology & Field Audits',
    provider: 'iGOT Karmayogi / Survey Design and Research Division (SDRD)',
    matchScore: 82,
    durationHours: 24,
    modulesCount: 14,
    level: 'Advanced',
    competencyArea: 'Survey Methodology',
    description: 'Theoretical foundations and practical field implementations of Stratified Multi-Stage Sampling, UFS (Urban Frame Survey), and Non-sampling error control.',
    enrolled: false,
    progress: 0,
    rating: 4.95,
    reviewsCount: 890,
    instructors: 'Prof. R. Banerjee (Sampling Specialist, ISI Kolkata)',
    syllabus: [
      { title: 'Probability Proportional to Size (PPS) Sampling', duration: '3h 30m' },
      { title: 'Urban Frame Survey & Rural Listing Protocols', duration: '4h 00m' },
      { title: 'Variance Estimation in Complex Survey Designs', duration: '4h 30m' }
    ],
    tags: ['Sampling Theory', 'NSSO', 'SDRD', 'CAPI']
  },
  {
    id: 'igot_04',
    title: 'Storytelling with Official Data & Interactive Dashboards',
    provider: 'iGOT Karmayogi / NITI Aayog Data Cell',
    matchScore: 78,
    durationHours: 10,
    modulesCount: 7,
    level: 'Intermediate',
    competencyArea: 'Data Visualization',
    description: 'Transform complex national survey datasets into clear visual summaries, policy briefs, and accessible infographics for decision-makers.',
    enrolled: false,
    progress: 0,
    rating: 4.7,
    reviewsCount: 650,
    instructors: 'Design Lead, NITI Aayog Data Cell',
    syllabus: [
      { title: 'Principles of Editorial Data Journalism & Hierarchy', duration: '2h 00m' },
      { title: 'Creating High-Impact Charts with Matplotlib & Seaborn', duration: '3h 00m' },
      { title: 'Building District-Level Factsheets & Reports', duration: '2h 30m' }
    ],
    tags: ['Visualization', 'Dashboard', 'Policy Briefs', 'Storytelling']
  }
];

export const uploadedMaterials: UploadedMaterial[] = [
  {
    id: 'mat_01',
    name: 'NSSO_78th_Round_Survey_Handbook_2024.pdf',
    fileType: 'PDF',
    size: '8.4 MB',
    topic: 'Survey Methodology & CAPI',
    uploadedDate: '18 Aug 2024',
    pagesCount: 142,
    summary: 'Instructions to Field Staff on Multiple Indicator Survey, Schedules 0.0 and 1.0, coding structures, and boundary demarcation.'
  },
  {
    id: 'mat_02',
    name: 'National_Accounts_Statistics_Methodological_Note.pdf',
    fileType: 'PDF',
    size: '4.2 MB',
    topic: 'National Accounts & GVA',
    uploadedDate: '02 Aug 2024',
    pagesCount: 88,
    summary: 'Methodology for compiling Gross Value Added (GVA) by economic activity, double deflation, and supply-use tables.'
  },
  {
    id: 'mat_03',
    name: 'Python_Scripts_PLFS_Microdata_Processing.docx',
    fileType: 'DOCX',
    size: '1.8 MB',
    topic: 'Data Analysis & Scripts',
    uploadedDate: '24 Jul 2024',
    pagesCount: 32,
    summary: 'Standardized scripts for reading fixed-width ASCII PLFS microdata records, multiplier weighting, and labour force participation calculation.'
  },
  {
    id: 'mat_04',
    name: 'Data_Governance_Quality_Index_Framework_2024.pdf',
    fileType: 'PDF',
    size: '3.1 MB',
    topic: 'Governance & Norms',
    uploadedDate: '15 Jul 2024',
    pagesCount: 64,
    summary: 'Six pillars of DGQI evaluation: Data Generation, Quality, Analysis, Use, Security, and System Capacity across ministries.'
  }
];

export const sampleGeneratedQuizzes: GeneratedQuiz[] = [
  {
    id: 'quiz_gen_01',
    title: 'NSSO Fieldwork Protocol & CAPI Evaluation Quiz',
    sourceDocName: 'NSSO_78th_Round_Survey_Handbook_2024.pdf',
    createdAt: 'Yesterday at 4:30 PM',
    questionsCount: 15,
    difficulty: 'Medium',
    status: 'Ready',
    questions: [
      {
        id: 101,
        topic: 'Fieldwork Protocol',
        difficulty: 'Intermediate',
        question: 'Under NSSO Schedule 0.0, how should a hamlet group (hg) or sub-block (sb) selection be randomized when the listed population exceeds 1,200 persons?',
        options: [
          'By arbitrary surveyor discretion at the local panchayat office.',
          'By equal division into specified number of hg/sb units and selection using circular systematic random numbers.',
          'By selecting only the wealthiest household quadrant.',
          'By combining adjacent villages into a single cluster without segmentation.'
        ],
        correctIndex: 1,
        explanation: 'When listing exceeds the threshold (e.g. 1,200), the village is divided into equal sized sub-blocks and a specified sample is drawn using circular systematic sampling with a random start.',
        competencyArea: 'Survey Methodology'
      },
      {
        id: 102,
        topic: 'CAPI Validation',
        difficulty: 'Beginner',
        question: 'What is the function of soft validation warnings versus hard validation errors in CAPI data entry tablets?',
        options: [
          'Soft warnings prevent form submission completely, while hard errors allow the surveyor to proceed.',
          'Soft warnings flag plausible outliers for enumerator confirmation, while hard validation errors strictly block moving forward until corrected.',
          'Soft warnings are only displayed to the server administrator at headquarters.',
          'Both warnings automatically delete invalid responses.'
        ],
        correctIndex: 1,
        explanation: 'Hard validation errors enforce strict logical consistencies (e.g., age of marriage < age of individual), while soft warnings allow genuine extreme values once confirmed.',
        competencyArea: 'Survey Methodology'
      }
    ]
  },
  {
    id: 'quiz_gen_02',
    title: 'National Accounts & GVA Principles Check',
    sourceDocName: 'National_Accounts_Statistics_Methodological_Note.pdf',
    createdAt: '22 Aug 2024',
    questionsCount: 10,
    difficulty: 'Hard',
    status: 'Ready',
    questions: [
      {
        id: 201,
        topic: 'Gross Value Added',
        difficulty: 'Advanced',
        question: 'Which equation correctly expresses the relationship between Gross Value Added (GVA) at basic prices and Gross Domestic Product (GDP) at market prices?',
        options: [
          'GDP at Market Prices = GVA at Basic Prices + Product Taxes - Product Subsidies',
          'GDP at Market Prices = GVA at Basic Prices - Product Taxes + Product Subsidies',
          'GDP at Market Prices = GVA at Factor Cost + Consumption of Fixed Capital',
          'GDP at Market Prices = Net Value Added (NVA) * Total Population'
        ],
        correctIndex: 0,
        explanation: 'Under SNA 2008 and Indian National Accounts guidelines: GDP at market prices = GVA at basic prices + Product Taxes (net of Product Subsidies).',
        competencyArea: 'Official Statistics Framework'
      }
    ]
  }
];

export const initialTutorMessages: TutorMessage[] = [
  {
    id: 'msg_01',
    sender: 'assistant',
    timestamp: '10:00 AM',
    content: 'Namaste Sanjay. I am your StatLearn AI Tutor, configured with the official Indian Statistical System repositories, MoSPI guidelines, and National Indicator Framework. How can I assist your capacity development today?',
    callout: {
      title: 'Current Competency Focus Area',
      text: 'Your current learning plan prioritizes Python for Statistical Analysis (42%) and Sampling Calibration (48%). Feel free to ask conceptual questions, request coding syntax, or test your knowledge.'
    },
    suggestedQuestions: [
      'Explain Stratified vs Cluster Sampling with Indian Census examples',
      'Show me how to compute survey weights in Python with Pandas',
      'What is the difference between PLFS CWS and UPS approaches?',
      'Generate 5 practice MCQs on National Accounts compilation'
    ]
  },
  {
    id: 'msg_02',
    sender: 'user',
    timestamp: '10:02 AM',
    content: 'Can you explain the key difference between Usual Principal Status (UPS) and Current Weekly Status (CWS) in the Periodic Labour Force Survey (PLFS)?',
  },
  {
    id: 'msg_03',
    sender: 'assistant',
    timestamp: '10:03 AM',
    content: 'In the Periodic Labour Force Survey (PLFS) conducted by NSO (MoSPI), the employment and unemployment status of an individual is evaluated using two complementary reference periods:\n\n**1. Usual Principal Status (UPS)**\n* **Reference Period:** Preceding 365 days (1 year).\n* **Core Concept:** An individual is categorized as employed/unemployed based on the major time criterion (spending relatively longer time, i.e., 183 days or more in that activity).\n* **Purpose:** Measures chronic, long-term employment status across rural and urban economies.\n\n**2. Current Weekly Status (CWS)**\n* **Reference Period:** Preceding 7 days prior to the date of survey.\n* **Core Concept:** A person is considered employed if they worked for at least 1 hour on any single day during the 7-day reference week.\n* **Purpose:** Captures short-term, seasonal, and intermittent fluctuations in the labour market.',
    callout: {
      title: 'Key Takeaway for Statistical Officers',
      text: 'UPS provides long-term structural workforce trends, whereas CWS captures high-frequency quarterly shifts and seasonal agricultural migration patterns.'
    },
    suggestedQuestions: [
      'Show me Python code to filter PLFS microdata by CWS status',
      'What is Usual Principal & Subsidiary Status (UPSS)?',
      'Test me with an MCQ on PLFS terminology'
    ]
  }
];

export const sampleNotifications: NotificationItem[] = [
  {
    id: 'notif_1',
    title: 'Assessment Recommendation Ready',
    message: 'Your Data Analysis competency has reached 80%. Phase 2 intermediate modules are now unlocked.',
    timestamp: '10 minutes ago',
    read: false,
    type: 'assessment'
  },
  {
    id: 'notif_2',
    title: 'New iGOT MoSPI Course Available',
    message: 'Course: "Geospatial Analytics for Official Statistical Planners" has been published on iGOT Karmayogi.',
    timestamp: '2 hours ago',
    read: false,
    type: 'course'
  },
  {
    id: 'notif_3',
    title: '12-Day Streak Milestone!',
    message: 'You have logged continuous learning hours for 12 consecutive working days. Keep up the great pace!',
    timestamp: 'Yesterday',
    read: true,
    type: 'achievement'
  }
];
