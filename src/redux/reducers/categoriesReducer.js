const initialState = {
  income: [
    {iconName: 'wallet', name: 'Зарплата'},
    {iconName: 'bank', name: 'Банковские вложения'},
    {iconName: 'sack-percent', name: 'Премия'},
    {iconName: 'wallet-giftcard', name: 'Подарки'},
    {iconName: 'sale', name: 'Продажи'},
    {iconName: 'cash-refund', name: 'Возвраты'},
    {iconName: 'chart-line', name: 'Дивиденды'},
    {iconName: 'coin', name: 'Инвестиции'},
    {iconName: 'apple-keyboard-command', name: 'Другое'},
  ],
  costs: [
    {iconName: 'home', name: 'Дом'},
    {iconName: 'car', name: 'Машина'},
    {iconName: 'airplane', name: 'Отдых'},
    {iconName: 'heart', name: 'Здоровье'},
    {iconName: 'food', name: 'Продукты'},
    {iconName: 'water-pump', name: 'Коммунльные услуги'},
    {iconName: 'bus', name: 'Транспорт'},
    {iconName: 'shopping', name: 'Шопинг'},
    {iconName: 'dumbbell', name: 'Спорт'},
    {iconName: 'cash-register', name: 'Налоги'},
    {iconName: 'baby-buggy', name: 'Дети'},
    {iconName: 'paw', name: 'Домашние животные'},
    {iconName: 'brush', name: 'Красота'},
    {iconName: 'power', name: 'Электроника'},
    {iconName: 'hamburger', name: 'Быстрое питание'},
    {iconName: 'bottle-wine', name: 'Алкоголь'},
    {iconName: 'carrot', name: 'Овощи'},
    {iconName: 'cupcake', name: 'Сладости'},
    {iconName: 'gift-outline', name: 'Подарки'},
    {iconName: 'book-open-page-variant', name: 'Обучение'},
    {iconName: 'food-apple', name: 'Фрукты'},
    {iconName: 'paperclip', name: 'Офис'},
    {iconName: 'home-currency-usd', name: 'Аренда'},
    {iconName: 'apple-keyboard-command', name: 'Другое'},
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
    Medical: ['pill', 'doctor', 'heart', 'needle', 'tooth', 'human-pregnant'],
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
    Income: [
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
const ADD_CATEGORY = 'ADD_CATEGORY';
const REMOVE_CATEGORY = 'REMOVE_CATEGORY';
const REMOVE_DELETED_CATEGORY = 'REMOVE_DELETED_CATEGORY';
const SORT_CATEGORIES = 'SORT_CATEGORIES';
const REPLACE_CATEGORY = 'REPLACE_CATEGORY';

export const addCategory = (category, type) => ({
  type: ADD_CATEGORY,
  payload: {category, type},
});
export const removeCategory = (index, type) => ({
  type: REMOVE_CATEGORY,
  payload: {index, type},
});
export const removeDeletedCategory = (index, type) => ({
  type: REMOVE_DELETED_CATEGORY,
  payload: {index, type},
});
export const replaceCategory = (element, index, type) => ({
  type: REPLACE_CATEGORY,
  payload: {element, index, type},
});
export const sortCategories = (categories, type) => ({
  type: SORT_CATEGORIES,
  payload: {categories, type},
});

export default function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CATEGORY:
      return {
        income:
          action.payload.type === 'Income'
            ? [...state.income, action.payload.category]
            : state.income,
        costs:
          action.payload.type === 'Costs'
            ? [...state.costs, action.payload.category]
            : state.costs,
        deletedIncomeCategory: state.deletedIncomeCategory,
        deletedCostsCategory: state.deletedCostsCategory,
        categoriesIcon: state.categoriesIcon,
      };
    case REMOVE_CATEGORY:
      return {
        deletedIncomeCategory:
          action.payload.type === 'Income'
            ? state.deletedIncomeCategory.concat(
                state.income.splice(action.payload.index, 1),
              )
            : state.deletedIncomeCategory,
        deletedCostsCategory:
          action.payload.type === 'Costs'
            ? state.deletedCostsCategory.concat(
                state.costs.splice(action.payload.index, 1),
              )
            : state.deletedCostsCategory,
        income: [...state.income],
        costs: [...state.costs],
        categoriesIcon: state.categoriesIcon,
      };
    case REMOVE_DELETED_CATEGORY:
      return {
        deletedIncomeCategory:
          action.payload.type === 'Income'
            ? state.deletedIncomeCategory.filter(
                (element, i) => action.payload.index !== i,
              )
            : state.deletedIncomeCategory,
        deletedCostsCategory:
          action.payload.type === 'Costs'
            ? state.deletedCostsCategory.filter(
                (element, i) => action.payload.index !== i,
              )
            : state.deletedCostsCategory,
        income: [...state.income],
        costs: [...state.costs],
        categoriesIcon: state.categoriesIcon,
      };
    case SORT_CATEGORIES:
      return {
        income:
          action.payload.type === 'Income'
            ? action.payload.categories
            : state.income,
        costs:
          action.payload.type === 'Costs'
            ? action.payload.categories
            : state.costs,
        deletedCostsCategory: [...state.deletedCostsCategory],
        deletedIncomeCategory: [...state.deletedIncomeCategory],
      };
    case REPLACE_CATEGORY:
      action.payload.type === 'Income'
        ? state.income.splice(action.payload.index, 1, action.payload.element)
        : state.income;
      action.payload.type === 'Costs'
        ? state.costs.splice(action.payload.index, 1, action.payload.element)
        : state.costs;
      return {
        income: [...state.income],
        costs: [...state.costs],
        deletedIncomeCategory: [...state.deletedIncomeCategory],
        deletedCostsCategory: [...state.deletedCostsCategory],
        categoriesIcon: state.categoriesIcon,
      };
    default:
      return state;
  }
}
