// This component has its data hardcoded inside the function body.
// In phase 02, that data will be passed in as props from the parent —
// but the JSX structure you see here stays exactly the same.
function ExerciseListItem() {
  return (
    <div className="exercise-list-item">
      <h2>Back Squat</h2>
      <ul>
        <li><strong>Category:</strong> Strength</li>
        <li><strong>Movement pattern:</strong> Squat</li>
        <li><strong>Primary muscle:</strong> Quadriceps</li>
        <li><strong>Laterality:</strong> Bilateral</li>
        <li><strong>SI risk:</strong> Medium</li>
      </ul>
    </div>
  )
}

export default ExerciseListItem
