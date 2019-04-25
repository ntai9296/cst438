const cart = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return [...state, action.item];
    case 'REMOVE_ITEM':
      return [];
    case 'REMOVE_USER':
      return [];
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

export default cart;
