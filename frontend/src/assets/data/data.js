import { Bookmark, Eye, MessageSquare, Search, Send, Star } from "lucide-react";


export const savedJobs = [
    {
      id: 1,
      title: "Full Stack Developer",
      company: "Innovation Labs",
      location: "San Francisco, CA",
      salary: "$120k - $150k",
      postedDate: "1 day ago",
    },
    {
      id: 2,
      title: "React Developer",
      company: "WebFlow Co.",
      location: "Remote",
      salary: "$90k - $120k",
      postedDate: "3 days ago",
    },
    {
      id: 3,
      title: "Software Engineer",
      company: "CloudTech",
      location: "New York, NY",
      salary: "$110k - $140k",
      postedDate: "5 days ago",
    },
  ];

  export const notifications = [
    {
      id: 1,
      type: "application",
      message: "Your application for Frontend Developer at TechCorp was viewed",
      time: "2 hours ago",
      icon: Eye,
    },
    {
      id: 2,
      type: "message",
      message: "New message from Design Studio recruiter",
      time: "4 hours ago",
      icon: MessageSquare,
    },
    {
      id: 3,
      type: "job_match",
      message: "5 new jobs match your preferences",
      time: "1 day ago",
      icon: Search,
    },
  ];

  export const dashboardStats = [
      {
        title: "Applications Sent",
        value:5,
        change: "+3 this week",
        icon: Send,
        color: "bg-blue-500",
        url:"application-sent"
      },
      {
        title: "Profile Views",
        value: "156",
        change: "+12 this week",
        icon: Eye,
        color: "bg-green-500",
        url:"profile-views"
      },
      {
        title: "Saved Jobs",
        value: "18",
        change: "+5 this week",
        icon: Bookmark,
        color: "bg-purple-500",
        url:"saved-jobs"
      },
      {
        title: "Interview Invites",
        value: "3",
        change: "+1 this week",
        icon: Star,
        color: "bg-orange-500",
        url:"interview-invites"
      },
    ];