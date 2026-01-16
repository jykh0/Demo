import React, { useState, useRef } from 'react';
// @ts-ignore
import defaultThumbnail from '../../../assets/dummyfiles2/download.jpg';

const MedicalDummy: React.FC = () => {
    const [currentView, setCurrentView] = useState<'dashboard' | 'upload'>('dashboard');
    const [activeTab, setActiveTab] = useState<'video' | 'details'>('video');
    const [dragActive, setDragActive] = useState(false);
    const [contentFile, setContentFile] = useState<File | null>(null);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [videoQuality, setVideoQuality] = useState('1080p');
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Track if video was uploaded in this session
    const [hasUploadedVideo, setHasUploadedVideo] = useState(false);
    const [uploadedVideoTitle, setUploadedVideoTitle] = useState('');
    const [uploadedThumbnail, setUploadedThumbnail] = useState('');

    const fileInputRef = useRef<HTMLInputElement>(null);
    const thumbnailInputRef = useRef<HTMLInputElement>(null);

    // Dummy user data
    const dummyUser = {
        fullName: 'Dr. Sarah Johnson',
        creatorType: 'Medical',
        initial: 'S'
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = (file: File) => {
        if (file.type.startsWith('video/') || file.type.startsWith('audio/')) {
            setContentFile(file);
            if (!title) {
                setTitle(file.name.replace(/\.[^/.]+$/, ""));
            }
            // Auto-detect quality simulation
            setVideoQuality('1080p');
            setActiveTab('details');
        }
    };

    const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setThumbnailFile(file);
            const previewUrl = URL.createObjectURL(file);
            setThumbnailPreview(previewUrl);
        }
    };

    const handlePublish = () => {
        if (!title.trim() || !contentFile) {
            return;
        }

        setIsUploading(true);
        setUploadProgress(0);

        // Simulate upload progress
        const progressInterval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    setIsUploading(false);
                    setShowSuccessModal(true);

                    // Save uploaded video info to session state
                    setHasUploadedVideo(true);
                    setUploadedVideoTitle(title);
                    // Use provided thumbnail or default
                    const thumbnail = thumbnailPreview || defaultThumbnail;
                    setUploadedThumbnail(thumbnail);
                    return 100;
                }
                return prev + 12.5; // 8 steps to reach 100%
            });
        }, 1000); // Every second
    };

    const handleCreateClick = () => {
        setCurrentView('upload');
        window.scrollTo(0, 0);
    };

    const handleBackToDashboard = () => {
        setCurrentView('dashboard');
        setActiveTab('video');
        setContentFile(null);
        setThumbnailFile(null);
        setThumbnailPreview(null);
        setTitle('');
        setDescription('');
        setUploadProgress(0);
        setShowSuccessModal(false);
        window.scrollTo(0, 0);
    };

    return (
        <div className="min-h-screen bg-[#F9F9F9] font-sans flex flex-col">
            {/* Topbar - Studio Pro Style */}
            <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30 shadow-sm">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                        ▶
                    </div>
                    <span className="text-xl font-bold text-gray-800 hidden md:block tracking-tight pointer-events-none">
                        Studio <span className="text-red-600">Pro</span>
                    </span>
                    {currentView === 'upload' && (
                        <>
                            <span className="text-gray-300 mx-2 text-xl font-light">|</span>
                            <span className="text-gray-600 font-medium">Upload</span>
                        </>
                    )}
                </div>
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-4">
                        {currentView === 'dashboard' && (
                            <button
                                className="px-5 py-2 bg-red-600 text-white rounded-full font-bold text-sm flex items-center gap-2 hover:bg-red-700 hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                                onClick={handleCreateClick}
                            >
                                <i className="fas fa-plus"></i>
                                <span>CREATE</span>
                            </button>
                        )}
                        <div className="h-6 w-px bg-gray-200 mx-2"></div>
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                            {dummyUser.initial}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 pt-0">
                {/* Sidebar - Studio Pro Style */}
                <div className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col fixed h-full z-20 top-16 shadow-none">
                    <div className="p-6">
                        <div className="flex flex-col items-center mb-8">
                            <div className="w-20 h-20 rounded-full border-2 border-red-500 p-1 mb-3">
                                <div className="w-full h-full rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-3xl">
                                    {dummyUser.initial}
                                </div>
                            </div>
                            <h3 className="font-bold text-lg text-gray-900">{dummyUser.fullName}</h3>
                            <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{dummyUser.creatorType}</p>
                        </div>
                    </div>

                    <nav className="flex-1 px-4">
                        <ul className="space-y-2">
                            <li>
                                <a
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all border-l-4 ${currentView === 'dashboard'
                                        ? 'text-white bg-red-600 shadow-lg shadow-red-900/20 border-transparent'
                                        : 'text-gray-600 hover:bg-red-50 hover:text-red-600 border-transparent hover:border-red-500'
                                        }`}
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); handleBackToDashboard(); }}
                                >
                                    <i className="fas fa-columns text-sm w-5 text-center"></i>
                                    <span>Dashboard</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all border-l-4 ${currentView === 'upload'
                                        ? 'text-white bg-red-600 shadow-lg shadow-red-900/20 border-transparent'
                                        : 'text-gray-600 hover:bg-red-50 hover:text-red-600 border-transparent hover:border-red-500'
                                        }`}
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); handleCreateClick(); }}
                                >
                                    <i className="fas fa-video text-sm w-5 text-center"></i>
                                    <span>Content</span>
                                </a>
                            </li>
                            <li>
                                <a className="flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all border-l-4 border-transparent hover:border-red-500" href="#">
                                    <i className="fas fa-chart-line text-sm w-5 text-center"></i>
                                    <span>Analytics</span>
                                </a>
                            </li>
                            <li>
                                <a className="flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all border-l-4 border-transparent hover:border-red-500" href="#">
                                    <i className="fas fa-cog text-sm w-5 text-center"></i>
                                    <span>Settings</span>
                                </a>
                            </li>
                        </ul>
                    </nav>

                    {/* Footer Info */}
                    <div className="p-4 border-t border-gray-100 text-center">
                        <p className="text-xs text-gray-400">© 2024 Vital Studio</p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 md:ml-64 p-8 overflow-y-auto bg-[#F9F9F9]">
                    {currentView === 'dashboard' ? (
                        /* DASHBOARD VIEW */
                        <div className="max-w-7xl mx-auto space-y-8 pb-12">
                            {/* Welcome Header */}
                            <div className="flex items-end justify-between border-b border-gray-200 pb-6">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Channel Dashboard</h1>
                                    <p className="text-gray-500 text-sm mt-1">Overview of your activity and audience.</p>
                                </div>
                            </div>

                            {/* Analytics Strip */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                {/* Key Metric: Views */}
                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group hover:border-red-200 transition-all">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <i className="fas fa-play-circle text-6xl text-red-600"></i>
                                    </div>
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">Total Views</p>
                                    <h3 className="text-3xl font-bold text-gray-900">0</h3>
                                    <p className="text-xs text-green-600 font-bold mt-2 flex items-center gap-1">
                                        <i className="fas fa-arrow-up"></i> 12% <span className="text-gray-400 font-normal">vs last 28 days</span>
                                    </p>
                                </div>

                                {/* Key Metric: Subs */}
                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group hover:border-red-200 transition-all">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <i className="fas fa-user-friends text-6xl text-red-600"></i>
                                    </div>
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">Subscribers</p>
                                    <h3 className="text-3xl font-bold text-gray-900">0</h3>
                                    <p className="text-xs text-green-600 font-bold mt-2 flex items-center gap-1">
                                        <i className="fas fa-arrow-up"></i> 5 new <span className="text-gray-400 font-normal">in last 28 days</span>
                                    </p>
                                </div>

                                {/* Key Metric: Watch Time */}
                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden group hover:border-red-200 transition-all">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <i className="fas fa-clock text-6xl text-red-600"></i>
                                    </div>
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">Watch Time (Hrs)</p>
                                    <h3 className="text-3xl font-bold text-gray-900">0.0</h3>
                                    <p className="text-xs text-gray-400 mt-2">--</p>
                                </div>

                                {/* Key Metric: Revenue */}
                                <div className="bg-gradient-to-br from-red-600 to-red-700 p-6 rounded-xl shadow-lg relative overflow-hidden text-white">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <i className="fas fa-dollar-sign text-6xl text-white"></i>
                                    </div>
                                    <p className="text-red-100 text-xs font-bold uppercase tracking-wider mb-2">Est. Revenue</p>
                                    <h3 className="text-3xl font-bold">$0.00</h3>
                                    <p className="text-xs text-red-200 mt-2 opacity-80">Monetization not active</p>
                                </div>
                            </div>

                            {/* Recent Content */}
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <i className="fas fa-video text-red-600"></i> Recent Uploads
                                </h2>

                                {hasUploadedVideo ? (
                                    // Show uploaded video card
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
                                            <div className="aspect-video bg-gray-100 relative">
                                                <img src={uploadedThumbnail} alt={uploadedVideoTitle} className="w-full h-full object-cover" />
                                                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded font-bold">
                                                    4K
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <h4 className="font-bold text-gray-900 line-clamp-1 mb-1">{uploadedVideoTitle}</h4>
                                                <p className="text-xs text-gray-500 mb-3">{dummyUser.fullName}</p>
                                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                                    <span><i className="fas fa-clock mr-1"></i> Just now</span>
                                                    <span>•</span>
                                                    <span><i className="fas fa-eye mr-1"></i> 0 views</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    // Show empty state
                                    <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12 text-center hover:border-red-300 transition-colors group">
                                        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <i className="fas fa-cloud-upload-alt text-2xl"></i>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900">Upload your first video</h3>
                                        <p className="text-gray-500 text-sm max-w-md mx-auto mt-2 mb-6">
                                            Share your content with the world. Click the button below to get started.
                                        </p>
                                        <button
                                            onClick={handleCreateClick}
                                            className="px-6 py-2 bg-red-600 text-white rounded font-bold hover:bg-red-700 transition-colors"
                                        >
                                            UPLOAD CONTENT
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        /* UPLOAD VIEW */
                        <div className="max-w-6xl mx-auto pb-12">
                            {/* Page Header */}
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">Upload Content</h1>
                                    <p className="text-gray-500 mt-1">Publish your latest videos or music tracks to your audience.</p>
                                </div>
                                {uploadProgress > 0 && uploadProgress < 100 && (
                                    <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
                                        <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                                        <span className="text-sm font-bold text-gray-700">Uploading... {Math.round(uploadProgress)}%</span>
                                    </div>
                                )}
                            </div>

                            {/* Main Upload Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                                {/* Steps / Tabs */}
                                <div className="border-b border-gray-200 bg-gray-50/50">
                                    <div className="flex items-center px-6">
                                        <button
                                            onClick={() => setActiveTab('video')}
                                            className={`px-6 py-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${activeTab === 'video'
                                                ? 'border-red-600 text-red-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                                }`}
                                        >
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${activeTab === 'video' ? 'bg-red-100 text-red-600' : 'bg-gray-200 text-gray-600'}`}>1</div>
                                            Upload File
                                        </button>
                                        <button
                                            onClick={() => contentFile && setActiveTab('details')}
                                            disabled={!contentFile}
                                            className={`px-6 py-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${activeTab === 'details'
                                                ? 'border-red-600 text-red-600'
                                                : !contentFile ? 'border-transparent text-gray-300 cursor-not-allowed' : 'border-transparent text-gray-500 hover:text-gray-700'
                                                }`}
                                        >
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${activeTab === 'details' ? 'bg-red-100 text-red-600' : (!contentFile ? 'bg-gray-100 text-gray-300' : 'bg-gray-200 text-gray-600')}`}>2</div>
                                            Details & Publish
                                        </button>
                                    </div>
                                </div>

                                <div className="p-8">
                                    {/* Step 1: Upload */}
                                    <div className={`${activeTab === 'video' ? 'block' : 'hidden'}`}>
                                        <h2 className="text-xl font-bold text-gray-900 mb-6">Select your content</h2>

                                        <div
                                            className={`relative border-2 border-dashed rounded-xl p-16 text-center transition-all cursor-pointer group ${dragActive ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50 hover:bg-white hover:border-red-300'
                                                }`}
                                            onDragEnter={handleDrag}
                                            onDragLeave={handleDrag}
                                            onDragOver={handleDrag}
                                            onDrop={handleDrop}
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                className="hidden"
                                                onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
                                                accept="video/*,audio/*"
                                            />

                                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                                <i className="fas fa-cloud-upload-alt text-4xl text-red-500"></i>
                                            </div>

                                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Drag & Drop content here</h3>
                                            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                                                Supports MP4, MOV, MP3, WAV and other standard media formats.
                                            </p>

                                            <button className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg hover:shadow-red-500/30 transition-all transform hover:-translate-y-1">
                                                Select Files
                                            </button>
                                        </div>
                                    </div>

                                    {/* Step 2: Details */}
                                    <div className={`${activeTab === 'details' ? 'block' : 'hidden'}`}>
                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                            <div className="lg:col-span-2 space-y-6">
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-2">Title <span className="text-red-500">*</span></label>
                                                    <input
                                                        type="text"
                                                        value={title}
                                                        onChange={(e) => setTitle(e.target.value)}
                                                        placeholder="Enter a catchy title..."
                                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all font-medium text-gray-900 placeholder-gray-400"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                                                    <textarea
                                                        value={description}
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        placeholder="Tell your viewers about your content..."
                                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all font-medium text-gray-900 placeholder-gray-400 h-32 resize-none"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-2 gap-6">
                                                    <div>
                                                        <label className="block text-sm font-bold text-gray-700 mb-2">Thumbnail</label>
                                                        <div
                                                            className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-red-400 hover:bg-gray-50 transition-all"
                                                            onClick={() => thumbnailInputRef.current?.click()}
                                                        >
                                                            <input
                                                                ref={thumbnailInputRef}
                                                                type="file"
                                                                className="hidden"
                                                                accept="image/*"
                                                                onChange={handleThumbnailSelect}
                                                            />
                                                            {thumbnailPreview ? (
                                                                <div className="relative aspect-video rounded overflow-hidden">
                                                                    <img src={thumbnailPreview} alt="Thumbnail" className="w-full h-full object-cover" />
                                                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                                                        <i className="fas fa-pen text-white text-lg"></i>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="py-6">
                                                                    <i className="fas fa-image text-2xl text-gray-400 mb-2"></i>
                                                                    <p className="text-xs text-gray-500 font-medium">Upload Image</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-bold text-gray-700 mb-2">Quality</label>
                                                        <div className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg font-medium text-gray-500 cursor-not-allowed flex items-center justify-between">
                                                            <span>{videoQuality}</span>
                                                            <span className="text-xs bg-gray-200 px-2 py-1 rounded text-gray-600">Auto-detected</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="lg:col-span-1">
                                                <div className="sticky top-24 space-y-6">
                                                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Preview</h3>

                                                    {/* Preview Card */}
                                                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden group">
                                                        <div className="aspect-video bg-gray-100 relative group-hover:brightness-95 transition-all">
                                                            {contentFile ? (
                                                                thumbnailPreview ? (
                                                                    <img src={thumbnailPreview} className="w-full h-full object-cover" />
                                                                ) : (
                                                                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                                                        <i className={`fas ${contentFile.type.startsWith('audio') ? 'fa-music' : 'fa-video'} text-4xl text-gray-400`}></i>
                                                                    </div>
                                                                )
                                                            ) : (
                                                                <div className="w-full h-full bg-gray-100"></div>
                                                            )}
                                                            <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded font-bold">
                                                                {videoQuality}
                                                            </div>
                                                        </div>
                                                        <div className="p-4">
                                                            <h4 className="font-bold text-gray-900 line-clamp-1 mb-1">{title || 'Your Title Here'}</h4>
                                                            <p className="text-xs text-gray-500 mb-3">{dummyUser.fullName}</p>
                                                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                                                <span><i className="fas fa-clock mr-1"></i> Just now</span>
                                                                <span>•</span>
                                                                <span><i className="fas fa-eye mr-1"></i> 0 views</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <button
                                                        onClick={handlePublish}
                                                        disabled={isUploading || !title}
                                                        className={`w-full py-4 text-white font-bold rounded-xl shadow-lg transition-all transform flex items-center justify-center gap-2 ${isUploading
                                                            ? 'bg-gray-400 cursor-not-allowed'
                                                            : 'bg-red-600 hover:bg-red-700 hover:shadow-red-500/30 hover:-translate-y-1'
                                                            }`}
                                                    >
                                                        {isUploading ? (
                                                            <>
                                                                <i className="fas fa-circle-notch fa-spin"></i>
                                                                Publishing...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <i className="fas fa-paper-plane"></i>
                                                                Publish Now
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform scale-100 transition-all text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i className="fas fa-check text-4xl text-green-500"></i>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Successful!</h2>
                        <p className="text-gray-600 mb-6">Your content has been published and is now live on your channel.</p>

                        <div className="flex gap-3">
                            <button
                                onClick={handleBackToDashboard}
                                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl transition-colors"
                            >
                                Dashboard
                            </button>
                            <button
                                onClick={() => {
                                    setShowSuccessModal(false);
                                    setContentFile(null);
                                    setThumbnailFile(null);
                                    setThumbnailPreview(null);
                                    setTitle('');
                                    setDescription('');
                                    setUploadProgress(0);
                                    setActiveTab('video');
                                }}
                                className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors shadow-lg hover:shadow-red-500/30"
                            >
                                Upload Another
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MedicalDummy;
