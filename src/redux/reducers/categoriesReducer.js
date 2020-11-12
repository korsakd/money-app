import {
  ImmerReducer,
  createActionCreators,
  createReducerFunction,
} from 'immer-reducer';

const initialState = {
  income: [
    { iconName: 'wallet', name: 'salary', id: 'Zarplata', index: 0 },
    {
      iconName: 'bank',
      name: 'bankInvestments',
      id: 'Bank-Vlozhenia',
      index: 1,
    },
    { iconName: 'sack-percent', name: 'prize', id: 'Premia', index: 2 },
    { iconName: 'wallet-giftcard', name: 'presents', id: 'Podarki', index: 3 },
    { iconName: 'sale', name: 'sales', id: 'prodaji', index: 4 },
    { iconName: 'cash-refund', name: 'returns', id: 'Vozvrati', index: 5 },
    { iconName: 'chart-line', name: 'dividends', id: 'Dividendi', index: 6 },
    { iconName: 'coin', name: 'investments', id: 'Investicii', index: 7 },
    {
      iconName: 'apple-keyboard-command',
      name: 'other',
      id: 'Drugoe',
      index: 8,
    },
  ],
  costs: [
    { iconName: 'home', name: 'Home', id: 'Dom', index: 0 },
    { iconName: 'car', name: 'car', id: 'Mashina', index: 1 },
    { iconName: 'airplane', name: 'recreation', id: 'Otdix', index: 2 },
    { iconName: 'heart', name: 'health', id: 'Zdorovie', index: 3 },
    { iconName: 'food', name: 'products', id: 'Producti', index: 4 },
    {
      iconName: 'water-pump',
      name: 'utilities',
      id: 'Kommynal-Uslugi',
      index: 5,
    },
    { iconName: 'bus', name: 'transport', id: 'Transport', index: 6 },
    { iconName: 'shopping', name: 'shoping', id: 'Shoping', index: 7 },
    { iconName: 'dumbbell', name: 'sport', id: 'Sport', index: 8 },
    { iconName: 'cash-register', name: 'taxes', id: 'Nalogi', index: 9 },
    { iconName: 'baby-buggy', name: 'children', id: 'Deti', index: 10 },
    {
      iconName: 'paw',
      name: 'pets',
      id: 'Domash-Zivotnie',
      index: 11,
    },
    { iconName: 'brush', name: 'beauty', id: 'Krasota', index: 12 },
    { iconName: 'power', name: 'electronics', id: 'Electronica', index: 13 },
    {
      iconName: 'hamburger',
      name: 'fastFood',
      id: 'Bistroe-Pitanie',
      index: 14,
    },
    { iconName: 'bottle-wine', name: 'alcohol', id: 'Alcohol', index: 15 },
    { iconName: 'carrot', name: 'vegetables', id: 'Ovoschi', index: 16 },
    { iconName: 'cupcake', name: 'sweets', id: 'Sladosti', index: 17 },
    { iconName: 'gift-outline', name: 'presents', id: 'Podarki', index: 18 },
    {
      iconName: 'book-open-page-variant',
      name: 'training',
      id: 'Obuchenie',
      index: 19,
    },
    { iconName: 'food-apple', name: 'fruits', id: 'Fructi', index: 20 },
    { iconName: 'paperclip', name: 'office', id: 'Office', index: 21 },
    { iconName: 'home-currency-usd', name: 'rent', id: 'Arenda', index: 22 },
    {
      iconName: 'apple-keyboard-command',
      name: 'other',
      id: 'Drugoe',
      index: 23,
    },
  ],
  deletedIncomeCategory: [],
  deletedCostsCategory: [],
  categoriesIcon: {
    Food: [
      'food',
      'food-apple',
      'food-croissant',
      'cake-variant',
      'cupcake',
      'ice-cream',
      'rice',
      'hamburger',
      'chili-mild',
      'carrot',
      'corn',
      'pizza',
      'coffee',
      'fish',
      'sausage',
    ],
    Transport: [
      'bus',
      'car',
      'jeepney',
      'car-convertible',
      'car-electric',
      'car-hatchback',
      'car-pickup',
      'car-sports',
      'motorbike',
      'airplane',
      'car-wash',
      'ev-station',
      'gas-station',
      'ferry',
      'taxi',
      'towing',
      'tractor',
      'train',
      'truck',
      'engine',
      'oil',
      'piston',
      'parking',
      'road-variant',
    ],
    Shoping: [
      'cart',
      'gift-outline',
      'ring',
      'tshirt-v',
      'sunglasses',
      'shoe-formal',
      'shoe-heel',
      'shopping',
      'spray',
      'spray-bottle',
      'store',
      'brush',
      'format-paint',
      'hanger',
      'hat-fedora',
      'shopify',
      'wall',
    ],
    Entertainment: [
      'popcorn',
      'skate',
      'table-tennis',
      'tennis',
      'baseball-bat',
      'dice-multiple',
      'diving-snorkel',
      'google-controller',
      'palette-outline',
      'rollerblade',
      'rowing',
      'volleyball',
      'rugby',
    ],
    Fitness: ['dumbbell', 'karate', 'bike', 'boxing-glove', 'swim'],
    Medicine: ['pill', 'doctor', 'heart', 'needle', 'tooth', 'human-pregnant'],
    Family: ['baby-buggy', 'baby', 'dog', 'cat', 'paw'],
    Furniture: [
      'bed-empty',
      'sofa',
      'toilet',
      'lightbulb',
      'ceiling-light',
      'desk-lamp',
      'floor-lamp',
      'lava-lamp',
      'ornament',
    ],
    Electronics: [
      'cellphone',
      'laptop-windows',
      'watch-variant',
      'headphones',
      'mouse-variant',
      'printer',
      'radio',
    ],
    Education: [
      'firebase',
      'chair-school',
      'book-open-page-variant',
      'lead-pencil',
      'script',
    ],
    Personal: [
      'human-male-female',
      'account',
      'internet-explorer',
      'script-text-outline',
      'glass-mug',
      'glass-cocktail',
      'glass-wine',
      'smoking',
    ],
    Life: ['account-heart', 'tree-outline', 'terrain'],
    income: [
      'wallet',
      'bank',
      'sack-percent',
      'wallet-giftcard',
      'sale',
      'cash-refund',
      'chart-line',
      'coin',
      'finance',
      'credit-card',
    ],
    Other: [
      'shower',
      'airplane-takeoff',
      'ammunition',
      'apple-keyboard-command',
      'boombox',
      'camera-outline',
      'cards-heart',
      'cards-playing-outline',
      'charity',
      'church',
      'sprout',
      'cow',
      'guitar-electric',
      'itunes',
      'pig',
      'video',
      'video-vintage',
      'water',
      'water-pump',
      'wrench',
      'worker',
    ],
  },
};

