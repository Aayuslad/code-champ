import React from "react";
import {
    FaBlog,
    FaCode,
    FaCodeBranch,
    FaGithub,
    FaInstagram,
    FaLaptopCode,
    FaLightbulb,
    FaLinkedin,
    FaTrophy,
    FaTwitter,
    FaUserFriends,
    FaUserGraduate,
} from "react-icons/fa";
import { LuUser2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import Founder from "../assets/Founder.jpg";
import UserAvatar from "../assets/img_avatar.png";
import { ThemeChanger } from "../components/themeChanger";

interface TestimonialProps {
    quote: string;
    name: string;
    position: string;
    image: string;
}

const testimonials: TestimonialProps[] = [
    {
        quote: "Code Champ helped me land my first developer role! The real-world challenges and interview prep made all the difference.",
        name: "Alex Johnson",
        position: "Frontend Developer at TechCorp",
        image: "/api/placeholder/60/60",
    },
    {
        quote: "The DSA problems on Code Champ are perfectly curated. I've seen similar questions in multiple interviews and was well-prepared!",
        name: "Sophia Chen",
        position: "Software Engineer at StartupX",
        image: "/api/placeholder/60/60",
    },
    {
        quote: "Creating my own coding contests helped me understand algorithms at a deeper level. Code Champ's platform is unmatched!",
        name: "Michael Rodriguez",
        position: "Full-Stack Developer",
        image: "/api/placeholder/60/60",
    },
];

const CodeChampLandingPage: React.FC = () => {
    const navigate = useNavigate();

    const TestimonialCard: React.FC<TestimonialProps> = ({ quote, name, position }) => (
        <div className="p-6 rounded-lg bg-light200 dark:bg-dark300 shadow-md flex flex-col">
            <p className="text-lg italic mb-4 text-lightText900 dark:text-darkText900">"{quote}"</p>
            <div className="flex items-center mt-auto">
                {/* <img src={image} alt={name} className="w-12 h-12 rounded-full mr-4" /> */}
                <div className="Profile mr-4 h-9 w-9 p-0 rounded-full aspect-square flex items-center justify-center overflow-hidden cursor-pointer border border-dark100 dark:border-light200 text-xl">
                    <LuUser2 />
                </div>

                <div>
                    <h4 className="font-medium text-lightText900 dark:text-darkText900">{name}</h4>
                    <p className="text-sm text-lightText800 dark:text-darkText800">{position}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-light100 dark:bg-dark100 text-lightText900 dark:text-darkText900 font-poppins">
            {/* Navigation */}
            <nav className="bg-light200 dark:bg-dark200 py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50 shadow-md">
                <div className="flex items-center">
                    <FaCode className="text-2xl mr-2 text-buttonBlue" />
                    <h1 className="text-2xl font-bold font-pacifico">Code Champ</h1>
                </div>
                <div className="flex items-center space-x-6">
                    <ThemeChanger />
                    <button
                        onClick={() => navigate("/signin")}
                        className="hidden md:block px-4 py-2 rounded-md border border-buttonBlue text-buttonBlue hover:bg-buttonBlue hover:text-white transition duration-300"
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => navigate("/problems")}
                        className="px-5 py-2 rounded-md bg-buttonBlue text-white font-medium hover:bg-opacity-90 transition duration-300"
                    >
                        Get Started
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="py-16 px-6 md:px-12 lg:flex items-center justify-between bg-light200 dark:bg-dark200">
                <div className="lg:w-1/2 mb-10 lg:mb-0">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        Supercharge Your Coding Skills & Ace Your Interviews with{" "}
                        <span className="text-buttonBlue">Code Champ</span>
                    </h1>
                    <p className="text-lg mb-8 leading-relaxed">
                        Solve handpicked DSA challenges, compete with top talent, and track your coding evolution.
                    </p>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                        <button
                            onClick={() => navigate("/problems")}
                            className="px-8 py-3 rounded-md bg-buttonBlue text-white font-medium hover:bg-opacity-90 transition duration-300 text-lg"
                        >
                            Get Started
                        </button>
                        <button
                            onClick={() => navigate("/signin")}
                            className="px-8 py-3 rounded-md border border-lightText800 dark:border-darkText800 font-medium hover:bg-opacity-10 hover:bg-buttonBlue transition duration-300 text-lg"
                        >
                            Sign In
                        </button>
                    </div>
                    <p className="text-sm text-lightText800 dark:text-darkText800">
                        1,000+ Curated DSA Problems | 4 Skill Levels | Compete, Learn & Build Your Profile
                    </p>
                </div>
                <div className="lg:w-1/2 relative">
                    <div className="relative z-10 rounded-lg overflow-hidden shadow-xl bg-light200 dark:bg-dark300 p-6">
                        <div className="bg-light300 dark:bg-dark200 p-3 rounded-md mb-4">
                            <pre className="text-buttonBlue">
                                <code>
                                    {`// Example problem: Two Sum
function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return [];
}`}
                                </code>
                            </pre>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <span className="text-sm text-lightText800 dark:text-darkText800">Problem: Two Sum (Easy)</span>
                                <div className="flex items-center mt-2">
                                    <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                                    <span className="text-green-500 text-sm">All Tests Passed</span>
                                </div>
                            </div>
                            <button
                                onClick={() => navigate("/problems")}
                                className="px-4 py-2 bg-buttonBlue text-white rounded-md text-sm"
                            >
                                Submit Solution
                            </button>
                        </div>
                    </div>
                    <div className="absolute -bottom-6 -right-6 h-64 w-64 bg-buttonBlue opacity-10 rounded-full z-0"></div>
                    <div className="absolute -top-6 -left-6 h-32 w-32 bg-buttonBlue opacity-10 rounded-full z-0"></div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-6 md:px-12 bg-light200 dark:bg-dark200">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Why You'll Love Code Champ</h2>
                    <p className="max-w-2xl mx-auto text-lightText800 dark:text-darkText800">
                        Discover the features that make Code Champ the preferred platform for coders at every level
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="p-6 rounded-lg bg-light100 dark:bg-dark300 shadow-md text-center">
                        <div className="bg-buttonBlue bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaLaptopCode className="text-buttonBlue text-2xl" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Master Problem-Solving</h3>
                        <p className="text-lightText800 dark:text-darkText800">
                            Tackle a diverse set of DSA challenges across topics with difficulty levels from Basic to Hard.
                        </p>
                    </div>

                    <div className="p-6 rounded-lg bg-light100 dark:bg-dark300 shadow-md text-center">
                        <div className="bg-buttonBlue bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaTrophy className="text-buttonBlue text-2xl" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Compete in Contests</h3>
                        <p className="text-lightText800 dark:text-darkText800">
                            Jump into thrilling contests or design your own, challenging friends or the community!
                        </p>
                    </div>

                    <div className="p-6 rounded-lg bg-light100 dark:bg-dark300 shadow-md text-center">
                        <div className="bg-buttonBlue bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaCodeBranch className="text-buttonBlue text-2xl" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Contribute & Build</h3>
                        <p className="text-lightText800 dark:text-darkText800">
                            Be a community hero! Submit your own problems or test cases and leave a lasting impact.
                        </p>
                    </div>

                    <div className="p-6 rounded-lg bg-light100 dark:bg-dark300 shadow-md text-center">
                        <div className="bg-buttonBlue bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaBlog className="text-buttonBlue text-2xl" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Share Your Voice</h3>
                        <p className="text-lightText800 dark:text-darkText800">
                            Share insights and tips with fellow coders through our blog section.
                        </p>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 px-6 md:px-12 bg-light200 dark:bg-dark200">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Get Started in 4 Easy Steps</h2>
                    <p className="max-w-2xl mx-auto text-lightText800 dark:text-darkText800">
                        Dive into the world of Code Champ with our simple onboarding process
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {
                            icon: <FaUserFriends />,
                            title: "Sign Up & Join",
                            description: "Create your account in seconds and unlock access to hundreds of challenges.",
                        },
                        {
                            icon: <FaLightbulb />,
                            title: "Choose Your Challenge",
                            description: "Explore a wide range of DSA topics and pick challenges that match your skill level.",
                        },
                        {
                            icon: <FaCode />,
                            title: "Code, Submit & Test",
                            description: "Write your code, submit it, and receive instant feedback as your solution is tested.",
                        },
                        {
                            icon: <FaUserGraduate />,
                            title: "Track & Rise",
                            description: "Monitor your progress, climb the leaderboards, and get noticed by recruiters.",
                        },
                    ].map((step, index) => (
                        <div key={index} className="relative flex flex-col items-center">
                            <div className="relative">
                                <div className="w-16 h-16 rounded-full bg-light200 dark:bg-dark300 flex items-center justify-center text-buttonBlue text-2xl z-10 relative">
                                    {step.icon}
                                </div>
                                {index < 3 && (
                                    <div className="absolute top-8 left-16 w-full h-0.5 bg-light300 dark:bg-dark300 hidden lg:block"></div>
                                )}
                            </div>
                            <h3 className="text-xl font-bold mt-4 mb-2">{step.title}</h3>
                            <p className="text-center text-lightText800 dark:text-darkText800">{step.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Career Section */}
            <section className="py-20 px-6 md:px-12 bg-light200 dark:bg-dark200">
                <div className="max-w-6xl mx-auto">
                    <div className="lg:flex items-center justify-between">
                        <div className="lg:w-1/2 mb-10 lg:mb-0">
                            <h2 className="text-3xl font-bold mb-6">Unlock Your Dream Job with Code Champ</h2>
                            <div className="space-y-6">
                                <div className="flex">
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="w-8 h-8 rounded-full bg-buttonBlue bg-opacity-10 flex items-center justify-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 text-buttonBlue"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-xl font-bold mb-2">Build a Standout Profile for Recruiters</h3>
                                        <p className="text-lightText800 dark:text-darkText800">
                                            Create a dynamic profile that showcases your progress, coding skills, and achievements
                                            to impress recruiters.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="w-8 h-8 rounded-full bg-buttonBlue bg-opacity-10 flex items-center justify-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 text-buttonBlue"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-xl font-bold mb-2">Practice with Real Interview-Style Challenges</h3>
                                        <p className="text-lightText800 dark:text-darkText800">
                                            Train with coding challenges inspired by actual interview questions from top tech
                                            companies.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex">
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="w-8 h-8 rounded-full bg-buttonBlue bg-opacity-10 flex items-center justify-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 text-buttonBlue"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-xl font-bold mb-2">Get Support from a Like-Minded Community</h3>
                                        <p className="text-lightText800 dark:text-darkText800">
                                            Tap into the Code Champ community for guidance, tips, and discussions on job-related
                                            topics.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-2/5">
                            <div className="rounded-lg overflow-hidden shadow-xl bg-light100 dark:bg-dark300">
                                <div className="p-6 border-b border-light300 dark:border-dark200">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-bold text-lg">Developer Profile</h3>
                                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                                            Available for hire
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <img src={UserAvatar} alt="Profile" className="w-16 h-16 rounded-full mr-4" />
                                        <div>
                                            <h4 className="font-bold text-lg">David Kim</h4>
                                            <p className="text-sm text-lightText800 dark:text-darkText800">
                                                Full-Stack Developer
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-3 gap-4 mb-6">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-buttonBlue">219</div>
                                            <div className="text-xs text-lightText800 dark:text-darkText800">Problems Solved</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-buttonBlue">14</div>
                                            <div className="text-xs text-lightText800 dark:text-darkText800">Contests</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-buttonBlue">94%</div>
                                            <div className="text-xs text-lightText800 dark:text-darkText800">Success Rate</div>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <h5 className="font-medium mb-2">Top Skills</h5>
                                        <div className="flex flex-wrap gap-2">
                                            {["Dynamic Programming", "Graph Algorithms", "Trees", "Sorting"].map(
                                                (skill, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1 rounded-full text-xs bg-light200 dark:bg-dark200 text-lightText900 dark:text-darkText900"
                                                    >
                                                        {skill}
                                                    </span>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                    <button className="w-full py-2 bg-buttonBlue text-white rounded-md font-medium hover:bg-opacity-90 transition duration-300">
                                        View Full Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 px-6 md:px-12 bg-light200 dark:bg-dark200">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Success Stories & Testimonials</h2>
                    <p className="max-w-2xl mx-auto text-lightText800 dark:text-darkText800">
                        See how Code Champ has helped developers around the world
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 lg:px-20">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} {...testimonial} />
                    ))}
                </div>
            </section>

            {/* Meet the Developer Section */}
            <section className="py-20 px-6 md:px-12 bg-light200 dark:bg-dark200">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Meet the Founder</h2>
                        <p className="max-w-2xl mx-auto text-lightText800 dark:text-darkText800">
                            The mind behind Code Champ working to make technical interviews more accessible
                        </p>
                    </div>

                    <div className="lg:flex items-center justify-between">
                        <div className="lg:w-2/5 mb-10 lg:mb-0">
                            <div className="relative">
                                <div className="rounded-lg overflow-hidden shadow-xl">
                                    <img src={Founder} alt="Developer" className="w-full object-cover" />
                                </div>
                                <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-buttonBlue opacity-10 rounded-full z-0"></div>
                                <div className="absolute -top-6 -left-6 h-48 w-48 bg-buttonBlue opacity-10 rounded-full z-0"></div>
                            </div>
                        </div>

                        <div className="lg:w-1/2">
                            <h3 className="text-3xl font-bold mb-4">Aayush Lad</h3>
                            <p className="text-lg text-lightText800 dark:text-darkText800 mb-6">Founder & Developer</p>

                            <div className="space-y-6 mb-8 text-justify">
                                <p className="text-lightText900 dark:text-darkText900">
                                    I’m a passionate software developer who loves building complex web applications. While working
                                    on various projects, I realized the need for a competitive coding platform that offers an
                                    intuitive experience and real-world problem-solving.
                                </p>
                                <p className="text-lightText900 dark:text-darkText900">
                                    I founded Code Champ to help developers practice coding with automated test cases, insightful
                                    analytics, and a seamless coding experience. Our goal is to make coding practice more
                                    efficient and engaging for students and professionals.
                                </p>
                                <p className="text-lightText900 dark:text-darkText900">
                                    When I’m not coding, I enjoy exploring new technologies, contributing to open-source projects,
                                    and sharing knowledge with fellow developers.
                                </p>
                            </div>

                            <div className="mb-8">
                                <h4 className="font-bold mb-3">Tech Stack</h4>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        "TypeScript",
                                        "React.js",
                                        "Node.js",
                                        "PostgreSQL",
                                        "Prisma",
                                        "Redis",
                                        "Docker",
                                        "AWS (S3, CloudFront, EC2)",
                                    ].map((skill, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 rounded-full text-xs bg-light100 dark:bg-dark300 text-lightText900 dark:text-darkText900"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex space-x-6">
                                <a
                                    href="https://github.com/Aayuslad"
                                    className="text-xl hover:text-buttonBlue transition duration-300 text-lightText900 dark:text-darkText900"
                                >
                                    <FaGithub />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/aayush-lad/"
                                    className="text-xl hover:text-buttonBlue transition duration-300 text-lightText900 dark:text-darkText900"
                                >
                                    <FaLinkedin />
                                </a>
                                <a
                                    href="https://www.instagram.com/aayushlad058/"
                                    className="text-xl hover:text-buttonBlue transition duration-300 text-lightText900 dark:text-darkText900"
                                >
                                    <FaInstagram />
                                </a>
                                <a
                                    href="https://x.com/AayushLad0805"
                                    className="text-xl hover:text-buttonBlue transition duration-300 text-lightText900 dark:text-darkText900"
                                >
                                    <FaTwitter />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            {/* <section className="py-16 px-6 md:px-12 bg-light200 dark:bg-dark200">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl font-bold mb-4">Stay in the Loop</h2>
                    <p className="mb-6 text-lightText800 dark:text-darkText800">
                        Subscribe to our newsletter for coding tips, platform updates, and exclusive content.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-grow px-4 py-3 rounded-md bg-white dark:bg-dark300 text-lightText900 dark:text-darkText900 border-light300 dark:border-dark300 border focus:outline-none focus:ring-2 focus:ring-buttonBlue"
                        />
                        <button className="px-6 py-3 bg-buttonBlue text-white rounded-md font-medium hover:bg-opacity-90 transition duration-300">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section> */}

            {/* Footer */}
            <footer className="py-12 px-6 md:px-12 bg-light200 dark:bg-dark200">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center mb-4">
                                <FaCode className="text-xl mr-2 text-buttonBlue" />
                                <h3 className="text-xl font-bold font-pacifico">Code Champ</h3>
                            </div>
                            <p className="text-lightText800 dark:text-darkText800">
                                Elevating coding skills and unlocking opportunities for developers worldwide.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-bold mb-4">Discover Code Champ</h4>
                            <ul className="space-y-2 text-lightText800 dark:text-darkText800">
                                <li>
                                    <a href="#" className="hover:text-buttonBlue transition duration-300">
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-buttonBlue transition duration-300">
                                        Contact Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-buttonBlue transition duration-300">
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-buttonBlue transition duration-300">
                                        Terms of Service
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold mb-4">Resources</h4>
                            <ul className="space-y-2 text-lightText800 dark:text-darkText800">
                                <li>
                                    <a href="#" className="hover:text-buttonBlue transition duration-300">
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-buttonBlue transition duration-300">
                                        Tutorials
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-buttonBlue transition duration-300">
                                        FAQ
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-buttonBlue transition duration-300">
                                        Community
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold mb-4">Join the Conversation</h4>
                            <div className="flex space-x-4 mb-6">
                                <a
                                    href="#"
                                    className="text-xl hover:text-buttonBlue transition duration-300 text-lightText800 dark:text-darkText800"
                                >
                                    <FaGithub />
                                </a>
                                <a
                                    href="#"
                                    className="text-xl hover:text-buttonBlue transition duration-300 text-lightText800 dark:text-darkText800"
                                >
                                    <FaLinkedin />
                                </a>
                                <a
                                    href="#"
                                    className="text-xl hover:text-buttonBlue transition duration-300 text-lightText800 dark:text-darkText800"
                                >
                                    <FaTwitter />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 mt-8 border-t border-light300 dark:border-dark300 text-lightText800 dark:text-darkText800 text-sm">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <p>© {new Date().getFullYear()} Code Champ. All rights reserved.</p>
                            <div className="flex space-x-6 mt-4 md:mt-0">
                                <a href="#" className="hover:text-buttonBlue transition duration-300">
                                    Privacy
                                </a>
                                <a href="#" className="hover:text-buttonBlue transition duration-300">
                                    Terms
                                </a>
                                <a href="#" className="hover:text-buttonBlue transition duration-300">
                                    Cookies
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default CodeChampLandingPage;
