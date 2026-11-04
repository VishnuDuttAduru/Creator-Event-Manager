import { useState } from "react"

function CreatorEventManager() {

    const [events, setEvents] = useState([
        {
            id: 1,
            title: "Live Q&A",
            date: "2026-12-10",
            status: "Upcoming"
        },
        {
            id: 2,
            title: "Creator Workshop",
            date: "2026-10-12",
            status: "Completed"
        }
    ]);

    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [error, setError] = useState({
        title: "",
        date: ""
    });

    const totalEvents = events.length;

    const upcomingEvents = events.filter((event) => event.status === "Upcoming");
    const completedEvents = events.filter((event) => event.status === "Completed");

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const Ttitle = title.trim();
        const newErrors = {
            title: "",
            date: ""
        };

        if(!Ttitle) {
            newErrors.title = "Event Title is Required"
        }
        if(!date) {
            newErrors.date = "Event Date is Required"
        }
        setError(newErrors);
        if(newErrors.title || newErrors.date) return;
        
        const newEvent = () => {
            // id: Date.now(),
            // title: Ttitle,
            // date: date,
            // status: "Upcoming"

            setEvents((prev: any) => [...prev, newEvent]);
            setTitle("");
            setDate("");
            setError({
                title: "",
                date: ""
            });
        }
        console.log("Event==================>>", newEvent)
    }

    const handleToggle = (id: any) => {
        setEvents((prev) => prev.map((event) => event.id === id ? {
            ...event,
            status: event.status === "Upcoming" ? "Completed" : "Upcoming"
        } : event))
    };

    const handleDelete = (id: any) => {
        setEvents((prev) => prev.filter((event) => event.id !== id))
    };

    return (
        <div>
            <b>Creator Event Manager</b>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Event Title</label>
                    <input 
                        type="text"
                        placeholder="Enter Event Title"
                        value={title}
                        onChange={((e) => {
                            setTitle(e.target.value);
                            setError((prev) => ({
                                ...prev, title: ""
                            }))
                        })} 
                    />
                    {error.title && <p>{error.title}</p>}
                </div>
                <div>
                    <label>Event Title</label>
                    <input 
                        type="date"
                        placeholder="Enter Event Date"
                        value={date}
                        onChange={((e) => {
                            setDate(e.target.value);
                            setError((prev) => ({
                                ...prev, date: ""
                            }))
                        })} 
                    />
                    {error.date && <p>{error.date}</p>}
                    <button type="submit">Add Event</button>
                </div>
            </form>
            {events.length === 0 ? (
                <p>No events avialable. Add new Event</p>
            ) : (
                <>
                    {events.map((event) => (
                        <div key={event.id}>
                            <h3>{event.title}</h3>
                            <p>
                                <b>Date:</b> {event.date}
                            </p>
                            <span>{event.status}</span>
                            <button
                                onClick={() => handleToggle(event.id)}
                            >
                                Mark as {event.status === "Upcoming" ? "Completed" : "Upcoming"}
                            </button>
                            <button onClick={() => handleDelete(event.id)}>Delete</button>
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}

export default CreatorEventManager