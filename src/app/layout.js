import "../styles/globals.css";

export const metadata = {
    title: "Spy Cat Agency",
    description: "Manage spy cats",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body className="bg-gray-100">
        {children}
        </body>
        </html>
    );
}
