import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Import Assets from dummyfiles2
// @ts-ignore
import moduleVideo from '../../assets/dummyfiles2/1767434435878.mp4';
// @ts-ignore
import moduleImage from '../../assets/dummyfiles2/file_0000000036c47206810ad23ebf57515a (1).png';

const DummyWatchCourseModule2: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [showModuleIndicator, setShowModuleIndicator] = useState(true);
    const [likeCount, setLikeCount] = useState(124);
    const [isLiked, setIsLiked] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Module Indicator - 1 second
    useEffect(() => {
        const indicatorTimer = setTimeout(() => {
            setShowModuleIndicator(false);
        }, 1000);
        return () => clearTimeout(indicatorTimer);
    }, []);

    // Initial Loading - 2.5 seconds
    useEffect(() => {
        const loadingTimer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);
        return () => clearTimeout(loadingTimer);
    }, []);

    // Video Playback - starts after loading completes
    useEffect(() => {
        if (isLoading) return; // Don't start until loading is done

        if (videoRef.current) {
            // Must be muted to autoplay in most browsers
            videoRef.current.muted = true;
            videoRef.current.play().catch(e => console.log("Autoplay blocked:", e));
        }
    }, [isLoading]);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    const toggleLike = () => {
        setIsLiked(!isLiked);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 overflow-x-hidden">
            {/* Main Header */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50 transition-all duration-300">
                <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
                    {/* Left: Logo */}
                    <div className="flex items-center gap-4">
                        <Link to="/home" className="flex items-center gap-2 group">
                            <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Vital</span>
                        </Link>
                    </div>

                    {/* Center: Search */}
                    <div className="flex-1 max-w-2xl mx-12 hidden md:block group">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-11 pr-4 py-2.5 bg-gray-100 border border-transparent rounded-full text-sm focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 outline-none"
                                placeholder="Search for courses, tutors, or topics..."
                                disabled
                            />
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-3">
                        <button className="relative p-2.5 text-gray-500 hover:bg-gray-100 rounded-full transition-colors duration-200">
                            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </button>

                        <div className="h-8 w-px bg-gray-200 mx-2 hidden sm:block"></div>

                        <div className="flex items-center gap-3 pl-2 cursor-pointer hover:bg-gray-50 rounded-full p-1 pr-4 transition-colors">
                            <img
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop"
                                alt="User"
                                className="w-9 h-9 rounded-full object-cover shadow-md ring-2 ring-white"
                            />
                            <div className="hidden sm:block text-left">
                                <div className="text-sm font-semibold text-gray-900 leading-none">Amal Thomas</div>
                                <div className="text-xs text-gray-500 mt-0.5">Student</div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Section Indicator - Only for 1 second */}
            {showModuleIndicator && (
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 animate-fade-in-up">
                    <div className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-lg font-bold text-sm flex items-center gap-2">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        Currently Playing: Module 2
                    </div>
                </div>
            )}

            {/* Content Wrapper */}
            <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1700px] mx-auto space-y-8 animate-fade-in-up">

                {/* 1. Breadcrumb & Title Area */}
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
                            <Link to="/home" className="hover:text-blue-600 transition-colors">Home</Link>
                            <svg className="w-4 h-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <Link to="/home" className="hover:text-blue-600 transition-colors">Course Viewer</Link>
                            <svg className="w-4 h-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-900">IT and Environment</span>
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
                            Module 2: Recycling Methods and Best Practices
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl">
                            Discover the most effective ways to recycle electronics and how to implement them in daily life.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex flex-col px-4">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Progress</span>
                            <span className="text-xl font-bold text-blue-600">34%</span>
                        </div>
                        <div className="h-8 w-px bg-gray-200"></div>
                        <div className="flex flex-col px-4">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Modules</span>
                            <span className="text-xl font-bold text-gray-900">1/3</span>
                        </div>
                        <div className="h-8 w-px bg-gray-200"></div>
                        <Link to="/userhome" className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-all shadow-lg shadow-gray-200">
                            <span className="text-sm">Back to Course</span>
                        </Link>
                    </div>
                </div>

                {/* 2. Main Vertical Stack Component */}
                <div className="max-w-6xl mx-auto space-y-8">

                    {/* Video Player Section */}
                    <div className="space-y-6">

                        {/* Video Container - Centered */}
                        <div className="relative group rounded-3xl overflow-hidden shadow-2xl bg-gray-900 ring-1 ring-white/10 w-full">
                            {/* Decorative gradient blobb behind */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>

                            <div className="relative aspect-video bg-black rounded-[22px] overflow-hidden m-1 border border-gray-800">
                                {isLoading ? (
                                    // Loading State
                                    <div className="w-full h-full flex items-center justify-center bg-gray-900">
                                        <div className="flex flex-col items-center gap-4">
                                            {/* Circular Loading Spinner */}
                                            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {/* Static Image */}
                                        <img
                                            src={moduleImage}
                                            alt="Module 2 Content"
                                            className="w-full h-full object-cover opacity-90 transition-opacity duration-700 hover:opacity-100"
                                        />

                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

                                        {/* PiP Video - Large and Clear */}
                                        <div
                                            className="absolute bottom-6 right-6 w-[28%] md:w-[24%] aspect-video rounded-xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-white/10 z-20 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/20 group/pip bg-gray-900"
                                        >
                                            <video
                                                ref={videoRef}
                                                src={moduleVideo}
                                                loop
                                                muted
                                                className="w-full h-full object-cover"
                                            />
                                            {/* Mute Control */}
                                            <button
                                                onClick={toggleMute}
                                                className="absolute bottom-2 left-2 p-1.5 bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white rounded-full opacity-0 group-hover/pip:opacity-100 transition-all duration-200"
                                            >
                                                {isMuted ? (
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
                                                ) : (
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                                                )}
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Engagement Bar */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={toggleLike}
                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 ${isLiked
                                        ? 'bg-red-50 text-red-600 ring-1 ring-red-200'
                                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 ring-1 ring-gray-200/50'}`}
                                >
                                    <svg className={`w-5 h-5 ${isLiked ? 'fill-current' : 'fill-none'}`} stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    <span>{likeCount}</span>
                                </button>

                                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-50 text-gray-700 font-semibold hover:bg-gray-100 ring-1 ring-gray-200/50 transition-all">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    <span>Comment</span>
                                </button>
                            </div>

                            <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-0.5">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                </svg>
                                <span>Share</span>
                            </button>
                        </div>
                    </div>

                    {/* Course Playlist - Moved Below Video */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="font-bold text-gray-900 text-lg flex items-center justify-between">
                                Course Content
                                <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded-md">3 Modules</span>
                            </h3>
                        </div>

                        <div className="p-4 space-y-3">
                            {/* Completed Module 1 */}
                            <div className="group flex gap-4 p-4 rounded-xl bg-green-50 border border-green-200 cursor-pointer transition-all relative overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500"></div>
                                <div className="flex-shrink-0 pt-1">
                                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold shadow-sm ring-2 ring-green-200">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-xs font-semibold text-green-600 mb-0.5 uppercase tracking-wide">Completed</p>
                                            <h4 className="font-bold text-gray-900 text-base leading-tight mb-1">Module 1: E-Waste Basics</h4>
                                            <p className="text-sm text-gray-600 max-w-2xl">Learn about the different types of electronic waste and their global impact.</p>
                                        </div>
                                        <span className="text-sm font-semibold text-green-600">12:30</span>
                                    </div>
                                </div>
                            </div>

                            {/* Active Module 2 */}
                            <div className="group flex gap-4 p-4 rounded-xl bg-blue-50 border border-blue-200 cursor-pointer transition-all relative overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                                <div className="flex-shrink-0 pt-1">
                                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold shadow-sm ring-2 ring-blue-200">
                                        <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" /></svg>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-xs font-semibold text-blue-600 mb-0.5 uppercase tracking-wide">Playing Now</p>
                                            <h4 className="font-bold text-gray-900 text-base leading-tight mb-1">Module 2: Recycling Methods and Best Practices</h4>
                                            <p className="text-sm text-gray-600 max-w-2xl">Discover standard procedures for safe recycling.</p>
                                        </div>
                                        <span className="text-sm font-semibold text-blue-600">15:00</span>
                                    </div>
                                </div>
                            </div>

                            {/* Locked Module 3 */}
                            <div className="group flex gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200 cursor-not-allowed transition-all relative overflow-hidden opacity-60">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-300"></div>
                                <div className="flex-shrink-0 pt-1">
                                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 mb-0.5 uppercase tracking-wide">Locked</p>
                                            <h4 className="font-bold text-gray-500 text-base leading-tight mb-1">Module 3: Global Impact and Future Solutions</h4>
                                            <p className="text-sm text-gray-400 max-w-2xl">Understand what the future holds for e-waste management.</p>
                                        </div>
                                        <span className="text-sm font-medium text-gray-400">18:00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DummyWatchCourseModule2;
