export default function Friends({
  friendsObj,
  onSelectFriend,
  selected,
  setSelected,
}) {
  let content;
  const isSelected = selected === friendsObj.id;
  function handleSelected(frien) {
    onSelectFriend(frien);
    setSelected(isSelected ? 0 : frien.id);
  }
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
    <li>
      <img src={friendsObj.image} alt={friendsObj.name} />
      <h3>{friendsObj.name}</h3>
      <p>{content}</p>
      <button
        className="button"
        onClick={() => handleSelected(friendsObj)}
      >
        {!isSelected ? "Select" : "Closed"}
      </button>
    </li>
  );
}
