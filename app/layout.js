import './globals.css';

export const metadata = {
  title: 'יום הולדת 36 שמח',
  description: 'עמוד הפתעה ליום הולדת',
};

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
