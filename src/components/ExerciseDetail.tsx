/*
 * ExerciseDetail renders the same data as ExerciseListItem but in a completely
 * different visual context — a featured card rather than a compact list entry.
 * Same fields, different hierarchy and layout. This is the point: a component
 * decides how to present its data, and two components can present the same
 * data in entirely different ways depending on where they appear in the UI.
 */
function ExerciseDetail() {
  return (
    <div className="border-2 border-gray-900 rounded-lg p-6 bg-gray-50">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Featured exercise</p>
      <h2 className="text-2xl font-bold mb-1">Barbell Hip Thrust</h2>
      <p className="text-gray-500 text-sm mb-6">Hinge · Strength</p>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400">Primary muscle</dt>
          <dd className="mt-0.5 font-medium">Glutes</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400">Laterality</dt>
          <dd className="mt-0.5 font-medium">Bilateral</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400">SI risk</dt>
          <dd className="mt-0.5">
            <span className="inline-block px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs font-semibold">Low</span>
          </dd>
        </div>
      </dl>
    </div>
  )
}

export default ExerciseDetail
