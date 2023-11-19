import Friends from "./Friends";

export default function SideBar({
  friends,
  onSetAddFriend,
  onSelectFriend,
  selected,
}) {
  return (
    <div className="sidebar">
      <ul>
        {friends.map((friend) => (
          <Friends
            friendsObj={friend}
            key={friend.id}
            selected={selected}
            onSelectFriend={onSelectFriend}
          />
        ))}
      </ul>
      <button className="button" onClick={onSetAddFriend}>
        Add friend
      </button>
    </div>
  );
}
