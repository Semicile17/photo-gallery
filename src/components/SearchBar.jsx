export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search by author..."
      className="mb-6 w-full rounded-lg border border-gray-300 px-4 py-2 outline-none  sm:max-w-md"
    />
  );
}