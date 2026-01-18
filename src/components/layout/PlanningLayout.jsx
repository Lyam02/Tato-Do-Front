import React, { useState, useEffect, useRef } from 'react';

const HOUR_HEIGHT = 90;
const TIME_COLUMN_WIDTH = 80;
const TIME_SLOTS = Array.from({ length: 24 }, (_, i) => i);

const EventBlock = ({ todo, isWeekView = false }) => {
    if (!todo.dateDebut || !todo.dateFin) return null;
    const start = new Date(todo.dateDebut);
    const end = new Date(todo.dateFin);
    const startMin = start.getHours() * 60 + start.getMinutes();
    const duration = (end - start) / (1000 * 60);

    const topPos = (startMin / 60) * HOUR_HEIGHT;
    const heightPos = (duration / 60) * HOUR_HEIGHT;

    return (
        <div
            className="position-absolute rounded-3 px-2 shadow-sm d-flex flex-column justify-content-center text-white fw-bold overflow-hidden"
            style={{
                top: `${topPos + 2}px`,
                left: '4px',
                right: '4px',
                height: `${Math.max(heightPos - 4, 30)}px`,
                backgroundColor: '#5AA1C4',
                fontSize: isWeekView ? '0.75rem' : '0.9rem',
                pointerEvents: 'auto',
                cursor: 'pointer',
                zIndex: 10,
                borderLeft: '4px solid rgba(0,0,0,0.1)'
            }}
        >
            <span className="text-truncate">{todo.content}</span>
        </div>
    );
};

// --- VUE JOUR ---
const DayView = ({ todos, date }) => {
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const nowPos = (now.getHours() * 60 + now.getMinutes()) / 60 * HOUR_HEIGHT;

    return (
        <div className="position-relative" style={{ minHeight: `${24 * HOUR_HEIGHT}px` }}>
            {TIME_SLOTS.map(h => (
                <div key={h} className="d-flex" style={{ height: `${HOUR_HEIGHT}px` }}>
                    <div className="text-muted fw-bold d-flex align-items-start justify-content-center"
                         style={{ width: `${TIME_COLUMN_WIDTH}px`, marginTop: '-12px', fontSize: '0.85rem' }}>
                        {h.toString().padStart(2, '0')}:00
                    </div>
                    <div className="flex-grow-1 border-top" style={{ borderColor: '#E2E8F0' }}></div>
                </div>
            ))}
            {isToday && (
                <div className="position-absolute w-100 d-flex align-items-center"
                     style={{ top: `${nowPos}px`, left: 0, zIndex: 50, pointerEvents: 'none' }}>
                    <div style={{ width: '12px', height: '12px', backgroundColor: '#FF3B30', borderRadius: '50%', marginLeft: `${TIME_COLUMN_WIDTH - 6}px` }}></div>
                    <div style={{ flexGrow: 1, height: '2px', backgroundColor: '#FF3B30' }}></div>
                </div>
            )}
            <div className="position-absolute top-0 h-100" style={{ left: `${TIME_COLUMN_WIDTH}px`, right: 0, pointerEvents: 'none' }}>
                {todos
                    .filter(t => new Date(t.dateDebut).toDateString() === date.toDateString())
                    .map(t => <EventBlock key={t.documentId} todo={t}/>)
                }
            </div>
        </div>
    );
};

