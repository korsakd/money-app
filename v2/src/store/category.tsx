import {
  ImmerReducer,
  createActionCreators,
  createReducerFunction,
} from 'immer-reducer';

export type CategoryType = {
  iconName: string;
  name: string;
  id: string;
};
type CategoriesIconType = {
  Food: string[];
  Transport: string[];
  Shopping: string[];
  Entertainment: string[];
  Fitness: string[];
  Medicine: string[];
  Family: string[];
  Furniture: string[];
  Electronics: string[];
  Education: string[];
  Personal: string[];
  Life: string[];
  income: string[];
  Other: string[];
};
export type CategoryReducerType = {
  income: CategoryType[];
  costs: CategoryType[];
  categoriesIcon: CategoriesIconType;
};

const initialState: CategoryReducerType = {
  income: [
    { iconName: 'wallet', name: 'salary', id: 'Zarplata' },
    {
      iconName: 'bank',
      name: 'bankInvestments',
      id: 'Bank-Vlozhenia',
    },
    { iconName: 'sack-percent', name: 'prize', id: 'Premia' },
    { iconName: 'wallet-giftcard', name: 'presents', id: 'Podarki' },
    { iconName: 'sale', name: 'sales', id: 'prodaji' },
    { iconName: 'cash-refund', name: 'returns', id: 'Vozvrati' },
    { iconName: 'chart-line', name: 'dividends', id: 'Dividendi' },
    {
      iconName: 'apple-keyboard-command',
      name: 'other',
      id: 'Drugoe',
    },
  ],
  costs: [
    { iconName: 'home', name: 'Home', id: 'Dom' },
    { iconName: 'car', name: 'car', id: 'Mashina' },
    { iconName: 'airplane', name: 'recreation', id: 'Otdix' },
    { iconName: 'heart', name: 'health', id: 'Zdorovie' },
    { iconName: 'food', name: 'products', id: 'Producti' },
    {
      iconName: 'water-pump',
      name: 'utilities',
      id: 'Kommynal-Uslugi',
    },
    { iconName: 'bus', name: 'transport', id: 'Transport' },
    { iconName: 'shopping', name: 'shoping', id: 'Shoping' },
    { iconName: 'dumbbell', name: 'sport', id: 'Sport' },
    { iconName: 'cash-register', name: 'taxes', id: 'Nalogi' },
    { iconName: 'baby-buggy', name: 'children', id: 'Deti' },
    {
      iconName: 'paw',
      name: 'pets',
      id: 'Domash-Zivotnie',
    },
    { iconName: 'brush', name: 'beauty', id: 'Krasota' },
    { iconName: 'power', name: 'electronics', id: 'Electronica' },
    {
      iconName: 'hamburger',
      name: 'fastFood',
      id: 'Bistroe-Pitanie',
    },
    { iconName: 'bottle-wine', name: 'alcohol', id: 'Alcohol' },
    { iconName: 'carrot', name: 'vegetables', id: 'Ovoschi' },
    { iconName: 'cupcake', name: 'sweets', id: 'Sladosti' },
    { iconName: 'gift-outline', name: 'presents', id: 'Podarki' },
    {
      iconName: 'book-open-page-variant',
      name: 'training',
      id: 'Obuchenie',
    },
    { iconName: 'food-apple', name: 'fruits', id: 'Fructi' },
    { iconName: 'paperclip', name: 'office', id: 'Office' },
    { iconName: 'home-currency-usd', name: 'rent', id: 'Arenda' },
    {
      iconName: 'apple-keyboard-command',
      name: 'other',
      id: 'Drugoe',
    },
  ],
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
      'tractor',
      'train',
      'truck',
      'engine',
      'oil',
      'piston',
      'parking',
      'road-variant',
    ],
    Shopping: [
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
      'pig',
      'video',
      'video-vintage',
      'water',
      'water-pump',
      'wrench',
    ],
  },
};

class CategoryReducer extends ImmerReducer<CategoryReducerType> {
  state = this.draftState;
}

export const categoryActions = createActionCreators(CategoryReducer);

export const categoryReducer = createReducerFunction(
  CategoryReducer,
  initialState,
);
