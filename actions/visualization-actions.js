// Visualization actions
export const loadProductLine = Id => ({
  type: 'LOAD_PRODUCTLINE',
  Id,
});

export const log = item => ({
  type: 'LOG',
  item,
});
