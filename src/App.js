import { useState } from "react";
import FormAddFriend from "./FormAddFriend";
import FormSplitABill from "./FormSplitaBill";
import SideBar from "./SIdeBar";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [addFriend, setAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] =
    useState(null);

  function addingFriend(frien) {
    setFriends((friends) => [...friends, frien]);
  }
  function onSetFriend() {
    setAddFriend(!addFriend);
  }

  function onSelectFriend(obj) {
    setSelectedFriend((selected) =>
      selected?.id === obj.id ? null : obj
    );
    setAddFriend(false);
  }

  function onChangeBalance(value) {
    setFriends((friend) =>
      friend.map((f) =>
        f.id === selectedFriend.id
          ? { ...f, balance: f.balance + value }
          : f
      )
    );
    setSelectedFriend(null);
  }
  return (
    <div className="app">
      <SideBar
        friends={friends}
        onSetAddFriend={onSetFriend}
        onSelectFriend={onSelectFriend}
        selected={selectedFriend}
      />

      {selectedFriend ? (
        <FormSplitABill
          selectedFriend={selectedFriend}
          onChangeBalance={onChangeBalance}
        />
      ) : null}
      {addFriend ? (
        <FormAddFriend
          onAddingFriend={addingFriend}
          onSetFriend={onSetFriend}
        />
      ) : null}
    </div>
  );
}
