import "@styles/globals.css";



export const metadata = {
  title: "Artik",
  description: "AI Powered Article Generation ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
