export default function Friends({
  friendsObj,
  onSelectFriend,
  selected,
}) {
  let content;
  const isSelected = selected?.id === friendsObj.id;
  if (friendsObj.balance > 0) {
    content = `${friendsObj.name} ownes you ${friendsObj.balance}$`;
  }

  if (friendsObj.balance < 0) {
    content = `You owne ${friendsObj.name} ${Math.abs(
      friendsObj.balance
    )}$`;
  }
  if (friendsObj.balance === 0 || !friendsObj.balance) {
    content = `You and ${friendsObj.name} are both even`;
  }
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friendsObj.image} alt={friendsObj.name} />
      <h3>{friendsObj.name}</h3>
      <p>{content}</p>
      <button
        className="button"
        onClick={() => onSelectFriend(friendsObj)}
      >
        {!isSelected ? "Select" : "Closed"}
      </button>
    </li>
  );
}
