import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Import tutor videos
// @ts-ignore
import tutorVideo from '../../assets/dummyfiles/aivideos/TutorBeforeExam [8795B96].mp4';
// @ts-ignore
import longAnswerVideo from '../../assets/dummyfiles/aivideos/LongAnswerQuestionVideo [308F223].mp4';
// @ts-ignore
import stillVideo from '../../assets/dummyfiles/aivideos/Still [F62FC91].mp4';

type QuizView = 'completed' | 'quiz-modal' | 'quiz-active' | 'quiz-finished' | 'appendix';

interface QuizQuestion {
    question: string;
    type: 'mcq' | 'long-answer';
    options?: string[];
    correctAnswer?: number;
    expectedAnswer?: string;
}

const DummyQuizPage: React.FC = () => {
    const navigate = useNavigate();
    const [currentView, setCurrentView] = useState<QuizView>('completed');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<(number | string)[]>([]);
    const [score, setScore] = useState(0);
    const [longAnswerVideoPlayed, setLongAnswerVideoPlayed] = useState(false);

    // Quiz questions for Module 1: E-Waste Basics (10 MCQ + 5 Long Answer = 15 total)
    const quizQuestions: QuizQuestion[] = [
        // MCQ Questions (10)
        {
            type: 'mcq',
            question: "Which of the following is considered electronic waste?",
            options: [
                "Old newspapers",
                "Broken smartphones",
                "Plastic bottles",
                "Food waste"
            ],
            correctAnswer: 1
        },
        {
            type: 'mcq',
            question: "What percentage of e-waste is properly recycled globally?",
            options: [
                "Around 20%",
                "Around 50%",
                "Around 70%",
                "Around 90%"
            ],
            correctAnswer: 0
        },
        {
            type: 'mcq',
            question: "Which harmful substance is commonly found in old electronics?",
            options: [
                "Vitamin C",
                "Lead",
                "Oxygen",
                "Water"
            ],
            correctAnswer: 1
        },
        {
            type: 'mcq',
            question: "What is the primary environmental benefit of recycling e-waste?",
            options: [
                "Reduces greenhouse gas emissions",
                "Prevents toxic materials from polluting soil and water",
                "Creates more jobs",
                "Increases company profits"
            ],
            correctAnswer: 1
        },
        {
            type: 'mcq',
            question: "Which region produces the most e-waste per capita?",
            options: [
                "Africa",
                "South America",
                "Europe and North America",
                "Antarctica"
            ],
            correctAnswer: 2
        },
        {
            type: 'mcq',
            question: "Why is it important to remove batteries before recycling electronics?",
            options: [
                "They can explode or leak hazardous chemicals",
                "They are too heavy",
                "They contain valuable gold",
                "They smell bad"
            ],
            correctAnswer: 0
        },
        {
            type: 'mcq',
            question: "What should you do with your personal data before recycling a device?",
            options: [
                "Leave it as is",
                "Securely wipe or delete all data",
                "Share it with the recycling center",
                "Transfer it to a new device only"
            ],
            correctAnswer: 1
        },
        {
            type: 'mcq',
            question: "Which metal is commonly recovered from e-waste recycling?",
            options: [
                "Iron",
                "Copper",
                "Silver",
                "All of the above"
            ],
            correctAnswer: 3
        },
        {
            type: 'mcq',
            question: "What is the best first option before recycling old electronics?",
            options: [
                "Throw them in regular trash",
                "Repair or donate if still functional",
                "Burn them",
                "Bury them in the ground"
            ],
            correctAnswer: 1
        },
        {
            type: 'mcq',
            question: "How does improper e-waste disposal affect developing countries?",
            options: [
                "It has no effect",
                "It provides free resources",
                "It causes health problems and environmental pollution",
                "It creates new jobs only"
            ],
            correctAnswer: 2
        },
        // Long Answer Questions (5)
        {
            type: 'long-answer',
            question: "Explain the concept of e-waste and discuss why it has become a global environmental concern. Include at least three examples of electronic waste in your answer.",
            expectedAnswer: "Expected to discuss: Definition of e-waste, global growth in electronics consumption, environmental hazards from improper disposal, examples like smartphones, computers, TVs, and the toxicity of materials like lead and mercury."
        },
        {
            type: 'long-answer',
            question: "Describe the life cycle of electronic products from manufacturing to disposal. Explain the environmental impact at each stage.",
            expectedAnswer: "Expected to cover: Raw material extraction, manufacturing process, consumer use phase, end-of-life disposal, environmental impacts including resource depletion, energy consumption, pollution, and waste generation at each stage."
        },
        {
            type: 'long-answer',
            question: "Compare and contrast formal and informal e-waste recycling methods. Discuss the advantages and disadvantages of each approach.",
            expectedAnswer: "Expected to address: Formal recycling (certified facilities, safety standards, proper technology), informal recycling (manual dismantling, lack of safety, health risks), environmental and economic impacts of both, worker safety considerations."
        },
        {
            type: 'long-answer',
            question: "Discuss the role of Extended Producer Responsibility (EPR) in managing e-waste. How can manufacturers contribute to reducing e-waste problems?",
            expectedAnswer: "Expected to explain: EPR concept, manufacturer obligations, take-back programs, design for recyclability, use of safer materials, circular economy principles, examples of successful EPR programs."
        },
        {
            type: 'long-answer',
            question: "As a student, what steps can you take to minimize e-waste generation in your daily life? Provide at least five practical examples with explanations.",
            expectedAnswer: "Expected to include: Extending device lifespan through proper care, repairing instead of replacing, donating working electronics, choosing durable products, proper disposal at certified centers, raising awareness, reducing unnecessary purchases."
        }
    ];

    const handleAnswerSelect = (answerIndex: number | string) => {
        const newAnswers = [...selectedAnswers];
        newAnswers[currentQuestionIndex] = answerIndex;
        setSelectedAnswers(newAnswers);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // Calculate score: MCQ questions (10 marks) + Long Answer (3 marks automatically)
            let mcqScore = 0;
            selectedAnswers.forEach((answer, index) => {
                const question = quizQuestions[index];
                if (question.type === 'mcq' && answer === question.correctAnswer) {
                    mcqScore++;
                }
            });
            // Award 3 marks for long-answer section regardless of content
            const longAnswerScore = 3;
            const finalScore = mcqScore + longAnswerScore;
            setScore(finalScore);
            setCurrentView('quiz-finished');
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleStartQuiz = () => {
        setCurrentView('quiz-active');
        setCurrentQuestionIndex(0);
        setSelectedAnswers([]);
        setScore(0);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 overflow-x-hidden">
            {/* Main Header - Simple version for quiz */}
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
                                Module 1: E-Waste Basics
                            </h1>
                            <p className="text-lg text-gray-600 max-w-2xl">
                                Understanding the environmental impact of electronic waste and sustainable recycling practices.
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
                                    <p className="text-xl text-gray-300 mb-8">You've successfully finished Module 1: E-Waste Basics</p>

                                    <div className="flex gap-4 justify-center flex-wrap">
                                        <button
                                            onClick={() => setCurrentView('quiz-modal')}
                                            className="px-8 py-4 bg-white text-gray-900 font-bold rounded-xl shadow-lg hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            Attend the Quiz
                                        </button>
                                        <button
                                            onClick={() => navigate('/userhome')}
                                            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 font-bold rounded-xl hover:bg-white/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                            </svg>
                                            Go Back to Home
                                        </button>
                                        <button
                                            onClick={() => setCurrentView('appendix')}
                                            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 font-bold rounded-xl hover:bg-white/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                            Appendix
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            )}

            {/* Quiz Modal */}
            {currentView === 'quiz-modal' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full overflow-hidden animate-fade-in-up">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            {/* Left Side - Quiz Info */}
                            <div className="p-8">
                                <div className="text-center mb-8">
                                    <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                                        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-3xl font-black text-gray-900 mb-3">Module 1 Quiz</h2>
                                    <p className="text-lg text-gray-600 mb-6">Test your knowledge on E-Waste Basics</p>

                                    <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                                        <div className="grid grid-cols-3 gap-4 text-left">
                                            <div>
                                                <p className="text-sm text-gray-500 font-semibold mb-1">Questions</p>
                                                <p className="text-2xl font-bold text-gray-900">{quizQuestions.length}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500 font-semibold mb-1">Time Limit</p>
                                                <p className="text-2xl font-bold text-gray-900">None</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500 font-semibold mb-1">Passing Score</p>
                                                <p className="text-2xl font-bold text-gray-900">60%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setCurrentView('completed')}
                                        className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleStartQuiz}
                                        className="flex-1 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all hover:scale-105 active:scale-95"
                                    >
                                        Start Quiz
                                    </button>
                                </div>
                            </div>

                            {/* Right Side - Video */}
                            <div className="bg-gray-900 p-8 pl-12 flex items-center justify-center">
                                <div className="w-full">
                                    <video
                                        src={tutorVideo}
                                        autoPlay
                                        playsInline
                                        className="w-full aspect-video object-cover rounded-lg border-2 border-gray-700"
                                        style={{
                                            pointerEvents: 'none'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Quiz Active View */}
            {currentView === 'quiz-active' && (
                <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Side - Quiz Content */}
                            <div className="animate-fade-in-up">
                                <div className="mb-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-2xl font-bold text-gray-900">Module 1 Quiz</h2>
                                        <span className="text-sm font-semibold text-gray-500">
                                            Question {currentQuestionIndex + 1} of {quizQuestions.length}
                                        </span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-600 transition-all duration-300"
                                            style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 mb-6">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-8">
                                        {quizQuestions[currentQuestionIndex].question}
                                    </h3>

                                    {quizQuestions[currentQuestionIndex].type === 'mcq' ? (
                                        <div className="space-y-4">
                                            {quizQuestions[currentQuestionIndex].options?.map((option, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handleAnswerSelect(index)}
                                                    className={`w-full p-6 rounded-2xl border-2 text-left font-semibold transition-all hover:scale-[1.02] ${selectedAnswers[currentQuestionIndex] === index
                                                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                                                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedAnswers[currentQuestionIndex] === index
                                                            ? 'border-blue-600 bg-blue-600'
                                                            : 'border-gray-300'
                                                            }`}>
                                                            {selectedAnswers[currentQuestionIndex] === index && (
                                                                <div className="w-3 h-3 bg-white rounded-full"></div>
                                                            )}
                                                        </div>
                                                        <span>{option}</span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg mb-6">
                                                <p className="text-sm font-semibold text-blue-900 mb-2">Expected Response:</p>
                                                <p className="text-sm text-blue-800">{quizQuestions[currentQuestionIndex].expectedAnswer}</p>
                                            </div>
                                            <textarea
                                                value={selectedAnswers[currentQuestionIndex] as string || ''}
                                                onChange={(e) => handleAnswerSelect(e.target.value)}
                                                placeholder="Type your detailed answer here..."
                                                rows={10}
                                                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-none font-sans"
                                            />
                                            <p className="text-sm text-gray-500">Write a comprehensive paragraph addressing all points mentioned above.</p>
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-4 justify-between">
                                    <button
                                        onClick={handlePreviousQuestion}
                                        disabled={currentQuestionIndex === 0}
                                        className={`px-6 py-3 font-semibold rounded-xl transition-all ${currentQuestionIndex === 0
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={handleNextQuestion}
                                        disabled={selectedAnswers[currentQuestionIndex] === undefined || selectedAnswers[currentQuestionIndex] === ''}
                                        className={`px-6 py-3 font-bold rounded-xl shadow-lg transition-all ${selectedAnswers[currentQuestionIndex] === undefined || selectedAnswers[currentQuestionIndex] === ''
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 active:scale-95'
                                            }`}
                                    >
                                        {currentQuestionIndex === quizQuestions.length - 1 ? 'Submit Quiz' : 'Next Question'}
                                    </button>
                                </div>
                            </div>

                            {/* Right Side - AI Video */}
                            <div className="lg:sticky lg:top-56 h-fit">
                                <div className="bg-gray-900 rounded-3xl p-8 shadow-2xl">
                                    <video
                                        key={`${quizQuestions[currentQuestionIndex].type}-${currentQuestionIndex}-${longAnswerVideoPlayed}`}
                                        src={
                                            quizQuestions[currentQuestionIndex].type === 'long-answer' && !longAnswerVideoPlayed
                                                ? longAnswerVideo
                                                : stillVideo
                                        }
                                        autoPlay
                                        loop={
                                            quizQuestions[currentQuestionIndex].type === 'long-answer' && !longAnswerVideoPlayed
                                                ? false
                                                : true
                                        }
                                        playsInline
                                        onEnded={() => {
                                            if (quizQuestions[currentQuestionIndex].type === 'long-answer' && !longAnswerVideoPlayed) {
                                                setLongAnswerVideoPlayed(true);
                                            }
                                        }}
                                        className="w-full aspect-video object-cover rounded-lg"
                                        style={{
                                            pointerEvents: 'none'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Quiz Finished View */}
            {currentView === 'quiz-finished' && (
                <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto animate-fade-in-up">
                    <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-12 text-center">
                        <div className={`w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center ${score >= quizQuestions.length * 0.6 ? 'bg-green-100' : 'bg-orange-100'
                            }`}>
                            {score >= quizQuestions.length * 0.6 ? (
                                <svg className="w-20 h-20 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            ) : (
                                <svg className="w-20 h-20 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            )}
                        </div>

                        <h2 className="text-4xl font-black text-gray-900 mb-4">Quiz Completed!</h2>
                        <p className="text-xl text-gray-600 mb-8">
                            You scored <span className="font-bold text-blue-600">{score}</span> out of <span className="font-bold">{quizQuestions.length}</span>
                        </p>

                        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                            <div className="text-6xl font-black text-gray-900 mb-2">
                                {Math.round((score / quizQuestions.length) * 100)}%
                            </div>
                            <p className="text-gray-600 font-semibold">
                                {score >= quizQuestions.length * 0.6 ? 'Passed! Great job!' : 'Keep practicing!'}
                            </p>
                        </div>

                        <div className="flex gap-4 justify-center flex-wrap">
                            <button
                                onClick={() => navigate('/dummy-watch-section2')}
                                className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all hover:scale-105 active:scale-95"
                            >
                                Proceed to Module 2
                            </button>
                            <button
                                onClick={handleStartQuiz}
                                className="px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all"
                            >
                                Retake Quiz
                            </button>
                            <button
                                onClick={() => navigate('/userhome')}
                                className="px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all"
                            >
                                Continue Later
                            </button>
                        </div>
                    </div>
                </main>
            )}

            {/* Appendix Modal */}
            {currentView === 'appendix' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto p-8 animate-fade-in-up">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-3xl font-black text-gray-900">Appendix</h2>
                            <button
                                onClick={() => setCurrentView('completed')}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="prose max-w-none">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Additional Resources</h3>

                            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                                <h4 className="font-bold text-gray-900 mb-3">Key Terms</h4>
                                <ul className="space-y-2 text-gray-700">
                                    <li><strong>E-Waste:</strong> Electronic waste including discarded electronic devices and components</li>
                                    <li><strong>Recycling:</strong> The process of recovering materials from electronic waste for reuse</li>
                                    <li><strong>Heavy Metals:</strong> Toxic elements like lead, mercury, and cadmium found in electronics</li>
                                    <li><strong>Data Wiping:</strong> The process of securely erasing data from devices before disposal</li>
                                </ul>
                            </div>

                            <div className="bg-blue-50 rounded-2xl p-6 mb-6">
                                <h4 className="font-bold text-gray-900 mb-3">Further Reading</h4>
                                <ul className="space-y-2 text-gray-700">
                                    <li>• Global E-Waste Monitor 2020 Report</li>
                                    <li>• Basel Convention on E-Waste Management</li>
                                    <li>• EPA Guide to Electronic Recycling</li>
                                    <li>• UN Sustainable Development Goals - Responsible Consumption</li>
                                </ul>
                            </div>

                            <div className="bg-green-50 rounded-2xl p-6">
                                <h4 className="font-bold text-gray-900 mb-3">Quick Tips</h4>
                                <ul className="space-y-2 text-gray-700">
                                    <li>✓ Always remove batteries before recycling devices</li>
                                    <li>✓ Delete all personal data before disposal</li>
                                    <li>✓ Check for certified e-waste recycling centers in your area</li>
                                    <li>✓ Consider repairing or donating working electronics</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DummyQuizPage;
