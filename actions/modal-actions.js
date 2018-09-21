// Modal Actions
export const openModal = (event, item) => ({
  type: 'OPEN_MODAL',
  event,
  item,
});

export const closeModal = (event, item) => ({
  type: 'CLOSE_MODAL',
  event,
  item,
});
