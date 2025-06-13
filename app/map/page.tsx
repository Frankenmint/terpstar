import TerpMap from '../../components/TerpMap';

export default function MapPage() {
  return (
    <main className="p-6 text-white bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Explore the Terpene Galaxy</h1>
      <TerpMap />
    </main>
  );
}
// This page serves as the main entry point for the terpene map visualization.
// It includes a title and the TerpMap component, which renders the interactive map of terpenes.
// The map allows users to explore the relationships between different terpenes and their effects on cannabis strains.
// The page is styled with a dark theme to enhance the visual appeal of the map.
// The TerpMap component is expected to handle the rendering of the map, including any interactivity or data fetching required to display the terpene information.
// The main function returns a structured layout with appropriate styling for the page.
// The page is designed to be visually engaging and informative, providing users with a unique way to understand the terpene profiles of various cannabis strains.