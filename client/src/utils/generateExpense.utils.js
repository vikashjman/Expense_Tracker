import { CATEGORY } from "../constants/constant";

export const getExpensesByYear = (expenses) => {
    const monthlyTotals = {
        january: 0,
        february: 0,
        march: 0,
        april: 0,
        may: 0,
        june: 0,
        july: 0,
        august: 0,
        september: 0,
        october: 0,
        november: 0,
        december: 0,
    };

    expenses.forEach((exp) => {
        const monthKey = exp.month.toLowerCase();
        if (monthKey in monthlyTotals) {
            monthlyTotals[monthKey] += parseInt(exp.transaction.amount) || 0;
        }
    });

    return Object.values(monthlyTotals);
};

export const getExpensesByMonthForCategory = (month, expenses) => {
    let categorySpent = {};

    const newExpenses = expenses.filter((exp) => exp.month === month);

    Object.values(CATEGORY).forEach((cat) => {
        categorySpent[cat] = 0;
    });

    newExpenses.forEach(({ transaction }) => {
        const { category, amount } = transaction;
        if (categorySpent.hasOwnProperty(category)) {
            categorySpent[category] += parseInt(amount) || 0;
        }
    });
    return Object.values(categorySpent);
};

export const percentToVal = (percent, total) => {
    return (percent * total) / 100;
};
export const valToPercent = (val, total) => {
    if (isNaN(total) || total === 0) {
        return 0;
    }
    if (isNaN(val)) {
        return 0;
    }
    return Math.round((val / total) * 100);
};


export function capFirst(str) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
}