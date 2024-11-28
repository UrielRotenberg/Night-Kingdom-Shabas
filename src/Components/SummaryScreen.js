import React from 'react';
import BackgroundCheck from './logo/BackgroundCheck.png';

const SummaryScreen = ({ results, onStartNewTest }) => {
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
                paddingTop: '100px',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{
                    backgroundColor: 'rgba(17, 24, 39, 0.95)',
                    borderRadius: '1rem',
                    padding: '2rem',
                    color: 'white',
                    direction: 'rtl',
                    maxHeight: 'calc(100vh - 140px)',
                    overflow: 'auto'
                }}>
                    <h1 style={{
                        fontSize: '2rem',
                        color: '#60A5FA',
                        textAlign: 'center',
                        marginBottom: '2rem'
                    }}>
                        סיכום בדיקת תאים
                    </h1>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '1rem',
                        marginBottom: '2rem'
                    }}>
                        <div style={{
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            padding: '1.5rem',
                            borderRadius: '0.75rem',
                            textAlign: 'center'
                        }}>
                            <p style={{ fontSize: '2.5rem', color: '#3B82F6', fontWeight: 'bold' }}>
                                {results.totalCells}
                            </p>
                            <p>סה״כ תאים</p>
                        </div>
                        <div style={{
                            backgroundColor: 'rgba(34, 197, 94, 0.1)',
                            padding: '1.5rem',
                            borderRadius: '0.75rem',
                            textAlign: 'center'
                        }}>
                            <p style={{ fontSize: '2.5rem', color: '#22C55E', fontWeight: 'bold' }}>
                                {results.checkedCells}
                            </p>
                            <p>תאים תקינים</p>
                        </div>
                        <div style={{
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            padding: '1.5rem',
                            borderRadius: '0.75rem',
                            textAlign: 'center'
                        }}>
                            <p style={{ fontSize: '2.5rem', color: '#EF4444', fontWeight: 'bold' }}>
                                {results.failedCells}
                            </p>
                            <p>תאים שנכשלו</p>
                        </div>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '2rem',
                        marginBottom: '2rem'
                    }}>
                        <div style={{
                            backgroundColor: 'rgba(30, 41, 59, 0.8)',
                            padding: '1.5rem',
                            borderRadius: '0.75rem'
                        }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>מידע כללי</h3>
                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                <p>תאריך: {results.date}</p>
                                <p>שעה: {results.time}</p>
                                <p>זמן כולל: {results.totalDuration} שניות</p>
                                <p>אחוז הצלחה: {results.successRate}%</p>
                                <p>ציון: {results.grade}</p>
                            </div>
                        </div>

                        <div style={{
                            backgroundColor: 'rgba(30, 41, 59, 0.8)',
                            padding: '1.5rem',
                            borderRadius: '0.75rem'
                        }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>פרטי משמרת</h3>
                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                <p>בית סוהר: {results.shiftInfo.prison}</p>
                                <p>אגף: {results.shiftInfo.wing}</p>
                                <p>סוהר: {results.shiftInfo.officer}</p>
                                <p>משמרת: {results.shiftInfo.shift}</p>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        backgroundColor: 'rgba(30, 41, 59, 0.8)',
                        borderRadius: '1rem',
                        padding: '1.5rem',
                        marginBottom: '2rem'
                    }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>פירוט התאים</h3>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {results.cellDetails.map(cell => (
                                <div key={cell.number} style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(4, 1fr)',
                                    gap: '1rem',
                                    backgroundColor: cell.status === 'תקין' ? 'rgba(34, 197, 94, 0.1)' :
                                                   cell.status === 'נכשל' ? 'rgba(239, 68, 68, 0.1)' :
                                                   'rgba(100, 116, 139, 0.1)',
                                    padding: '1rem',
                                    borderRadius: '0.5rem'
                                }}>
                                    <span>תא {cell.number}</span>
                                    <span style={{
                                        color: cell.status === 'תקין' ? '#22C55E' :
                                               cell.status === 'נכשל' ? '#EF4444' : '#94A3B8'
                                    }}>סטטוס: {cell.status}</span>
                                    <span>זמן בדיקה: {cell.checkTime}</span>
                                    <span>משך: {cell.duration}s</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={onStartNewTest}
                        style={{
                            width: '100%',
                            backgroundColor: '#8B5CF6',
                            color: 'white',
                            padding: '1rem',
                            borderRadius: '0.5rem',
                            fontSize: '1.25rem',
                            fontWeight: '600',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            marginTop: 'auto'
                        }}
                        onMouseEnter={e => e.target.style.backgroundColor = '#7C3AED'}
                        onMouseLeave={e => e.target.style.backgroundColor = '#8B5CF6'}
                    >
                        התחל ביקורת חדשה
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SummaryScreen;