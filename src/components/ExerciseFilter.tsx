interface Props {
  filterText: string
  filterCategory: string
  categories: string[]
  onTextChange: (value: string) => void
  onCategoryChange: (value: string) => void
}

/*
 * Purely presentational — no state lives here. The parent owns filterText
 * and filterCategory; this component renders the controls and reports changes
 * via callbacks. The same container/presentational split as ExerciseListItem:
 * the child has no opinion about what the values mean, only how to display them.
 */
function ExerciseFilter({ filterText, filterCategory, categories, onTextChange, onCategoryChange }: Props) {
  return (
    <div className="flex gap-3 mb-6">
      <input
        type="text"
        placeholder="Filter by name"
        value={filterText}
        onChange={(e) => onTextChange(e.target.value)}
        className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
      />
      <select
        value={filterCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
      >
        <option value="">All categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  )
}

export default ExerciseFilter
