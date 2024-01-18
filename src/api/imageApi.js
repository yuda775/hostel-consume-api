const getRoomImageUrl = (roomId, imageName) => {
  return `http://localhost:3000/images/rooms/${roomId}/${imageName}`;
};

export { getRoomImageUrl };
