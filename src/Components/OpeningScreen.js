import React, { useState, useEffect } from 'react';
import InspectionScreen from './InspectionScreen';
import SummaryScreen from './SummaryScreen';
import PrisonBackground from './logo/PrisonBackground.png';

const OpeningScreen = () => {
    const [cells, setCells] = useState(Array(12).fill({
        active: false,
        timestamp: null,
        duration: 0,
        failed: false,
        skipped: false
    }));
    const [currentCell, setCurrentCell] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [isTestActive, setIsTestActive] = useState(false);
    const [results, setResults] = useState(null);

    useEffect(() => {
        let timer;
        if (isTestActive) {
            setStartTime(Date.now());
            timer = setInterval(() => {
                if (startTime) {
                    setElapsedTime((Date.now() - startTime) / 1000);
                }
            }, 100);
        } else {
            setElapsedTime(0);
            setStartTime(null);
        }
        return () => clearInterval(timer);
    }, [isTestActive, startTime]);

    const handleTestComplete = (testResults) => {
        setResults(testResults);
        setIsTestActive(false);
    };

    const resetTest = () => {
        setCells(Array(12).fill({
            active: false,
            timestamp: null,
            duration: 0,
            failed: false,
            skipped: false
        }));
        setCurrentCell(0);
        setElapsedTime(0);
        setStartTime(null);
        setIsTestActive(false);
        setResults(null);
    };

    if (results) {
        return <SummaryScreen results={results} onStartNewTest={resetTest} />;
    }

    if (isTestActive) {
        return (
            <InspectionScreen 
                cells={cells}
                setCells={setCells}
                currentCell={currentCell}
                setCurrentCell={setCurrentCell}
                elapsedTime={elapsedTime}
                startTime={startTime}
                onTestComplete={handleTestComplete}
            />
        );
    }

    return (
        <div style={{ 
            width: '100vw',
            height: '100vh',
            backgroundImage: `url(${PrisonBackground})`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <button 
                    onClick={() => setIsTestActive(true)}
                    style={{
                        position: 'absolute', // קובע שהכפתור ממוקם מוחלט
                        left: '5.5rem',       // מרחק מהצד הימני
                        bottom: '5rem',      // מרחק מהצד התחתון
                        backgroundColor: '#8B5CF6',
                        color: 'white',
                        padding: '1.75rem 5rem',
                        borderRadius: '50px',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1.5rem',
                        fontWeight: '500',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 4px 6px rgba(139, 92, 246, 0.25)'
                    }}
                    onMouseEnter={e => {
                        e.target.style.backgroundColor = '#7C3AED';
                        e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={e => {
                        e.target.style.backgroundColor = '#8B5CF6';
                        e.target.style.transform = 'scale(1)';
                    }}
                >
                    התחל ביקורת
                </button>
            </div>
        </div>
    );
    
};

export default OpeningScreen;