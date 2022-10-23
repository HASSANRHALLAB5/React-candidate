module.exports = {
    mode: "jit",
    purge: ["./build/*.html", "./src/**/*.tsx", "./safeclasses.txt"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
        colors: {
            blue: "#1B31A8",
            darkblue: "#0079FF",
            blueGray: "blueGray50",
            dark: "#1E2A32",
            white: "#FFFFFF",
            darkwhite: "#E5E5E5",
            gray: "#8A9CA9",
            darkwhite: "#CBD5DC",
            darkgray: "#E9EEF2",
        },
        fontFamily: {
            work: ["Work Sans", "sans-serif,Rubik"],
        },
    },

    variants: {
        extend: {},
    },
    plugins: [],
}
