import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Types
interface Module {
    id: number;
    title: string;
    type: 'video' | 'document' | 'audio';
    video: File | null;
    document: File | null;
    order: number;
}

const TutorDummy: React.FC = () => {
    // State management for view switching (dashboard vs upload page)
    const [currentView, setCurrentView] = useState<'dashboard' | 'upload'>('dashboard');
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();

    // Training modal states
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [trainingPhase, setTrainingPhase] = useState<'progress' | 'graph'>('progress');
    const [trainingStep, setTrainingStep] = useState(0);
    const [progressValue, setProgressValue] = useState(0);
    const [xpPoints, setXpPoints] = useState(0);
    const [currentLevel, setCurrentLevel] = useState(5);

    // Form state
    const [moduleCount, setModuleCount] = useState<number>(1);
    const [modules, setModules] = useState<Module[]>([
        { id: 1, title: 'Module 1', type: 'video', video: null, document: null, order: 1 }
    ]);
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
    const [isPaid, setIsPaid] = useState<boolean>(false);
    const [price, setPrice] = useState<string>('');

    const thumbRef = useRef<HTMLInputElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const descRef = useRef<HTMLTextAreaElement>(null);

    const dummyCourses = [
        {
            id: 1,
            title: 'Introduction to Data Science',
            description: 'Uploaded documents: DataScience_Basics.pdf, Statistics_Guide.pdf',
            revenue: 20,
            growth: '+$5',
            icon: 'fa-file-pdf',
            color: 'from-blue-500 to-purple-600'
        }
    ];

    const handleThumbnailUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setThumbnailPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleModuleCountChange = (count: number) => {
        setModuleCount(count);
        const newModules: Module[] = [];
        for (let i = 1; i <= count; i++) {
            const existingModule = modules.find(m => m.id === i);
            newModules.push({
                id: i,
                title: existingModule?.title || `Module ${i}`,
                type: existingModule?.type || 'video',
                video: existingModule?.video || null,
                document: existingModule?.document || null,
                order: i
            });
        }
        setModules(newModules);
    };

    const handleModuleTitleChange = (id: number, title: string) => {
        setModules(prev => prev.map(m =>
            m.id === id ? { ...m, title } : m
        ));
    };

    const handleModuleTypeChange = (id: number, type: 'video' | 'document' | 'audio') => {
        setModules(prev => prev.map(m =>
            m.id === id ? { ...m, type, video: (type === 'video' || type === 'audio') ? m.video : null, document: type === 'document' ? m.document : null } : m
        ));
    };

    const handleVideoUpload = (id: number, file: File | null) => {
        setModules(prev => prev.map(m =>
            m.id === id ? { ...m, video: file } : m
        ));
    };

    const handleDocumentUpload = (id: number, file: File | null) => {
        setModules(prev => prev.map(m => {
            if (m.id === id) {
                // Auto-update module title to PDF filename (without extension)
                const newTitle = file ? file.name.replace(/\.pdf$/i, '') : m.title;
                return { ...m, document: file, title: newTitle };
            }
            return m;
        }));
    };

    const handleCreateCourseClick = () => {
        setCurrentView('upload');
        window.scrollTo(0, 0);
    };

    const handlePublishCourse = () => {
        // Simulate publishing with training modal (~10 seconds)
        setShowSuccessModal(true);
        setTrainingPhase('progress');
        setProgressValue(0);
        setTrainingStep(0);
        setXpPoints(5000); // Start at Level 5 XP
        setCurrentLevel(5);

        // Animate progress bar over ~8 seconds
        let progress = 0;
        let xp = 5000; // Starting XP for Level 5
        const interval = setInterval(() => {
            progress += 1.25; // 100 / 1.25 = 80 iterations * 100ms = 8 seconds
            xp += 47.5; // Reach ~8800 XP (5000 + 3800)

            // Level up at 50% progress (Level 5 → Level 6)
            if (progress >= 50 && currentLevel === 5) {
                setCurrentLevel(6);
            }

            if (progress >= 100) {
                progress = 100;
                xp = 8800;
                clearInterval(interval);

                // Wait a moment at 100% then switch to graph
                setTimeout(() => {
                    setTrainingPhase('graph');
                    // Start graph animation sequence
                    setTimeout(() => setTrainingStep(1), 100);
                    setTimeout(() => setTrainingStep(2), 2500);
                }, 1000);
            }
            setProgressValue(progress);
            setXpPoints(Math.round(xp));
        }, 100); // 100ms intervals
    };

    const handleNonInteractive = () => {
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    };

    const handleViewChannelPage = () => {
        // Reset everything and go back to dashboard
        setShowSuccessModal(false);
        setCurrentView('dashboard');
        if (titleRef.current) titleRef.current.value = '';
        if (descRef.current) descRef.current.value = '';
        setThumbnailPreview(null);
        setIsPaid(false);
        setPrice('');
        setModuleCount(1);
        setModules([{ id: 1, title: 'Module 1', type: 'video', video: null, document: null, order: 1 }]);
        setTrainingStep(0);
        setProgressValue(0);
        window.scrollTo(0, 0);
    };

    const formatSize = (bytes: number) => (bytes / (1024 * 1024)).toFixed(2) + ' MB';

    return (
        <div className="main-container bg-gray-50 font-sans">
            {currentView === 'dashboard' ? (
                /* DASHBOARD VIEW */
                <>
                    {/* Topbar */}
                    <div className="topbar">
                        <div className="topbar-left logo-effect">
                            <a href="#" onClick={() => setCurrentView('dashboard')} className="flex items-center space-x-2">
                                <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                                    Vital
                                </span>
                            </a>
                        </div>
                        <div className="topbar-right">
                            <div className="flex items-center space-x-4">
                                <a href="#" onClick={handleNonInteractive} className="text-gray-700 hover:text-blue-600 font-medium">My Channel</a>
                                <h1 className="text-2xl font-bold text-gray-800 cursor-pointer hover:text-blue-600 transition-colors" onClick={() => setCurrentView('dashboard')}>Dashboard</h1>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button onClick={handleNonInteractive} className="relative p-2 text-gray-600 hover:text-gray-800 transition-colors">
                                    <i className="fas fa-bell text-lg"></i>
                                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></span>
                                </button>
                                <div onClick={handleNonInteractive} className="flex items-center space-x-3 cursor-pointer">
                                    <div className="w-9 h-9 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                        <span className="text-white font-bold text-sm">S</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors flex items-center gap-2"
                                >
                                    <i className="fas fa-sign-out-alt"></i>
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="sidebar bg-white flex flex-col">
                        <nav className="flex-1 p-4">
                            <ul className="space-y-2">
                                <li><a className="nav-item w-full flex items-center space-x-3 px-4 py-3 font-medium" href="#" onClick={handleCreateCourseClick}><i className="fas fa-upload text-sm"></i><span>Upload Course</span></a></li>
                                <li><a className="nav-item w-full flex items-center space-x-3 px-4 py-3 font-medium" href="#" onClick={handleNonInteractive}><i className="fas fa-chart-bar text-sm"></i><span>Analytics</span></a></li>
                                <li><a className="nav-item w-full flex items-center space-x-3 px-4 py-3 font-medium" href="#" onClick={handleNonInteractive}><i className="fas fa-comments text-sm"></i><span>Comments</span></a></li>
                                <li><a className="nav-item w-full flex items-center space-x-3 px-4 py-3 font-medium" href="#" onClick={handleNonInteractive}><i className="fas fa-dollar-sign text-sm"></i><span>Monetization</span></a></li>
                                <li><a className="nav-item w-full flex items-center space-x-3 px-4 py-3 font-medium" href="#" onClick={handleNonInteractive}><i className="fas fa-edit text-sm"></i><span>Edit Uploads</span></a></li>
                            </ul>
                        </nav>
                        <div className="settings-section p-4">
                            <button onClick={handleNonInteractive} className="nav-item w-full flex items-center space-x-3 px-4 py-3 font-medium"><i className="fas fa-cog text-sm"></i><span>Channel Setup</span></button>
                        </div>
                    </div>

                    <div className="t-vertical"></div>

                    {/* Main Content */}
                    <div className="main-content flex flex-col">
                        <main className="flex-1 p-6 overflow-auto" style={{ backgroundColor: 'var(--bg-light-gray)' }}>
                            <div className="max-w-7xl mx-auto">
                                <div className="mb-8">
                                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, Sarah!</h2>
                                    <p className="text-gray-600">Here's what's happening with your courses today.</p>
                                </div>

                                {/* Stats Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                                        <div className="flex items-center justify-between">
                                            <div><p className="text-sm font-medium text-gray-600">Total Courses</p><p className="text-3xl font-bold text-gray-900">1</p></div>
                                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"><i className="fas fa-book text-blue-600 text-xl"></i></div>
                                        </div>
                                        <div className="mt-4 flex items-center"><span className="text-blue-500 text-sm font-medium">New</span><span className="text-gray-500 text-sm ml-2">this week</span></div>
                                    </div>
                                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                                        <div className="flex items-center justify-between">
                                            <div><p className="text-sm font-medium text-gray-600">Active Students</p><p className="text-3xl font-bold text-gray-900">5</p></div>
                                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"><i className="fas fa-users text-green-600 text-xl"></i></div>
                                        </div>
                                        <div className="mt-4 flex items-center"><span className="text-blue-500 text-sm font-medium">+2</span><span className="text-gray-500 text-sm ml-2">this week</span></div>
                                    </div>
                                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                                        <div className="flex items-center justify-between">
                                            <div><p className="text-sm font-medium text-gray-600">Monthly Revenue</p><p className="text-3xl font-bold text-gray-900">$20</p></div>
                                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center"><i className="fas fa-dollar-sign text-yellow-600 text-xl"></i></div>
                                        </div>
                                        <div className="mt-4 flex items-center"><span className="text-gray-600 text-sm font-medium">+$5</span><span className="text-gray-500 text-sm ml-2">last payout</span></div>
                                    </div>
                                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                                        <div className="flex items-center justify-between">
                                            <div><p className="text-sm font-medium text-gray-600">Avg. Rating</p><p className="text-3xl font-bold text-gray-900">4.2</p></div>
                                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center"><i className="fas fa-star text-purple-600 text-xl"></i></div>
                                        </div>
                                        <div className="mt-4 flex items-center"><span className="text-gray-600 text-sm font-medium">2 reviews</span><span className="text-gray-500 text-sm ml-2">so far</span></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Recent Courses */}
                                    <div className="lg:col-span-2">
                                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                            <div className="flex items-center justify-between mb-6"><h3 className="text-xl font-semibold text-gray-800">Recent Courses</h3><button onClick={handleNonInteractive} className="text-blue-600 hover:text-blue-700 font-medium text-sm">View All</button></div>
                                            <div className="space-y-4">
                                                {dummyCourses.map((course) => (
                                                    <div key={course.id} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                                        <div className={`w-16 h-16 bg-gradient-to-r ${course.color} rounded-lg flex items-center justify-center mr-4`}><i className={`fas ${course.icon} text-white text-xl`}></i></div>
                                                        <div className="flex-1"><h4 className="font-semibold text-gray-800">{course.title}</h4><p className="text-sm text-gray-600">{course.description}</p></div>
                                                        <div className="text-right"><p className="font-semibold text-gray-800">${course.revenue}</p><p className="text-sm text-green-600">{course.growth} this week</p></div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick Actions & Activity */}
                                    <div className="space-y-6">
                                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
                                            <div className="space-y-3">
                                                <button onClick={handleCreateCourseClick} className="w-full flex items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left">
                                                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3"><i className="fas fa-plus text-white text-sm"></i></div>
                                                    <div><p className="font-medium text-gray-800">Create New Course</p><p className="text-sm text-gray-600">Start building your next course</p></div>
                                                </button>
                                                <button onClick={handleNonInteractive} className="w-full flex items-center p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left">
                                                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mr-3"><i className="fas fa-chart-line text-white text-sm"></i></div>
                                                    <div><p className="font-medium text-gray-800">View Analytics</p><p className="text-sm text-gray-600">Check your performance</p></div>
                                                </button>
                                                <button onClick={handleNonInteractive} className="w-full flex items-center p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left">
                                                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-3"><i className="fas fa-tv text-white text-sm"></i></div>
                                                    <div><p className="font-medium text-gray-800">View My Channel</p><p className="text-sm text-gray-600">See your channel</p></div>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
                                            <div className="space-y-4">
                                                <div className="flex items-start"><div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div><div><p className="text-sm font-medium text-gray-800">New student enrolled</p><p className="text-xs text-gray-600">Sarah joined "Advanced JavaScript"</p><p className="text-xs text-gray-500">2 hours ago</p></div></div>
                                                <div className="flex items-start"><div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div><div><p className="text-sm font-medium text-gray-800">Course updated</p><p className="text-xs text-gray-600">Added new chapter to UI/UX Design</p><p className="text-xs text-gray-500">5 hours ago</p></div></div>
                                                <div className="flex items-start"><div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3"></div><div><p className="text-sm font-medium text-gray-800">New review received</p><p className="text-xs text-gray-600">5-star review on Database Management</p><p className="text-xs text-gray-500">1 day ago</p></div></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </>
            ) : (
                /* UPLOAD VIEW - Exact copy of CourseUploadPage.tsx */
                <>
                    {/* Topbar */}
                    <div className="topbar">
                        <div className="topbar-left logo-effect">
                            <a href="#" onClick={() => setCurrentView('dashboard')} className="flex items-center space-x-2">
                                <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                                    Vital
                                </span>
                            </a>
                        </div>
                        <div className="topbar-right">
                            <div className="flex items-center space-x-4">
                                <a href="#" onClick={handleNonInteractive} className="text-gray-700 hover:text-blue-600 font-medium">My Channel</a>
                                <h1 className="text-2xl font-bold text-gray-800 cursor-pointer hover:text-blue-600 transition-colors" onClick={() => setCurrentView('dashboard')}>Dashboard</h1>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button onClick={handleNonInteractive} className="relative p-2 text-gray-600 hover:text-gray-800 transition-colors">
                                    <i className="fas fa-bell text-lg"></i>
                                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></span>
                                </button>
                                <div onClick={handleNonInteractive} className="flex items-center space-x-3 cursor-pointer">
                                    <div className="w-9 h-9 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                        <span className="text-white font-bold text-sm">S</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors flex items-center gap-2"
                                >
                                    <i className="fas fa-sign-out-alt"></i>
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="sidebar bg-white flex flex-col">
                        <nav className="flex-1 p-4">
                            <ul className="space-y-2">
                                <li>
                                    <a className="nav-item w-full flex items-center space-x-3 px-4 py-3 font-medium bg-blue-600 text-white rounded-xl" href="#" onClick={handleCreateCourseClick}>
                                        <i className="fas fa-upload text-sm"></i><span>Upload Course</span>
                                    </a>
                                </li>
                                <li><a className="nav-item w-full flex items-center space-x-3 px-4 py-3 font-medium" href="#" onClick={handleNonInteractive}><i className="fas fa-chart-bar text-sm"></i><span>Analytics</span></a></li>
                                <li><a className="nav-item w-full flex items-center space-x-3 px-4 py-3 font-medium" href="#" onClick={handleNonInteractive}><i className="fas fa-comments text-sm"></i><span>Comments</span></a></li>
                                <li><a className="nav-item w-full flex items-center space-x-3 px-4 py-3 font-medium" href="#" onClick={handleNonInteractive}><i className="fas fa-dollar-sign text-sm"></i><span>Monetization</span></a></li>
                                <li><a className="nav-item w-full flex items-center space-x-3 px-4 py-3 font-medium" href="#" onClick={handleNonInteractive}><i className="fas fa-edit text-sm"></i><span>Edit Uploads</span></a></li>
                            </ul>
                        </nav>
                        <div className="settings-section p-4">
                            <button onClick={handleNonInteractive} className="nav-item w-full flex items-center space-x-3 px-4 py-3 font-medium"><i className="fas fa-cog text-sm"></i><span>Channel Setup</span></button>
                        </div>
                    </div>

                    <div className="t-vertical"></div>

                    {/* Main Content - EXACT COPY from CourseUploadPage */}
                    <div className="main-content flex flex-col">
                        <div className="min-h-screen bg-gray-50/50 font-sans flex flex-col">
                            <div className="flex flex-1 pt-0">
                                {/* Main Content */}
                                <div className="flex-1 p-8 overflow-y-auto">
                                    <div className="max-w-4xl mx-auto space-y-8 pb-12">
                                        {/* Header Area */}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Create New Course</h1>
                                                <p className="text-gray-500 mt-2">Share your knowledge with the world through video courses</p>
                                            </div>
                                        </div>

                                        {/* Basic Info Section */}
                                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                                                <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mr-3 text-sm">
                                                    <i className="fas fa-info"></i>
                                                </span>
                                                Course Details
                                            </h3>

                                            <div className="grid gap-6">
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Course Name</label>
                                                    <input
                                                        ref={titleRef}
                                                        type="text"
                                                        placeholder="e.g. Advanced Machine Learning Patterns"
                                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder-gray-400 font-medium"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Course Description</label>
                                                    <textarea
                                                        ref={descRef}
                                                        placeholder="Describe what students will learn..."
                                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder-gray-400 font-medium h-32 resize-none"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-700 mb-3">Course Thumbnail</label>
                                                    <div className="flex gap-6 items-start">
                                                        <div
                                                            className="flex-1 border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group"
                                                            onClick={() => thumbRef.current?.click()}
                                                        >
                                                            <div className="mx-auto w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                                <i className={`fas ${thumbnailPreview ? 'fa-sync-alt' : 'fa-image'} text-lg`}></i>
                                                            </div>
                                                            <p className="font-medium text-gray-800 mb-1">
                                                                {thumbnailPreview ? 'Change Thumbnail' : 'Upload Thumbnail'}
                                                            </p>
                                                            <p className="text-xs text-gray-400">1280x720 recommended (Max 50MB)</p>

                                                            <input
                                                                ref={thumbRef}
                                                                type="file"
                                                                accept="image/*"
                                                                className="hidden"
                                                                onChange={handleThumbnailUpload}
                                                            />
                                                        </div>

                                                        {thumbnailPreview && (
                                                            <div className="w-64 aspect-video bg-gray-100 rounded-xl overflow-hidden shadow-md border border-gray-200 flex-shrink-0">
                                                                <img
                                                                    src={thumbnailPreview}
                                                                    alt="Course preview"
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Pricing Section */}
                                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                                                <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mr-3 text-sm">
                                                    <i className="fas fa-tag"></i>
                                                </span>
                                                Pricing Strategy
                                            </h3>
                                            <div className="flex flex-col md:flex-row gap-6">
                                                <div
                                                    className={`flex-1 p-6 border-2 rounded-xl cursor-pointer transition-all ${!isPaid ? 'border-blue-500 bg-blue-50/50 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'}`}
                                                    onClick={() => setIsPaid(false)}
                                                >
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="font-bold text-gray-900">Free Course</span>
                                                        {!isPaid && <i className="fas fa-check-circle text-blue-500 text-xl"></i>}
                                                    </div>
                                                    <p className="text-sm text-gray-500">Accessible to everyone for free. Great for building an audience.</p>
                                                </div>

                                                <div
                                                    className={`flex-1 p-6 border-2 rounded-xl cursor-pointer transition-all ${isPaid ? 'border-blue-500 bg-blue-50/50 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'}`}
                                                    onClick={() => setIsPaid(true)}
                                                >
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="font-bold text-gray-900">Paid Course</span>
                                                        {isPaid && <i className="fas fa-check-circle text-blue-500 text-xl"></i>}
                                                    </div>
                                                    <p className="text-sm text-gray-500">Set a one-time price for lifetime access.</p>

                                                    {isPaid && (
                                                        <div className="mt-4">
                                                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Price ($)</label>
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                step="0.01"
                                                                value={price}
                                                                onChange={(e) => setPrice(e.target.value)}
                                                                placeholder="19.99"
                                                                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-bold text-lg"
                                                                onClick={(e) => e.stopPropagation()}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Module Config Section */}
                                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                            <div className="flex items-center justify-between mb-6">
                                                <h3 className="text-lg font-bold text-gray-800 flex items-center">
                                                    <span className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mr-3 text-sm">
                                                        <i className="fas fa-layer-group"></i>
                                                    </span>
                                                    Structure
                                                </h3>
                                            </div>

                                            <div className="mb-8">
                                                <p className="text-sm text-gray-600 mb-4 font-medium">How many modules does this course have?</p>
                                                <div className="flex flex-wrap gap-3">
                                                    {[1, 2, 3, 4, 5].map((count) => (
                                                        <button
                                                            key={count}
                                                            onClick={() => handleModuleCountChange(count)}
                                                            className={`w-16 h-14 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${moduleCount === count
                                                                ? 'border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-200 transform -translate-y-1'
                                                                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                                                                }`}
                                                        >
                                                            <span className="text-lg font-bold leading-none">{count}</span>
                                                            <span className="text-[10px] font-medium opacity-80">Mod</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                {modules.map((module) => (
                                                    <ModuleUploadCard
                                                        key={module.id}
                                                        {...module}
                                                        videoFile={module.video}
                                                        documentFile={module.document}
                                                        onTitleChange={(title) => handleModuleTitleChange(module.id, title)}
                                                        onTypeChange={(type) => handleModuleTypeChange(module.id, type)}
                                                        onVideoUpload={(file) => handleVideoUpload(module.id, file)}
                                                        onDocumentUpload={(file) => handleDocumentUpload(module.id, file)}
                                                        formatSize={formatSize}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        {/* Footer Action */}
                                        <div className="flex justify-end pt-4">
                                            <button
                                                onClick={handlePublishCourse}
                                                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-200 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center space-x-3"
                                            >
                                                <span>Publish Course</span>
                                                <i className="fas fa-rocket"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Training Modal (appears after publishing) */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm transition-all duration-300">
                    <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl transform transition-all animate-fade-in relative overflow-hidden ring-1 ring-white/20">
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full opacity-50 -z-10 blur-xl"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-50 rounded-tr-full opacity-50 -z-10 blur-xl"></div>

                        {trainingPhase === 'progress' ? (
                            // Progress View
                            <div className="py-6 flex flex-col items-center">
                                <div className="text-center mb-8 w-full">
                                    <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 p-1">
                                        {/* Spinning glow ring */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 to-purple-500 rounded-full animate-spin-slow opacity-70 blur-sm"></div>
                                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 to-purple-500 rounded-full animate-spin-slow"></div>

                                        <div className="w-full h-full bg-white rounded-full flex items-center justify-center relative z-10">
                                            <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-purple-700 rounded-full flex items-center justify-center text-white shadow-inner">
                                                <i className="fas fa-robot text-4xl animate-bounce-subtle"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Training AI Model</h3>
                                    <p className="text-gray-500 text-sm font-medium">
                                        {progressValue < 100 ? 'Processing course data and updating knowledge...' : 'Finalizing...'}
                                    </p>
                                </div>

                                <div className="mb-8 w-full">
                                    <div className="flex justify-between items-end mb-2 px-1">
                                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Knowledge XP</span>
                                        <span className="text-sm font-bold text-blue-600">{Math.round(progressValue)}%</span>
                                    </div>
                                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner ring-1 ring-gray-200">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out relative"
                                            style={{ width: `${progressValue}%` }}
                                        >
                                            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                        </div>
                                    </div>
                                    {/* XP Points Display */}
                                    <div className="flex justify-between items-center mt-2 px-1">
                                        <span className="text-xs text-gray-400">XP Points</span>
                                        <span className="text-sm font-bold text-blue-600">{xpPoints.toLocaleString()} XP</span>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5 text-center transform transition-all duration-500 hover:scale-[1.02]">
                                    <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-1">Lv {currentLevel}</div>
                                    <div className="text-[10px] text-blue-400 uppercase tracking-widest font-bold">Knowledge Level</div>
                                </div>
                            </div>
                        ) : (
                            // Graph View
                            <div className="animate-fade-in py-2">
                                <div className="text-center mb-8">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4 ring-4 ring-blue-50 shadow-sm">
                                        <i className="fas fa-brain text-blue-600 text-3xl animate-pulse"></i>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">Training Complete!</h3>
                                    <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
                                        Model training completed. Your course content has been successfully processed and integrated into the AI knowledge base.
                                        <span className="block mt-1 font-semibold text-gray-600">3,800 XP gained • Level 6 achieved</span>
                                        <span className="block mt-1 text-xs text-gray-400">Channel active for 4 days</span>
                                    </p>
                                </div>

                                <div className="flex items-end justify-center space-x-12 h-64 mb-10 bg-gradient-to-b from-gray-50 to-white rounded-2xl p-8 border border-gray-100 shadow-inner relative overflow-hidden">
                                    {/* Grid lines background */}
                                    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03]"
                                        style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '16px 16px' }}>
                                    </div>

                                    {/* Previous Knowledge Bar */}
                                    <div className="flex flex-col items-center w-24 group relative z-10">
                                        <div className="relative w-full h-48 flex items-end justify-center">
                                            <div
                                                className="w-14 bg-gray-300 rounded-t-lg transition-all duration-1000 ease-out shadow-sm group-hover:bg-gray-400"
                                                style={{ height: trainingStep >= 1 ? '30%' : '0%' }}
                                            ></div>
                                        </div>
                                        <span className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-wide text-center">Previous</span>
                                    </div>

                                    {/* Updated Knowledge Bar */}
                                    <div className="flex flex-col items-center w-24 group relative z-10 top-[-4px]">
                                        <div className="relative w-full h-48 flex items-end justify-center">
                                            <div
                                                className="w-14 bg-gradient-to-t from-blue-600 to-indigo-500 rounded-t-lg transition-all duration-[1500ms] cubic-bezier(0.34, 1.56, 0.64, 1) shadow-lg shadow-blue-200 relative overflow-hidden group-hover:brightness-110"
                                                style={{ height: trainingStep >= 2 ? '90%' : '0%' }}
                                            >
                                                {trainingStep >= 2 && (
                                                    <>
                                                        <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-white/30 to-transparent transform -translate-y-full hover:translate-y-full transition-transform duration-1000"></div>
                                                        <div className="absolute top-0 inset-x-0 h-[2px] bg-white/50 shadow-[0_0_10px_white]"></div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <span className="mt-4 text-xs font-bold text-blue-600 uppercase tracking-wide text-center">Updated</span>
                                    </div>
                                </div>

                                <div className="flex justify-center">
                                    <button
                                        onClick={handleViewChannelPage}
                                        disabled={trainingStep < 2}
                                        className={`flex items-center space-x-3 px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-blue-200/50 active:scale-95 ${trainingStep < 2 ? 'opacity-50 cursor-not-allowed grayscale' : 'opacity-100'}`}
                                    >
                                        <span>View Channel Page</span>
                                        <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Styles */}
            <style>{`
        :root { --primary-blue:#2563eb; --dark-blue:#1d4ed8; --border-radius:8px; --border-color:#000000; --hover-bg:#1d4ed8; --text-black:#000000; --text-white:#ffffff; --bg-light-gray:#f9fafb; }
        .nav-item { transition: all .2s ease-in-out; color: var(--text-black); }
        .nav-item:hover { background-color: var(--hover-bg); color: var(--text-white) !important; border-radius: var(--border-radius); margin:2px; }
        .curved-box { border:1px solid var(--border-color); border-radius: var(--border-radius); padding:1.5rem; }
        .settings-section { background-color: white; }
        .main-container { position:relative; height:100vh; }
        .topbar { position:fixed; top:0; left:0; right:0; height:64px; background-color:white; border-bottom:1px solid var(--border-color); z-index:20; display:flex; align-items:center; justify-content:space-between; }
        .topbar-left { width:256px; height:100%; display:flex; align-items:center; padding-left:24px; }
        .topbar-right { flex:1; height:100%; display:flex; align-items:center; justify-content:space-between; padding:0 24px; }
        .sidebar { width:256px; height:calc(100vh - 64px); position:fixed; left:0; top:64px; z-index:10; }
        .main-content { margin-left:257px; height:100vh; padding-top:64px; }
        .t-vertical { position:fixed; top:64px; bottom:0; left:256px; width:1px; background-color: var(--border-color); z-index:15; pointer-events:none; }
        
        @media (max-width: 768px) {
          .sidebar, .t-vertical { display: none; }
          .main-content { margin-left: 0; }
          .topbar-left { width: auto; padding-left: 16px; }
          .topbar-right { padding: 0 16px; }
          h1 { font-size: 1.25rem; }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(-5%); }
          50% { transform: translateY(5%); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>

            {/* Toast Notification */}
            {showToast && (
                <div className="fixed top-6 right-6 z-50 animate-slide-in-fade">
                    <div className="bg-white border border-gray-200 rounded-xl shadow-2xl px-6 py-4 min-w-[320px] max-w-md">
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                                <i className="fas fa-info-circle text-blue-500 text-lg"></i>
                            </div>
                            <div className="flex-1 pt-1">
                                <p className="text-gray-800 font-medium leading-relaxed">
                                    This section is not part of the current demo scope.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes slide-in-fade {
                    from {
                        opacity: 0;
                        transform: translateX(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                .animate-slide-in-fade {
                    animation: slide-in-fade 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

// Module Upload Card Component (exact copy from ModuleUploadCard.tsx)
interface ModuleUploadCardProps {
    id: number;
    order: number;
    title: string;
    type: 'video' | 'document' | 'audio';
    videoFile: File | null;
    documentFile: File | null;
    onTitleChange: (val: string) => void;
    onTypeChange: (val: 'video' | 'document' | 'audio') => void;
    onVideoUpload: (file: File | null) => void;
    onDocumentUpload: (file: File | null) => void;
    formatSize: (bytes: number) => string;
}

const ModuleUploadCard: React.FC<ModuleUploadCardProps> = ({
    id,
    order,
    title,
    type,
    videoFile,
    documentFile,
    onTitleChange,
    onTypeChange,
    onVideoUpload,
    onDocumentUpload,
    formatSize
}) => {
    const videoInputRef = useRef<HTMLInputElement>(null);
    const docInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="bg-white border text-left border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 group relative overflow-hidden">
            {/* Module Header */}
            <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                        {id}
                    </div>
                    <h4 className="font-semibold text-gray-800">Module {id}</h4>
                </div>
                <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded">Order: {order}</span>
            </div>

            <div className="mb-5">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Module Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => onTitleChange(e.target.value)}
                    placeholder={`Enter title for Module ${id}`}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-800 placeholder-gray-400"
                />
            </div>

            <div className="mb-5">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Content Type</label>
                <div className="flex space-x-3 p-1 bg-gray-50 rounded-lg w-fit">
                    <button
                        onClick={() => onTypeChange('video')}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${type === 'video'
                            ? 'bg-white text-blue-600 shadow-sm ring-1 ring-black/5'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <i className="fas fa-video"></i>
                        <span>Video</span>
                    </button>

                    <button
                        onClick={() => onTypeChange('document')}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${type === 'document'
                            ? 'bg-white text-blue-600 shadow-sm ring-1 ring-black/5'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <i className="fas fa-file-alt"></i>
                        <span>Document</span>
                    </button>

                    <button
                        onClick={() => onTypeChange('audio')}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${type === 'audio'
                            ? 'bg-white text-blue-600 shadow-sm ring-1 ring-black/5'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <i className="fas fa-music"></i>
                        <span>Audio</span>
                    </button>
                </div>
            </div>

            <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    {type === 'video' ? 'Video File' : type === 'audio' ? 'Audio File' : 'Document File'}
                </label>

                {type === 'video' ? (
                    <div
                        className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 cursor-pointer group-hover:border-blue-300 ${videoFile ? 'border-green-300 bg-green-50/30' : 'border-gray-200 hover:bg-gray-50'}`}
                        onClick={() => !videoFile && videoInputRef.current?.click()}
                    >
                        {videoFile ? (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3 text-left">
                                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <i className="fas fa-check"></i>
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-sm font-semibold text-gray-800 truncate max-w-[200px]">{videoFile.name}</p>
                                        <p className="text-xs text-green-600">{formatSize(videoFile.size)}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); onVideoUpload(null); }}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                    title="Remove file"
                                >
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-3 py-2">
                                <div className="w-12 h-12 mx-auto bg-blue-50 text-blue-500 rounded-full flex items-center justify-center shadow-sm">
                                    <i className="fas fa-cloud-upload-alt text-xl"></i>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-700">Click to upload video</p>
                                    <p className="text-xs text-gray-400 mt-1">MP4, MOV, AVI up to 500MB</p>
                                </div>
                            </div>
                        )}
                        <input
                            ref={videoInputRef}
                            type="file"
                            accept="video/*"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) onVideoUpload(file);
                                if (videoInputRef.current) videoInputRef.current.value = '';
                            }}
                        />
                    </div>
                ) : type === 'audio' ? (
                    <div
                        className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 cursor-pointer group-hover:border-blue-300 ${videoFile ? 'border-green-300 bg-green-50/30' : 'border-gray-200 hover:bg-gray-50'}`}
                        onClick={() => !videoFile && videoInputRef.current?.click()}
                    >
                        {videoFile ? (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3 text-left">
                                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <i className="fas fa-check"></i>
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-sm font-semibold text-gray-800 truncate max-w-[200px]">{videoFile.name}</p>
                                        <p className="text-xs text-green-600">{formatSize(videoFile.size)}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); onVideoUpload(null); }}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                    title="Remove file"
                                >
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-3 py-2">
                                <div className="w-12 h-12 mx-auto bg-purple-50 text-purple-500 rounded-full flex items-center justify-center shadow-sm">
                                    <i className="fas fa-music text-xl"></i>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-700">Click to upload audio</p>
                                    <p className="text-xs text-gray-400 mt-1">MP3, WAV, AAC up to 50MB</p>
                                </div>
                            </div>
                        )}
                        <input
                            ref={videoInputRef}
                            type="file"
                            accept="audio/*"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) onVideoUpload(file);
                                if (videoInputRef.current) videoInputRef.current.value = '';
                            }}
                        />
                    </div>
                ) : (
                    <div
                        className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 cursor-pointer group-hover:border-blue-300 ${documentFile ? 'border-green-300 bg-green-50/30' : 'border-gray-200 hover:bg-gray-50'}`}
                        onClick={() => !documentFile && docInputRef.current?.click()}
                    >
                        {documentFile ? (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3 text-left">
                                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <i className="fas fa-check"></i>
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-sm font-semibold text-gray-800 truncate max-w-[200px]">{documentFile.name}</p>
                                        <p className="text-xs text-green-600">{formatSize(documentFile.size)}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); onDocumentUpload(null); }}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                    title="Remove file"
                                >
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-3 py-2">
                                <div className="w-12 h-12 mx-auto bg-blue-50 text-blue-500 rounded-full flex items-center justify-center shadow-sm">
                                    <i className="fas fa-file-invoice text-xl"></i>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-700">Click to upload document</p>
                                    <p className="text-xs text-gray-400 mt-1">PDF, DOC, PPT, XLS...</p>
                                </div>
                            </div>
                        )}
                        <input
                            ref={docInputRef}
                            type="file"
                            accept=".pdf,.txt,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.csv,.rtf"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) onDocumentUpload(file);
                                if (docInputRef.current) docInputRef.current.value = '';
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default TutorDummy;
