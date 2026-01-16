import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// @ts-ignore
import medicThumbnail from '../../assets/dummyfiles/medicthumbnail.jpg';
// @ts-ignore
import medicVideo from '../../assets/dummyfiles/Medic001.mp4';

// --- Interfaces ---
type ContentItem = {
    _id: string;
    title: string;
    thumbnailUrl?: string;
    description?: string;
    creatorName?: string;
    views?: number;
    category?: string;
    type?: 'video' | 'music' | 'podcast';
    quality?: string;
    tags?: string[];
    isHealthAdvice?: boolean;
    [key: string]: any;
};

const BrowseContentsDummy: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showDemoVideo, setShowDemoVideo] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const navigate = useNavigate();

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Static Content Items - Organized by Category (Health Advice for Teens first)
    const staticContentItems: ContentItem[] = [
        // MEDICAL - Health Advice for Teens FIRST
        { _id: 'medical-001', title: 'Health Advice for Teens', creatorName: 'Dr. Sarah Johnson', thumbnailUrl: medicThumbnail, views: 2, category: 'Medical', type: 'video', quality: '4K', tags: ['Health'], isHealthAdvice: true },
        { _id: 'medical-002', title: 'Understanding Mental Wellness', creatorName: 'Dr. Michael Chen', thumbnailUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2670&auto=format&fit=crop', views: 8, category: 'Medical', type: 'video', quality: '1080p', tags: ['Mental Health'] },
        { _id: 'medical-003', title: 'Nutrition Basics', creatorName: 'Dr. Emma Rodriguez', thumbnailUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2670&auto=format&fit=crop', views: 5, category: 'Medical', type: 'video', quality: '1080p', tags: ['Nutrition'] },
        { _id: 'medical-005', title: 'Stress Management', creatorName: 'Dr. Lisa Park', thumbnailUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2599&auto=format&fit=crop', views: 9, category: 'Medical', type: 'video', quality: '1080p', tags: ['Stress'] },
        { _id: 'medical-006', title: 'First Aid Essentials', creatorName: 'Paramedic James Wilson', thumbnailUrl: 'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=2670&auto=format&fit=crop', views: 6, category: 'Medical', type: 'video', quality: '4K', tags: ['First Aid'] },
        { _id: 'medical-007', title: 'Sleep Science Explained', creatorName: 'Dr. Sarah Johnson', thumbnailUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=2670&auto=format&fit=crop', views: 3, category: 'Medical', type: 'video', quality: '1080p', tags: ['Sleep'] },

        // VLOGGER
        { _id: 'vlog-001', title: 'My Morning Routine 2024', creatorName: 'Sarah Vlogs', thumbnailUrl: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2670&auto=format&fit=crop', views: 3, category: 'Vlogger', type: 'video', quality: '4K', tags: ['Vlog'] },
        { _id: 'vlog-002', title: 'Travel Vlog: Tokyo Day 1', creatorName: 'Travel with Alex', thumbnailUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2694&auto=format&fit=crop', views: 7, category: 'Vlogger', type: 'video', quality: '4K', tags: ['Travel'] },
        { _id: 'vlog-004', title: 'Behind the Scenes', creatorName: 'Creator Hub', thumbnailUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop', views: 2, category: 'Vlogger', type: 'video', quality: '1080p', tags: ['Content'] },
        { _id: 'vlog-005', title: 'Weekend Adventures', creatorName: 'Adventure Seekers', thumbnailUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2621&auto=format&fit=crop', views: 9, category: 'Vlogger', type: 'video', quality: '4K', tags: ['Adventure'] },

        // MUSIC
        { _id: 'music-001', title: 'Chill Lofi Beats to Study', creatorName: 'Lofi Records', thumbnailUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2670&auto=format&fit=crop', views: 4, category: 'Music', type: 'music', quality: 'HD', tags: ['Lofi'] },
        { _id: 'music-002', title: 'Acoustic Guitar Sessions Vol. 1', creatorName: 'String Theory Music', thumbnailUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=2670&auto=format&fit=crop', views: 6, category: 'Music', type: 'music', quality: '4K', tags: ['Guitar'] },
        { _id: 'music-003', title: 'Electronic Dance Mix 2024', creatorName: 'Pulse Music Group', thumbnailUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2670&auto=format&fit=crop', views: 8, category: 'Music', type: 'music', quality: '1080p', tags: ['EDM'] },
        { _id: 'music-004', title: 'Jazz Piano Improvisation', creatorName: 'Jazz Corner', thumbnailUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=2670&auto=format&fit=crop', views: 3, category: 'Music', type: 'music', quality: 'HD', tags: ['Jazz'] },
        { _id: 'music-005', title: 'Indie Pop Playlist', creatorName: 'Indie Sounds', thumbnailUrl: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?q=80&w=2672&auto=format&fit=crop', views: 10, category: 'Music', type: 'music', quality: '1080p', tags: ['Pop'] },

        // CORPORATE
        { _id: 'corp-001', title: 'JavaScript Fundamentals', creatorName: 'TechEdu Corp', thumbnailUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2628&auto=format&fit=crop', views: 5, category: 'Corporate', type: 'video', quality: '1080p', tags: ['Coding'] },
        { _id: 'corp-002', title: 'React Hooks Tutorial', creatorName: 'Dev Training Pro', thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2670&auto=format&fit=crop', views: 7, category: 'Corporate', type: 'video', quality: '4K', tags: ['React'] },
        { _id: 'corp-003', title: 'Python for Data Analysis', creatorName: 'Data Corp Academy', thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2670&auto=format&fit=crop', views: 4, category: 'Corporate', type: 'video', quality: '1080p', tags: ['Python'] },
        { _id: 'corp-004', title: 'Professional Communication', creatorName: 'Business Skills Inc', thumbnailUrl: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2669&auto=format&fit=crop', views: 2, category: 'Corporate', type: 'video', quality: '1080p', tags: ['Business'] },
        { _id: 'corp-005', title: 'Project Management Basics', creatorName: 'PM Training Solutions', thumbnailUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop', views: 6, category: 'Corporate', type: 'video', quality: '1080p', tags: ['PM'] },
        { _id: 'corp-006', title: 'Git & GitHub for Beginners', creatorName: 'Code Academy Pro', thumbnailUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2688&auto=format&fit=crop', views: 3, category: 'Corporate', type: 'video', quality: '1080p', tags: ['Git'] },
        { _id: 'corp-007', title: 'SQL Database Design', creatorName: 'Database Masters', thumbnailUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=2672&auto=format&fit=crop', views: 9, category: 'Corporate', type: 'video', quality: '1080p', tags: ['SQL'] },
    ];

    const categories = ['All', 'Medical', 'Vlogger', 'Music', 'Corporate'];

    const filteredContents = staticContentItems.filter(item => {
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.creatorName?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleSummarize = (e: React.MouseEvent, item: ContentItem) => {
        e.stopPropagation();
        e.preventDefault();
        if (item._id === 'medical-001') {
            // Only the first video (medical-001) plays the demo video
            setShowDemoVideo(true);
        } else {
            // All other videos show the demo limitation toast
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 4000); // Auto-dismiss after 4 seconds
        }
    };

    const handleBrowseClick = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate('/userhome');
    };

    return (
        <div className="landing-page">
            {/* Animated Background */}
            <div className="animated-bg" style={{
                transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
            }}>
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="gradient-orb orb-3"></div>
            </div>

            {/* Navigation - Exact copy from LandingPage */}
            <nav className="landing-nav">
                <div className="nav-container relative">
                    <Link to="/" className="nav-logo">
                        <span className="logo-text">vital</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="desktop-nav-links hidden md:flex items-center gap-6">
                        <Link to="/userhome" className="nav-link text-gray-300 hover:text-white transition-colors">Browse Contents</Link>
                        <Link to="/channels" className="nav-link text-gray-300 hover:text-white transition-colors">Channels</Link>
                        <Link to="/login" className="nav-link secondary px-4 py-2 border border-white/20 rounded-lg hover:bg-white/10 transition-colors">Sign In</Link>
                        <Link to="/register" className="nav-link primary px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">Get Started</Link>
                    </div>

                    {/* Mobile Menu Trigger */}
                    <button
                        className="md:hidden w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-md border border-white/20 flex items-center justify-center relative overflow-hidden group shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-pulse-slow"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-50' : ''}`}></div>
                        {isMobileMenuOpen ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white z-10">
                                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white z-10">
                                <circle cx="12" cy="12" r="3" fill="currentColor" />
                                <path d="M12 4v2M12 18v2M4 12h2M18 12h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        )}
                    </button>

                    {/* Mobile Glassmorphic Dropdown */}
                    {isMobileMenuOpen && (
                        <div className="absolute top-full right-0 mt-4 w-64 p-4 rounded-2xl bg-[#0f0f0f]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex flex-col gap-3 animate-fade-in-up z-50 md:hidden">
                            <Link to="/userhome" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-gray-200 transition-all font-medium">
                                <span className="text-lg">📚</span> Browse Contents
                            </Link>
                            <Link to="/channels" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-gray-200 transition-all font-medium">
                                <span className="text-lg">📺</span> Channels
                            </Link>
                            <div className="h-px bg-white/10 my-1"></div>
                            <Link to="/login" className="flex items-center justify-center p-3 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all">
                                Sign In
                            </Link>
                            <Link to="/register" className="flex items-center justify-center p-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg hover:shadow-blue-500/25 transition-all">
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>
            </nav>

            {/* Hero Section with Search */}
            <section className="hero-section visible">
                <div className="hero-content">
                    <div className="hero-badge">
                        <span className="badge-text">✨ Explore Our Library</span>
                    </div>
                    <h1 className="hero-title">
                        Discover Amazing
                        <span className="gradient-text"> Content.</span>
                    </h1>
                    <p className="hero-description">
                        Browse through our collection of expert-led videos and content from top creators.
                    </p>
                    {/* Search Bar Moved Here */}
                    <div className="hero-search-container">
                        <input
                            type="text"
                            placeholder="Search videos..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="hero-search-input"
                        />
                        <i className="fas fa-search hero-search-icon"></i>
                    </div>
                </div>
            </section>

            {/* Category Tabs */}
            <div className="category-section">
                <div className="category-tabs">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`category-tab ${selectedCategory === cat ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Section */}
            <section className="features-section visible" style={{ paddingTop: '20px' }}>
                <div className="flex gap-6 px-8 max-w-[1400px] mx-auto transition-all duration-500">
                    {/* Main Content Grid */}
                    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${showDemoVideo ? 'xl:grid-cols-3' : 'xl:grid-cols-4'} gap-8 flex-1 transition-all duration-500`}>
                        {filteredContents.map((item, index) => (
                            <div
                                key={item._id}
                                className="content-card"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className="card-image-container">
                                    <img
                                        src={item.thumbnailUrl}
                                        alt={item.title}
                                        className="card-image"
                                    />
                                    <div className="duration-badge">
                                        {item.type === 'video' ? <i className="fas fa-video"></i> : <i className="fas fa-music"></i>}
                                    </div>
                                </div>
                                <div className="card-details">
                                    <h3 className="card-title" title={item.title}>{item.title}</h3>
                                    <p className="card-creator">{item.creatorName}</p>
                                    <div className="card-meta">
                                        <span>{item.views || 0} views</span>
                                        {item.category && <span className="category-tag">{item.category}</span>}
                                    </div>
                                    {/* Summarize Button for ALL cards */}
                                    <button
                                        className="summarize-button-small"
                                        onClick={(e) => handleSummarize(e, item)}
                                    >
                                        <i className="fas fa-magic"></i> Summarize
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Side Video Panel */}
                    {showDemoVideo && (
                        <div className="w-[350px] flex-shrink-0 animate-fade-in-right sticky top-24 self-start rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: '9/16' }}>
                            <div className="relative w-full h-full bg-black">
                                <button
                                    onClick={() => setShowDemoVideo(false)}
                                    className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-black/20 hover:bg-black/40 rounded-full text-white/80 backdrop-blur-sm transition-colors"
                                >
                                    <i className="fas fa-times text-sm"></i>
                                </button>
                                <video
                                    src={medicVideo}
                                    autoPlay
                                    loop
                                    controls={false}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="footer-container">
                    <div className="footer-brand">
                        <span className="footer-text" style={{ background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 700 }}>vital</span>
                    </div>
                    <div className="footer-links">
                        <Link to="/home" className="footer-link">Courses</Link>
                        <Link to="/channels" className="footer-link">Channels</Link>
                        <Link to="/login" className="footer-link">Sign In</Link>
                        <Link to="/register" className="footer-link">Register</Link>
                    </div>
                    <div className="footer-copyright">
                        © 2024 vital. All rights reserved.
                    </div>
                </div>
            </footer>

            {/* Toast Notification */}
            {showToast && (
                <div className="fixed top-6 right-6 z-[200] animate-slide-in-fade">
                    <div className="bg-white border border-gray-200 rounded-xl shadow-2xl px-6 py-4 min-w-[320px] max-w-md">
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                                <i className="fas fa-info-circle text-blue-500 text-lg"></i>
                            </div>
                            <div className="flex-1 pt-1">
                                <p className="text-gray-800 font-medium leading-relaxed">
                                    AI summarization is demonstrated using a single reference video in this demo.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                * { box-sizing: border-box; margin: 0; padding: 0; }

                .landing-page {
                    min-height: 100vh;
                    background: #ffffff;
                    position: relative;
                    overflow-x: hidden;
                    font-family: 'Inter', sans-serif;
                    color: #1f2937;
                }

                /* Animated Background */
                .animated-bg {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 0;
                    transition: transform 0.1s ease-out;
                }

                .gradient-orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(80px);
                    opacity: 0.3;
                    animation: float 20s infinite ease-in-out;
                }

                .orb-1 { width: 500px; height: 500px; background: linear-gradient(135deg, #1e3a8a, #3b82f6); top: -250px; left: -250px; }
                .orb-2 { width: 400px; height: 400px; background: linear-gradient(135deg, #6366f1, #8b5cf6); bottom: -200px; right: -200px; animation-delay: 7s; }
                .orb-3 { width: 300px; height: 300px; background: linear-gradient(135deg, #ec4899, #f59e0b); top: 50%; left: 50%; transform: translate(-50%, -50%); animation-delay: 14s; }

                @keyframes float {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -30px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                }

                /* Navigation - Exact copy from LandingPage */
                .landing-nav {
                    position: relative;
                    z-index: 100;
                    padding: 20px 0;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                }

                .nav-container { max-width: 1200px; margin: 0 auto; padding: 0 32px; display: flex; justify-content: space-between; align-items: center; }
                .nav-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; color: #1f2937; font-weight: 700; font-size: 20px; }
                .logo-text { background: linear-gradient(135deg, #1e3a8a, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

                .nav-link { text-decoration: none; color: #4b5563; font-weight: 500; font-size: 15px; transition: all 0.2s ease; padding: 8px 16px; border-radius: 8px; }
                .nav-link:hover { color: #1e3a8a; background: #f0f4ff; }
                .nav-link.primary { background: #1e3a8a; color: white; }
                .nav-link.primary:hover { background: #1e40af; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(30, 58, 138, 0.3); }
                .nav-link.secondary { border: 2px solid #1e3a8a; color: #1e3a8a; }
                .nav-link.secondary:hover { background: #1e3a8a; color: white; }

                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .animate-fade-in-up { animation: fadeInUp 0.3s ease-out; }
                .animate-pulse-slow { animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }

                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
                }

                /* Hero Section */
                .hero-section {
                    position: relative;
                    z-index: 10;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 60px 32px 40px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    opacity: 0;
                    transform: translateY(30px);
                    transition: all 0.8s ease;
                }

                .hero-section.visible { opacity: 1; transform: translateY(0); }
                .hero-content { display: flex; flex-direction: column; gap: 16px; align-items: center; }
                .hero-badge { display: inline-block; padding: 8px 16px; background: linear-gradient(135deg, #f0f4ff, #e0e7ff); border: 1px solid #c7d2fe; border-radius: 50px; }
                .badge-text { font-size: 14px; font-weight: 600; color: #1e3a8a; }
                .hero-title { font-size: 48px; font-weight: 800; line-height: 1.1; color: #0f172a; letter-spacing: -0.02em; }
                .gradient-text { background: linear-gradient(135deg, #1e3a8a, #3b82f6, #6366f1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                .hero-description { font-size: 18px; line-height: 1.6; color: #64748b; max-width: 600px; margin-bottom: 8px; }

                /* Hero Search Container */
                .hero-search-container {
                    position: relative;
                    width: 100%;
                    max-width: 500px;
                    margin-top: 16px;
                }

                .hero-search-input {
                    width: 100%;
                    padding: 14px 50px 14px 20px;
                    border: 2px solid #e5e7eb;
                    border-radius: 50px;
                    font-size: 16px;
                    outline: none;
                    transition: all 0.2s;
                    background: white;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                }

                .hero-search-input:focus {
                    border-color: #1e3a8a;
                    box-shadow: 0 4px 16px rgba(30, 58, 138, 0.15);
                }

                .hero-search-icon {
                    position: absolute;
                    right: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #6b7280;
                    font-size: 18px;
                }

                /* Category Section */
                .category-section {
                    position: relative;
                    z-index: 10;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px 32px;
                }

                .category-tabs {
                    display: flex;
                    gap: 12px;
                    flex-wrap: wrap;
                    justify-content: center;
                }

                .category-tab {
                    padding: 8px 20px;
                    border: 2px solid #e5e7eb;
                    border-radius: 24px;
                    background: white;
                    color: #1f2937;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .category-tab:hover {
                    background: #f0f4ff;
                    border-color: #3b82f6;
                }

                .category-tab.active {
                    background: #1e3a8a;
                    color: white;
                    border-color: #1e3a8a;
                }

                /* Content Cards */
                .features-section { position: relative; z-index: 10; padding: 60px 0; opacity: 1; }
                
                .content-card {
                    background: white;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    animation: fadeInUp 0.6s ease forwards;
                    opacity: 0;
                    transform: translateY(20px);
                    border: 1px solid rgba(0,0,0,0.04);
                }

                .content-card:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
                }

                .card-image-container { position: relative; aspect-ratio: 16/9; overflow: hidden; background: #f0f0f0; }
                .card-image { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
                .content-card:hover .card-image { transform: scale(1.03); }

                .duration-badge {
                    position: absolute;
                    bottom: 8px;
                    right: 8px;
                    background: rgba(0,0,0,0.75);
                    color: white;
                    padding: 3px 8px;
                    border-radius: 4px;
                    font-size: 11px;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                .card-details { padding: 14px; }
                .card-title { font-size: 15px; font-weight: 700; color: #1e293b; margin-bottom: 4px; line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
                .card-creator { font-size: 13px; color: #64748b; margin-bottom: 6px; }
                .card-meta { display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #94a3b8; margin-bottom: 10px; }
                .category-tag { background: #e6f0ff; padding: 2px 8px; border-radius: 4px; color: #1e3a8a; font-weight: 600; font-size: 11px; }

                /* Small Summarize Button for ALL Cards */
                .summarize-button-small {
                    width: 100%;
                    padding: 7px 12px;
                    background: linear-gradient(135deg, #1e3a8a, #3b82f6);
                    color: white;
                    border: none;
                    border-radius: 6px;
                    font-weight: 600;
                    font-size: 12px;
                    cursor: pointer;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                }

                .summarize-button-small:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(30, 58, 138, 0.3);
                }

                .summarize-button-small i {
                    font-size: 11px;
                }

                /* Footer */
                .landing-footer { background: #ffffff; border-top: 1px solid #e5e7eb; padding: 60px 0 30px; position: relative; z-index: 10; }
                .footer-container { max-width: 1200px; margin: 0 auto; padding: 0 32px; display: flex; flex-direction: column; align-items: center; gap: 32px; }
                .footer-brand { display: flex; align-items: center; gap: 12px; }
                .footer-text { font-weight: 700; font-size: 18px; color: #64748b; }
                .footer-links { display: flex; gap: 32px; flex-wrap: wrap; justify-content: center; }
                .footer-link { text-decoration: none; color: #64748b; font-size: 14px; transition: color 0.2s ease; }
                .footer-link:hover { color: #1e3a8a; }
                .footer-copyright { font-size: 13px; color: #94a3b8; margin-top: 16px; }

                @keyframes fadeInRight {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }

                .animate-fade-in-right { animation: fadeInRight 0.4s ease-out forwards; }

                @media (max-width: 768px) {
                    .hero-title { font-size: 36px; }
                    .hero-search-container { max-width: 100%; }
                }

                /* Toast Animation */
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

export default BrowseContentsDummy;