// --- VUE SEMAINE ---
const WeekView = ({ todos, weekDates }) => {
    const now = new Date();
    const nowPos = (now.getHours() * 60 + now.getMinutes()) / 60 * HOUR_HEIGHT;

    return (
        <div className="d-flex position-relative" style={{ minHeight: `${24 * HOUR_HEIGHT}px` }}>
            <div style={{ width: `${TIME_COLUMN_WIDTH}px`, flexShrink: 0 }}>
                {TIME_SLOTS.map(h => (
                    <div key={h} style={{ height: `${HOUR_HEIGHT}px` }} className="text-muted fw-bold d-flex justify-content-center pt-1">
                        <span style={{ marginTop: '-10px', fontSize: '0.8rem' }}>{h.toString().padStart(2, '0')}:00</span>
                    </div>
                ))}
            </div>

            <div className="d-flex flex-grow-1 border-start" style={{ borderColor: '#E2E8F0' }}>
                {weekDates.map((date, index) => {
                    const isToday = date.toDateString() === now.toDateString();
                    return (
                        <div key={index} className="flex-grow-1 position-relative border-end" style={{ minWidth: '100px', borderColor: '#E2E8F0' }}>
                            {TIME_SLOTS.map(h => <div key={h} className="border-top w-100" style={{ height: `${HOUR_HEIGHT}px`, borderColor: '#F1F5F9' }}></div>)}
                            {isToday && (
                                <div className="position-absolute w-100 d-flex align-items-center" style={{ top: `${nowPos}px`, zIndex: 50, pointerEvents: 'none' }}>
                                    <div style={{ flexGrow: 1, height: '2px', backgroundColor: '#FF3B30' }}></div>
                                </div>
                            )}
                            <div className="position-absolute top-0 w-100 h-100" style={{ pointerEvents: 'none' }}>
                                {todos
                                    .filter(t => new Date(t.dateDebut).toDateString() === date.toDateString())
                                    .map(t => <EventBlock key={t.documentId} todo={t} isWeekView={true} />)
                                }
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// --- VUE MOIS ---
const MonthView = ({ todos, date }) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarDays = [];
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDay; i > 0; i--) calendarDays.push({ day: prevMonthLastDay - i + 1, current: false, date: new Date(year, month - 1, prevMonthLastDay - i + 1) });
    for (let i = 1; i <= daysInMonth; i++) calendarDays.push({ day: i, current: true, date: new Date(year, month, i) });
    while (calendarDays.length < 42) calendarDays.push({ day: calendarDays.length - daysInMonth - firstDay + 1, current: false, date: new Date(year, month + 1, calendarDays.length - daysInMonth - firstDay + 1) });

    return (
        <div className="border rounded-3 overflow-hidden bg-white shadow-sm">
            <div className="d-flex border-bottom bg-light sticky-top">
                {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(d =>
                    <div key={d} className="flex-grow-1 text-center py-2 fw-bold text-secondary" style={{ width: '14.28%' }}>
                        {d}
                    </div>)}
            </div>
            <div className="d-flex flex-wrap">
                {calendarDays.map((cell, i) => (
                    <div key={i} className={`border-end border-bottom p-1 ${!cell.current ? 'bg-light text-muted' : ''}`} style={{ width: '14.28%', minHeight: '120px' }}>
                        <div className="fw-bold small mb-1">{cell.day}</div>
                        <div className="d-flex flex-column gap-1">
                            {todos.filter(t => new Date(t.dateDebut).toDateString() === cell.date.toDateString()).slice(0, 3).map(t => (
                                <div key={t.documentId} className="rounded-1 px-1 text-white text-truncate fw-bold"
                                     style={{ backgroundColor: '#5AA1C4', fontSize: '0.65rem', cursor: 'pointer' }}>
                                    {t.content}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function PlanningLayout({ todos, onDelete }) {
    const [view, setView] = useState('day');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const scrollRef = useRef(null);

    const getWeekDates = (date) => {
        const start = new Date(date);
        start.setDate(start.getDate() - (start.getDay() + 6) % 7);
        return Array.from({ length: 7 }, (_, i) => { const d = new Date(start); d.setDate(start.getDate() + i); return d; });
    };

    const handlePrev = () => {
        const d = new Date(selectedDate);
        if (view === 'day') d.setDate(d.getDate() - 1);
        else if (view === 'week') d.setDate(d.getDate() - 7);
        else d.setMonth(d.getMonth() - 1);
        setSelectedDate(d);
    };

    const handleNext = () => {
        const d = new Date(selectedDate);
        if (view === 'day') d.setDate(d.getDate() + 1);
        else if (view === 'week') d.setDate(d.getDate() + 7);
        else d.setMonth(d.getMonth() + 1);
        setSelectedDate(d);
    };
    const navButtonGroupStyle = {
        backgroundColor: '#E0E0E0',
        padding: '4px',
        borderRadius: '12px',
        display: 'inline-flex',
        gap: '4px'
    };

    const navButtonStyle = (active) => ({
        backgroundColor: active ? '#FFFFFF' : 'transparent',
        border: 'none',
        borderRadius: '8px',
        padding: '4px 16px',
        fontWeight: 'bold',
        fontSize: '0.85rem',
        color: '#424242',
        boxShadow: active ? '0px 2px 4px rgba(0,0,0,0.1)' : 'none',
        transition: 'all 0.2s ease'
    });

    useEffect(() => {
        if (scrollRef.current && view !== 'month') {
            scrollRef.current.scrollTop = (new Date().getHours() * HOUR_HEIGHT) - 100;
        }
    }, [view, selectedDate]);

    return (
            <div className="bg-white rounded-4 shadow-sm border p-4 mt-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div style={navButtonGroupStyle}>
                        <button
                            style={navButtonStyle(view === 'day')}
                            onClick={() => setView('day')}>
                            Jour
                        </button>
                        <button
                            style={navButtonStyle(view === 'week')}
                            onClick={() => setView('week')}>
                            Semaine
                        </button>
                        <button
                            style={navButtonStyle(view === 'month')}
                            onClick={() => setView('month')}>
                            Mois
                        </button>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <button
                            className="btn btn-sm px-3 rounded-3"
                            style={{ backgroundColor: '#D1E3ED', color: '#2C3E50', fontWeight: '600', border: 'none' }}
                            onClick={() => setSelectedDate(new Date())}>
                            Aujourd’hui
                        </button>
                        <div className="d-flex gap-1">
                            <button className="btn btn-light btn-sm rounded-circle border" onClick={handlePrev}>
                                &lt;
                            </button>
                            <button className="btn btn-light btn-sm rounded-circle border" onClick={handleNext}>
                                &gt;
                            </button>
                        </div>
                        <h5 className="mb-0 fw-bold ms-2 text-capitalize" style={{ color: '#2C3E50' }}>{selectedDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</h5>
                    </div>
                </div>

                <div className="mb-4 border-bottom pb-3">
                    {view === 'day' ? (
                        <div className="ps-2">
                            <div className="text-secondary text-capitalize fw-bold">{selectedDate.toLocaleDateString('fr-FR', { weekday: 'short' })}</div>
                            <div className="display-3 fw-bold" style={{ color: '#0B3D62', marginTop: '-10px' }}>{selectedDate.getDate()}</div>
                        </div>
                    ) : view === 'week' ? (
                        <div className="d-flex" style={{ paddingLeft: `${TIME_COLUMN_WIDTH}px` }}>
                            {getWeekDates(selectedDate).map((d, i) => (
                                <div key={i} className="flex-grow-1 text-center">
                                    <div className="text-secondary text-capitalize fw-bold" style={{ fontSize: '0.85rem' }}>{d.toLocaleDateString('fr-FR', { weekday: 'short' })}</div>
                                    <div className={`fw-bold h2 ${d.toDateString() === new Date().toDateString() ? 'text-primary' : ''}`} style={{ color: '#0B3D62' }}>{d.getDate()}</div>
                                </div>
                            ))}
                        </div>
                    ) : null}
                </div>

            <div ref={scrollRef} className="custom-scrollbar" style={{ height: '600px', overflowY: 'auto', overflowX: 'hidden' }}>
                {view === 'day' && <DayView todos={todos} date={selectedDate} onDelete={onDelete} />}
                {view === 'week' && <WeekView todos={todos} weekDates={getWeekDates(selectedDate)} onDelete={onDelete} />}
                {view === 'month' && <MonthView todos={todos} date={selectedDate} onDelete={onDelete} />}
            </div>
        </div>
    );
}