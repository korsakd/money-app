import database from '@react-native-firebase/database';

export function setUserBalanceData(user, balance, idBalance) {
  return database()
    .ref(`users/${user.uid}/balance/${idBalance}`)
    .set({...balance, date: `${balance.date}`});
}

export function removeUserBalanceData(user, id) {
  return database()
    .ref(`users/${user.uid}/balance/${id}`)
    .remove();
}

export const replaceUserBalanceData = (user, element) => {
  return database()
    .ref(`users/${user.uid}/balance/${element.id}`)
    .update(element);
};

export function setUserCategoryData(user, category, type, idCategory) {
  if (type === 'Income') {
    return database()
      .ref(`users/${user.uid}/income/${idCategory}`)
      .set(category);
  }
  if (type === 'Costs') {
    return database()
      .ref(`users/${user.uid}/costs/${idCategory}`)
      .set(category);
  }
}

export function removeUserCategoryData(user, type, id) {
  if (type === 'Income') {
    return database()
      .ref(`users/${user.uid}/income/${id}`)
      .remove();
  }
  if (type === 'Costs') {
    return database()
      .ref(`users/${user.uid}/costs/${id}`)
      .remove();
  }
}

export const replaceUserCategoryData = (user, type, element, id) => {
  if (type === 'Income') {
    return database()
      .ref(`users/${user.uid}/income/${id}`)
      .update(element);
  }
  if (type === 'Costs') {
    return database()
      .ref(`users/${user.uid}/costs/${id}`)
      .update(element);
  }
};

export const sortUserCategoryData = (category, type, user) => {
  if (type === 'Income') {
    for (const value of category.income) {
      database()
        .ref(`users/${user.uid}/income/${value.id}`)
        .update(value);
    }
  }
  if (type === 'Costs') {
    for (const value of category.costs) {
      database()
        .ref(`users/${user.uid}/costs/${value.id}`)
        .update(value);
    }
  }
};
