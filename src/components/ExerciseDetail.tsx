/*
 * ExerciseDetail is a hardcoded component — the same pattern as ExerciseListItem
 * was in phase 01, before props were introduced. It demonstrates what a
 * component looks like when its data is baked in rather than received from a
 * parent. The contrast with ExerciseListItem is deliberate: same fields, same
 * structure, but one is reusable and one is not.
 */
function ExerciseDetail() {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2">Barbell Hip Thrust</h2>
      <ul className="text-sm text-gray-600 flex flex-col gap-1">
        <li><span className="font-medium">Category:</span> Strength</li>
        <li><span className="font-medium">Movement pattern:</span> Hinge</li>
        <li><span className="font-medium">Primary muscle:</span> Glutes</li>
        <li><span className="font-medium">Laterality:</span> bilateral</li>
        <li><span className="font-medium">SI risk:</span> low</li>
      </ul>
    </div>
  )
}

export default ExerciseDetail
