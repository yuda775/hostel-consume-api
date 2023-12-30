const getRoomImageUrl = (roomId, imageName) => {
  return `http://localhost:3001/images/rooms/${roomId}/${imageName}`;
};

export { getRoomImageUrl };
