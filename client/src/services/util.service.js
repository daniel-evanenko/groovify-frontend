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
    if (typeof date === "string") date = new Date(date);
    if (typeof date === "number") date = new Date(date);

    // If date is more than a week ago, return the date in "Oct 2, 2023" format
    if (Date.now() - date > ms("7d"))
        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric", // Add day
            year: "numeric", // Add year
        });

    // Return the time passed since the date if it's less than a week ago
    else {
        if (Date.now() - date < ms("1h")) return "Last hour";
        if (Date.now() - date < ms("1d"))
            return ms(Date.now() - date, { long: true }).split(" ")[0] + " hours ago";
        return ms(Date.now() - date, { long: true }).split(" ")[0] + " days ago";
    }
}

export function formatTime(time) {
    //if bigger time/60 is bigger then 250 minutes it means that the time come in ms and not in seconds
    if (time / 60 > 250) {
        time = time / 1000;
    }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""
        }${seconds}`;
}