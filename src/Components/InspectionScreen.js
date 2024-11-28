import React, { useState, useEffect } from 'react';
import { Timer, Radio } from 'lucide-react';
import BackgroundCheck from './logo/BackgroundCheck.png';

// סורגי התא
const CellBars = () => (
    <svg width="100%" height="100%" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.4,
        pointerEvents: 'none'
    }}>
        {[...Array(6)].map((_, i) => (
            <rect
                key={`v-${i}`}
                x={`${(i * 20)}%`}
                y="0"
                width="4"
                height="100%"
                fill="#94a3b8"
            />
        ))}
        {[...Array(3)].map((_, i) => (
            <rect
                key={`h-${i}`}
                x="0"
                y={`${(i * 40)}%`}
                width="100%"
                height="4"
                fill="#94a3b8"
            />
        ))}
    </svg>
);

// קומפוננטת תא
const CellComponent = ({ cell, index, isActive }) => (
    <div
        style={{
            backgroundColor: cell.active ? 'rgba(16, 185, 129, 0.9)' :
                           cell.failed ? 'rgba(239, 68, 68, 0.9)' :
                           isActive ? 'rgba(59, 130, 246, 0.9)' :
                           'rgba(30, 41, 59, 0.9)',
            padding: '2rem',
            borderRadius: '0.75rem',
            textAlign: 'center',
            transition: 'all 0.3s ease',
            animation: isActive ? 'pulse 2s infinite' : 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '180px',
            position: 'relative',
            overflow: 'hidden'
        }}
    >
        <CellBars />
        
        <Radio 
            className="relative z-10"
            size={48}
            color={
                cell.active ? '#4ade80' :
                cell.failed ? '#f87171' :
                '#94a3b8'
            }
        />
        
        <h3 style={{
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginTop: '1rem',
            position: 'relative',
            zIndex: 1
        }}>תא {index + 1}</h3>
    </div>
);

// קומפוננטת המסך הראשי
const InspectionScreen = ({ 
    cells, 
    setCells, 
    currentCell, 
    setCurrentCell, 
    onTestComplete 
}) => {
    const [elapsedTime, setElapsedTime] = useState(0); // זמן שחלף
    const [startTime] = useState(Date.now());          // זמן התחלה

    // אפקט לניהול טיימר
    useEffect(() => {
        const timer = setInterval(() => {
            setElapsedTime((Date.now() - startTime) / 1000); // עדכון זמן שחלף
        }, 100);

        return () => clearInterval(timer); // ביטול טיימר
    }, [startTime]);

    useEffect(() => {
        if (currentCell >= cells.length) {
            const results = generateResults();
            onTestComplete(results);
            return; // סיום ה-Effect
        }
        
        const timeout = setTimeout(() => {
            setCells(prevCells => {
                const updatedCells = [...prevCells];
                if (!updatedCells[currentCell]?.active) {
                    updatedCells[currentCell] = {
                        ...updatedCells[currentCell],
                        active: false,
                        timestamp: Date.now(),
                        duration: 0,
                        failed: true,
                        skipped: true,
                    };
                }
                return updatedCells;
            });
    
            setCurrentCell(prev => {
                return prev + 1;
            });
        }, 4000); // 4 שניות
    
        return () => {
            clearTimeout(timeout);
        };
    }, [currentCell]); // רק currentCell כמשתנה תלות
    
    const generateResults = () => {
        const failedCells = cells.filter(cell => cell.failed).length;
        const activeCells = cells.filter(cell => cell.active).length;
        const successRate = (activeCells / cells.length) * 100;

        return {
            date: new Date().toLocaleDateString('he-IL'),
            time: new Date().toLocaleTimeString('he-IL'),
            totalDuration: ((Date.now() - startTime) / 1000).toFixed(1),
            totalCells: cells.length,
            checkedCells: activeCells,
            failedCells: failedCells,
            successRate: successRate.toFixed(1),
            cellDetails: cells.map((cell, index) => ({
                number: index + 1,
                status: cell.active ? 'תקין' : cell.failed ? 'נכשל' : 'לא נבדק',
                checkTime: cell.timestamp ? new Date(cell.timestamp).toLocaleTimeString('he-IL') : '-',
                duration: cell.duration ? cell.duration.toFixed(1) : '-',
            })),
            grade: successRate === 100 ? 'מצוין' :
                successRate >= 90 ? 'טוב מאוד' :
                successRate >= 80 ? 'טוב' : 'נכשל',
            shiftInfo: {
                prison: 'מגידו',
                wing: '1',
                officer: 'ישראל כהן',
                shift: 'לילה'
            }
        };
    };

    return (
        <div style={{ 
            width: '100vw',
            height: '100vh',
            backgroundImage: `url(${BackgroundCheck})`,
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
                padding: '1.5rem',
                paddingTop: '120px',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* שעון מוגדל */}
                <div style={{
                    width: 'fit-content',
                    margin: '0 auto 2rem auto',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    padding: '1.5rem 3rem',
                    borderRadius: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem'
                }}>
                    <Timer size={48} color="white" />
                    <span style={{
                        color: 'white',
                        fontFamily: 'monospace',
                        fontSize: '3rem',
                        fontWeight: 'bold'
                    }}>{elapsedTime.toFixed(1)}s</span>
                </div>
    
                {/* גריד תאים */}
                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginBottom: '2rem'
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(6, 1fr)',
                        gap: '1.5rem',
                        maxWidth: '1400px',
                        margin: '0 auto'
                    }}>
                        {cells.map((cell, index) => (
                            <CellComponent
                                key={index}
                                cell={cell}
                                index={index}
                                isActive={index === currentCell}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InspectionScreen;