import { useState } from "react";

import Friends from "./Friends";

export default function SideBar({
  friends,
  onSetAddFriend,
  onSelectFriend,
}) {
  const [selected, setSelected] = useState(0);
  return (
    <div className="sidebar">
      <ul>
        {friends.map((friend) => (
          <Friends
            friendsObj={friend}
            key={friend.id}
            onSelectFriend={onSelectFriend}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </ul>
      <button className="button" onClick={onSetAddFriend}>
        Add friend
      </button>
    </div>
  );
}
