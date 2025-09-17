document.getElementById('calculateBtn').addEventListener('click', calculateAge);
document.getElementById('resetBtn').addEventListener('click', resetForm);

function calculateAge() {
  const day = parseInt(document.getElementById('day').value, 10);
  const month = parseInt(document.getElementById('month').value, 10);
  const year = parseInt(document.getElementById('year').value, 10);
  const errorEl = document.getElementById('error');
  errorEl.textContent = '';

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    errorEl.textContent = 'Please fill out all fields.';
    return;
  }

  const birthDate = new Date(year, month - 1, day);
  const now = new Date();

  if (birthDate > now) {
    errorEl.textContent = 'Birth date cannot be in the future.';
    return;
  }

  // ---- Age calculation ----
  let years = now.getFullYear() - birthDate.getFullYear();
  let months = now.getMonth() - birthDate.getMonth();
  let days = now.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  // ---- Next birthday ----
  let nextBirthday = new Date(now.getFullYear(), month - 1, day);
  if (nextBirthday < now) {
    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
  }
  const diffMs = nextBirthday - now;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);

  // ---- Total lived ----
  const totalDays = Math.floor((now - birthDate) / (1000 * 60 * 60 * 24));
  const totalHours = Math.floor((now - birthDate) / (1000 * 60 * 60));

  // ---- Day of week ----
  const dayOfWeek = birthDate.toLocaleDateString('en-US', { weekday: 'long' });

  // ---- Zodiac sign ----
  const zodiac = getZodiac(day, month);

  // ---- Show results ----
  document.getElementById('years').textContent = years;
  document.getElementById('months').textContent = months;
  document.getElementById('days').textContent = days;
  document.getElementById('nextBirthday').textContent = `${diffMonths} months, ${diffDays % 30} days`;
  document.getElementById('totalDays').textContent = totalDays;
  document.getElementById('totalHours').textContent = totalHours.toLocaleString();
  document.getElementById('dayOfWeek').textContent = dayOfWeek;
  document.getElementById('zodiac').textContent = zodiac;

  // Make result box visible
  document.getElementById('result').style.display = "block";
}

function resetForm() {
  document.getElementById('day').value = '';
  document.getElementById('month').value = '';
  document.getElementById('year').value = '';
  document.getElementById('error').textContent = '';
  document.querySelectorAll('#result span').forEach(el => el.textContent = '--');
  document.getElementById('result').style.display = "none"; // hide again
}

// ---- Zodiac helper ----
function getZodiac(day, month) {
  const zodiacSigns = [
    { sign: "Capricorn", start: [12, 22], end: [1, 19] },
    { sign: "Aquarius", start: [1, 20], end: [2, 18] },
    { sign: "Pisces", start: [2, 19], end: [3, 20] },
    { sign: "Aries", start: [3, 21], end: [4, 19] },
    { sign: "Taurus", start: [4, 20], end: [5, 20] },
    { sign: "Gemini", start: [5, 21], end: [6, 20] },
    { sign: "Cancer", start: [6, 21], end: [7, 22] },
    { sign: "Leo", start: [7, 23], end: [8, 22] },
    { sign: "Virgo", start: [8, 23], end: [9, 22] },
    { sign: "Libra", start: [9, 23], end: [10, 22] },
    { sign: "Scorpio", start: [10, 23], end: [11, 21] },
    { sign: "Sagittarius", start: [11, 22], end: [12, 21] },
  ];

  for (let z of zodiacSigns) {
    if ((month === z.start[0] && day >= z.start[1]) ||
        (month === z.end[0] && day <= z.end[1])) {
      return z.sign;
    }
  }
  return "Unknown";
}
