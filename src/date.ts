export function getDatesFromMonth(from: Date) {
  const max = DAYS_IN_MONTH[from.getMonth()];

  const STARTS_AT_DAY = date(from)
    .setDate(1)
    .commit()
    .getDay();

  const dates: number[] = [];

  const before = date(from)
    .setMonth(from.getMonth() - 1)
    .commit();

  for (let day = STARTS_AT_DAY - 1; day >= 0; day -= 1) {
    dates.push(DAYS_IN_MONTH[before.getMonth()] - day);
  }

  for (let day = 1; day <= max; day += 1) {
    dates.push(day);
  }

  const left = (7 * 6) - dates.length;
  for (let day = 1; day <= left; day += 1) {
    dates.push(day);
  }

  return dates;
}

function date(from: Date) {
  let current = new Date(from);

  const utils = {
    setDate: (date: number) => {
      current.setDate(date);

      return utils;
    },
    setMonth: (month: number) => {
      current.setMonth(month);

      return utils;
    },
    commit: () => current,
  };

  return utils;
}

const DAYS_IN_MONTH = [
  31,
  30,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31,
];
