export const metadata = {
  title: 'A to Z Shopping',
  description: 'AI Price Tracker & Deal Matcher',
  manifest: '/a_to_zshopping/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/a_to_zshopping/manifest.json" />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body className="bg-slate-900 text-white">{children}</body>
    </html>
  );
}
