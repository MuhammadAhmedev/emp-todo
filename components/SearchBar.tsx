export default function SearchBar({ setInput, input, handleKeyPress }: any) {
  return (
    <div className="mr-6">
      <input
        type="search"
        className="px-2 py-1 border border-primary rounded-lg outline-none"
        placeholder="Search Here..."
        onKeyPress={handleKeyPress}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
}
