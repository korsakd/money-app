export const writeUserData = (
  user,
  incomeCategory,
  costsCategory,
  balance,
  database,
  deviceId,
) => {
  incomeCategory.map(element => {
    database()
      .ref(`users/${user.uid}/income/${element.id}`)
      .set(element);
  });
  costsCategory.map(element => {
    database()
      .ref(`users/${user.uid}/costs/${element.id}`)
      .set(element);
  });
  balance.map(element => {
    database()
      .ref(`users/${user.uid}/balance/${element.id}`)
      .set({...element, date: `${element.date}`});
  });
  database()
    .ref(`users/${user.uid}/DeviceID`)
    .set(deviceId);
};

export const importUserDataFromDB = (
  dataSnapshot,
  addBalanceFromDb,
  addCategoryFromDb,
) => {
  const balanceDb = dataSnapshot.toJSON().balance;
  const incomeDb = dataSnapshot.toJSON().income;
  const costsDb = dataSnapshot.toJSON().costs;
  addBalanceFromDb(Object.values(balanceDb));
  addCategoryFromDb(Object.values(incomeDb), 'Income');
  addCategoryFromDb(Object.values(costsDb), 'Costs');
};
