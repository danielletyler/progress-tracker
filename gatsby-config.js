module.exports = {
    siteMetadata: {
        title: "Progress",
    },
    plugins: [
        {
            resolve: "gatsby-plugin-firebase",
            options: {
                credentials: {
                    apiKey: "AIzaSyD7yWJu9QZjqXWRHco-3DS0LzoEzxZDYKs",
                    authDomain: "progress-f9f99.firebaseapp.com",
                    projectId: "progress-f9f99",
                    storageBucket: "progress-f9f99.appspot.com",
                    messagingSenderId: "1098330093257",
                    appId: "1:1098330093257:web:c457d67bf9d6abd0a33f18",
                },
            },
        },
    ],
}
