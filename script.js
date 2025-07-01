// Save student info
document.addEventListener("DOMContentLoaded", () => {
  const studentForm = document.getElementById("studentForm");
  const marksForm = document.getElementById("marksForm");

  if (studentForm) {
    studentForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = studentForm.name.value;
      const roll = studentForm.roll.value;
      const studentClass = studentForm.class.value;

      localStorage.setItem("student", JSON.stringify({ name, roll, studentClass }));
      alert("Student details saved!");
      studentForm.reset();
    });
  }

  if (marksForm) {
    marksForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const roll = marksForm[0].value;
      const maths = parseInt(marksForm[1].value);
      const science = parseInt(marksForm[2].value);
      const english = parseInt(marksForm[3].value);

      localStorage.setItem("marks", JSON.stringify({ roll, maths, science, english }));
      alert("Marks saved!");
      marksForm.reset();
    });
  }

  // If on results page
  const resultBox = document.getElementById("resultBox");
  if (resultBox) {
    const student = JSON.parse(localStorage.getItem("student"));
    const marks = JSON.parse(localStorage.getItem("marks"));

    if (student && marks) {
      const total = marks.maths + marks.science + marks.english;
      const average = total / 3;
      let grade = "F";

      if (average >= 90) grade = "A";
      else if (average >= 75) grade = "B";
      else if (average >= 60) grade = "C";
      else if (average >= 40) grade = "D";

      resultBox.innerHTML = `
        <h3>Result for ${student.name} (Roll: ${student.roll})</h3>
        <p>Class: ${student.studentClass}</p>
        <p>Maths: ${marks.maths}</p>
        <p>Science: ${marks.science}</p>
        <p>English: ${marks.english}</p>
        <p><strong>Total: ${total}</strong></p>
        <p><strong>Average: ${average.toFixed(2)}</strong></p>
        <p><strong>Grade: ${grade}</strong></p>
      `;
    } else {
      resultBox.innerHTML = `<p>No data available. Please enter student details and marks first.</p>`;
    }
  }
});