class CategoriesReducer extends ImmerReducer {
  state = this.draftState;
}

export const categoriesActions = createActionCreators(CategoriesReducer);

export const categoriesReducer = createReducerFunction(
  CategoriesReducer,
  initialState,
);

// const ADD_CATEGORY = 'ADD_CATEGORY';
// const REMOVE_CATEGORY = 'REMOVE_CATEGORY';
// const REMOVE_DELETED_CATEGORY = 'REMOVE_DELETED_CATEGORY';
// const SORT_CATEGORIES = 'SORT_CATEGORIES';
// const REPLACE_CATEGORY = 'REPLACE_CATEGORY';
// const CLEAR_CATEGORY = 'CLEAR_CATEGORY';
// const IMPORT_FROM_DATABASE = 'IMPORT_FROM_DATABASE';

// export const addCategory = (category, type) => ({
//   type: ADD_CATEGORY,
//   payload: {category, type},
// });
// export const removeCategory = (index, type) => ({
//   type: REMOVE_CATEGORY,
//   payload: {index, type},
// });
// export const removeDeletedCategory = (index, type) => ({
//   type: REMOVE_DELETED_CATEGORY,
//   payload: {index, type},
// });
// export const replaceCategory = (element, index, type) => ({
//   type: REPLACE_CATEGORY,
//   payload: {element, index, type},
// });
// export const sortCategories = (categories, type) => ({
//   type: SORT_CATEGORIES,
//   payload: {categories, type},
// });
// export const clearCategory = () => ({
//   type: CLEAR_CATEGORY,
// });
// export const importCategoryFromDb = (category, type) => ({
//   type: IMPORT_FROM_DATABASE,
//   payload: {category, type},
// });

