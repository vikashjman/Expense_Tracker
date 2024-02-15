import { CATEGORY, MONTH } from "../constants/constant";

export const getExpensesByYear = (expenses) => {
    let monthlyTotalExpense = {};
    Object.values(MONTH).forEach(month => {
        monthlyTotalExpense[month] = 0;
    });

    expenses.forEach((exp) => {
        const monthKey = exp.month;
        if (monthKey in monthlyTotalExpense) {
            monthlyTotalExpense[monthKey] += parseInt(exp.transaction.amount) || 0;
        }
    });

    return Object.values(monthlyTotalExpense);
};

export const getExpensesByMonthForCategory = (month, expenses) => {
    
    const newExpenses = expenses.filter((exp) => exp.month === month);
    
    let categorySpent = {};
    Object.values(CATEGORY).forEach((category) => {
        categorySpent[category] = 0;
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