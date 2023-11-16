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
  const [selectFriend, setSelect] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState([]);
  console.log(selectedFriend);

  function addingFriend(frien) {
    setFriends((friends) => [...friends, frien]);
  }
  function onSetFriend() {
    setAddFriend(!addFriend);
  }

  function onSelectFriend(obj) {
    setSelect(!selectFriend);
    if (obj.id !== selectedFriend.id && selectedFriend.id) {
      setSelect((s) => {
        if (!s) {
          return !s;
        }
        return s;
      });
      setSelectedFriend(obj);
    }
    setSelectedFriend(obj);
  }

  function onChangeBalance(value) {
    setFriends((friend) =>
      friend.map((f) =>
        f.id === selectedFriend.id
          ? { ...f, balance: f.balance + value }
          : f
      )
    );

    setSelect(!selectFriend);
  }
  return (
    <div className="app">
      <SideBar
        friends={friends}
        onSetAddFriend={onSetFriend}
        onSelectFriend={onSelectFriend}
      />

      {selectFriend ? (
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