// export default function categoriesReducer(state = initialState, action) {
//   switch (action.type) {
//     case ADD_CATEGORY:
//       return {
//         income:
//           action.payload.type === 'Income'
//             ? [...state.income, action.payload.category]
//             : state.income,
//         costs:
//           action.payload.type === 'Costs'
//             ? [...state.costs, action.payload.category]
//             : state.costs,
//         deletedIncomeCategory: state.deletedIncomeCategory,
//         deletedCostsCategory: state.deletedCostsCategory,
//         categoriesIcon: state.categoriesIcon,
//       };
//     case REMOVE_CATEGORY:
//       return {
//         deletedIncomeCategory:
//           action.payload.type === 'Income'
//             ? state.deletedIncomeCategory.concat(
//                 state.income.splice(action.payload.index, 1),
//               )
//             : state.deletedIncomeCategory,
//         deletedCostsCategory:
//           action.payload.type === 'Costs'
//             ? state.deletedCostsCategory.concat(
//                 state.costs.splice(action.payload.index, 1),
//               )
//             : state.deletedCostsCategory,
//         income: [...state.income],
//         costs: [...state.costs],
//         categoriesIcon: state.categoriesIcon,
//       };
//     case REMOVE_DELETED_CATEGORY:
//       return {
//         deletedIncomeCategory:
//           action.payload.type === 'Income'
//             ? state.deletedIncomeCategory.filter(
//                 (element, i) => action.payload.index !== i,
//               )
//             : state.deletedIncomeCategory,
//         deletedCostsCategory:
//           action.payload.type === 'Costs'
//             ? state.deletedCostsCategory.filter(
//                 (element, i) => action.payload.index !== i,
//               )
//             : state.deletedCostsCategory,
//         income: [...state.income],
//         costs: [...state.costs],
//         categoriesIcon: state.categoriesIcon,
//       };
//     case SORT_CATEGORIES:
//       const sortedIncome =
//         action.payload.type === 'Income'
//           ? action.payload.categories
//           : state.income;
//       const sortedCosts =
//         action.payload.type === 'Costs'
//           ? action.payload.categories
//           : state.costs;

//       return {
//         income: sortedIncome.map((element, i) => {
//           return {...element, index: i};
//         }),
//         costs: sortedCosts.map((element, i) => {
//           return {...element, index: i};
//         }),
//         deletedCostsCategory: [...state.deletedCostsCategory],
//         deletedIncomeCategory: [...state.deletedIncomeCategory],
//         categoriesIcon: state.categoriesIcon,
//       };
//     case REPLACE_CATEGORY:
//       action.payload.type === 'Income'
//         ? state.income.splice(action.payload.index, 1, action.payload.element)
//         : state.income;
//       action.payload.type === 'Costs'
//         ? state.costs.splice(action.payload.index, 1, action.payload.element)
//         : state.costs;
//       return {
//         income: [...state.income],
//         costs: [...state.costs],
//         deletedIncomeCategory: [...state.deletedIncomeCategory],
//         deletedCostsCategory: [...state.deletedCostsCategory],
//         categoriesIcon: state.categoriesIcon,
//       };
//     case IMPORT_FROM_DATABASE:
//       const incomeFromDb =
//         action.payload.type === 'Income'
//           ? [...action.payload.category]
//           : state.income;
//       const costsFromDb =
//         action.payload.type === 'Costs'
//           ? [...action.payload.category]
//           : state.costs;
//       const sort = (a, b) => {
//         if (a.index < b.index) {
//           return -1;
//         }
//         if (a.index > b.index) {
//           return 1;
//         }
//         return 0;
//       };
//       return {
//         income: incomeFromDb.sort(sort),
//         costs: costsFromDb.sort(sort),
//         deletedIncomeCategory: state.deletedIncomeCategory,
//         deletedCostsCategory: state.deletedCostsCategory,
//         categoriesIcon: state.categoriesIcon,
//       };
//     case CLEAR_CATEGORY:
//       return {
//         income: initialState.income,
//         costs: initialState.costs,
//         deletedIncomeCategory: initialState.deletedIncomeCategory,
//         deletedCostsCategory: initialState.deletedCostsCategory,
//         categoriesIcon: initialState.categoriesIcon,
//       };
//     default:
//       return state;
//   }
// }
