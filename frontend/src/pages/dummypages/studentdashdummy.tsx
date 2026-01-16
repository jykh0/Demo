import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Static Components & Interfaces ---

interface Course {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    modules: number;
    tutorName: string;
}

interface CourseSection {
    title: string;
    description: string;
}

// Simple Loading Overlay
const SimpleLoadingOverlay: React.FC = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-8 shadow-2xl min-w-[400px]">
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Launching Course</h3>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full animate-loading-bar"></div>
                </div>
            </div>
        </div>
    );
};

// Static Course Card (Modified to be non-interactive unless specified)
const StaticCourseCard: React.FC<{
    course: Course;
    onClick?: () => void;
    interactive?: boolean;
}> = ({ course, onClick, interactive }) => {
    return (
        <div
            onClick={interactive ? onClick : undefined}
            className={`group relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col ${interactive ? 'cursor-pointer hover:scale-105' : 'cursor-default'}`}
        >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-gray-100 overflow-hidden">
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${course.thumbnailUrl}')` }}
                />

                {/* Module Count Badge */}
                <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded-md font-medium flex items-center">
                    <i className="fas fa-layer-group text-[8px] mr-1.5 opacity-70"></i>
                    {course.modules} Modules
                </div>
            </div>

            {/* Info */}
            <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-bold text-gray-900 line-clamp-2 leading-tight mb-2 group-hover:text-blue-600 transition-colors">
                    {course.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                    {course.description}
                </p>

                <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
                    <span className="flex items-center">
                        <i className="fas fa-user-circle mr-1.5"></i>
                        {course.tutorName}
                    </span>
                    {interactive && (
                        <span className="text-blue-600 font-semibold text-[10px] uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">
                            View Details
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

// Course Details View Component (Internal)
const CourseDetailsView: React.FC<{ onBack: () => void; onStart: () => void }> = ({ onBack, onStart }) => {
    const courseDetails = {
        title: "IT and Environment",
        description: "Exploring the impact of technology on our ecosystem and sustainable computing practices.",
        thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
        tutorName: 'Sarah Tech',
        sections: [
            {
                title: "E-Waste Basics",
                description: "Introduction to electronic waste, learn about different types of electronic waste, and their global impact."
            },
            {
                title: "Recycling Methods and Best Practices",
                description: "Discover the most effective ways to recycle electronics and how to implement them in daily life."
            },
            {
                title: "Global Impact and Future Solutions",
                description: "Analyzing the worldwide effects of tech waste and exploring innovative future solutions."
            }
        ]
    };

    return (
        <div className="animate-fade-in-up space-y-8">
            {/* Header / Hero */}
            <div className="relative rounded-3xl overflow-hidden aspect-[21/9] w-full bg-gray-900 shadow-2xl">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-60"
                    style={{ backgroundImage: `url('${courseDetails.thumbnailUrl}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full max-w-4xl">
                    <button
                        onClick={onBack}
                        className="mb-6 flex items-center text-white/80 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider gap-2 group"
                    >
                        <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i> Back to Dashboard
                    </button>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight drop-shadow-lg">
                        {courseDetails.title}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 mb-8 font-medium max-w-2xl leading-relaxed">
                        {courseDetails.description}
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                            <i className="fas fa-user-circle text-white"></i>
                            <span className="text-white font-semibold text-sm">{courseDetails.tutorName}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                            <i className="fas fa-layer-group text-white"></i>
                            <span className="text-white font-semibold text-sm">3 Sections</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content & Actions */}
            <div className="grid lg:grid-cols-[2fr,1fr] gap-8">
                {/* Sections List */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">Course Content</h2>
                        <button
                            onClick={onStart}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all hover:scale-105 active:scale-95">
                            Start Course <i className="fas fa-play ml-2 text-xs"></i>
                        </button>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        {courseDetails.sections.map((section, idx) => (
                            <div key={idx} className="p-6 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors group cursor-default">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold text-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        {idx + 1}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                            {section.title}
                                        </h3>
                                        <p className="text-gray-500 mt-1 leading-relaxed">
                                            {section.description}
                                        </p>
                                    </div>
                                    <div className="ml-auto flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <i className="fas fa-lock text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar Info (Static) */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4">Course Features</h3>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li className="flex items-center gap-3">
                                <i className="fas fa-video w-5 text-center text-blue-500"></i> High Quality Video
                            </li>
                            <li className="flex items-center gap-3">
                                <i className="fas fa-file-alt w-5 text-center text-blue-500"></i> Class Notes
                            </li>
                            <li className="flex items-center gap-3">
                                <i className="fas fa-certificate w-5 text-center text-blue-500"></i> Completion Certificate
                            </li>
                            <li className="flex items-center gap-3">
                                <i className="fas fa-mobile-alt w-5 text-center text-blue-500"></i> Mobile Access
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}


const StudentDashDummy: React.FC = () => {
    const navigate = useNavigate();
    const [view, setView] = useState<'dashboard' | 'course-details'>('dashboard');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleStartCourse = () => {
        setIsLoading(true);
        setTimeout(() => {
            navigate('/dummy-watch');
        }, 1000);
    };

    // Static Data
    const currentUser = {
        name: 'Amal',
        streak: 12,
        role: 'student',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop'
    };

    const myLearningCourses: Course[] = [
        {
            id: '1',
            title: 'Photosynthesis: The Engine of Life',
            description: 'Understand how plants convert light into energy in this comprehensive biology unit.',
            thumbnailUrl: 'https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?q=80&w=1000&auto=format&fit=crop', // Plant/Leaves
            modules: 4,
            tutorName: 'Dr. Emily Green'
        },
        {
            id: '2',
            title: 'Introduction to Organic Chemistry',
            description: 'A beginner-friendly guide to carbon-based life forms and chemical reactions.',
            thumbnailUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1000&auto=format&fit=crop', // Lab/Chemistry
            modules: 6,
            tutorName: 'Prof. Alan Bond'
        },
        {
            id: '3',
            title: 'IT and Environment',
            description: 'Exploring the impact of technology on our ecosystem.',
            thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop', // Earth/Tech
            modules: 3,
            tutorName: 'Sarah Tech'
        }
    ];

    const channelCourses: Course[] = [
        {
            id: '101',
            title: 'Complete React Guide',
            description: 'Master React.js from scratch. Hooks, Redux, and more.',
            thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop', // React-ish
            modules: 12,
            tutorName: 'CodeMaster Academy'
        },
        {
            id: '102',
            title: 'Python for Beginners',
            description: 'Learn Python programming language from basics to advanced concepts.',
            thumbnailUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=1000&auto=format&fit=crop', // Python/Code
            modules: 8,
            tutorName: 'CodeMaster Academy'
        },
        {
            id: '103',
            title: 'JavaScript Essentials',
            description: 'Deep dive into modern JavaScript ES6+ features.',
            thumbnailUrl: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=1000&auto=format&fit=crop', // JS/Code
            modules: 10,
            tutorName: 'CodeMaster Academy'
        },
        {
            id: '104',
            title: 'Web Design Fundamentals',
            description: 'Create beautiful websites with HTML5 and CSS3.',
            thumbnailUrl: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=1000&auto=format&fit=crop', // Design
            modules: 5,
            tutorName: 'CodeMaster Academy'
        }
    ];

    const sidebarItems = [
        { icon: 'fa-home', label: 'Dashboard', active: true },
        { icon: 'fa-compass', label: 'Explore', active: false },
        { icon: 'fa-play-circle', label: 'Subscription', active: false },
        { icon: 'fa-book-open', label: 'My Learning', active: false },
        { icon: 'fa-users', label: 'Community', active: false },
        { icon: 'fa-robot', label: 'AI Buddy', active: false },
    ];

    // Handler for course clicks
    const handleCourseClick = (courseId: string) => {
        if (courseId === '3') {
            setView('course-details');
            window.scrollTo(0, 0);
        }
        // Others do nothing
    };

    return (
        <div className="min-h-screen bg-gray-50/50 flex font-sans text-gray-900">
            {isLoading && <SimpleLoadingOverlay />}
            {/* Sidebar (Desktop) */}
            <aside className="w-20 lg:w-64 bg-white border-r border-gray-100 hidden md:flex flex-col sticky top-0 h-screen z-30">
                <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6">
                    <div className="flex items-center space-x-3 cursor-default">
                        {/* Text-based Logo as requested */}
                        <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                            Vital
                        </span>
                    </div>
                </div>

                <nav className="flex-1 py-6 px-3 space-y-2">
                    {sidebarItems.map(item => (
                        <div
                            key={item.label}
                            className={`flex items-center lg:px-4 px-2 py-3.5 rounded-xl transition-all cursor-default ${item.active
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-600'
                                }`}
                        >
                            <i className={`fas ${item.icon} w-6 text-center text-lg`}></i>
                            <span className="ml-3 font-medium hidden lg:block">{item.label}</span>
                        </div>
                    ))}
                </nav>

                {/* User Mini Profile */}
                <div className="p-4 border-t border-gray-50">
                    <div className="flex items-center lg:space-x-3 justify-center lg:justify-start">
                        <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" />
                        <div className="hidden lg:block overflow-hidden">
                            <p className="text-sm font-bold text-gray-800 truncate">{currentUser.name}</p>
                            <p className="text-xs text-gray-400 truncate">Student Plan</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0">

                {/* Top Header */}
                <header className="h-20 bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-gray-100 px-4 md:px-6 flex items-center justify-between gap-4">

                    {/* Visual Elements only */}
                    <button className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                        <i className="fas fa-bars text-xl"></i>
                    </button>

                    <div className="flex-1 max-w-2xl relative">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <i className="fas fa-search text-gray-400 hidden md:block"></i>
                            </div>
                            <input
                                type="text"
                                className="w-full pl-4 md:pl-11 pr-12 py-3 bg-gray-50 border-none rounded-2xl text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all shadow-sm text-sm"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400">
                                <i className="fas fa-microphone"></i>
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center space-x-5 ml-6">
                        <button className="relative p-2 text-gray-500 hover:text-blue-600 transition-colors">
                            <i className="fas fa-bell text-xl"></i>
                            <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>

                        <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden cursor-pointer">
                            <img src={currentUser.avatarUrl} alt="User" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-12 pb-24">

                    {view === 'dashboard' ? (
                        <>
                            {/* Welcome Section */}
                            <section>
                                <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
                                    <div>
                                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                                            Welcome Back, {currentUser.name} 👋
                                        </h1>
                                        <p className="text-gray-500 mt-2 font-medium">You're on a {currentUser.streak}-day streak! Keep it up!</p>
                                    </div>

                                    {/* Streak Pill */}
                                    <div className="mt-4 md:mt-0 bg-orange-50 border border-orange-100 px-4 py-2 rounded-full flex items-center space-x-2 text-orange-600 font-bold shadow-sm cursor-default">
                                        <i className="fas fa-fire animate-pulse"></i>
                                        <span>{currentUser.streak} Day Streak</span>
                                    </div>
                                </div>
                            </section>

                            {/* My Learning Section */}
                            <section>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-gray-900">My Learning</h2>
                                    <span className="text-sm font-bold text-blue-600 cursor-default opacity-50">View All</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {myLearningCourses.map(course => (
                                        <StaticCourseCard
                                            key={course.id}
                                            course={course}
                                            onClick={() => handleCourseClick(course.id)}
                                            interactive={course.id === '3'} // Only IT and Environment is interactive
                                        />
                                    ))}
                                </div>
                            </section>

                            {/* Subscribed Channel Section */}
                            <section className="pt-8 border-t border-gray-100">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
                                        CM
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">CodeMaster Academy</h2>
                                        <p className="text-sm text-gray-500">Subscribed Channel • 1.2M Subscribers</p>
                                    </div>
                                    <button className="ml-auto px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg text-sm hover:bg-gray-200 transition-colors">
                                        Subscribed
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {channelCourses.map(course => (
                                        <StaticCourseCard
                                            key={course.id}
                                            course={course}
                                        // No interactive props, so completely static
                                        />
                                    ))}
                                </div>
                            </section>
                        </>
                    ) : (
                        <CourseDetailsView
                            onBack={() => setView('dashboard')}
                            onStart={handleStartCourse}
                        />
                    )}

                </div>
            </main>
        </div>
    );
};

export default StudentDashDummy;
