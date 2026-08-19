export const metadata = {
  title: 'A to Z Shopping',
  description: 'Exclusive Deals & Offers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
