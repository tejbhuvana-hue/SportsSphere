(function () {
  // ==========================================
  // DEFAULT INITIAL STATE SEEDS
  // ==========================================

  const DEFAULT_ASSOCIATIONS = [
    {
      id: "assoc-sgfi",
      name: "Indian Football Association",
      email: "ifa@gmail.com",
      phone: "1234567890",
      sport: "Football",
      type: "professional",
      location: "Kolkata, India",
      status: "Approved",
      password: "123",
      image: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Indian_Football_Association_logo.png"
    },
    {
      id: "organization2",
      name: "BCCI",
      email: "bcci@gmail.com",
      phone: "1234567891",
      sport: "Cricket",
      type: "professional",
      location: "Mumbai, India",
      status: "Approved",
      password: "123",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/8/86/Board_of_Control_for_Cricket_in_India_Logo.svg/1200px-Board_of_Control_for_Cricket_in_India_Logo.svg.png"
    },
    {
      id: "organization3",
      name: "Badminton Association of India",
      email: "bai@gmail.com",
      phone: "1234567892",
      sport: "Badminton",
      type: "professional",
      location: "Delhi, India",
      status: "Approved",
      password: "123",
      image: "https://upload.wikimedia.org/wikipedia/en/2/2a/Badminton_Association_of_India_logo.png"
    }
  ];

  const DEFAULT_CLUBS = [
    {
      id: "club-mu",
      name: "Manchester United",
      type: "professional",
      sport: "Football",
      email: "mu@gmail.com",
      phone: "2223334444",
      location: "Manchester, UK",
      status: "Approved",
      association: "Indian Football Association",
      password: "123",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1184px-Manchester_United_FC_crest.svg.png"
    },
    {
      id: "club2",
      name: "Royal Challengers Bengaluru (RCB)",
      type: "professional",
      sport: "Cricket",
      email: "rcb@gmail.com",
      phone: "2223334445",
      location: "Bengaluru, India",
      status: "Approved",
      association: "BCCI",
      password: "123",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Royal_Challengers_Bangalore_2020_Logo.svg/1200px-Royal_Challengers_Bangalore_2020_Logo.svg.png"
    },
    {
      id: "club3",
      name: "Hyderabad Hunters",
      type: "professional",
      sport: "Badminton",
      email: "hunters@gmail.com",
      phone: "2223334446",
      location: "Hyderabad, India",
      status: "Approved",
      association: "Badminton Association of India",
      password: "123",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2f/Hyderabad_Hunters_logo.svg/800px-Hyderabad_Hunters_logo.svg.png"
    }
  ];

  const DEFAULT_COACHES = [
    {
      id: "coach-mike",
      name: "Mick Ross",
      email: "mike@gmail.com",
      phone: "5551234567",
      sport: "Football",
      experience: 10,
      status: "Approved",
      connectType: "club",
      connectTarget: "Manchester United",
      password: "123",
      image: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&w=800&q=80",
      skills: "Dribbling, Tactical Strategy, Attacking"
    },
    {
      id: "coach2",
      name: "Dinesh Karthik",
      email: "dk@gmail.com",
      phone: "5551234568",
      sport: "Cricket",
      experience: 15,
      status: "Approved",
      connectType: "club",
      connectTarget: "Royal Challengers Bengaluru (RCB)",
      password: "123",
      image: "https://img.olympics.com/images/image/private/t_16x9_760/primary/c74a0tqjlyrm7l1l7woc",
      skills: "Batting Technique, Wicketkeeping, Finisher Mindset"
    },
    {
      id: "coach3",
      name: "Pullela Gopichand",
      email: "gopichand@gmail.com",
      phone: "5551234569",
      sport: "Badminton",
      experience: 20,
      status: "Approved",
      connectType: "club",
      connectTarget: "Hyderabad Hunters",
      password: "123",
      image: "https://img.olympics.com/images/image/private/t_16x9_760/primary/w8i1m9s3h9kqqtphn3n0",
      skills: "Net Play, Tactical Defense, Physical Conditioning"
    }
  ];

  const DEFAULT_PLAYERS = [
    {
      id: "P001",
      name: "Cristiano Ronaldo",
      email: "ronaldo@gmail.com",
      phone: "1234567890",
      dob: "1985-02-05",
      gender: "male",
      sport: "Football",
      location: "Manchester, UK",
      status: "Approved",
      position: "Forward",
      skills: "Dribbling, Shooting, Attacking, Accuracy",
      club: "Manchester United",
      password: "123",
      image: "https://i.pinimg.com/736x/68/76/99/6876993a25a8fc274cc09aee12171034.jpg"
    },
    {
      id: "P002",
      name: "Virat Kohli",
      email: "kohli@gmail.com",
      phone: "9876543211",
      dob: "1988-11-05",
      gender: "male",
      sport: "Cricket",
      location: "Bengaluru, India",
      status: "Approved",
      position: "Batsman",
      skills: "Cover Drive, Chase Master, Batting Technique",
      club: "Royal Challengers Bengaluru (RCB)",
      password: "123",
      image: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1200,q_60/lsci/db/PICTURES/CMS/122300/122330.jpg"
    },
    {
      id: "P003",
      name: "PV Sindhu",
      email: "sindhu@gmail.com",
      phone: "9876543212",
      dob: "1995-07-05",
      gender: "female",
      sport: "Badminton",
      location: "Hyderabad, India",
      status: "Approved",
      position: "Singles Player",
      skills: "Smash, Net Play, Agility, Speed",
      club: "Hyderabad Hunters",
      password: "123",
      image: "https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_xl_2x/f_auto/primary/omhtslafb2il7kazygef"
    }
  ];

  const DEFAULT_EVENTS = [
    // Manchester United Events
    {
      id: "event-mu-trial",
      title: "Youth Football Trial",
      type: "club_trial",
      eventType: "trial",
      createdBy: "Manchester United",
      status: "Live",
      location: "Old Trafford Training Ground",
      venue: "Old Trafford Training Ground",
      date: "20 Jun - 25 Jun 2026",
      category: "Football",
      description: "Recruitment trial for the club's under-19 division.",
      applicants: [],
      poster: "https://images.unsplash.com/photo-1526232761682-d26e4f9c635a?w=800",
      visibleTo: ["player", "coach"]
    },
    {
      id: "event-mu-camp",
      title: "Summer Football Camp",
      type: "club_event",
      eventType: "camp",
      createdBy: "Manchester United",
      status: "Live",
      location: "Wembley Academy Ground",
      venue: "Wembley Academy Ground",
      date: "10 Jul - 15 Jul 2026",
      category: "Football",
      description: "Intensive 5-day camp to learn football fundamentals under club coaches.",
      applicants: [],
      poster: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800",
      visibleTo: ["player", "coach"]
    },
    {
      id: "event-mu-championship",
      title: "Club Championship",
      type: "club_event",
      eventType: "camp",
      createdBy: "Manchester United",
      status: "Upcoming",
      location: "Old Trafford Stadium",
      venue: "Old Trafford Stadium",
      date: "01 Aug - 05 Aug 2026",
      category: "Football",
      description: "Manchester United internal member club tournament.",
      applicants: [],
      poster: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800",
      visibleTo: ["player", "coach"]
    },
    {
      id: "event-mu-community",
      title: "Community Football Festival",
      type: "club_event",
      eventType: "camp",
      createdBy: "Manchester United",
      status: "Upcoming",
      location: "Manchester Sports Park",
      venue: "Manchester Sports Park",
      date: "15 Aug 2026",
      category: "Football",
      description: "A fun-filled day of friendly matches and community interaction.",
      applicants: [],
      poster: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?w=800",
      visibleTo: ["player", "coach"]
    },

    // RCB Events
    {
      id: "event-rcb-hunt",
      title: "Cricket Talent Hunt",
      type: "club_trial",
      eventType: "trial",
      createdBy: "Royal Challengers Bengaluru (RCB)",
      status: "Live",
      location: "Chinnaswamy Stadium, Bengaluru",
      venue: "Chinnaswamy Stadium, Bengaluru",
      date: "18 Jun - 22 Jun 2026",
      category: "Cricket",
      description: "National level scouting trials for RCB development squad.",
      applicants: [],
      poster: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800",
      visibleTo: ["player", "coach"]
    },
    {
      id: "event-rcb-camp",
      title: "T20 League Camp",
      type: "club_event",
      eventType: "camp",
      createdBy: "Royal Challengers Bengaluru (RCB)",
      status: "Live",
      location: "RCB Academy Ground",
      venue: "RCB Academy Ground",
      date: "05 Jul - 12 Jul 2026",
      category: "Cricket",
      description: "Tactical and physical camp preparing for local T20 tournaments.",
      applicants: [],
      poster: "https://images.unsplash.com/photo-1540747737956-3787293a9fc4?w=800",
      visibleTo: ["player", "coach"]
    },
    {
      id: "event-rcb-junior",
      title: "Junior Cricket Tournament",
      type: "club_event",
      eventType: "camp",
      createdBy: "Royal Challengers Bengaluru (RCB)",
      status: "Upcoming",
      location: "Bengaluru Club Ground",
      venue: "Bengaluru Club Ground",
      date: "20 Aug - 25 Aug 2026",
      category: "Cricket",
      description: "Under-16 junior championship hosted by RCB.",
      applicants: [],
      poster: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800",
      visibleTo: ["player", "coach"]
    },
    {
      id: "event-rcb-meet",
      title: "Fan Meet Event",
      type: "club_event",
      eventType: "camp",
      createdBy: "Royal Challengers Bengaluru (RCB)",
      status: "Upcoming",
      location: "Chinnaswamy Stadium, Bengaluru",
      venue: "Chinnaswamy Stadium, Bengaluru",
      date: "10 Sep 2026",
      category: "Cricket",
      description: "Exclusive meet and greet session with RCB team members.",
      applicants: [],
      poster: "https://images.unsplash.com/photo-1508424757105-b6d5ad9329d0?w=800",
      visibleTo: ["player", "coach"]
    },

    // Hyderabad Hunters Events
    {
      id: "event-hunters-scout",
      title: "Badminton Talent Scout",
      type: "club_trial",
      eventType: "trial",
      createdBy: "Hyderabad Hunters",
      status: "Live",
      location: "Gachibowli Indoor Stadium, Hyderabad",
      venue: "Gachibowli Indoor Stadium, Hyderabad",
      date: "25 Jun - 28 Jun 2026",
      category: "Badminton",
      description: "Scouting for elite players to join the Hunters academy.",
      applicants: [],
      poster: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800",
      visibleTo: ["player", "coach"]
    },
    {
      id: "event-hunters-camp",
      title: "Monsoon Badminton Camp",
      type: "club_event",
      eventType: "camp",
      createdBy: "Hyderabad Hunters",
      status: "Live",
      location: "Hunters Academy Court",
      venue: "Hunters Academy Court",
      date: "02 Jul - 08 Jul 2026",
      category: "Badminton",
      description: "A conditioning and skill camp during the monsoon break.",
      applicants: [],
      poster: "https://images.unsplash.com/photo-1578269174936-2709b5a8c0e6?w=800",
      visibleTo: ["player", "coach"]
    },
    {
      id: "event-hunters-cup",
      title: "Hunters Cup League",
      type: "club_event",
      eventType: "camp",
      createdBy: "Hyderabad Hunters",
      status: "Upcoming",
      location: "Hunters Court, Hyderabad",
      venue: "Hunters Court, Hyderabad",
      date: "12 Aug - 18 Aug 2026",
      category: "Badminton",
      description: "Annual club league for members and academy trainees.",
      applicants: [],
      poster: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?w=800",
      visibleTo: ["player", "coach"]
    },
    {
      id: "event-hunters-meet",
      title: "Community Badminton Meet",
      type: "club_event",
      eventType: "camp",
      createdBy: "Hyderabad Hunters",
      status: "Upcoming",
      location: "Hyderabad Central Club",
      venue: "Hyderabad Central Club",
      date: "20 Sep 2026",
      category: "Badminton",
      description: "A public event showing badminton exhibition matches and free coaching.",
      applicants: [],
      poster: "https://images.unsplash.com/photo-1508424757105-b6d5ad9329d0?w=800",
      visibleTo: ["player", "coach"]
    },

    // IFA Events
    {
      id: "event-ifa-champ",
      title: "National Football Championship",
      type: "tournament",
      eventType: "tournament",
      createdBy: "Indian Football Association",
      status: "Live",
      location: "Salt Lake Stadium, Kolkata",
      venue: "Salt Lake Stadium, Kolkata",
      date: "05 Jul - 20 Jul 2026",
      category: "Football",
      description: "Premier inter-club football championship of India.",
      applicants: [],
      poster: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800",
      visibleTo: ["player", "coach", "club"]
    },
    {
      id: "event-ifa-u19",
      title: "U19 Football League",
      type: "tournament",
      eventType: "tournament",
      createdBy: "Indian Football Association",
      status: "Live",
      location: "Kolkata Youth Stadium",
      venue: "Kolkata Youth Stadium",
      date: "10 Jul - 25 Jul 2026",
      category: "Football",
      description: "National junior tournament for registered club teams.",
      applicants: [],
      poster: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800",
      visibleTo: ["player", "coach", "club"]
    },
    {
      id: "event-ifa-selection",
      title: "Coaching Selection Camp",
      type: "association_event",
      eventType: "association",
      createdBy: "Indian Football Association",
      status: "Upcoming",
      location: "IFA Academy Ground",
      venue: "IFA Academy Ground",
      date: "05 Aug - 10 Aug 2026",
      category: "Football",
      description: "National camp for coaching license credentials and trials.",
      applicants: [],
      poster: "https://images.unsplash.com/photo-1526232761682-d26e4f9c635a?w=800",
      visibleTo: ["player", "coach"]
    },
    {
      id: "event-ifa-grassroots",
      title: "Grassroots Development Camp",
      type: "association_event",
      eventType: "association",
      createdBy: "Indian Football Association",
      status: "Upcoming",
      location: "Kolkata Football Ground",
      venue: "Kolkata Football Ground",
      date: "22 Aug - 28 Aug 2026",
      category: "Football",
      description: "Free training and scouting camp for local schools.",
      applicants: [],
      poster: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?w=800",
      visibleTo: ["player", "coach"]
    },

    // BCCI Events
    {
      id: "event-bcci-champ",
      title: "National Cricket Championship 2026",
      type: "tournament",
      eventType: "tournament",
      createdBy: "BCCI",
      status: "Live",
      location: "Wankhede Stadium, Mumbai",
      venue: "Wankhede Stadium, Mumbai",
      date: "12 Jul - 30 Jul 2026",
      category: "Cricket",
      description: "The premier domestic cricket tournament in the country.",
      applicants: [],
      poster: "https://images.unsplash.com/photo-1540747737956-3787293a9fc4?w=800",
      visibleTo: ["player", "coach", "club"]
    },
    {
      id: "event-bcci-u19",
      title: "U19 Tournament",
      type: "tournament",
      eventType: "tournament",
      createdBy: "BCCI",
      status: "Live",
      location: "NCA Ground, Bengaluru",
      venue: "NCA Ground, Bengaluru",
      date: "05 Aug - 15 Aug 2026",
      category: "Cricket",
      description: "Under-19 selection cup for the national squad.",
      applicants: [],
      poster: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800",
      visibleTo: ["player", "coach", "club"]
    },
    {
      id: "event-bcci-women",
      title: "Women's Cricket League",
      type: "tournament",
      eventType: "tournament",
      createdBy: "BCCI",
      status: "Upcoming",
      location: "DY Patil Stadium, Mumbai",
      venue: "DY Patil Stadium, Mumbai",
      date: "01 Sep - 12 Sep 2026",
      category: "Cricket",
      description: "Championship for top domestic women's clubs.",
      applicants: [],
      poster: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800",
      visibleTo: ["player", "coach", "club"]
    },
    {
      id: "event-bcci-camp",
      title: "Talent Development Camp",
      type: "association_event",
      eventType: "association",
      createdBy: "BCCI",
      status: "Upcoming",
      location: "NCA Bengaluru",
      venue: "NCA Bengaluru",
      date: "20 Sep - 30 Sep 2026",
      category: "Cricket",
      description: "Specialized training camp for high-potential domestic players.",
      applicants: [],
      poster: "https://images.unsplash.com/photo-1508424757105-b6d5ad9329d0?w=800",
      visibleTo: ["player", "coach"]
    },

    // BAI Events
    {
      id: "event-bai-champ",
      title: "National Badminton Championship",
      type: "tournament",
      eventType: "tournament",
      createdBy: "Badminton Association of India",
      status: "Live",
      location: "IGI Stadium, Delhi",
      venue: "IGI Stadium, Delhi",
      date: "15 Jul - 22 Jul 2026",
      category: "Badminton",
      description: "The annual national championship for singles and doubles.",
      applicants: [],
      poster: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800",
      visibleTo: ["player", "coach", "club"]
    },
    {
      id: "event-bai-junior",
      title: "Junior Badminton League",
      type: "tournament",
      eventType: "tournament",
      createdBy: "Badminton Association of India",
      status: "Live",
      location: "Delhi Sports Complex",
      venue: "Delhi Sports Complex",
      date: "01 Aug - 08 Aug 2026",
      category: "Badminton",
      description: "Inter-club junior national tournament.",
      applicants: [],
      poster: "https://images.unsplash.com/photo-1578269174936-2709b5a8c0e6?w=800",
      visibleTo: ["player", "coach", "club"]
    },
    {
      id: "event-bai-trials",
      title: "Olympic Selection Trials",
      type: "association_event",
      eventType: "association",
      createdBy: "Badminton Association of India",
      status: "Upcoming",
      location: "BAI Academy, Hyderabad",
      venue: "BAI Academy, Hyderabad",
      date: "05 Sep - 10 Sep 2026",
      category: "Badminton",
      description: "Official trials to select the national representatives.",
      applicants: [],
      poster: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?w=800",
      visibleTo: ["player", "coach"]
    },
    {
      id: "event-bai-clinic",
      title: "BAI Coaching Clinic",
      type: "association_event",
      eventType: "association",
      createdBy: "Badminton Association of India",
      status: "Upcoming",
      location: "Delhi Indoor Courts",
      venue: "Delhi Indoor Courts",
      date: "18 Sep - 22 Sep 2026",
      category: "Badminton",
      description: "Advanced technical workshop for national level coaches.",
      applicants: [],
      poster: "https://images.unsplash.com/photo-1508424757105-b6d5ad9329d0?w=800",
      visibleTo: ["player", "coach"]
    }
  ];

  const DEFAULT_MATCHES = [];
  const DEFAULT_HISTORY = [];

  const DEFAULT_POSTS = [
    {
      id: "post-cr7-1",
      authorId: "P001",
      authorName: "Cristiano Ronaldo",
      authorRole: "player",
      authorImage: "https://i.pinimg.com/736x/68/76/99/6876993a25a8fc274cc09aee12171034.jpg",
      sport: "Football",
      caption: "Back on the pitch for an intense training session! No days off. ⚽🔥 #Focus #Grind #CR7",
      image: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=800",
      likes: "142k",
      comments: "12k",
      date: "2 hours ago"
    },
    {
      id: "post-cr7-2",
      authorId: "P001",
      authorName: "Cristiano Ronaldo",
      authorRole: "player",
      authorImage: "https://i.pinimg.com/736x/68/76/99/6876993a25a8fc274cc09aee12171034.jpg",
      sport: "Football",
      caption: "Incredible team performance today! Proud of the win and the three points. Thank you to the fans for the amazing support! 🙌🏆 #Victory #RedDevils",
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800",
      likes: "250k",
      comments: "18k",
      date: "1 day ago"
    },
    {
      id: "post-vk-1",
      authorId: "P002",
      authorName: "Virat Kohli",
      authorRole: "player",
      authorImage: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1200,q_60/lsci/db/PICTURES/CMS/122300/122330.jpg",
      sport: "Cricket",
      caption: "Putting in the hard yards at the nets. Preparation is key to execution. 🏏🔥 #PracticeHard #CricketLife #VK",
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800",
      likes: "98k",
      comments: "8.5k",
      date: "4 hours ago"
    },
    {
      id: "post-vk-2",
      authorId: "P002",
      authorName: "Virat Kohli",
      authorRole: "player",
      authorImage: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1200,q_60/lsci/db/PICTURES/CMS/122300/122330.jpg",
      sport: "Cricket",
      caption: "A special day on the field! Grateful for the century and the team win. Let's keep this momentum going! 💯🙏 #Centurion #RCB",
      image: "https://images.unsplash.com/photo-1540747737956-3787293a9fc4?w=800",
      likes: "180k",
      comments: "14k",
      date: "2 days ago"
    },
    {
      id: "post-pvs-1",
      authorId: "P003",
      authorName: "PV Sindhu",
      authorRole: "player",
      authorImage: "https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_xl_2x/f_auto/primary/omhtslafb2il7kazygef",
      sport: "Badminton",
      caption: "Gearing up for the upcoming championship. Training hard, staying focused. Let's do this! 🏸💪 #Badminton #Fitness",
      image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800",
      likes: "32k",
      comments: "1.2k",
      date: "5 hours ago"
    },
    {
      id: "post-pvs-2",
      authorId: "P003",
      authorName: "PV Sindhu",
      authorRole: "player",
      authorImage: "https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_xl_2x/f_auto/primary/omhtslafb2il7kazygef",
      sport: "Badminton",
      caption: "Proud moment representing the nation! Hard work pays off. Medal secured at the world tour. 🇮🇳🥈 #IndiaProud #Medalist",
      image: "https://images.unsplash.com/photo-1578269174936-2709b5a8c0e6?w=800",
      likes: "55k",
      comments: "3k",
      date: "3 days ago"
    },
    {
      id: "post-mr-1",
      authorId: "coach-mike",
      authorName: "Mick Ross",
      authorRole: "coach",
      authorImage: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&w=800&q=80",
      sport: "Football",
      caption: "Analyzing team formations and tactical adjustments for our next opponent. Precision in strategy leads to victory on the pitch. ⚽📝 #Tactics #FootballCoach",
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800",
      likes: "12k",
      comments: "500",
      date: "6 hours ago"
    },
    {
      id: "post-mr-2",
      authorId: "coach-mike",
      authorName: "Mick Ross",
      authorRole: "coach",
      authorImage: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&w=800&q=80",
      sport: "Football",
      caption: "Incredible progress from our youth academy squad today. The future is extremely bright. Keep pushing boys! 🏃⚽ #NextGen #YouthDevelopment",
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800",
      likes: "15k",
      comments: "720",
      date: "3 days ago"
    },
    {
      id: "post-dk-1",
      authorId: "coach2",
      authorName: "Dinesh Karthik",
      authorRole: "coach",
      authorImage: "https://img.olympics.com/images/image/private/t_16x9_760/primary/c74a0tqjlyrm7l1l7woc",
      sport: "Cricket",
      caption: "Working on speed and agility behind the stumps today. Gloves on, eyes on the ball! 🧤🏏 #Wicketkeeping #CoachLife",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800",
      likes: "24k",
      comments: "1.1k",
      date: "8 hours ago"
    },
    {
      id: "post-dk-2",
      authorId: "coach2",
      authorName: "Dinesh Karthik",
      authorRole: "coach",
      authorImage: "https://img.olympics.com/images/image/private/t_16x9_760/primary/c74a0tqjlyrm7l1l7woc",
      sport: "Cricket",
      caption: "Had a great session discussing finishing strategies with the young batters. It's all about staying calm under pressure. 🧠⚡ #Finisher #Mindset",
      image: "https://images.unsplash.com/photo-1540747737956-3787293a9fc4?w=800",
      likes: "42k",
      comments: "2.5k",
      date: "2 days ago"
    },
    {
      id: "post-pg-1",
      authorId: "coach3",
      authorName: "Pullela Gopichand",
      authorRole: "coach",
      authorImage: "https://img.olympics.com/images/image/private/t_16x9_760/primary/w8i1m9s3h9kqqtphn3n0",
      sport: "Badminton",
      caption: "Early morning training session at the academy. Building the champions of tomorrow with dedication and discipline. 🏸🌅 #GopichandAcademy #Badminton",
      image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800",
      likes: "18k",
      comments: "980",
      date: "12 hours ago"
    },
    {
      id: "post-pg-2",
      authorId: "coach3",
      authorName: "Pullela Gopichand",
      authorRole: "coach",
      authorImage: "https://img.olympics.com/images/image/private/t_16x9_760/primary/w8i1m9s3h9kqqtphn3n0",
      sport: "Badminton",
      caption: "Reviewing player statistics and match video for the national qualifiers. The intensity in training has been outstanding. 🏸📈 #RoadToGold #Coaching",
      image: "https://images.unsplash.com/photo-1578269174936-2709b5a8c0e6?w=800",
      likes: "22k",
      comments: "1.4k",
      date: "4 days ago"
    },
    {
      id: "post-mu-1",
      authorId: "club-mu",
      authorName: "Manchester United",
      authorRole: "club",
      authorImage: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1184px-Manchester_United_FC_crest.svg.png",
      sport: "Football",
      caption: "Registration is now open for our annual Youth Football Trials. Discover your path to the theater of dreams! ⚽🌟 #MUFC #YouthTrials",
      image: "https://images.unsplash.com/photo-1526232761682-d26e4f9c635a?w=800",
      likes: "85k",
      comments: "3.5k",
      date: "14 hours ago"
    },
    {
      id: "post-mu-2",
      authorId: "club-mu",
      authorName: "Manchester United",
      authorRole: "club",
      authorImage: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1184px-Manchester_United_FC_crest.svg.png",
      sport: "Football",
      caption: "What a fantastic week at our Summer Football Camp! Over 200 young players trained with our official club coaches. 🔴⚽ #RedDevils #SummerCamp",
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800",
      likes: "94k",
      comments: "4.2k",
      date: "3 days ago"
    },
    {
      id: "post-rcb-1",
      authorId: "club2",
      authorName: "Royal Challengers Bengaluru (RCB)",
      authorRole: "club",
      authorImage: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Royal_Challengers_Bangalore_2020_Logo.svg/1200px-Royal_Challengers_Bangalore_2020_Logo.svg.png",
      sport: "Cricket",
      caption: "RCB Talent Hunt begins this weekend! We are scouting for the next big T20 stars across the country. Register now. 🏏🔥 #PlayBold #TalentScout",
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800",
      likes: "72k",
      comments: "5.1k",
      date: "16 hours ago"
    },
    {
      id: "post-rcb-2",
      authorId: "club2",
      authorName: "Royal Challengers Bengaluru (RCB)",
      authorRole: "club",
      authorImage: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Royal_Challengers_Bangalore_2020_Logo.svg/1200px-Royal_Challengers_Bangalore_2020_Logo.svg.png",
      sport: "Cricket",
      caption: "Thank you to the amazing 12th Man Army for coming out in thousands for our annual Fan Meet Event! Your energy is unmatched. ❤️ RCB! #RCB #12thMan",
      image: "https://images.unsplash.com/photo-1540747737956-3787293a9fc4?w=800",
      likes: "110k",
      comments: "9.2k",
      date: "4 days ago"
    },
    {
      id: "post-hh-1",
      authorId: "club3",
      authorName: "Hyderabad Hunters",
      authorRole: "club",
      authorImage: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2f/Hyderabad_Hunters_logo.svg/800px-Hyderabad_Hunters_logo.svg.png",
      sport: "Badminton",
      caption: "Hyderabad Hunters is organizing an exclusive Smash Clinic this Friday under national coaches. Limited slots, register today! 🏸💥 #SmashClinic #Hunters",
      image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800",
      likes: "14k",
      comments: "310",
      date: "18 hours ago"
    },
    {
      id: "post-hh-2",
      authorId: "club3",
      authorName: "Hyderabad Hunters",
      authorRole: "club",
      authorImage: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2f/Hyderabad_Hunters_logo.svg/800px-Hyderabad_Hunters_logo.svg.png",
      sport: "Badminton",
      caption: "A great team bonding session over dinner before we head out for the Premier Badminton League. Let's hunt together! 🏸🍽️ #TeamHunters #PBL",
      image: "https://images.unsplash.com/photo-1508424757105-b6d5ad9329d0?w=800",
      likes: "19k",
      comments: "480",
      date: "5 days ago"
    },
    {
      id: "post-ifa-1",
      authorId: "assoc-sgfi",
      authorName: "Indian Football Association",
      authorRole: "organization",
      authorImage: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Indian_Football_Association_logo.png",
      sport: "Football",
      caption: "The historic IFA Shield is back! We are thrilled to announce the participating teams and schedule for the 2026 edition. ⚽🏆 #IFAShield #IndianFootball",
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800",
      likes: "25k",
      comments: "1.1k",
      date: "20 hours ago"
    },
    {
      id: "post-ifa-2",
      authorId: "assoc-sgfi",
      authorName: "Indian Football Association",
      authorRole: "organization",
      authorImage: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Indian_Football_Association_logo.png",
      sport: "Football",
      caption: "Empowering coaches at our Grassroots Coaching Clinic in Kolkata. Developing football from the ground up. ⚽🇮🇳 #Grassroots #IFA",
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800",
      likes: "30k",
      comments: "1.8k",
      date: "6 days ago"
    },
    {
      id: "post-bcci-1",
      authorId: "organization2",
      authorName: "BCCI",
      authorRole: "organization",
      authorImage: "https://upload.wikimedia.org/wikipedia/en/thumb/8/86/Board_of_Control_for_Cricket_in_India_Logo.svg/1200px-Board_of_Control_for_Cricket_in_India_Logo.svg.png",
      sport: "Cricket",
      caption: "BCCI announces the schedule for the upcoming National Cricket Championship 2026. Top domestic talent competing for the ultimate prize! 🏏🏆 #BCCI #RanjiTrophy",
      image: "https://images.unsplash.com/photo-1540747737956-3787293a9fc4?w=800",
      likes: "95k",
      comments: "7.2k",
      date: "1 day ago"
    },
    {
      id: "post-bcci-2",
      authorId: "organization2",
      authorName: "BCCI",
      authorRole: "organization",
      authorImage: "https://upload.wikimedia.org/wikipedia/en/thumb/8/86/Board_of_Control_for_Cricket_in_India_Logo.svg/1200px-Board_of_Control_for_Cricket_in_India_Logo.svg.png",
      sport: "Cricket",
      caption: "Unveiling the new development pathways and funding boost for the Women's Cricket League. The future of Indian cricket is female! 🇮🇳🏏 #WPL #BCCI",
      image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800",
      likes: "105k",
      comments: "8.1k",
      date: "7 days ago"
    },
    {
      id: "post-bai-1",
      authorId: "organization3",
      authorName: "Badminton Association of India",
      authorRole: "organization",
      authorImage: "https://upload.wikimedia.org/wikipedia/en/2/2a/Badminton_Association_of_India_logo.png",
      sport: "Badminton",
      caption: "The latest Badminton Association of India national rankings are out. Congratulations to all players on their progress. 🏸📊 #BAIRankings #Badminton",
      image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800",
      likes: "11k",
      comments: "250",
      date: "1 day ago"
    },
    {
      id: "post-bai-2",
      authorId: "organization3",
      authorName: "Badminton Association of India",
      authorRole: "organization",
      authorImage: "https://upload.wikimedia.org/wikipedia/en/2/2a/Badminton_Association_of_India_logo.png",
      sport: "Badminton",
      caption: "Day 1 of the BAI National Junior Talent Development Camp in Delhi. Training the next generation of badminton stars. 🏸🇮🇳 #JuniorCamp #BAI",
      image: "https://images.unsplash.com/photo-1578269174936-2709b5a8c0e6?w=800",
      likes: "15k",
      comments: "490",
      date: "8 days ago"
    }
  ];

  const DEFAULT_ACHIEVEMENTS = [
    // Cristiano Ronaldo
    {
      id: "ach-cr7-1",
      playerId: "P001",
      title: "Ballon d'Or Winner",
      organization: "FIFA / France Football",
      date: "Multiple Years",
      description: "Won the prestigious individual award 5 times for global football excellence.",
      certificate: "../../images/cert_district_winner.png",
      createdAt: "2026-01-01"
    },
    {
      id: "ach-cr7-2",
      playerId: "P001",
      title: "UEFA Champions League Winner",
      organization: "UEFA",
      date: "Multiple Years",
      description: "Won the UEFA Champions League title 5 times with Manchester United and Real Madrid.",
      certificate: "../../images/cert_best_midfielder.png",
      createdAt: "2026-01-01"
    },
    {
      id: "ach-cr7-3",
      playerId: "P001",
      title: "UEFA European Championship Winner",
      organization: "UEFA",
      date: "2016",
      description: "Led the Portuguese National Team to their historic Euro Cup victory.",
      certificate: "../../images/cert_state_participation.png",
      createdAt: "2016-07-10"
    },

    // Virat Kohli
    {
      id: "ach-vk-1",
      playerId: "P002",
      title: "ICC Cricketer of the Decade",
      organization: "International Cricket Council",
      date: "2020",
      description: "Awarded the Sir Garfield Sobers Trophy for male cricketer of the decade.",
      certificate: "../../images/cert_district_winner.png",
      createdAt: "2020-12-28"
    },
    {
      id: "ach-vk-2",
      playerId: "P002",
      title: "Major International Centuries",
      organization: "BCCI / ICC",
      date: "2008 - 2026",
      description: "Scored over 80 international centuries across Test, ODI, and T20 matches.",
      certificate: "../../images/cert_best_midfielder.png",
      createdAt: "2026-01-01"
    },
    {
      id: "ach-vk-3",
      playerId: "P002",
      title: "ICC ODI World Cup Winner",
      organization: "International Cricket Council",
      date: "2011",
      description: "Member of the Indian cricket squad that lifted the ICC Cricket World Cup.",
      certificate: "../../images/cert_state_participation.png",
      createdAt: "2011-04-02"
    },

    // PV Sindhu
    {
      id: "ach-pvs-1",
      playerId: "P003",
      title: "Olympic Silver Medalist",
      organization: "International Olympic Committee",
      date: "Rio 2016",
      description: "Won the silver medal in Women's Badminton Singles at the Rio Olympics.",
      certificate: "../../images/cert_district_winner.png",
      createdAt: "2016-08-19"
    },
    {
      id: "ach-pvs-2",
      playerId: "P003",
      title: "Olympic Bronze Medalist",
      organization: "International Olympic Committee",
      date: "Tokyo 2020",
      description: "Won the bronze medal in Women's Badminton Singles at the Tokyo Olympics.",
      certificate: "../../images/cert_best_midfielder.png",
      createdAt: "2021-08-01"
    },
    {
      id: "ach-pvs-3",
      playerId: "P003",
      title: "BWF World Champion",
      organization: "Badminton World Federation",
      date: "2019",
      description: "Won the gold medal at the BWF World Championships in Basel.",
      certificate: "../../images/cert_state_participation.png",
      createdAt: "2019-08-25"
    },

    // Mick Ross
    {
      id: "ach-mr-1",
      playerId: "coach-mike",
      title: "UEFA A Coaching License",
      organization: "UEFA",
      date: "2022",
      description: "Obtained advanced tactical coaching credentials from UEFA.",
      certificate: "../../images/cert_district_winner.png",
      createdAt: "2022-05-15"
    },
    {
      id: "ach-mr-2",
      playerId: "coach-mike",
      title: "English Premier League Youth Title",
      organization: "The Football Association",
      date: "2024",
      description: "Coached the Manchester United youth squad to league victory.",
      certificate: "../../images/cert_best_midfielder.png",
      createdAt: "2024-06-10"
    },
    {
      id: "ach-mr-3",
      playerId: "coach-mike",
      title: "Best Coach of the Year",
      organization: "National Football Academy Association",
      date: "2025",
      description: "Honored for outstanding tactical development and player progression.",
      certificate: "../../images/cert_state_participation.png",
      createdAt: "2025-10-15"
    },

    // Dinesh Karthik
    {
      id: "ach-dk-1",
      playerId: "coach2",
      title: "BCCI Certified Level-3 Coach",
      organization: "BCCI",
      date: "2025",
      description: "Completed the highest tier of cricket coaching certification in India.",
      certificate: "../../images/cert_district_winner.png",
      createdAt: "2025-11-20"
    },
    {
      id: "ach-dk-2",
      playerId: "coach2",
      title: "T20 World Cup Champion",
      organization: "ICC",
      date: "2007",
      description: "Active player in the historic Indian squad that won the inaugural T20 World Cup.",
      certificate: "../../images/cert_best_midfielder.png",
      createdAt: "2007-09-24"
    },
    {
      id: "ach-dk-3",
      playerId: "coach2",
      title: "Nidahas Trophy Finisher Award",
      organization: "Sri Lanka Cricket / BCCI",
      date: "2018",
      description: "Honored for exceptional finishing under pressure in tournament finals.",
      certificate: "../../images/cert_state_participation.png",
      createdAt: "2018-03-18"
    },

    // Pullela Gopichand
    {
      id: "ach-pg-1",
      playerId: "coach3",
      title: "Dronacharya Award Winner",
      organization: "Government of India",
      date: "2009",
      description: "Received India's highest sports coaching honor for outstanding mentorship.",
      certificate: "../../images/cert_district_winner.png",
      createdAt: "2009-08-29"
    },
    {
      id: "ach-pg-2",
      playerId: "coach3",
      title: "All England Open Badminton Champion",
      organization: "Badminton England",
      date: "2001",
      description: "Won the prestigious All England Open singles title as a player.",
      certificate: "../../images/cert_best_midfielder.png",
      createdAt: "2001-03-11"
    },
    {
      id: "ach-pg-3",
      playerId: "coach3",
      title: "Padma Bhushan Awardee",
      organization: "Government of India",
      date: "2014",
      description: "Received India's third-highest civilian award for contributions to badminton.",
      certificate: "../../images/cert_state_participation.png",
      createdAt: "2014-01-26"
    },

    // Manchester United
    {
      id: "ach-mun-1",
      playerId: "club-mu",
      title: "20-Time Premier League Champions",
      organization: "The Football Association",
      date: "1908 - 2013",
      description: "Hold the record for the most English top-flight league titles.",
      certificate: "../../images/cert_district_winner.png",
      createdAt: "2013-05-19"
    },
    {
      id: "ach-mun-2",
      playerId: "club-mu",
      title: "3-Time UEFA Champions League Winners",
      organization: "UEFA",
      date: "1968, 1999, 2008",
      description: "Champions of Europe's premier club tournament across three generations.",
      certificate: "../../images/cert_best_midfielder.png",
      createdAt: "2008-05-21"
    },
    {
      id: "ach-mun-3",
      playerId: "club-mu",
      title: "FIFA Club World Cup Winner",
      organization: "FIFA",
      date: "2008",
      description: "Crowned official champions of the world by winning the Club World Cup.",
      certificate: "../../images/cert_state_participation.png",
      createdAt: "2008-12-21"
    },

    // RCB
    {
      id: "ach-rcb-1",
      playerId: "club2",
      title: "T20 League Finalists",
      organization: "BCCI / IPL",
      date: "2009, 2011, 2016",
      description: "Finished as runners-up in three editions of the premier T20 league.",
      certificate: "../../images/cert_district_winner.png",
      createdAt: "2016-05-29"
    },
    {
      id: "ach-rcb-2",
      playerId: "club2",
      title: "Best Fan Engagement Award",
      organization: "Sports Business Journal",
      date: "2025",
      description: "Honored for having the most active and supportive global fan community.",
      certificate: "../../images/cert_best_midfielder.png",
      createdAt: "2025-11-15"
    },
    {
      id: "ach-rcb-3",
      playerId: "club2",
      title: "State Cricket Development Trophy",
      organization: "Karnataka State Cricket Association",
      date: "2026",
      description: "Recognized for grassroots coaching and talent identification programs.",
      certificate: "../../images/cert_state_participation.png",
      createdAt: "2026-03-10"
    },

    // Hyderabad Hunters
    {
      id: "ach-hh-1",
      playerId: "club3",
      title: "Premier Badminton League Champions",
      organization: "BAI / SportzLive",
      date: "2018",
      description: "Won the national franchise league championship title.",
      certificate: "../../images/cert_district_winner.png",
      createdAt: "2018-01-14"
    },
    {
      id: "ach-hh-2",
      playerId: "club3",
      title: "Best Badminton Infrastructure Award",
      organization: "Sports Authority of India",
      date: "2024",
      description: "Awarded for state-of-the-art training facilities and courts.",
      certificate: "../../images/cert_best_midfielder.png",
      createdAt: "2024-10-15"
    },
    {
      id: "ach-hh-3",
      playerId: "club3",
      title: "National Talent Identification Trophy",
      organization: "Badminton Association of India",
      date: "2025",
      description: "Recognized for discovering and training top junior players.",
      certificate: "../../images/cert_state_participation.png",
      createdAt: "2025-12-10"
    },

    // IFA
    {
      id: "ach-ifa-1",
      playerId: "assoc-sgfi",
      title: "IFA Shield Tournament Founder",
      organization: "Indian Football Association",
      date: "1893",
      description: "Established the historic IFA Shield, one of the oldest tournaments in the world.",
      certificate: "../../images/cert_district_winner.png",
      createdAt: "1893-01-01"
    },
    {
      id: "ach-ifa-2",
      playerId: "assoc-sgfi",
      title: "Century of Promoting Indian Football",
      organization: "AIFF / FIFA",
      date: "2024",
      description: "Honored for over 100 years of soccer promotion and administration in Bengal.",
      certificate: "../../images/cert_best_midfielder.png",
      createdAt: "2024-03-15"
    },
    {
      id: "ach-ifa-3",
      playerId: "assoc-sgfi",
      title: "Grassroots Development Excellence",
      organization: "Ministry of Sports, India",
      date: "2025",
      description: "Recognized for setting up elite soccer development centers in rural areas.",
      certificate: "../../images/cert_state_participation.png",
      createdAt: "2025-09-20"
    },

    // BCCI
    {
      id: "ach-bcci-1",
      playerId: "organization2",
      title: "World's Premier Cricket League Organizer",
      organization: "ICC / BCCI",
      date: "2008 - 2026",
      description: "Successfully organized and scaled the world's most watched T20 league.",
      certificate: "../../images/cert_district_winner.png",
      createdAt: "2026-01-01"
    },
    {
      id: "ach-bcci-2",
      playerId: "organization2",
      title: "National Cricket Academy Foundation",
      organization: "BCCI",
      date: "2000",
      description: "Established state-of-the-art facility for player rehabilitation and talent training.",
      certificate: "../../images/cert_best_midfielder.png",
      createdAt: "2000-05-01"
    },
    {
      id: "ach-bcci-3",
      playerId: "organization2",
      title: "Double ICC World Cup Host",
      organization: "International Cricket Council",
      date: "2011, 2023",
      description: "Successfully hosted and managed two major editions of the Cricket World Cup.",
      certificate: "../../images/cert_state_participation.png",
      createdAt: "2023-11-19"
    },

    // BAI
    {
      id: "ach-bai-1",
      playerId: "organization3",
      title: "BWF Tournament Organizer of the Year",
      organization: "Badminton World Federation",
      date: "2024",
      description: "Honored for executing premier BWF Super Series events in India.",
      certificate: "../../images/cert_district_winner.png",
      createdAt: "2024-12-18"
    },
    {
      id: "ach-bai-2",
      playerId: "organization3",
      title: "Olympic Medalist Production Milestone",
      organization: "Ministry of Sports, India",
      date: "2021",
      description: "Recognized for coaching infrastructure that produced consecutive Olympic medals.",
      certificate: "../../images/cert_best_midfielder.png",
      createdAt: "2021-08-10"
    },
    {
      id: "ach-bai-3",
      playerId: "organization3",
      title: "National Badminton Center Inauguration",
      organization: "Government of India / BAI",
      date: "2023",
      description: "Inaugurated a world-class 24-court national center in Guwahati.",
      certificate: "../../images/cert_state_participation.png",
      createdAt: "2023-08-12"
    }
  ];

  const DEFAULT_NOTIFICATIONS = [];

  // ==========================================
  // LOCALSTORAGE MANAGEMENT & RESET
  // ==========================================

  function seedApplicantsForEvents(events) {
    const players = [
      { id: "P001", name: "Cristiano Ronaldo", sport: "Football", role: "player", position: "Forward" },
      { id: "P002", name: "Virat Kohli", sport: "Cricket", role: "player", position: "Batsman" },
      { id: "P003", name: "PV Sindhu", sport: "Badminton", role: "player", position: "Singles Player" }
    ];

    const coaches = [
      { id: "coach-mike", name: "Mick Ross", sport: "Football", role: "coach", position: "Tactical Coach" },
      { id: "coach2", name: "Dinesh Karthik", sport: "Cricket", role: "coach", position: "Batting Coach" },
      { id: "coach3", name: "Pullela Gopichand", sport: "Badminton", role: "coach", position: "Head Coach" }
    ];

    const clubs = [
      { id: "club-mu", name: "Manchester United", sport: "Football", role: "club", position: "Club Application" },
      { id: "club2", name: "Royal Challengers Bengaluru (RCB)", sport: "Cricket", role: "club", position: "Club Application" },
      { id: "club3", name: "Hyderabad Hunters", sport: "Badminton", role: "club", position: "Club Application" }
    ];

    events.forEach(event => {
      const sport = event.category || "Football";
      const type = event.type || event.eventType;

      // 1. Club Events: trials or camps -> 2 players and 1 coach
      if (type === "club_trial" || type === "club_event" || type === "trial" || type === "camp") {
        // Find players for this sport
        let sportPlayers = players.filter(p => p.sport.toLowerCase() === sport.toLowerCase());
        // If not enough, fill with other players
        if (sportPlayers.length < 2) {
          const otherPlayers = players.filter(p => !sportPlayers.includes(p));
          sportPlayers = [...sportPlayers, ...otherPlayers].slice(0, 2);
        }

        // Find coach for this sport
        let sportCoach = coaches.find(c => c.sport.toLowerCase() === sport.toLowerCase()) || coaches[0];

        // Format applicants
        event.applicants = [
          {
            playerId: sportPlayers[0].id,
            id: sportPlayers[0].id,
            name: sportPlayers[0].name,
            position: sportPlayers[0].position,
            certificate: "cert_level1.pdf",
            status: "Pending",
            role: "player",
            timestamp: new Date().toISOString()
          },
          {
            playerId: sportPlayers[1].id,
            id: sportPlayers[1].id,
            name: sportPlayers[1].name,
            position: sportPlayers[1].position,
            certificate: "cert_level2.pdf",
            status: "Pending",
            role: "player",
            timestamp: new Date().toISOString()
          },
          {
            playerId: sportCoach.id,
            id: sportCoach.id,
            name: sportCoach.name,
            position: sportCoach.position,
            certificate: "coach_license.pdf",
            status: "Pending",
            role: "coach",
            timestamp: new Date().toISOString()
          }
        ];
      }
      
      // 2. Association Tournaments -> add club related to that sport
      if (type === "tournament" || type === "association_event" || type === "association") {
        // Find club for this sport
        let sportClub = clubs.find(c => c.sport.toLowerCase() === sport.toLowerCase());
        if (sportClub) {
          event.applicants = [
            {
              playerId: sportClub.id,
              id: sportClub.id,
              name: sportClub.name,
              position: "Club Entry",
              certificate: "club_registration.pdf",
              status: "Pending",
              role: "club",
              clubId: sportClub.id,
              timestamp: new Date().toISOString()
            }
          ];
        } else {
          event.applicants = [];
        }
      }
    });
  }

  function initSportsState() {
    const resetKey = "sports_reset_v13";
    const hasReset = localStorage.getItem(resetKey);

    if (!hasReset) {
      // 1. Purge all old state and admin managers keys
      localStorage.removeItem("sports_achievements");
      localStorage.removeItem("sports_events");
      localStorage.removeItem("sports_notifications");
      localStorage.removeItem("sports_matches");
      localStorage.removeItem("sports_history");
      localStorage.removeItem("sports_schedules");
      localStorage.removeItem("tournaments");
      localStorage.removeItem("scores");
      localStorage.removeItem("event_history");
      localStorage.removeItem("match_history");
      localStorage.removeItem("SportsSphere.EventFlow.State");
      localStorage.removeItem("ss_events");
      localStorage.removeItem("ss_players");
      localStorage.removeItem("ss_coaches");
      localStorage.removeItem("ss_clubs");
      localStorage.removeItem("ss_organizations");
      localStorage.removeItem("ss_notifications");
      localStorage.removeItem("ss_activity_logs");
      localStorage.removeItem("ss_registrations");
      localStorage.removeItem("sports_trials");
      localStorage.removeItem("sports_tournaments");
      localStorage.removeItem("sports_applications");
      localStorage.removeItem("sports_posts");
      localStorage.removeItem("sports_players");
      localStorage.removeItem("sports_coaches");
      localStorage.removeItem("sports_clubs");
      localStorage.removeItem("sports_associations");

      // 2. Initialize fresh structures
      const seededEvents = JSON.parse(JSON.stringify(DEFAULT_EVENTS));
      seedApplicantsForEvents(seededEvents);
      saveEvents(seededEvents);
      localStorage.setItem("sports_notifications", JSON.stringify([]));
      localStorage.setItem("sports_applications", JSON.stringify([]));
      localStorage.setItem("sports_matches", JSON.stringify(DEFAULT_MATCHES));
      localStorage.setItem("sports_history", JSON.stringify(DEFAULT_HISTORY));
      localStorage.setItem("sports_schedules", JSON.stringify([]));
      localStorage.setItem("sports_posts", JSON.stringify(DEFAULT_POSTS));
      localStorage.setItem("sports_achievements", JSON.stringify({ achievements: DEFAULT_ACHIEVEMENTS }));
      localStorage.setItem("sports_players", JSON.stringify(DEFAULT_PLAYERS));
      localStorage.setItem("sports_clubs", JSON.stringify(DEFAULT_CLUBS));
      localStorage.setItem("sports_coaches", JSON.stringify(DEFAULT_COACHES));
      localStorage.setItem("sports_associations", JSON.stringify(DEFAULT_ASSOCIATIONS));

      localStorage.setItem(resetKey, "true");
    } else {
      if (!localStorage.getItem("sports_events")) {
        const seededEvents = JSON.parse(JSON.stringify(DEFAULT_EVENTS));
        seedApplicantsForEvents(seededEvents);
        saveEvents(seededEvents);
        localStorage.setItem("sports_notifications", JSON.stringify([]));
        localStorage.setItem("sports_matches", JSON.stringify(DEFAULT_MATCHES));
        localStorage.setItem("sports_history", JSON.stringify(DEFAULT_HISTORY));
        localStorage.setItem("sports_schedules", JSON.stringify([]));
      }
      if (!localStorage.getItem("sports_trials")) {
        localStorage.setItem("sports_trials", JSON.stringify([]));
      }
      if (!localStorage.getItem("sports_tournaments")) {
        localStorage.setItem("sports_tournaments", JSON.stringify([]));
      }
      if (!localStorage.getItem("sports_applications")) {
        localStorage.setItem("sports_applications", JSON.stringify([]));
      }
      if (!localStorage.getItem("sports_posts")) {
        localStorage.setItem("sports_posts", JSON.stringify(DEFAULT_POSTS));
      }
      if (!localStorage.getItem("sports_achievements")) {
        localStorage.setItem("sports_achievements", JSON.stringify({ achievements: DEFAULT_ACHIEVEMENTS }));
      }
      if (!localStorage.getItem("sports_players")) {
        localStorage.setItem("sports_players", JSON.stringify(DEFAULT_PLAYERS));
      }
      if (!localStorage.getItem("sports_clubs")) {
        localStorage.setItem("sports_clubs", JSON.stringify(DEFAULT_CLUBS));
      }
      if (!localStorage.getItem("sports_coaches")) {
        localStorage.setItem("sports_coaches", JSON.stringify(DEFAULT_COACHES));
      }
      if (!localStorage.getItem("sports_associations")) {
        localStorage.setItem("sports_associations", JSON.stringify(DEFAULT_ASSOCIATIONS));
      }
    }
  }

  // Execute initialization
  initSportsState();

  // Helper APIs for reading/writing collections
  function getCollection(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }

  function saveCollection(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // ==========================================
  // CORE API EXPORTS
  // ==========================================

  // Events API
  function getEvents() {
    const events = getCollection("sports_events");
    const trials = getCollection("sports_trials");
    const tournaments = getCollection("sports_tournaments");
    return [...events, ...trials, ...tournaments];
  }

  function saveEvents(allEvents) {
    const events = [];
    const trials = [];
    const tournaments = [];

    allEvents.forEach((e) => {
      const type = e.type || e.eventType;
      if (type === "trial" || type === "club_trial") {
        e.type = "club_trial";
        e.eventType = "trial";
        trials.push(e);
      } else if (type === "tournament") {
        e.type = "tournament";
        e.eventType = "tournament";
        tournaments.push(e);
      } else if (type === "camp" || type === "club_event") {
        e.type = "club_event";
        e.eventType = "camp";
        events.push(e);
      } else {
        e.type = "association_event";
        e.eventType = "association";
        events.push(e);
      }
    });

    saveCollection("sports_events", events);
    saveCollection("sports_trials", trials);
    saveCollection("sports_tournaments", tournaments);
  }

  function addEvent(event) {
    const events = getEvents();
    event.id = event.id || `event-${Date.now()}`;
    event.timestamp = event.timestamp || new Date().toISOString();
    event.status = event.status || "Upcoming";
    event.applicants = event.applicants || [];
    event.venue = event.venue || event.location || "Stadium";
    event.location = event.venue;

    const type = event.type || event.eventType;
    if (type === "trial" || type === "club_trial") {
      event.type = "club_trial";
      event.eventType = "trial";
      event.organizerType = "club";
    } else if (type === "tournament") {
      event.type = "tournament";
      event.eventType = "tournament";
      event.organizerType = "association";
    } else if (type === "camp" || type === "club_event") {
      event.type = "club_event";
      event.eventType = "camp";
      event.organizerType = "club";
    } else {
      event.type = "association_event";
      event.eventType = "association";
      event.organizerType = "association";
    }

    const currentUserId = getCurrentUserId();
    if (event.organizerType === "club") {
      event.clubId = currentUserId;
      event.associationId = null;
    } else {
      event.associationId = currentUserId;
      event.clubId = null;
    }

    events.unshift(event);
    saveEvents(events);

    // Broadcast targeted notifications
    let title = "New Event Posted";
    let message = `${event.createdBy} posted a new ${event.type.replace("_", " ")}: ${event.title}`;
    let nType = "event_posted";
    let visibleTo = ["player", "coach", "club", "organization"];
    let targetClubName = null;

    if (event.type === "club_event") {
      title = "New Club Event";
      message = `Internal Club Event: ${event.title} is now scheduled.`;
      visibleTo = ["player", "coach"];
      targetClubName = event.createdBy;
    } else if (event.type === "club_trial") {
      title = "Open Club Trial";
      message = `${event.createdBy} announced Open Recruitment Trials: ${event.title}.`;
      visibleTo = ["player", "coach"];
    } else if (event.type === "association_event") {
      title = "Association Event";
      message = `New selection or camp announced: ${event.title}.`;
      visibleTo = ["player", "coach"];
    } else if (event.type === "tournament") {
      title = "New Tournament";
      message = `Registration is open for: ${event.title}.`;
      visibleTo = ["club"];
    }

    createNotification(
      title,
      message,
      nType,
      event.createdBy,
      visibleTo,
      targetClubName,
    );
  }

  // Matches API
  function getMatches() {
    return getCollection("sports_matches");
  }

  function saveMatches(matches) {
    saveCollection("sports_matches", matches);
  }

  function addMatch(match) {
    const matches = getMatches();
    match.id = match.id || `match-${Date.now()}`;
    match.status = match.status || "Upcoming";
    match.score = match.score || "0 - 0";
    matches.unshift(match);
    saveMatches(matches);

    createNotification(
      "New Match Scheduled",
      `Match scheduled: ${match.teamA} vs ${match.teamB} for ${match.eventTitle}.`,
      "schedule_updated",
      match.assignedCoach || "Coach",
      ["player", "coach", "club", "organization"],
    );
  }

  // Notifications API
  function getNotifications() {
    return getCollection("sports_notifications");
  }

  function saveNotifications(notifications) {
    saveCollection("sports_notifications", notifications);
  }

  function getNotificationsForRole(role) {
    const roleKey = (role || "").toString().toLowerCase();
    const allNotes = getNotifications();
    const currentUser = getCurrentUser() || {};
    const currentUserId = getCurrentUserId();

    let userClubName = currentUser.club || null;
    if (roleKey === "coach") {
      userClubName = currentUser.connectTarget || null;
    }

    return allNotes
      .filter((note) => {
        if (note.targetUserId && note.targetUserId !== currentUserId) {
          return false;
        }
        if (note.targetClubName && note.targetClubName !== userClubName) {
          return false;
        }
        return (
          note.receiver === "all" ||
          (note.visibleTo && note.visibleTo.includes(roleKey))
        );
      })
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  function createNotification(
    title,
    message,
    type,
    sender,
    visibleTo = ["player", "coach", "club", "organization"],
    targetClubName = null,
    targetClubId = null,
    targetUserId = null,
  ) {
    const notifications = getNotifications();
    const newNote = {
      id: `notice-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      title,
      message,
      type,
      sender: sender || "System",
      receiver: "role_targeted",
      visibleTo: visibleTo.map((r) => r.toLowerCase()),
      targetClubName,
      targetClubId,
      targetUserId,
      timestamp: new Date().toISOString(),
    };
    notifications.unshift(newNote);
    saveNotifications(notifications);
  }

  // Players/Clubs/Coaches Registrations API
  function getPlayers() {
    return getCollection("sports_players");
  }

  function savePlayers(players) {
    saveCollection("sports_players", players);
    if (typeof updateNavigationProfile === "function") {
      updateNavigationProfile();
    }
  }

  function getClubs() {
    return getCollection("sports_clubs");
  }

  function saveClubs(clubs) {
    saveCollection("sports_clubs", clubs);
    if (typeof updateNavigationProfile === "function") {
      updateNavigationProfile();
    }
  }

  function getCoaches() {
    return getCollection("sports_coaches");
  }

  function saveCoaches(coaches) {
    saveCollection("sports_coaches", coaches);
    if (typeof updateNavigationProfile === "function") {
      updateNavigationProfile();
    }
  }

  function getAssociations() {
    return getCollection("sports_associations");
  }

  function saveAssociations(associations) {
    saveCollection("sports_associations", associations);
    if (typeof updateNavigationProfile === "function") {
      updateNavigationProfile();
    }
  }

  // Event Applications logic
  function applyToEvent(eventId, playerName, playingPosition, certificateName) {
    const events = getEvents();
    const event = events.find((e) => e.id === eventId);
    if (!event) return;

    event.applicants = event.applicants || [];

    const currentPlayerId = getCurrentUserId();
    const currentUser = getCurrentUser() || {};

    const alreadyApplied = event.applicants.some(
      (a) => a.playerId === currentPlayerId || a.id === currentPlayerId,
    );
    if (alreadyApplied) return;

    const role = currentUser.role || "player";
    let status = "Pending";
    if (event.type === "club_event") {
      status = "Approved";
    }

    const newApplicant = {
      playerId: currentPlayerId,
      id: currentPlayerId,
      name: playerName || currentUser.name || "Anonymous",
      position: playingPosition || "N/A",
      certificate: certificateName || "cert.pdf",
      status: status,
      role: role,
      clubId: currentUser.id || null,
      timestamp: new Date().toISOString(),
    };

    event.applicants.push(newApplicant);
    saveEvents(events);

    // Registry application log
    const apps = getCollection("sports_applications");
    apps.unshift({
      id: `app-${Date.now()}`,
      eventId: event.id,
      eventTitle: event.title,
      eventType: event.type,
      userId: currentPlayerId,
      userName: newApplicant.name,
      userRole: role,
      status: status,
      timestamp: new Date().toISOString(),
    });
    saveCollection("sports_applications", apps);

    // Send applicant notification to organizer
    if (event.type === "club_event") {
      createNotification(
        "Member Joined Event",
        `${newApplicant.name} has joined the internal club event: ${event.title}`,
        "member_joined",
        newApplicant.name,
        ["club"],
        event.createdBy,
      );
    } else {
      createNotification(
        "New Applicant Registered",
        `${newApplicant.name} has applied for ${event.title}`,
        "application_submitted",
        newApplicant.name,
        event.organizerType === "club" ? ["club"] : ["organization"],
      );
    }
  }

  function approveApplication(eventId, playerId) {
    const events = getEvents();
    const event = events.find((e) => e.id === eventId);
    if (!event) return;

    const applicant = event.applicants?.find(
      (a) => a.playerId === playerId || a.id === playerId,
    );
    if (!applicant) return;

    applicant.status = "Approved";
    saveEvents(events);

    const apps = getCollection("sports_applications");
    const matchedApp = apps.find(
      (a) => a.eventId === eventId && a.userId === playerId,
    );
    if (matchedApp) matchedApp.status = "Approved";
    saveCollection("sports_applications", apps);

    // Recruitment: Trial selections join the club
    if (event.type === "club_trial") {
      const clubName = event.createdBy;

      const players = getPlayers();
      const playerObj = players.find((p) => p.id === playerId);
      if (playerObj) {
        playerObj.club = clubName;
        playerObj.status = "Approved";
        savePlayers(players);

        const activeUser = getCurrentUser();
        if (activeUser && activeUser.id === playerId) {
          activeUser.club = clubName;
          localStorage.setItem(
            "sports_current_user",
            JSON.stringify(activeUser),
          );
        }
      }

      const coaches = getCoaches();
      const coachObj = coaches.find((c) => c.id === playerId);
      if (coachObj) {
        coachObj.connectTarget = clubName;
        coachObj.connectType = "club";
        coachObj.status = "Approved";
        saveCoaches(coaches);

        const activeUser = getCurrentUser();
        if (activeUser && activeUser.id === playerId) {
          activeUser.connectTarget = clubName;
          localStorage.setItem(
            "sports_current_user",
            JSON.stringify(activeUser),
          );
        }
      }
    }

    let title = "Application Approved";
    let message = `Congratulations! You have been selected/approved for: ${event.title}`;
    let nType = "player_selected";
    let visibleTo = ["player", "coach"];
    let targetUserId = playerId;

    if (event.type === "tournament") {
      title = "Club Approved";
      message = `Club ${applicant.name} has been approved for tournament: ${event.title}`;
      nType = "club_approved";
      visibleTo = ["club"];
      targetUserId = playerId;
    }

    createNotification(
      title,
      message,
      nType,
      event.createdBy,
      visibleTo,
      null,
      null,
      targetUserId,
    );
  }

  // Dynamic Event/Player History Helpers
  function getPlayerHistory() {
    const allHistory = getCollection("sports_history");
    const currentPlayerId = getCurrentUserId();
    return allHistory.filter(
      (h) =>
        (h.role === "player" && h.playerId === currentPlayerId) ||
        h.playerId === currentPlayerId,
    );
  }

  function getCoachHistory() {
    const allHistory = getCollection("sports_history");
    const currentCoachId = getCurrentUserId();
    return allHistory.filter(
      (h) => h.role === "coach" && h.coachId === currentCoachId,
    );
  }

  function getClubHistory() {
    const allHistory = getCollection("sports_history");
    const currentClubName = getCurrentUserName();
    return allHistory.filter(
      (h) => h.role === "club" && h.createdBy === currentClubName,
    );
  }

  function getOrganizationHistory() {
    const allHistory = getCollection("sports_history");
    const currentAssocName = getCurrentUserName();
    return allHistory.filter(
      (h) => h.role === "organization" && h.createdBy === currentAssocName,
    );
  }

  function getEventsForRole(role) {
    const roleKey = (role || "").toString().toLowerCase();
    const events = getEvents();
    // Filters active events based on visibility array
    return events.filter(
      (e) =>
        e.status !== "Completed" &&
        e.visibleTo &&
        e.visibleTo.includes(roleKey),
    );
  }

  // ==========================================
  // UTILITIES: TIME AGO & BADGES RENDERING
  // ==========================================

  function formatTimeAgo(timestamp) {
    const eventDate = new Date(timestamp);
    if (Number.isNaN(eventDate.getTime())) return "";
    const delta = Date.now() - eventDate.getTime();
    if (delta < 60000) return "Just now";
    if (delta < 3600000) return `${Math.floor(delta / 60000)} min ago`;
    if (delta < 86400000) return `${Math.floor(delta / 3600000)} hr ago`;
    if (delta < 604800000) return `${Math.floor(delta / 86400000)} day ago`;
    return eventDate.toLocaleDateString();
  }

  function renderNotifications(role, options = {}) {
    const dropdown =
      document.querySelector(
        options.dropdownSelector || "#notificationDropdown",
      ) || document.querySelector(".notification-dropdown");
    const trigger =
      document.querySelector(options.triggerSelector || ".notify-only") ||
      document.querySelector(".notify-btn") ||
      document.querySelector(".bi-bell-fill")?.parentElement;
    const notifications = getNotificationsForRole(role);

    if (dropdown) {
      const isDropdownId = dropdown.id === "notificationDropdown";
      if (isDropdownId) {
        dropdown.innerHTML =
          "<h4>Notifications</h4>" +
          (notifications.length === 0
            ? `<div class="notification-item"><strong>No new notifications</strong></div>`
            : notifications.map((n) => notificationToHtml(n, false)).join(""));
      } else {
        dropdown.innerHTML =
          notifications.length === 0
            ? `<p style="padding: 10px; font-size: 14px; color: #94a3b8; text-align: center;">No new notifications</p>`
            : notifications.map((n) => notificationToHtml(n, true)).join("");
      }
    }
    if (trigger) updateNotificationBadge(trigger, notifications.length);
    return notifications.length;
  }

  function notificationToHtml(notification, useParagraphStyle) {
    if (useParagraphStyle) {
      return `
        <p style="margin: 0; padding: 10px; font-size: 14px; border-radius: 10px; cursor: pointer; transition: 0.3s;">
          <strong>${notification.title}</strong>: ${notification.message}
          <br><small style="font-size: 11px; color: #94a3b8; display: block; margin-top: 4px;">${formatTimeAgo(notification.timestamp)}</small>
        </p>
      `;
    }
    return `
      <div class="notification-item">
        <strong>${notification.title}</strong>
        <p>${notification.message}</p>
        <small>${formatTimeAgo(notification.timestamp)}</small>
      </div>
    `;
  }

  function updateNotificationBadge(trigger, count) {
    if (!trigger) return;
    if (getComputedStyle(trigger).position === "static") {
      trigger.style.position = "relative";
    }
    let badge = trigger.querySelector(".notification-badge");
    if (!badge) {
      badge = document.createElement("span");
      badge.className = "notification-badge";
      badge.style.cssText =
        "position:absolute;top:2px;right:2px;display:inline-flex;align-items:center;justify-content:center;min-width:18px;height:18px;background:#ef4444;color:#fff;border-radius:999px;font-size:0.7rem;padding:0 6px;line-height:1;pointer-events:none;white-space:nowrap;z-index:10;";
      trigger.appendChild(badge);
    }
    badge.textContent = count > 0 ? count : "";
    if (count === 0) badge.style.display = "none";
    else badge.style.display = "inline-flex";
  }

  // ==========================================
  // SESSION MANAGEMENT HELPERS
  // ==========================================

  function getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem("sports_current_user")) || null;
    } catch (e) {
      return null;
    }
  }

  function getCurrentUserId() {
    const user = getCurrentUser();
    if (user && user.id) return user.id;
    const path = window.location.pathname.toLowerCase();
    if (path.includes("/player/player1/")) return "P001";
    if (path.includes("/player/player2/")) return "P002";
    if (path.includes("/player/player3/")) return "P003";
    if (path.includes("/coach/coach1/")) return "coach-mike";
    if (path.includes("/coach/coach2/")) return "coach2";
    if (path.includes("/coach/coach3/")) return "coach3";
    if (path.includes("/club/club1/")) return "club-mu";
    if (path.includes("/club/club2/")) return "club2";
    if (path.includes("/club/club3/")) return "club3";
    if (path.includes("/organization/organization1/")) return "assoc-sgfi";
    if (path.includes("/organization/organization2/")) return "organization2";
    if (path.includes("/organization/organization3/")) return "organization3";
    return "guest";
  }

  function getCurrentUserName() {
    const user = getCurrentUser();
    const currentUserId = getCurrentUserId();
    const role = user ? user.role : null;

    if (role === "player" || currentUserId.startsWith("P")) {
      const p = getPlayers().find(x => x.id === currentUserId);
      if (p && p.name) return p.name;
    } else if (role === "coach" || currentUserId.startsWith("coach")) {
      const c = getCoaches().find(x => x.id === currentUserId);
      if (c && c.name) return c.name;
    } else if (role === "club" || currentUserId.startsWith("club")) {
      const cl = getClubs().find(x => x.id === currentUserId);
      if (cl && cl.name) return cl.name;
    } else if (role === "organization" || currentUserId.startsWith("assoc") || currentUserId.startsWith("organization")) {
      const a = getAssociations().find(x => x.id === currentUserId);
      if (a && a.name) return a.name;
    }

    if (user && user.name) return user.name;
    const path = window.location.pathname.toLowerCase();
    if (path.includes("/player/player1/")) return "Cristiano Ronaldo";
    if (path.includes("/player/player2/")) return "Virat Kohli";
    if (path.includes("/player/player3/")) return "PV Sindhu";
    if (path.includes("/coach/coach1/")) return "Mick Ross";
    if (path.includes("/coach/coach2/")) return "Dinesh Karthik";
    if (path.includes("/coach/coach3/")) return "Pullela Gopichand";
    if (path.includes("/club/club1/")) return "Manchester United";
    if (path.includes("/club/club2/")) return "Royal Challengers Bengaluru (RCB)";
    if (path.includes("/club/club3/")) return "Hyderabad Hunters";
    if (path.includes("/organization/organization1/")) return "Indian Football Association";
    if (path.includes("/organization/organization2/")) return "BCCI";
    if (path.includes("/organization/organization3/")) return "Badminton Association of India";
    return "Guest";
  }

  function getCurrentUserImage() {
    const user = getCurrentUser();
    const currentUserId = getCurrentUserId();
    const role = user ? user.role : null;

    if (role === "player" || currentUserId.startsWith("P")) {
      const p = getPlayers().find(x => x.id === currentUserId);
      if (p && p.image) return p.image;
    } else if (role === "coach" || currentUserId.startsWith("coach")) {
      const c = getCoaches().find(x => x.id === currentUserId);
      if (c && c.image) return c.image;
    } else if (role === "club" || currentUserId.startsWith("club")) {
      const cl = getClubs().find(x => x.id === currentUserId);
      if (cl && cl.image) return cl.image;
    } else if (role === "organization" || currentUserId.startsWith("assoc") || currentUserId.startsWith("organization")) {
      const a = getAssociations().find(x => x.id === currentUserId);
      if (a && a.image) return a.image;
    }
    
    const path = window.location.pathname.toLowerCase();
    if (path.includes("/player/player1/")) return "https://i.pinimg.com/736x/68/76/99/6876993a25a8fc274cc09aee12171034.jpg";
    if (path.includes("/player/player2/")) return "https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1200,q_60/lsci/db/PICTURES/CMS/122300/122330.jpg";
    if (path.includes("/player/player3/")) return "https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_xl_2x/f_auto/primary/omhtslafb2il7kazygef";
    if (path.includes("/coach/coach1/")) return "https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&w=800&q=80";
    if (path.includes("/coach/coach2/")) return "https://img.olympics.com/images/image/private/t_16x9_760/primary/c74a0tqjlyrm7l1l7woc";
    if (path.includes("/coach/coach3/")) return "https://img.olympics.com/images/image/private/t_16x9_760/primary/w8i1m9s3h9kqqtphn3n0";
    if (path.includes("/club/club1/")) return "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1184px-Manchester_United_FC_crest.svg.png";
    if (path.includes("/club/club2/")) return "https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Royal_Challengers_Bangalore_2020_Logo.svg/1200px-Royal_Challengers_Bangalore_2020_Logo.svg.png";
    if (path.includes("/club/club3/")) return "https://upload.wikimedia.org/wikipedia/en/thumb/2/2f/Hyderabad_Hunters_logo.svg/800px-Hyderabad_Hunters_logo.svg.png";
    if (path.includes("/organization/organization1/")) return "https://upload.wikimedia.org/wikipedia/commons/e/e9/Indian_Football_Association_logo.png";
    if (path.includes("/organization/organization2/")) return "https://upload.wikimedia.org/wikipedia/en/thumb/8/86/Board_of_Control_for_Cricket_in_India_Logo.svg/1200px-Board_of_Control_for_Cricket_in_India_Logo.svg.png";
    if (path.includes("/organization/organization3/")) return "https://upload.wikimedia.org/wikipedia/en/2/2a/Badminton_Association_of_India_logo.png";
    
    return "https://i.pinimg.com/736x/68/76/99/6876993a25a8fc274cc09aee12171034.jpg"; // Default fallback
  }

  function updateNavigationProfile() {
    const currentUserId = getCurrentUserId();
    if (!currentUserId || currentUserId === "guest") return;

    const currentUserName = getCurrentUserName();
    const currentUserImg = getCurrentUserImage();

    // 1. Desktop & Mobile Profile navigation links in <a> tags
    const allLinks = Array.from(document.querySelectorAll("a"));
    allLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      const isProfileLink =
        (href.includes("profile.html") &&
          !href.includes("other-profile") &&
          !href.includes("others-profile")) ||
        link.classList.contains("profile-dropbtn");

      const linkText = link.textContent.trim().toLowerCase();

      if (isProfileLink || linkText === "profile") {
        // Find icon inside the link
        const icon = link.querySelector(
          "i.bi-person-circle, i.bi-person, i.bi-person-fill, i.bi-person-circle-fill"
        );

        const img = document.createElement("img");
        img.src = currentUserImg;
        img.alt = currentUserName;
        img.className = "nav-profile-pic-img";
        img.style.width = "22px";
        img.style.height = "22px";
        img.style.borderRadius = "50%";
        img.style.objectFit = "cover";
        img.style.verticalAlign = "middle";
        img.style.border = "1.5px solid rgba(56, 189, 248, 0.4)";

        const displayStyle = window.getComputedStyle(link).display;
        if (displayStyle === "flex") {
          img.style.margin = "0";
        } else {
          img.style.marginRight = "6px";
        }

        if (icon) {
          icon.parentNode.replaceChild(img, icon);
        } else {
          const existingImg = link.querySelector(".nav-profile-pic-img");
          if (existingImg) {
            existingImg.src = currentUserImg;
            existingImg.alt = currentUserName;
          } else {
            link.prepend(img);
          }
        }

        // Change the text "Profile" to the username
        const span = link.querySelector("span");
        if (span) {
          span.textContent = currentUserName;
        } else {
          const imgElement = link.querySelector(".nav-profile-pic-img");
          const nodes = Array.from(link.childNodes);
          nodes.forEach((node) => {
            if (node !== imgElement && node.nodeName !== "I") {
              link.removeChild(node);
            }
          });
          link.appendChild(document.createTextNode(" " + currentUserName));
        }
      }
    });

    // 2. Organization style navigation using .nav-item container
    const navItems = Array.from(document.querySelectorAll(".nav-item"));
    navItems.forEach((item) => {
      const link = item.querySelector("a");
      if (link) {
        const href = link.getAttribute("href") || "";
        const isProfileLink =
          href.includes("profile.html") &&
          !href.includes("other-profile") &&
          !href.includes("others-profile");

        if (isProfileLink) {
          const icon = item.querySelector(
            "i.bi-person-circle, i.bi-person, i.bi-person-fill"
          );
          if (icon) {
            const img = document.createElement("img");
            img.src = currentUserImg;
            img.alt = currentUserName;
            img.className = "nav-profile-pic-img";
            img.style.width = "22px";
            img.style.height = "22px";
            img.style.borderRadius = "50%";
            img.style.objectFit = "cover";
            img.style.verticalAlign = "middle";
            img.style.border = "1.5px solid rgba(56, 189, 248, 0.4)";
            icon.parentNode.replaceChild(img, icon);
          } else {
            const existingImg = item.querySelector(".nav-profile-pic-img");
            if (existingImg) {
              existingImg.src = currentUserImg;
              existingImg.alt = currentUserName;
            }
          }

          const span = item.querySelector("span");
          if (span) {
            if (link.parentNode === span) {
              link.textContent = currentUserName;
            } else {
              span.textContent = currentUserName;
            }
          } else {
            link.textContent = currentUserName;
          }
        }
      }
    });
  }

  function getPosts() {
    return JSON.parse(localStorage.getItem("sports_posts")) || DEFAULT_POSTS;
  }

  function savePosts(posts) {
    localStorage.setItem("sports_posts", JSON.stringify(posts));
  }

  function getAchievements() {
    const data = JSON.parse(localStorage.getItem("sports_achievements"));
    if (data && Array.isArray(data.achievements)) return data.achievements;
    if (Array.isArray(data)) return data;
    return DEFAULT_ACHIEVEMENTS;
  }

  function saveAchievements(achievements) {
    localStorage.setItem("sports_achievements", JSON.stringify({ achievements }));
  }

  function logout() {
    localStorage.removeItem("sports_current_user");
    localStorage.removeItem("current_logged_user");
    localStorage.removeItem("current_role");
    localStorage.removeItem("active_session");

    // Wipe cached DOM elements to avoid layout flashes
    const selectors = [
      "#clubEvents .clubs",
      "#associationEvents .clubs",
      "#currentEvents .clubs",
      "#matchSchedule .clubs",
      "#pastMatches .clubs",
      "#notificationDropdown",
      ".notification-dropdown",
      "#historyCardsContainer",
      "#eventsRemainderCard",
      ".rightbar .card",
      ".feed",
      ".event-grid",
      ".players-list",
    ];
    selectors.forEach((sel) => {
      const el = document.querySelector(sel);
      if (el) el.innerHTML = "";
    });

    const path = window.location.pathname.toLowerCase();
    let redirectPath = "login.html";
    if (
      path.includes("/player/") ||
      path.includes("/coach/") ||
      path.includes("/club/") ||
      path.includes("/organization/") ||
      path.includes("/admin/")
    ) {
      redirectPath = "../../login.html";
    }
    window.location.href = redirectPath;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname.toLowerCase();
    const sessionUser = getCurrentUser();

    if (typeof updateNavigationProfile === "function") {
      updateNavigationProfile();
    }

    let requiredRole = null;
    let role = null;
    if (path.includes("/player/")) {
      requiredRole = "player";
      role = "player";
    } else if (path.includes("/coach/")) {
      requiredRole = "coach";
      role = "coach";
    } else if (path.includes("/club/")) {
      requiredRole = "club";
      role = "club";
    } else if (path.includes("/organization/")) {
      requiredRole = "organization";
      role = "organization";
    }

    // Session Guard check
    if (requiredRole) {
      if (
        !sessionUser ||
        (sessionUser.role !== requiredRole && sessionUser.role !== "admin")
      ) {
        let redirectPath = "login.html";
        if (
          path.includes("/player/") ||
          path.includes("/coach/") ||
          path.includes("/club/") ||
          path.includes("/organization/")
        ) {
          redirectPath = "../../login.html";
        }
        window.location.href = redirectPath;
        return;
      }
    }

    if (role) {
      const dropdownSelector =
        role === "club" || role === "organization"
          ? ".notification-dropdown"
          : "#notificationDropdown";
      const triggerSelector =
        role === "club" || role === "organization"
          ? ".notify-btn"
          : ".notify-only";
      renderNotifications(role, { dropdownSelector, triggerSelector });
    }

    // Intercept logout buttons on click globally
    document.addEventListener("click", (e) => {
      const anchor = e.target.closest("a");
      if (anchor) {
        const text = anchor.textContent.trim().toLowerCase();
        const href = anchor.getAttribute("href");
        if (
          text.includes("logout") ||
          (href && href.includes("tejbhuvana-hue"))
        ) {
          e.preventDefault();
          logout();
        }
      }
    });
  });

  function endEvent(eventId) {
    const state = loadState();
    const eventIdx = state.events.findIndex((e) => e.id === eventId);
    if (eventIdx === -1) return;

    const event = state.events[eventIdx];
    event.status = "Completed";
    event.completionDate = new Date().toISOString().split("T")[0];

    const coachId = getCurrentUserId();
    const coachName = getCurrentUserName();

    // 1. History for the coach
    const coachHistId = `hist-${Date.now()}-coach-${eventId}`;
    const coachHistoryItem = {
      id: coachHistId,
      role: "coach",
      coachId: coachId,
      name: event.title,
      sport: event.category || "Football",
      date: event.date,
      location: event.location || event.venue || "Stadium",
      status: "Completed",
      statusClass: "status-completed",
      image:
        "https://images.unsplash.com/photo-1543351611-58f69d7c1781?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: event.description || "Event completed successfully.",
      badges: ["Head Coach", "Completed"],
    };
    if (!state.completedEvents.some((h) => h.id === coachHistId)) {
      state.completedEvents.unshift(coachHistoryItem);
    }

    // 2. History for the organizing club/organization
    const organizerName = event.createdBy;
    const isClub = event.organizerType === "club";
    const orgHistId = `hist-${Date.now()}-${isClub ? "club" : "org"}-${eventId}`;
    const orgHistoryItem = {
      id: orgHistId,
      role: isClub ? "club" : "organization",
      createdBy: organizerName,
      name: event.title,
      sport: event.category || "Football",
      date: event.date,
      location: event.location || event.venue || "Stadium",
      status: "Completed",
      statusClass: "status-completed",
      image:
        "https://images.unsplash.com/photo-1543351611-58f69d7c1781?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: event.description || "Event completed successfully.",
      badges: ["Organizer", isClub ? "Club" : "Association"],
    };
    if (!state.completedEvents.some((h) => h.id === orgHistId)) {
      state.completedEvents.unshift(orgHistoryItem);
    }

    // 3. History for each approved Player participant
    const approvedApplicants =
      event.applicants?.filter((a) => a.status === "Approved") || [];
    approvedApplicants.forEach((app) => {
      const playerHistId = `hist-${Date.now()}-player-${app.playerId || app.id}-${eventId}`;
      const playerHistoryItem = {
        id: playerHistId,
        role: "player",
        playerId: app.playerId || app.id,
        name: event.title,
        sport: event.category || "Football",
        date: event.date,
        location: event.location || event.venue || "Stadium",
        status: "Completed",
        statusClass: "status-completed",
        image:
          "https://images.unsplash.com/photo-1543351611-58f69d7c1781?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        description: event.description || "Participated in the event.",
        badges: ["Participant", app.position || "Player"],
      };
      if (!state.completedEvents.some((h) => h.id === playerHistId)) {
        state.completedEvents.unshift(playerHistoryItem);
      }
    });

    saveState(state);

    createNotification(
      "Event Completed",
      `The event "${event.title}" has been completed and moved to history.`,
      "event_completed",
      coachName,
      ["player", "coach", "club", "organization"],
    );
  }

  function loadState() {
    return {
      events: getEvents(),
      matches: getMatches(),
      notifications: getNotifications(),
      completedEvents: getCollection("sports_history"),
    };
  }

  function saveState(state) {
    if (state.events) saveEvents(state.events);
    if (state.matches) saveMatches(state.matches);
    if (state.notifications) saveNotifications(state.notifications);
    if (state.completedEvents)
      saveCollection("sports_history", state.completedEvents);
  }

  // Global Poster Lightbox / Overlay helper
  window.viewPosterOverlay = function (posterUrl) {
    let overlay = document.getElementById("global-poster-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "global-poster-overlay";
      overlay.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(2, 6, 23, 0.95);
        backdrop-filter: blur(12px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999999;
        opacity: 0;
        transition: opacity 0.3s ease;
        cursor: zoom-out;
      `;

      const content = document.createElement("div");
      content.style.cssText = `
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
        display: flex;
        align-items: center;
        justify-content: center;
      `;

      const img = document.createElement("img");
      img.id = "global-poster-overlay-img";
      img.style.cssText = `
        max-width: 100%;
        max-height: 80vh;
        object-fit: contain;
        border-radius: 14px;
        box-shadow: 0 0 50px rgba(56, 189, 248, 0.5);
        transform: scale(0.9);
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      `;

      const closeBtn = document.createElement("i");
      closeBtn.className = "bi bi-x-lg";
      closeBtn.style.cssText = `
        position: absolute;
        top: -45px;
        right: 0;
        color: #fff;
        font-size: 26px;
        cursor: pointer;
        transition: color 0.2s, transform 0.2s;
      `;
      closeBtn.addEventListener("mouseenter", () => {
        closeBtn.style.color = "#ef4444";
        closeBtn.style.transform = "scale(1.1)";
      });
      closeBtn.addEventListener("mouseleave", () => {
        closeBtn.style.color = "#fff";
        closeBtn.style.transform = "scale(1)";
      });

      content.appendChild(img);
      content.appendChild(closeBtn);
      overlay.appendChild(content);
      document.body.appendChild(overlay);

      // Close overlay events
      overlay.addEventListener("click", (e) => {
        if (
          e.target === overlay ||
          e.target === closeBtn ||
          e.target === content
        ) {
          overlay.style.opacity = "0";
          img.style.transform = "scale(0.9)";
          setTimeout(() => (overlay.style.display = "none"), 300);
        }
      });
    }

    const img = document.getElementById("global-poster-overlay-img");
    img.src = posterUrl;

    overlay.style.display = "flex";
    // Force reflow
    overlay.offsetWidth;
    overlay.style.opacity = "1";
    img.style.transform = "scale(1)";
  };

  // Add click delegate to support direct overlays without custom page code
  document.addEventListener("click", (e) => {
    const trigger =
      e.target.closest(".view-poster-trigger") ||
      e.target.closest(".view-poster-btn");
    if (trigger) {
      e.preventDefault();
      const url = trigger.dataset.posterUrl || trigger.getAttribute("src");
      if (url && window.viewPosterOverlay) {
        window.viewPosterOverlay(url);
      }
    }
  });

  // ==========================================
  // DYNAMIC FEED, SUGGESTIONS & DOCK SYSTEM
  // ==========================================

  function getOtherProfileLink(targetId) {
    const currentUserId = getCurrentUserId();
    if (targetId === currentUserId) {
      return "./profile.html";
    }
    const path = window.location.pathname.toLowerCase();
    let basePage = "others-profile.html";
    if (path.includes("/player/")) {
      basePage = "others-profile.html";
    } else if (path.includes("/coach/")) {
      basePage = "coach-other-profile.html";
    } else if (path.includes("/club/")) {
      basePage = "club-other-profile.html";
    } else if (path.includes("/organization/")) {
      basePage = "organization-other-profile.html";
    }
    return `./${basePage}?id=${targetId}`;
  }

  function createPostElement(post) {
    const postEl = document.createElement("div");
    postEl.className = "post";

    const authorLink = getOtherProfileLink(post.authorId);

    postEl.innerHTML = `
      <div class="post-header">
        <a href="${authorLink}" class="others-profile" style="display: flex; gap: 10px; text-decoration: none; color: inherit; align-items: center;">
          <img src="${post.authorImage}" alt="profile" class="profile-pic" />
          <div>
            <h4>${post.authorName}</h4>
            <p>${post.sport} • ${post.date}</p>
          </div>
        </a>
      </div>
      <div class="post-text">
        <p>${post.caption}</p>
      </div>
      ${post.image ? `
        <div class="post-image view-poster-trigger" data-poster-url="${post.image}" style="cursor: zoom-in;">
          <img src="${post.image}" alt="post image" />
        </div>
      ` : ''}
      <div class="post-actions">
        <button class="feed-like-btn" data-post-id="${post.id}"><i class="bi bi-hand-thumbs-up-fill"></i> Like (${post.likes || 0})</button>
        <button class="feed-comment-btn"><i class="bi bi-chat-fill"></i> Comment (${post.comments || 0})</button>
        <button class="feed-repost-btn"><i class="bi bi-repeat"></i> Repost</button>
        <button class="feed-share-btn"><i class="bi bi-share-fill"></i> Share</button>
      </div>
    `;

    const likeBtn = postEl.querySelector(".feed-like-btn");
    likeBtn.addEventListener("click", () => {
      let currentLikes = parseInt(post.likes) || 0;
      if (likeBtn.classList.contains("liked")) {
        likeBtn.classList.remove("liked");
        currentLikes--;
        likeBtn.innerHTML = `<i class="bi bi-hand-thumbs-up-fill"></i> Like (${currentLikes})`;
        likeBtn.style.color = "";
      } else {
        likeBtn.classList.add("liked");
        currentLikes++;
        likeBtn.innerHTML = `<i class="bi bi-hand-thumbs-up-fill"></i> Liked (${currentLikes})`;
        likeBtn.style.color = "var(--accent-cyan)";
      }
    });

    const commentBtn = postEl.querySelector(".feed-comment-btn");
    commentBtn.addEventListener("click", () => {
      alert("Comments feature coming soon!");
    });

    const repostBtn = postEl.querySelector(".feed-repost-btn");
    repostBtn.addEventListener("click", () => {
      alert("Post successfully reposted to your profile!");
    });

    const shareBtn = postEl.querySelector(".feed-share-btn");
    shareBtn.addEventListener("click", () => {
      alert("Link copied to clipboard!");
    });

    return postEl;
  }

  function createEventAdElement(event) {
    const adEl = document.createElement("div");
    adEl.className = "post event-ad-card";
    adEl.style.cssText = `
      border: 1px solid rgba(56, 189, 248, 0.3);
      background: rgba(56, 189, 248, 0.02);
      border-radius: 20px;
      padding: 16px;
      margin-bottom: 20px;
    `;

    const currentPlayerId = getCurrentUserId();
    const isApplied = event.applicants?.some(a => a.playerId === currentPlayerId || a.id === currentPlayerId);
    const applyBtnText = isApplied ? "Applied" : "Apply Now";
    const applyBtnDisabled = isApplied ? 'disabled style="opacity: 0.6; pointer-events: none;"' : '';

    adEl.innerHTML = `
      <div class="post-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <div style="display: flex; gap: 10px; align-items: center;">
          <div style="width: 36px; height: 36px; border-radius: 50%; background: var(--accent-cyan); display: flex; align-items: center; justify-content: center; font-size: 16px; color: #020617;">
            📢
          </div>
          <div>
            <h4 style="margin: 0; font-size: 14px; color: var(--accent-cyan); font-weight: 600;">Promoted Event</h4>
            <p style="margin: 0; font-size: 11px; color: #94a3b8;">Sponsored • Host: ${event.createdBy}</p>
          </div>
        </div>
        <span style="font-size: 10px; background: rgba(56, 189, 248, 0.12); color: var(--accent-cyan); padding: 3px 8px; border-radius: 4px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Sponsored</span>
      </div>
      <div class="post-text" style="margin-bottom: 12px;">
        <h3 style="margin: 0 0 6px 0; color: #fff; font-size: 16px; font-weight: 700;">${event.title}</h3>
        <p style="margin: 0 0 8px 0; font-size: 12px; color: #94a3b8;"><i class="bi bi-calendar3"></i> ${event.date} | <i class="bi bi-geo-alt"></i> ${event.location || event.venue}</p>
        <p style="margin: 0; font-size: 13px; color: #cbd5e1; line-height: 1.5;">${event.description}</p>
      </div>
      ${event.poster ? `
        <div class="post-image view-poster-trigger" data-poster-url="${event.poster}" style="cursor: zoom-in; border-radius: 12px; overflow: hidden; margin-bottom: 12px;">
          <img src="${event.poster}" alt="Event Poster" style="width: 100%; max-height: 250px; object-fit: cover;" />
        </div>
      ` : ''}
      <div class="post-actions" style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 12px; margin-top: 12px; display: flex; justify-content: space-between; align-items: center; width: 100%;">
        <span style="font-size: 12px; color: #94a3b8;"><i class="bi bi-people-fill"></i> ${event.applicants ? event.applicants.length : 0} Applied</span>
        <button class="quick-apply-btn" ${applyBtnDisabled} style="background: var(--accent-cyan); color: #020617; border: none; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: 700; cursor: pointer; transition: transform 0.2s;">${applyBtnText}</button>
      </div>
    `;

    const applyBtn = adEl.querySelector(".quick-apply-btn");
    if (applyBtn && !isApplied) {
      applyBtn.addEventListener("click", () => {
        showQuickApplyModal(event);
      });
    }

    return adEl;
  }

  function showQuickApplyModal(event) {
    let modal = document.getElementById("quick-apply-modal");
    if (modal) modal.remove();

    modal = document.createElement("div");
    modal.id = "quick-apply-modal";
    modal.className = "follow-modal show";
    modal.style.cssText = `
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(15, 23, 42, 0.95);
      z-index: 9999;
      padding: 24px;
    `;

    modal.innerHTML = `
      <div class="follow-modal-card" style="width: min(500px, 100%); background: #020617; border-radius: 28px; padding: 26px; border: 1px solid rgba(56, 189, 248, 0.2); box-shadow: 0 20px 60px rgba(56,189,248,0.15);">
        <div class="follow-modal-header" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
          <h3 style="font-size: 22px; font-weight: 700; color: #fff; margin: 0;">Quick Event Application</h3>
          <button type="button" class="follow-modal-close" id="closeQuickApplyModal" style="background: transparent; border: none; color: #94a3b8; font-size: 28px; cursor: pointer; transition: color 0.2s;">&times;</button>
        </div>
        <div style="margin-bottom: 20px; padding: 12px; background: rgba(56, 189, 248, 0.05); border: 1px solid rgba(56, 189, 248, 0.15); border-radius: 12px;">
          <h4 style="margin: 0 0 4px 0; color: var(--accent-cyan); font-size: 16px;">${event.title}</h4>
          <p style="margin: 0; font-size: 13px; color: #94a3b8;"><i class="bi bi-geo-alt"></i> ${event.location || event.venue}</p>
          <p style="margin: 4px 0 0 0; font-size: 13px; color: #94a3b8;"><i class="bi bi-calendar3"></i> ${event.date}</p>
        </div>
        <form id="quickApplyForm" style="display: flex; flex-direction: column; gap: 15px;">
          <div style="display: flex; flex-direction: column; gap: 6px;">
            <label style="font-size: 13px; font-weight: 600; color: #f8fafc;">Full Name</label>
            <input type="text" id="qaName" value="${getCurrentUserName()}" required style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 12px 14px; color: #fff; font-size: 14px; outline: none; transition: border-color 0.2s;" />
          </div>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            <label style="font-size: 13px; font-weight: 600; color: #f8fafc;">Position / Specialty</label>
            <input type="text" id="qaPosition" placeholder="e.g. Forward, Midfielder, Coach" required style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 12px 14px; color: #fff; font-size: 14px; outline: none; transition: border-color 0.2s;" />
          </div>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            <label style="font-size: 13px; font-weight: 600; color: #f8fafc;">Certificate / CV Name (Optional)</label>
            <input type="text" id="qaCert" value="cert_level1.pdf" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 12px 14px; color: #fff; font-size: 14px; outline: none; transition: border-color 0.2s;" />
          </div>
          <button type="submit" style="background: var(--accent-cyan); color: #020617; border: none; padding: 14px; border-radius: 14px; font-size: 15px; font-weight: 700; cursor: pointer; transition: transform 0.2s, background-color 0.2s; margin-top: 10px;">Submit Application</button>
        </form>
      </div>
    `;

    document.body.appendChild(modal);

    const inputs = modal.querySelectorAll("input");
    inputs.forEach(input => {
      input.addEventListener("focus", () => input.style.borderColor = "var(--accent-cyan)");
      input.addEventListener("blur", () => input.style.borderColor = "rgba(255,255,255,0.1)");
    });

    const closeBtn = modal.querySelector("#closeQuickApplyModal");
    closeBtn.addEventListener("click", () => modal.remove());

    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.remove();
    });

    const form = modal.querySelector("#quickApplyForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = modal.querySelector("#qaName").value.trim();
      const position = modal.querySelector("#qaPosition").value.trim();
      const cert = modal.querySelector("#qaCert").value.trim();

      applyToEvent(event.id, name, position, cert);
      modal.remove();

      alert('Application submitted successfully!');

      runDynamicDashboard();
    });
  }

  function createSuggestionElement(p) {
    const userEl = document.createElement("div");
    userEl.className = "suggestion-user";

    const profileLink = getOtherProfileLink(p.id);

    let isFollowing = false;
    let targetSlug = p.id;
    if (window.FollowSystem) {
      const followData = window.FollowSystem.loadFollowData();
      const currentFollowing = followData.relationships[followData.currentUserId]?.following || [];
      targetSlug = window.FollowSystem.slugify(p.name);
      isFollowing = currentFollowing.includes(targetSlug);
    }

    const btnClass = isFollowing ? "following" : "";
    const btnText = isFollowing ? "Following" : "Follow";

    userEl.innerHTML = `
      <a href="${profileLink}" style="display: flex; gap: 10px; text-decoration: none; color: inherit; align-items: center; flex: 1;">
        <img src="${p.image}" alt="${p.name}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;" />
        <div class="user-info">
          <strong>${p.name}</strong>
          <small>${p.subtitle || 'Suggested'}</small>
        </div>
      </a>
      <button class="${btnClass}" style="min-width: 100px;">${btnText}</button>
    `;

    const followBtn = userEl.querySelector("button");
    followBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (window.FollowSystem) {
        window.FollowSystem.toggleFollow(targetSlug);
        const followData = window.FollowSystem.loadFollowData();
        const currentFollowing = followData.relationships[followData.currentUserId]?.following || [];
        const updatedFollowing = currentFollowing.includes(targetSlug);

        followBtn.textContent = updatedFollowing ? "Following" : "Follow";
        followBtn.classList.toggle("following", updatedFollowing);
      }
    });

    return userEl;
  }

  function renderSuggestionsSidebarAndModal() {
    const currentUserId = getCurrentUserId();
    const allPlayers = getPlayers();
    const allCoaches = getCoaches();
    const allClubs = getClubs();
    const allAssocs = getAssociations();

    const suggestionProfiles = [
      ...allPlayers.map(p => ({ ...p, role: "player", subtitle: `${p.sport} • ${p.position}` })),
      ...allCoaches.map(c => ({ ...c, role: "coach", subtitle: `${c.sport} • Coach` })),
      ...allClubs.map(cl => ({ ...cl, role: "club", subtitle: `${cl.sport} • Club` })),
      ...allAssocs.map(a => ({ ...a, role: "association", subtitle: `${a.sport} • Association` }))
    ].filter(p => p.id !== currentUserId);

    const sidebarContainer = document.querySelector(".suggestions");
    if (sidebarContainer) {
      const header = sidebarContainer.querySelector(".suggestion-header");
      sidebarContainer.innerHTML = "";
      if (header) sidebarContainer.appendChild(header);

      const sidebarList = suggestionProfiles.slice(0, 4);
      sidebarList.forEach(p => {
        const userEl = createSuggestionElement(p);
        sidebarContainer.appendChild(userEl);
      });
    }

    const modalListContainer = document.querySelector(".suggestions-list");
    if (modalListContainer) {
      modalListContainer.innerHTML = "";
      suggestionProfiles.forEach(p => {
        const userEl = createSuggestionElement(p);
        modalListContainer.appendChild(userEl);
      });
    }
  }

  function runDynamicDashboard() {
    if (typeof updateNavigationProfile === "function") {
      updateNavigationProfile();
    }
    const currentUserId = getCurrentUserId();
    const allPlayers = getPlayers();
    const allCoaches = getCoaches();
    const allClubs = getClubs();
    const allAssocs = getAssociations();

    const user = allPlayers.find(p => p.id === currentUserId) ||
                 allCoaches.find(c => c.id === currentUserId) ||
                 allClubs.find(c => c.id === currentUserId) ||
                 allAssocs.find(a => a.id === currentUserId);

    if (user) {
      const profilePic = document.getElementById("profile-pic");
      if (profilePic) {
        profilePic.src = user.image;
      }
      const clubLogo = document.querySelector(".profile-card .club-logo img");
      if (clubLogo) {
        clubLogo.src = user.image;
      }
      const playerName = document.getElementById("player-name");
      if (playerName) {
        playerName.textContent = user.name;
      }
      const clubTitle = document.querySelector(".profile-card h3");
      if (clubTitle) {
        clubTitle.textContent = user.name;
      }
    }

    const feedContainer = document.getElementById("feed-content");
    if (feedContainer) {
      const existingPosts = feedContainer.querySelectorAll(".post");
      existingPosts.forEach(p => p.remove());

      const posts = getPosts();
      const shuffledPosts = [...posts];
      for (let i = shuffledPosts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledPosts[i], shuffledPosts[j]] = [shuffledPosts[j], shuffledPosts[i]];
      }

      const events = getEvents().filter(e => e.status !== "Completed");
      let eventIndex = 0;

      shuffledPosts.forEach((post, index) => {
        const postEl = createPostElement(post);
        feedContainer.appendChild(postEl);

        if ((index + 1) % 3 === 0 && eventIndex < events.length) {
          const promoEvent = events[eventIndex++];
          const adEl = createEventAdElement(promoEvent);
          feedContainer.appendChild(adEl);
        }
      });
    }

    renderSuggestionsSidebarAndModal();
  }

  document.addEventListener("DOMContentLoaded", () => {
    const feedContainer = document.getElementById("feed-content");
    const isOtherProfile = window.location.pathname.toLowerCase().includes("other-profile") || window.location.pathname.toLowerCase().includes("others-profile");
    if (feedContainer && !isOtherProfile) {
      runDynamicDashboard();
    }
  });

  // Global Exports
  window.EventFlow = {
    loadState,
    saveState,
    getEvents,
    saveEvents,
    addEvent,
    getMatches,
    saveMatches,
    addMatch,
    getNotifications,
    saveNotifications,
    getNotificationsForRole,
    createNotification,
    getPlayers,
    savePlayers,
    getClubs,
    saveClubs,
    getCoaches,
    saveCoaches,
    getAssociations,
    saveAssociations,
    applyToEvent,
    approveApplication,
    getPlayerHistory,
    getCoachHistory,
    getClubHistory,
    getOrganizationHistory,
    getEventsForRole,
    renderNotifications,
    getCurrentUser,
    getCurrentUserId,
    getCurrentUserName,
    logout,
    endEvent,
    getPosts,
    savePosts,
    getAchievements,
    saveAchievements,
    runDynamicDashboard,
    getOtherProfileLink,
    createPostElement,
    updateNavigationProfile
  };
})();
