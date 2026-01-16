import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Import signature images
// @ts-ignore
import signature1 from '../../assets/dummyfiles/signs/abstract-fake-signature-documents-contracts-isolated-white-background_608189-1150.jpg';
// @ts-ignore
import signature2 from '../../assets/dummyfiles/signs/istockphoto-2035889916-612x612.jpg';

type CertificateView = 'completed' | 'loading' | 'certificate';

const CertificateDummy: React.FC = () => {
    const navigate = useNavigate();
    const [currentView, setCurrentView] = useState<CertificateView>('completed');
    const certificateRef = React.useRef<HTMLDivElement>(null);

    const handleGenerateCertificate = () => {
        setCurrentView('loading');
        setTimeout(() => {
            setCurrentView('certificate');
        }, 4000);
    };

    const handleDownload = async () => {
        if (!certificateRef.current) return;

        try {
            // Dynamically import html2canvas
            const html2canvas = (await import('html2canvas')).default;

            const canvas = await html2canvas(certificateRef.current, {
                scale: 2,
                backgroundColor: '#ffffff',
                logging: false,
            });

            // Convert canvas to blob and download
            canvas.toBlob((blob) => {
                if (blob) {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'Vital_Certificate_Amal_Thomas.png';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                }
            });
        } catch (error) {
            console.error('Error downloading certificate:', error);
            alert('Failed to download certificate. Please try again.');
        }
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

                    {/* Right: Profile */}
                    <div className="flex items-center gap-3">
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

            {/* Course Completed View */}
            {currentView === 'completed' && (
                <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1700px] mx-auto space-y-8 animate-fade-in-up">
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
                                Course Certification
                            </h1>
                            <p className="text-lg text-gray-600 max-w-2xl">
                                Congratulations! You've completed all modules in IT and Environment.
                            </p>
                        </div>
                    </div>

                    <div className="max-w-6xl mx-auto space-y-8">
                        {/* Course Completed Container */}
                        <div className="relative group rounded-3xl overflow-hidden shadow-2xl bg-gray-900 ring-1 ring-white/10 w-full">
                            <div className="absolute -inset-1 bg-gradient-to-r from-gray-700 to-gray-900 rounded-3xl blur opacity-30 group-hover:opacity-40 transition duration-1000"></div>

                            <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-black rounded-[22px] overflow-hidden m-1 border border-gray-800 flex items-center justify-center">
                                <div className="text-center px-8">
                                    <div className="w-24 h-24 mx-auto mb-6 bg-green-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                        <svg className="w-16 h-16 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Course Completed!</h2>
                                    <p className="text-xl text-gray-300 mb-8">You've successfully completed all modules in IT and Environment</p>

                                    <div className="flex gap-4 justify-center flex-wrap">
                                        <button
                                            onClick={handleGenerateCertificate}
                                            className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            Generate Certificate
                                        </button>
                                        <button
                                            onClick={() => navigate('/userhome')}
                                            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 font-bold rounded-xl hover:bg-white/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                            </svg>
                                            Back to Home
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            )}

            {/* Loading Modal */}
            {currentView === 'loading' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-12 animate-fade-in-up text-center">
                        <div className="mb-6">
                            <div className="w-20 h-20 mx-auto mb-4 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 mb-3">Generating Certificate</h2>
                        <p className="text-gray-600">Please wait while we prepare your certificate...</p>
                    </div>
                </div>
            )}

            {/* Certificate View */}
            {currentView === 'certificate' && (
                <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto animate-fade-in-up">
                    {/* Action Bar */}
                    <div className="mb-8 flex justify-between items-center">
                        <button
                            onClick={() => setCurrentView('completed')}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-semibold transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back
                        </button>
                        <div className="flex gap-3">
                            <button className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                </svg>
                                Share
                            </button>
                            <button
                                onClick={handleDownload}
                                className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Download
                            </button>
                        </div>
                    </div>

                    {/* Certificate Container */}
                    <div ref={certificateRef} className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
                        {/* Certificate Design */}
                        <div className="relative p-12 md:p-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                            {/* Decorative Elements */}
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>
                            <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>

                            {/* Corner Decorations */}
                            <div className="absolute top-8 left-8 w-24 h-24 border-t-4 border-l-4 border-blue-600/20 rounded-tl-3xl"></div>
                            <div className="absolute top-8 right-8 w-24 h-24 border-t-4 border-r-4 border-blue-600/20 rounded-tr-3xl"></div>
                            <div className="absolute bottom-8 left-8 w-24 h-24 border-b-4 border-l-4 border-blue-600/20 rounded-bl-3xl"></div>
                            <div className="absolute bottom-8 right-8 w-24 h-24 border-b-4 border-r-4 border-blue-600/20 rounded-br-3xl"></div>

                            {/* Content */}
                            <div className="relative text-center space-y-8">
                                {/* Logo/Brand */}
                                <div className="mb-8">
                                    <div className="inline-block">
                                        <span className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Vital</span>
                                    </div>
                                </div>

                                {/* Certificate Title */}
                                <div className="space-y-2">
                                    <p className="text-sm uppercase tracking-widest text-gray-500 font-semibold">Certificate of Completion</p>
                                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                                        This is to certify that
                                    </h1>
                                </div>

                                {/* Recipient Name */}
                                <div className="py-6">
                                    <h2 className="text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
                                        Amal Thomas
                                    </h2>
                                    <div className="w-64 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto"></div>
                                </div>

                                {/* Achievement Text */}
                                <div className="max-w-3xl mx-auto space-y-4">
                                    <p className="text-xl text-gray-700 leading-relaxed">
                                        has successfully completed the course
                                    </p>
                                    <h3 className="text-3xl font-bold text-gray-900">
                                        IT and Environment
                                    </h3>
                                    <p className="text-lg text-gray-600">
                                        demonstrating comprehensive understanding of electronic waste management,
                                        recycling methods, and global environmental impact
                                    </p>
                                </div>

                                {/* Completion Details */}
                                <div className="flex justify-center gap-12 pt-8 flex-wrap">
                                    <div className="text-center">
                                        <p className="text-sm text-gray-500 font-semibold mb-1">Completion Date</p>
                                        <p className="text-lg font-bold text-gray-900">December 28, 2025</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm text-gray-500 font-semibold mb-1">Total Modules</p>
                                        <p className="text-lg font-bold text-gray-900">3 Modules</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm text-gray-500 font-semibold mb-1">Final Score</p>
                                        <p className="text-lg font-bold text-blue-600">85%</p>
                                    </div>
                                </div>

                                {/* Signature Section */}
                                <div className="pt-12 flex justify-center gap-20 flex-wrap">
                                    <div className="text-center">
                                        <div className="w-48 h-16 mb-2 flex items-center justify-center">
                                            <img src={signature1} alt="Instructor Signature" className="max-w-full max-h-full object-contain" />
                                        </div>
                                        <div className="w-48 border-t-2 border-gray-300 mb-2"></div>
                                        <p className="text-sm font-bold text-gray-900">Course Instructor</p>
                                        <p className="text-xs text-gray-500">Environmental Studies</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-48 h-16 mb-2 flex items-center justify-center">
                                            <img src={signature2} alt="Director Signature" className="max-w-full max-h-full object-contain" />
                                        </div>
                                        <div className="w-48 border-t-2 border-gray-300 mb-2"></div>
                                        <p className="text-sm font-bold text-gray-900">Platform Director</p>
                                        <p className="text-xs text-gray-500">Vital Learning</p>
                                    </div>
                                </div>

                                {/* Certificate ID */}
                                <div className="pt-8">
                                    <p className="text-xs text-gray-400 font-mono">
                                        Certificate ID: VTL-2026-ENV-001255
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Actions */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600 mb-4">Share your achievement on social media</p>
                        <div className="flex gap-3 justify-center">
                            <button className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </button>
                            <button className="p-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                            </button>
                            <button className="p-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </main>
            )}
        </div>
    );
};

export default CertificateDummy;
