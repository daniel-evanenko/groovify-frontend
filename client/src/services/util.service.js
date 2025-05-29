import ms from "ms"
import fs from "fs/promises"

export function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

export function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}

export function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

export function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

export function randomColor() {
    return `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255
        })`;
}

export function formatDate(date) {
    if (!date) return "Unknown date";

    let dateObj;
    // Ensure date is a valid Date object
    if (typeof date === "string" || typeof date === "number") {
        dateObj = new Date(date);
    } else if (date instanceof Date) {
        dateObj = date;
    } else {
        return "Invalid date format"; // Handle cases where input is not string, number, or Date
    }

    // If the date is invalid (e.g., "new Date('invalid string')"), return an error.
    if (isNaN(dateObj.getTime())) {
        return "Invalid date";
    }

    const now = Date.now();
    const diff = now - dateObj.getTime(); // Difference in milliseconds

    // Define time intervals in milliseconds for clarity
    const SECOND = 1000;
    const MINUTE = 60 * SECOND;
    const HOUR = 60 * MINUTE;
    const DAY = 24 * HOUR;
    const WEEK = 7 * DAY;
    const MONTH = 30 * DAY; // Approximate month (for 30 days)
    const YEAR = 365 * DAY; // Approximate year (for 365 days)

    if (diff < MINUTE) {
        const seconds = Math.floor(diff / SECOND);
        return seconds <= 0 ? "just now" : `${seconds} second${seconds === 1 ? '' : 's'} ago`;
    } else if (diff < HOUR) {
        const minutes = Math.floor(diff / MINUTE);
        return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else if (diff < DAY) {
        const hours = Math.floor(diff / HOUR);
        return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else if (diff < WEEK) {
        const days = Math.floor(diff / DAY);
        return `${days} day${days === 1 ? '' : 's'} ago`;
    } else if (diff < MONTH) { // Check for weeks before months
        const weeks = Math.floor(diff / WEEK);
        return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
    } else if (diff < YEAR) { // Check for months before years
        const months = Math.floor(diff / MONTH);
        return `${months} month${months === 1 ? '' : 's'} ago`;
    } else {
        // If more than a year, return the full date in "Oct 2, 2023" format
        return dateObj.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    }
}

export function formatTime(time) {
    //if bigger time/60 is bigger then 250 minutes it means that the time come in ms and not in seconds
    if (time / 60 > 250) {
        time = time / 1000;
    }
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
}